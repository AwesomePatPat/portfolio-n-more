import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:4202'
const PORT = Number(process.env.PORT || new URL(REDIRECT_URI).port || 4202)

// Secret that gates the OAuth login. Only someone who knows this key can
// connect (or re-connect) the Spotify account behind this backend, so a random
// visitor can never overwrite your token with their own account.
const ADMIN_KEY = process.env.ADMIN_KEY

// Where we persist the long-lived refresh token so you only have to log in once.
const TOKEN_FILE = path.join(__dirname, '.tokens.json')

// Scopes needed for the stats we display.
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-top-read',
  'user-read-private',
  'user-read-email',
].join(' ')

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    '\n[spotify-backend] Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET.\n' +
      'Create a .env file in the backend/ folder (see .env.example).\n',
  )
}

if (!ADMIN_KEY) {
  console.warn(
    '\n[spotify-backend] WARNING: ADMIN_KEY is not set.\n' +
      'The /login route is UNPROTECTED \u2014 anyone could connect their own\n' +
      'Spotify account. Set ADMIN_KEY in your .env before deploying publicly.\n',
  )
}

// ---------------------------------------------------------------------------
// Token storage + refresh handling
// ---------------------------------------------------------------------------
let tokens = loadTokens()

function loadTokens() {
  try {
    return JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'))
  } catch {
    return { access_token: null, refresh_token: null, expires_at: 0 }
  }
}

function saveTokens() {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2))
}

const basicAuth = () =>
  'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

async function exchangeCodeForTokens(code) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  })

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: basicAuth(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`)

  const data = await res.json()
  tokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  }
  saveTokens()
  return tokens
}

async function refreshAccessToken() {
  if (!tokens.refresh_token) throw new Error('Not authenticated. Visit /login first.')

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: tokens.refresh_token,
  })

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: basicAuth(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!res.ok) throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`)

  const data = await res.json()
  tokens.access_token = data.access_token
  tokens.expires_at = Date.now() + data.expires_in * 1000
  // Spotify may (rarely) hand back a new refresh token.
  if (data.refresh_token) tokens.refresh_token = data.refresh_token
  saveTokens()
  return tokens
}

async function getAccessToken() {
  // Refresh ~30s before actual expiry to avoid edge-of-window failures.
  if (!tokens.access_token || Date.now() > tokens.expires_at - 30_000) {
    await refreshAccessToken()
  }
  return tokens.access_token
}

// Thin wrapper around the Spotify Web API with one automatic retry on 401.
async function spotify(endpoint, retry = true) {
  const token = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 204) return null // e.g. nothing currently playing
  if (res.status === 401 && retry) {
    await refreshAccessToken()
    return spotify(endpoint, false)
  }
  if (!res.ok) throw new Error(`Spotify API ${endpoint} -> ${res.status} ${await res.text()}`)
  return res.json()
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const app = express()
app.use(cors())

// Start of the OAuth flow. Protected by ADMIN_KEY: visit /login?key=YOUR_KEY.
// The key is also passed to Spotify as the `state` value and re-checked on the
// callback, so the token can only ever be set by someone holding the key.
app.get('/login', (req, res) => {
  if (ADMIN_KEY && req.query.key !== ADMIN_KEY) {
    return res
      .status(403)
      .send(
        htmlPage(
          '403 \u2014 Forbidden',
          'This login is private. You need the admin key to connect a Spotify account.',
        ),
      )
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    show_dialog: 'true',
    // Round-trips the key through Spotify so the callback can verify it too.
    state: ADMIN_KEY ?? '',
  })
  res.redirect(`https://accounts.spotify.com/authorize?${params}`)
})

// OAuth callback. The redirect URI is the server root, so the code lands here.
app.get('/', async (req, res) => {
  const { code, error, state } = req.query

  if (error) {
    return res.status(400).send(htmlPage('Authorization failed', `Spotify said: ${error}`))
  }

  if (code) {
    // Re-verify the key that we round-tripped via `state`. This blocks anyone
    // who didn't start the flow through our protected /login route.
    if (ADMIN_KEY && state !== ADMIN_KEY) {
      return res
        .status(403)
        .send(htmlPage('403 \u2014 Forbidden', 'Invalid or missing admin key.'))
    }

    try {
      await exchangeCodeForTokens(code)
      return res.send(
        htmlPage(
          '✅ Connected to Spotify!',
          'Your refresh token has been saved. You can close this tab and open the /spotify page on your site.',
        ),
      )
    } catch (e) {
      return res.status(500).send(htmlPage('Something went wrong', String(e.message)))
    }
  }

  // No code: show a small status / login landing page.
  const connected = Boolean(tokens.refresh_token)
  const loginHint = ADMIN_KEY
    ? 'To (re)connect, open <code>/login?key=YOUR_ADMIN_KEY</code> with your secret key.'
    : '<a href="/login">Click here to connect your Spotify account</a>'
  res.send(
    htmlPage(
      'Spotify Stats Backend',
      connected
        ? 'Status: <b style="color:#1db954">connected</b>. The API is ready.<br/>' + loginHint
        : 'Status: <b style="color:#e22134">not connected</b>.<br/>' + loginHint,
    ),
  )
})

// Is the backend authenticated yet?
app.get('/api/status', (req, res) => {
  res.json({ connected: Boolean(tokens.refresh_token) })
})

// Public profile (name, followers, avatar).
app.get('/api/profile', wrap(() => spotify('/me')))

// What's playing right now (null when nothing is playing).
app.get('/api/now-playing', wrap(() => spotify('/me/player/currently-playing?additional_types=track,episode')))

// Top tracks. ?range=short_term|medium_term|long_term
app.get(
  '/api/top-tracks',
  wrap((req) => spotify(`/me/top/tracks?time_range=${range(req)}&limit=${limit(req, 20)}`)),
)

// Top artists.
app.get(
  '/api/top-artists',
  wrap((req) => spotify(`/me/top/artists?time_range=${range(req)}&limit=${limit(req, 20)}`)),
)

// Recently played tracks.
app.get(
  '/api/recently-played',
  wrap((req) => spotify(`/me/player/recently-played?limit=${limit(req, 20)}`)),
)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function range(req) {
  const r = String(req.query.range || 'medium_term')
  return ['short_term', 'medium_term', 'long_term'].includes(r) ? r : 'medium_term'
}

function limit(req, fallback) {
  const n = Number(req.query.limit)
  return Number.isFinite(n) && n > 0 && n <= 50 ? n : fallback
}

// Wrap an async handler with consistent error handling.
function wrap(handler) {
  return async (req, res) => {
    try {
      const data = await handler(req)
      res.json(data ?? null)
    } catch (e) {
      const message = String(e.message || e)
      const needsAuth = message.includes('Not authenticated')
      res.status(needsAuth ? 401 : 500).json({ error: message, needsAuth })
    }
  }
}

function htmlPage(title, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { font-family: system-ui, sans-serif; background:#0a0a0a; color:#e5e5e5;
             display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; }
      .card { max-width:520px; padding:40px; text-align:center; }
      h1 { color:#1db954; }
      a { color:#1db954; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${title}</h1>
      <p>${body}</p>
    </div>
  </body>
</html>`
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n[spotify-backend] listening on http://127.0.0.1:${PORT}`)
  console.log(`[spotify-backend] redirect URI: ${REDIRECT_URI}`)
  if (!tokens.refresh_token) {
    console.log(`[spotify-backend] Not connected yet -> open http://127.0.0.1:${PORT}/login\n`)
  } else {
    console.log(`[spotify-backend] Connected. API ready.\n`)
  }
})
