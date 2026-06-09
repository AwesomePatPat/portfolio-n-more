# Spotify Stats Backend

A tiny Express server that powers the `/spotify` page. It keeps your Spotify
**Client Secret** and **refresh token** server-side (never in the browser) and
exposes a few clean JSON endpoints the frontend can call.

## Why a backend is needed

The "now playing", "top tracks", "top artists" and "recently played" endpoints
are **user-scoped**: they require an OAuth access token tied to your account.
Those access tokens expire after ~1 hour, so we store a long-lived *refresh
token* and mint fresh access tokens automatically. The Client Secret must stay
on the server, so this can't live in the Vue app.

## Setup

```sh
cd backend
npm install
cp .env.example .env   # then fill in your credentials (already filled for this project)
npm start
```

The server listens on **http://127.0.0.1:4202** (matching the Redirect URI
registered in your Spotify dashboard).

## One-time login

1. Make sure `http://127.0.0.1:4202` is listed as a Redirect URI in your
   Spotify app settings: https://developer.spotify.com/dashboard
2. Start the server (`npm start`).
3. Open **http://127.0.0.1:4202/login** in your browser and approve access.
4. You'll be redirected back and a `.tokens.json` file is written. Done —
   from now on the server refreshes tokens on its own.

## Endpoints

| Method | Path                    | Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| GET    | `/login`                | Start the Spotify OAuth flow                 |
| GET    | `/`                     | OAuth callback + status page                 |
| GET    | `/api/status`           | `{ connected: boolean }`                     |
| GET    | `/api/profile`          | Your public profile                          |
| GET    | `/api/now-playing`      | Currently playing track (or `null`)          |
| GET    | `/api/top-tracks`       | `?range=short_term\|medium_term\|long_term`  |
| GET    | `/api/top-artists`      | `?range=short_term\|medium_term\|long_term`  |
| GET    | `/api/recently-played`  | Last played tracks                           |

## Security notes

- `.env` and `.tokens.json` are git-ignored. Never commit them.
- If a secret leaks, rotate it in the Spotify dashboard and update `.env`.
