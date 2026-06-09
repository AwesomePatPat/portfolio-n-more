<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
    <!-- Ambient animated glow that subtly reacts to the now-playing art -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div
        class="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-[120px] opacity-30 transition-colors duration-1000 animate-blob"
        :style="{ background: glowColor }"
      />
      <div
        class="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-[130px] opacity-25 transition-colors duration-1000 animate-blob-slow"
        :style="{ background: glowColor2 }"
      />
      <div class="grid-overlay absolute inset-0" />
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-5 py-12 md:px-8">
      <!-- Header -->
      <header class="mb-10 flex items-center justify-between gap-4">
        <router-link
          to="/linktree"
          class="group inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-[#1db954]"
        >
          <Icon icon="mdi:arrow-left" class="text-lg transition-transform group-hover:-translate-x-1" />
          Back to links
        </router-link>

        <div class="flex items-center gap-2 text-[#1db954]">
          <Icon icon="mdi:spotify" class="text-3xl" />
          <span class="text-lg font-semibold tracking-tight">My Spotify</span>
        </div>
      </header>

      <!-- Backend not reachable / needs auth -->
      <div
        v-if="globalError"
        class="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center"
      >
        <Icon icon="mdi:lan-disconnect" class="mx-auto mb-4 text-5xl text-neutral-500" />
        <h2 class="mb-2 text-2xl font-bold">Can't load Spotify data</h2>
        <p class="mx-auto mb-6 max-w-md text-neutral-400">{{ globalError }}</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            v-if="needsAuth"
            :href="loginUrl"
            class="inline-flex items-center gap-2 rounded-full bg-[#1db954] px-6 py-3 font-semibold text-black transition-transform hover:scale-105"
          >
            <Icon icon="mdi:spotify" class="text-xl" />
            Connect Spotify
          </a>
          <button
            class="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold transition-colors hover:border-white/40"
            @click="loadAll"
          >
            <Icon icon="mdi:refresh" />
            Retry
          </button>
        </div>
      </div>

      <template v-else>
        <!-- Profile hero -->
        <section
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="mb-8 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 text-center sm:flex-row sm:text-left"
        >
          <div class="relative">
            <img
              v-if="profile?.images?.length"
              :src="profile.images[0].url"
              :alt="profile.display_name"
              class="h-28 w-28 rounded-full object-cover shadow-2xl ring-2 ring-[#1db954]/60"
            />
            <div
              v-else
              class="flex h-28 w-28 items-center justify-center rounded-full bg-white/5 ring-2 ring-white/10"
            >
              <Icon icon="mdi:account-music" class="text-5xl text-neutral-500" />
            </div>
          </div>
          <div class="flex-1">
            <p class="text-sm uppercase tracking-[0.2em] text-[#1db954]">Spotify Profile</p>
            <h1 class="mt-1 text-4xl font-black tracking-tight">
              {{ profile?.display_name ?? (loading ? '…' : 'My Music') }}
            </h1>
            <div class="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-400 sm:justify-start">
              <span v-if="profile?.followers" class="inline-flex items-center gap-1.5">
                <Icon icon="mdi:account-heart" class="text-[#1db954]" />
                {{ formatNumber(profile.followers.total) }} followers
              </span>
              <span v-if="profile?.product" class="inline-flex items-center gap-1.5 capitalize">
                <Icon icon="mdi:crown" class="text-[#1db954]" />
                {{ profile.product }}
              </span>
              <a
                v-if="profile?.external_urls?.spotify"
                :href="profile.external_urls.spotify"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1.5 text-[#1db954] hover:underline"
              >
                <Icon icon="mdi:open-in-new" />
                Open profile
              </a>
            </div>
          </div>
        </section>

        <!-- Now playing -->
        <section
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
          class="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
        >
          <div class="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <div class="flex items-center gap-2.5">
              <span class="relative flex h-2.5 w-2.5">
                <span
                  v-if="nowPlaying?.is_playing"
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1db954] opacity-75"
                />
                <span
                  class="relative inline-flex h-2.5 w-2.5 rounded-full"
                  :class="nowPlaying?.is_playing ? 'bg-[#1db954]' : 'bg-neutral-600'"
                />
              </span>
              <h2 class="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                {{ nowPlaying?.is_playing ? 'Now Playing' : 'Not Playing Right Now' }}
              </h2>
            </div>
            <!-- Animated equalizer bars -->
            <div v-if="nowPlaying?.is_playing" class="flex items-end gap-1 h-5">
              <span v-for="n in 4" :key="n" class="eq-bar" :style="{ animationDelay: `${n * 0.15}s` }" />
            </div>
          </div>

          <div class="p-6">
            <div v-if="nowPlaying?.item" class="flex flex-col gap-5 sm:flex-row sm:items-center">
              <img
                :src="albumArt(nowPlaying.item, 1)"
                :alt="nowPlaying.item.album.name"
                class="h-32 w-32 flex-shrink-0 rounded-xl object-cover shadow-2xl"
                :class="{ 'spin-art': nowPlaying.is_playing }"
              />
              <div class="min-w-0 flex-1">
                <a
                  :href="nowPlaying.item.external_urls?.spotify"
                  target="_blank"
                  rel="noopener"
                  class="block truncate text-2xl font-bold hover:text-[#1db954]"
                >
                  {{ nowPlaying.item.name }}
                </a>
                <p class="mt-1 truncate text-neutral-400">
                  {{ artistNames(nowPlaying.item) }}
                </p>
                <p class="mt-0.5 truncate text-sm text-neutral-500">
                  {{ nowPlaying.item.album.name }}
                </p>

                <!-- Progress bar -->
                <div class="mt-4">
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      class="h-full rounded-full bg-[#1db954] transition-all duration-1000 ease-linear"
                      :style="{ width: `${liveProgressPercent}%` }"
                    />
                  </div>
                  <div class="mt-1.5 flex justify-between text-xs tabular-nums text-neutral-500">
                    <span>{{ formatDuration(liveProgressMs) }}</span>
                    <span>{{ formatDuration(nowPlaying.item.duration_ms) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Nothing playing -> show last played -->
            <div v-else class="flex flex-col gap-5 sm:flex-row sm:items-center">
              <img
                v-if="lastPlayed"
                :src="albumArt(lastPlayed.track, 1)"
                :alt="lastPlayed.track.album.name"
                class="h-32 w-32 flex-shrink-0 rounded-xl object-cover opacity-80 shadow-2xl grayscale"
              />
              <div
                v-else
                class="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-xl bg-white/5"
              >
                <Icon icon="mdi:music-note-off" class="text-4xl text-neutral-600" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm uppercase tracking-wider text-neutral-500">
                  {{ lastPlayed ? 'Last played' : 'Silence…' }}
                </p>
                <p v-if="lastPlayed" class="mt-1 truncate text-2xl font-bold">
                  {{ lastPlayed.track.name }}
                </p>
                <p v-if="lastPlayed" class="mt-1 truncate text-neutral-400">
                  {{ artistNames(lastPlayed.track) }} · {{ timeAgo(lastPlayed.played_at) }}
                </p>
                <p v-else class="mt-1 text-neutral-400">
                  Nothing is playing at the moment. Check back later!
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Top genres -->
        <section
          v-if="topGenres.length"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 150 } }"
          class="mb-10"
        >
          <h2 class="mb-4 flex items-center gap-2 text-xl font-bold">
            <Icon icon="mdi:tag-multiple" class="text-[#1db954]" />
            Top Genres
            <span class="text-sm font-normal text-neutral-500">· last 6 months</span>
          </h2>
          <div class="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div v-for="g in topGenres" :key="g.name">
              <div class="mb-1 flex items-center justify-between text-sm">
                <span class="font-medium capitalize">{{ g.name }}</span>
                <span class="tabular-nums text-neutral-500">{{ g.count }}×</span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-[#1db954] to-[#1ed760] transition-[width] duration-700"
                  :style="{ width: `${(g.count / topGenres[0].count) * 100}%` }"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Time-range toggle -->
        <div
          class="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm"
        >
          <button
            v-for="r in ranges"
            :key="r.value"
            class="rounded-full px-4 py-1.5 font-medium transition-colors"
            :class="
              range === r.value
                ? 'bg-[#1db954] text-black'
                : 'text-neutral-400 hover:text-white'
            "
            @click="setRange(r.value)"
          >
            {{ r.label }}
          </button>
        </div>

        <!-- Top tracks + Top artists grid -->
        <div class="grid gap-8 lg:grid-cols-2">
          <!-- Top tracks -->
          <section
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
          >
            <h2 class="mb-4 flex items-center gap-2 text-xl font-bold">
              <Icon icon="mdi:music-note" class="text-[#1db954]" />
              Top Tracks
            </h2>
            <div class="space-y-1.5">
              <a
                v-for="(t, i) in topTracks"
                :key="t.id"
                :href="t.external_urls?.spotify"
                target="_blank"
                rel="noopener"
                class="group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
              >
                <span class="w-5 text-center text-sm font-bold tabular-nums text-neutral-600">
                  {{ i + 1 }}
                </span>
                <img :src="albumArt(t, 2)" :alt="t.album.name" class="h-11 w-11 rounded-md object-cover" />
                <div class="min-w-0 flex-1">
                  <p class="truncate font-medium group-hover:text-[#1db954]">{{ t.name }}</p>
                  <p class="truncate text-sm text-neutral-500">{{ artistNames(t) }}</p>
                </div>
                <span class="hidden text-xs tabular-nums text-neutral-600 sm:block">
                  {{ formatDuration(t.duration_ms) }}
                </span>
              </a>
              <SkeletonRows v-if="loading && !topTracks.length" :rows="8" />
            </div>
          </section>

          <!-- Top artists -->
          <section
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 250 } }"
          >
            <h2 class="mb-4 flex items-center gap-2 text-xl font-bold">
              <Icon icon="mdi:account-music" class="text-[#1db954]" />
              Top Artists
            </h2>
            <div class="space-y-1.5">
              <a
                v-for="(a, i) in topArtists"
                :key="a.id"
                :href="a.external_urls?.spotify"
                target="_blank"
                rel="noopener"
                class="group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
              >
                <span class="w-5 text-center text-sm font-bold tabular-nums text-neutral-600">
                  {{ i + 1 }}
                </span>
                <img
                  :src="artistImage(a)"
                  :alt="a.name"
                  class="h-11 w-11 rounded-full object-cover"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate font-medium group-hover:text-[#1db954]">{{ a.name }}</p>
                  <p v-if="a.genres?.length" class="truncate text-sm capitalize text-neutral-500">
                    {{ a.genres.slice(0, 2).join(' · ') }}
                  </p>
                </div>
                <span
                  v-if="a.popularity != null"
                  class="hidden items-center gap-1 text-xs text-neutral-600 sm:flex"
                  title="Popularity"
                >
                  <Icon icon="mdi:fire" class="text-orange-500/70" />
                  {{ a.popularity }}
                </span>
              </a>
              <SkeletonRows v-if="loading && !topArtists.length" :rows="8" />
            </div>
          </section>
        </div>

        <!-- Recently played -->
        <section
          v-if="recentlyPlayed.length"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
          class="mt-10"
        >
          <h2 class="mb-4 flex items-center gap-2 text-xl font-bold">
            <Icon icon="mdi:history" class="text-[#1db954]" />
            Recently Played
          </h2>
          <div class="flex gap-4 overflow-x-auto pb-4 spotify-scroll">
            <a
              v-for="(p, i) in recentlyPlayed"
              :key="`${p.track.id}-${i}`"
              :href="p.track.external_urls?.spotify"
              target="_blank"
              rel="noopener"
              class="group w-36 flex-shrink-0"
            >
              <div class="relative overflow-hidden rounded-xl">
                <img
                  :src="albumArt(p.track, 1)"
                  :alt="p.track.album.name"
                  class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <span class="text-xs text-[#1db954]">{{ timeAgo(p.played_at) }}</span>
                </div>
              </div>
              <p class="mt-2 truncate text-sm font-medium group-hover:text-[#1db954]">
                {{ p.track.name }}
              </p>
              <p class="truncate text-xs text-neutral-500">{{ artistNames(p.track) }}</p>
            </a>
          </div>
        </section>

        <!-- Fun stats footer -->
        <section
          v-if="funStats.length"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 350 } }"
          class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <div
            v-for="s in funStats"
            :key="s.label"
            class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
          >
            <Icon :icon="s.icon" class="mx-auto mb-2 text-3xl text-[#1db954]" />
            <p class="text-2xl font-black tabular-nums">{{ s.value }}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-neutral-500">{{ s.label }}</p>
          </div>
        </section>

        <footer class="mt-12 text-center text-xs text-neutral-600">
          Live data from the Spotify Web API · refreshes automatically
        </footer>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, h, defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import {
  spotifyApi,
  SpotifyError,
  type TimeRange,
  type Track,
  type Artist,
  type NowPlaying,
  type Profile,
  type PlayHistoryItem,
} from './spotifyApi'

