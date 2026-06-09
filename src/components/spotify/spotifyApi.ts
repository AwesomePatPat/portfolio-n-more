// ---------------------------------------------------------------------------
// Tiny client for the Spotify stats backend (see /backend).
// The backend keeps the client secret + refresh token and proxies the
// Spotify Web API, so the frontend only ever talks to these clean endpoints.
// ---------------------------------------------------------------------------

// Where the backend lives. Override at build time with VITE_SPOTIFY_API.
export const SPOTIFY_API: string =
  (import.meta.env.VITE_SPOTIFY_API as string | undefined) ?? 'http://127.0.0.1:4202'

export type TimeRange = 'short_term' | 'medium_term' | 'long_term'

export interface SpotifyImage {
  url: string
  width: number | null
  height: number | null
}

export interface Artist {
  id: string
  name: string
  genres?: string[]
  images?: SpotifyImage[]
  followers?: { total: number }
  external_urls?: { spotify?: string }
  popularity?: number
}

export interface Track {
  id: string
  name: string
  duration_ms: number
  popularity?: number
  preview_url: string | null
  external_urls?: { spotify?: string }
  artists: { id: string; name: string; external_urls?: { spotify?: string } }[]
  album: { name: string; images: SpotifyImage[]; external_urls?: { spotify?: string } }
}

export interface NowPlaying {
  is_playing: boolean
  progress_ms: number
  item: Track | null
}

export interface Profile {
  display_name: string
  followers?: { total: number }
  images?: SpotifyImage[]
  external_urls?: { spotify?: string }
  product?: string
  country?: string
}

export interface PlayHistoryItem {
  track: Track
  played_at: string
}

class SpotifyError extends Error {
  needsAuth: boolean
  status: number
  constructor(message: string, status: number, needsAuth = false) {
    super(message)
    this.name = 'SpotifyError'
    this.status = status
    this.needsAuth = needsAuth
  }
}

async function get<T>(path: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${SPOTIFY_API}${path}`)
  } catch {
    throw new SpotifyError(
      'Could not reach the Spotify backend. Is it running on port 4202?',
      0,
      false,
    )
  }

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    const message = (data && data.error) || `Request failed (${res.status})`
    throw new SpotifyError(message, res.status, Boolean(data && data.needsAuth))
  }
  return data as T
}

export const spotifyApi = {
  loginUrl: () => `${SPOTIFY_API}/login`,
  status: () => get<{ connected: boolean }>('/api/status'),
  profile: () => get<Profile>('/api/profile'),
  nowPlaying: () => get<NowPlaying | null>('/api/now-playing'),
  topTracks: (range: TimeRange) => get<{ items: Track[] }>(`/api/top-tracks?range=${range}`),
  topArtists: (range: TimeRange) => get<{ items: Artist[] }>(`/api/top-artists?range=${range}`),
  recentlyPlayed: () => get<{ items: PlayHistoryItem[] }>('/api/recently-played'),
}

export { SpotifyError }