// Lightweight inline skeleton-rows component (avoids an extra file).
const SkeletonRows = defineComponent({
  props: { rows: { type: Number, default: 6 } },
  setup(props) {
    return () =>
      Array.from({ length: props.rows }).map((_, i) =>
        h('div', { key: i, class: 'flex items-center gap-3 px-3 py-2' }, [
          h('div', { class: 'h-11 w-11 rounded-md bg-white/5 animate-pulse' }),
          h('div', { class: 'flex-1 space-y-2' }, [
            h('div', { class: 'h-3 w-2/3 rounded bg-white/5 animate-pulse' }),
            h('div', { class: 'h-2.5 w-1/3 rounded bg-white/5 animate-pulse' }),
          ]),
        ]),
      )
  },
})

const ranges: { label: string; value: TimeRange }[] = [
  { label: '4 weeks', value: 'short_term' },
  { label: '6 months', value: 'medium_term' },
  { label: 'All time', value: 'long_term' },
]

const loading = ref(true)
const globalError = ref('')
const needsAuth = ref(false)
const loginUrl = spotifyApi.loginUrl()

const profile = ref<Profile | null>(null)
const nowPlaying = ref<NowPlaying | null>(null)
const topTracks = ref<Track[]>([])
const topArtists = ref<Artist[]>([])
const recentlyPlayed = ref<PlayHistoryItem[]>([])
const range = ref<TimeRange>('medium_term')

// --- live progress for the now-playing bar -------------------------------
const liveProgressMs = ref(0)
let progressTimer: ReturnType<typeof setInterval> | undefined
let pollTimer: ReturnType<typeof setInterval> | undefined

const liveProgressPercent = computed(() => {
  const dur = nowPlaying.value?.item?.duration_ms ?? 0
  if (!dur) return 0
  return Math.min(100, (liveProgressMs.value / dur) * 100)
})

const lastPlayed = computed(() => recentlyPlayed.value[0] ?? null)

// --- derived: top genres from top artists --------------------------------
const topGenres = computed(() => {
  const counts = new Map<string, number>()
  for (const a of topArtists.value) {
    for (const g of a.genres ?? []) counts.set(g, (counts.get(g) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
})

// --- fun stats -----------------------------------------------------------
const funStats = computed(() => {
  if (!topTracks.value.length) return []
  const avgLen =
    topTracks.value.reduce((s, t) => s + t.duration_ms, 0) / topTracks.value.length
  const avgPop = Math.round(
    topTracks.value.reduce((s, t) => s + (t.popularity ?? 0), 0) / topTracks.value.length,
  )
  const obscure = [...topTracks.value].sort(
    (a, b) => (a.popularity ?? 0) - (b.popularity ?? 0),
  )[0]
  return [
    { icon: 'mdi:timer-music', value: formatDuration(avgLen), label: 'Avg track length' },
    { icon: 'mdi:fire', value: `${avgPop}`, label: 'Avg popularity' },
    { icon: 'mdi:tag-multiple', value: `${topGenres.value.length}`, label: 'Genres in top' },
    {
      icon: 'mdi:diamond-stone',
      value: obscure?.popularity != null ? `${obscure.popularity}` : '—',
      label: 'Most obscure pick',
    },
  ]
})

// --- dynamic glow colours ------------------------------------------------
const glowColor = ref('#1db95455')
const glowColor2 = ref('#0d4a2a55')

// ------------------------------------------------------------------------
// Formatting helpers
// ------------------------------------------------------------------------
function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'just now'
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.floor(hr / 24)
  return `${day}d ago`
}

function artistNames(t: Track): string {
  return t.artists.map((a) => a.name).join(', ')
}

function albumArt(t: Track, index = 0): string {
  return t.album.images?.[index]?.url ?? t.album.images?.[0]?.url ?? ''
}

function artistImage(a: Artist): string {
  return a.images?.[a.images.length - 1]?.url ?? a.images?.[0]?.url ?? ''
}

// ------------------------------------------------------------------------
// Data loading
// ------------------------------------------------------------------------
function handleError(e: unknown) {
  if (e instanceof SpotifyError) {
    globalError.value = e.message
    needsAuth.value = e.needsAuth
  } else {
    globalError.value = 'Unexpected error loading Spotify data.'
  }
}

async function loadRangeData() {
  const [tracks, artists] = await Promise.all([
    spotifyApi.topTracks(range.value),
    spotifyApi.topArtists(range.value),
  ])
  topTracks.value = tracks.items ?? []
  topArtists.value = artists.items ?? []
}

async function loadNowPlaying() {
  try {
    const np = await spotifyApi.nowPlaying()
    nowPlaying.value = np
    liveProgressMs.value = np?.progress_ms ?? 0
  } catch {
    // Non-fatal: keep the rest of the page usable.
  }
}

async function loadAll() {
  loading.value = true
  globalError.value = ''
  needsAuth.value = false
  try {
    // Status first so we can show a clean "connect" CTA if not authed.
    const status = await spotifyApi.status()
    if (!status.connected) {
      globalError.value = 'This Spotify account is not connected yet.'
      needsAuth.value = true
      loading.value = false
      return
    }

    const [prof, recent] = await Promise.all([
      spotifyApi.profile(),
      spotifyApi.recentlyPlayed(),
    ])
    profile.value = prof
    recentlyPlayed.value = recent.items ?? []

    await Promise.all([loadRangeData(), loadNowPlaying()])
  } catch (e) {
    handleError(e)
  } finally {
    loading.value = false
  }
}

async function setRange(r: TimeRange) {
  if (r === range.value) return
  range.value = r
  try {
    await loadRangeData()
  } catch (e) {
    handleError(e)
  }
}

// ------------------------------------------------------------------------
// Timers: tick the progress bar locally, poll now-playing periodically.
// ------------------------------------------------------------------------
onMounted(() => {
  loadAll()

  progressTimer = setInterval(() => {
    if (nowPlaying.value?.is_playing && nowPlaying.value.item) {
      liveProgressMs.value = Math.min(
        liveProgressMs.value + 1000,
        nowPlaying.value.item.duration_ms,
      )
    }
  }, 1000)

  // Re-fetch the currently playing track every 20s to stay in sync.
  pollTimer = setInterval(() => {
    if (!globalError.value) loadNowPlaying()
  }, 20000)
})

onUnmounted(() => {
  if (progressTimer) clearInterval(progressTimer)
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style scoped>
.grid-overlay {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}

/* Ambient blobs */
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -30px) scale(1.1); }
  66% { transform: translate(-30px, 20px) scale(0.95); }
}
.animate-blob { animation: blob 18s ease-in-out infinite; }
.animate-blob-slow { animation: blob 24s ease-in-out infinite reverse; }

/* Slowly rotating album art when playing */
@keyframes spin-art {
  to { transform: rotate(360deg); }
}
.spin-art {
  animation: spin-art 12s linear infinite;
  border-radius: 9999px;
}

/* Equalizer */
.eq-bar {
  width: 3px;
  height: 100%;
  background: #1db954;
  border-radius: 2px;
  animation: eq 0.9s ease-in-out infinite;
}
@keyframes eq {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
}

/* Custom scrollbar for the recently-played row */
.spotify-scroll::-webkit-scrollbar { height: 6px; }
.spotify-scroll::-webkit-scrollbar-track { background: transparent; }
.spotify-scroll::-webkit-scrollbar-thumb {
  background: rgba(29, 185, 84, 0.4);
  border-radius: 3px;
}
.spotify-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(29, 185, 84, 0.7);
}
</style>
