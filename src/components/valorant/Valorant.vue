<template>
  <div class="min-h-screen bg-black relative">
    <div class="fixed inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0">
        <div class="grid-pattern-dark"></div>
      </div>
    </div>

    <div class="relative z-10">
      <div class="container mx-auto px-4 py-20">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-5xl font-bold text-white mb-6 flex items-center gap-4">
            <span class="text-red-500">VALORANT</span> Roulette
          </h1>

          <!-- Settings Page -->
          <div v-if="!gameStarted" class="space-y-8">
            <!-- Agent Selection -->
            <div class="glass-surface p-8 rounded-lg">
              <h2 class="text-3xl font-semibold text-white mb-6">Agent Selection</h2>
              <p class="text-gray-400 mb-4">Select agents for the roulette pool:</p>
              <div class="mb-4 flex items-center gap-4">
                <button
                  @click="selectAllAgents"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Select All
                </button>
                <button
                  @click="deselectAllAgents"
                  class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Deselect All
                </button>
                <span class="text-gray-300"
                  >{{ selectedAgents.length }} / {{ agents.length }} selected</span
                >
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <div
                  v-for="agent in agents"
                  :key="agent"
                  @click="toggleAgent(agent)"
                  :class="[
                    'agent-card cursor-pointer p-4 rounded-lg border-2 transition-all',
                    selectedAgents.includes(agent)
                      ? 'border-red-500 bg-red-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600',
                  ]"
                >
                  <div class="text-center">
                    <div class="text-2xl mb-2">🎭</div>
                    <p class="text-white font-semibold text-sm">{{ agent }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Weapon Settings -->
            <div class="glass-surface p-8 rounded-lg">
              <h2 class="text-3xl font-semibold text-white mb-6">Weapon Settings</h2>

              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <label class="text-white text-lg font-semibold w-48">Weapon Type:</label>
                  <div class="flex gap-4">
                    <button
                      @click="weaponType = 'both'"
                      :class="[
                        'px-6 py-3 rounded-lg transition-all font-semibold',
                        weaponType === 'both'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
                      ]"
                    >
                      Both (Round 1-2: Sidearms only, then all weapons)
                    </button>
                    <button
                      @click="weaponType = 'sidearms'"
                      :class="[
                        'px-6 py-3 rounded-lg transition-all font-semibold',
                        weaponType === 'sidearms'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
                      ]"
                    >
                      Only Sidearms
                    </button>
                    <button
                      @click="weaponType = 'primaries'"
                      :class="[
                        'px-6 py-3 rounded-lg transition-all font-semibold',
                        weaponType === 'primaries'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
                      ]"
                    >
                      Only Primaries
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Crosshair Settings -->
            <div class="glass-surface p-8 rounded-lg">
              <h2 class="text-3xl font-semibold text-white mb-6">Crosshair Settings</h2>

              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <label class="text-white text-lg font-semibold w-48">Random Crosshair:</label>
                  <button
                    @click="crosshairEnabled = !crosshairEnabled"
                    :class="[
                      'px-6 py-3 rounded-lg transition-all font-semibold',
                      crosshairEnabled
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
                    ]"
                  >
                    {{ crosshairEnabled ? 'Enabled' : 'Disabled' }}
                  </button>
                </div>

                <div v-if="crosshairEnabled" class="flex items-center gap-4">
                  <label class="text-white text-lg font-semibold w-48">Change every:</label>
                  <input
                    v-model.number="crosshairChangeInterval"
                    type="number"
                    min="1"
                    max="20"
                    class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white w-24"
                  />
                  <span class="text-gray-300">rounds</span>
                </div>

                <div v-if="crosshairEnabled" class="mt-6 p-6 bg-gray-900/50 rounded-lg">
                  <p class="text-gray-400 mb-4">Crosshair Preview & Code:</p>
                  <div class="flex flex-col items-center gap-4">
                    <CrosshairPreview :crosshair="previewCrosshair" />
                    <div class="w-full max-w-xl">
                      <textarea
                        v-model="previewCrosshairCode"
                        readonly
                        class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm"
                        rows="2"
                        @click="copyToClipboard"
                      ></textarea>
                      <p class="text-xs text-gray-500 mt-1">
                        Click to copy Valorant crosshair code
                      </p>
                    </div>
                  </div>
                  <button
                    @click="generateRandomCrosshair"
                    class="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Generate New Random Crosshair
                  </button>
                </div>
              </div>
            </div>

            <!-- Start Button -->
            <div class="flex justify-center">
              <button
                @click="startGame"
                :disabled="selectedAgents.length === 0"
                :class="[
                  'px-12 py-6 rounded-lg text-2xl font-bold transition-all transform hover:scale-105',
                  selectedAgents.length === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/50',
                ]"
              >
                START ROULETTE
              </button>
            </div>
          </div>

          <!-- Game Screen -->
          <div v-else class="space-y-8">
            <!-- Current Agent -->
            <div class="glass-surface p-8 rounded-lg text-center">
              <h2 class="text-2xl text-gray-400 mb-4">Your Agent</h2>
              <div class="text-6xl mb-4">🎭</div>
              <h3 class="text-5xl font-bold text-red-500">{{ currentAgent }}</h3>
            </div>

            <!-- Current Round & Weapon -->
            <div class="glass-surface p-8 rounded-lg">
              <div class="flex justify-between items-center mb-8">
                <div>
                  <h2 class="text-3xl font-semibold text-white">Round {{ currentRound }}</h2>
                  <p class="text-gray-400 mt-1">{{ getRoundPhase() }}</p>
                </div>
                <button
                  @click="resetGame"
                  class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Back to Settings
                </button>
              </div>

              <!-- Weapon Roulette Animation -->
              <div class="relative">
                <div v-if="isSpinning" class="weapon-roulette">
                  <div class="roulette-container" ref="rouletteContainer">
                    <div class="roulette-items" :style="rouletteStyle" ref="rouletteItems">
                      <div
                        v-for="(weapon, index) in rouletteWeapons"
                        :key="index"
                        class="roulette-item"
                        ref="rouletteItem"
                      >
                        <div class="text-4xl mb-2">{{ getWeaponEmoji(weapon) }}</div>
                        <p class="text-white font-semibold">{{ weapon }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="roulette-pointer"></div>
                </div>

                <div v-else class="text-center py-12">
                  <div class="text-8xl mb-6">{{ getWeaponEmoji(currentWeapon) }}</div>
                  <h3 class="text-5xl font-bold text-white mb-2">{{ currentWeapon }}</h3>
                  <p class="text-xl text-gray-400">{{ getWeaponCategory(currentWeapon) }}</p>
                </div>
              </div>

              <!-- Crosshair Display -->
              <div
                v-if="crosshairEnabled && shouldShowCrosshair"
                class="mt-8 p-6 bg-gray-900/50 rounded-lg"
              >
                <h3 class="text-xl font-semibold text-white mb-4 text-center">
                  Your New Crosshair!
                </h3>
                <div class="flex flex-col items-center gap-4">
                  <CrosshairPreview :crosshair="currentCrosshair" />
                  <div class="w-full max-w-xl">
                    <textarea
                      v-model="currentCrosshairCode"
                      readonly
                      class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm"
                      rows="2"
                      @click="copyToClipboard"
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-1">
                      Click to copy - Paste in Valorant settings!
                    </p>
                  </div>
                </div>
              </div>

              <!-- Next Round Button -->
              <div class="flex justify-center mt-8">
                <button
                  @click="nextRound"
                  :disabled="isSpinning"
                  class="px-12 py-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg text-2xl font-bold transition-all transform hover:scale-105"
                >
                  {{ isSpinning ? 'SPINNING...' : 'NEXT ROUND' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Agent List (27 agents - added Veto!)
const agents = [
  'Brimstone',
  'Phoenix',
  'Sage',
  'Sova',
  'Viper',
  'Cypher',
  'Reyna',
  'Killjoy',
  'Breach',
  'Omen',
  'Jett',
  'Raze',
  'Skye',
  'Yoru',
  'Astra',
  'KAY/O',
  'Chamber',
  'Neon',
  'Fade',
  'Harbor',
  'Gekko',
  'Deadlock',
  'Iso',
  'Clove',
  'Vyse',
  'Tejo',
  'Veto',
]

// Weapons
const sidearms = ['Classic', 'Shorty', 'Frenzy', 'Ghost', 'Sheriff', 'Bandit']
const primaries = [
  'Stinger',
  'Spectre', // SMGs
  'Bucky',
  'Judge', // Shotguns
  'Bulldog',
  'Guardian',
  'Phantom',
  'Vandal', // Rifles
  'Marshal',
  'Outlaw',
  'Operator', // Snipers
  'Ares',
  'Odin', // Heavy
]
const melee = 'Knife'

// Custom Crosshairs Array - Add your custom crosshair codes here
// 20% chance (1 in 5) that one of these will be used instead of random generation
const customCrosshairs = ref<string[]>([
  // Example 1: Small dot with inner lines (Green)
  '0;P;h;0;f;0;0l;4;0o;0;0a;1;0f;0;1b;0',
  '0;P;c;6;t;6;o;0.3;f;0;0t;1;0l;5;0o;5;0a;1;0f;0;1t;10;1l;4;1o;5;1a;0.5;1m;0;1f;0',
  '0;P;t;2;o;1;d;1;0t;10;0l;19;0v;0;0g;1;0o;1;0a;0;0e;0;1l;10;1v;0;1g;1;1o;19;1a;0;1s;0;1e;0',
  '0;c;1;s;1;P;c;8;u;008000FF;t;3;o;1;b;1;0t;4;0l;0;0v;18;0g;1;0o;10;0a;1;0f;0;1t;10;1l;0;1v;4;1g;1;1o;7;1a;1;1m;0;1f;0',
  '0;P;c;8;b;1;t;1;o;0;z;2;a;1;0t;2;0l;6;0v;6;0o;3;0a;0.8;0s;1;0e;1;1t;2;1l;2;1v;2;1o;10;1a;0.35;1s;1;1e;1;u;FFFFFF;d;0;h;0;0g;0;1g;0;0f;1;1f;1;0m;0;1m;1;0b;0;1b;0;m;0',
  '0;P;c;8;b;1;t;1;o;1;z;2;a;1;0t;4;0l;20;0v;0;0o;0;0a;1;0s;1;0e;1;1t;10;1l;10;1v;0;1o;40;1a;1;1s;1;1e;1;u;000000;d;0;h;0;0g;1;1g;1;0f;0;1f;1;0m;0;1m;1;0b;1;1b;1;m;0',
  '0;P;c;8;b;1;t;1;o;0.5;z;2;a;1;0t;8;0l;2;0v;2;0o;20;0a;1;0s;1;0e;1;1t;2;1l;8;1v;8;1o;17;1a;1;1s;1;1e;1;u;BBFF00;d;0;h;0;0g;0;1g;0;0f;0;1f;0;0m;0;1m;0;0b;1;1b;1;m;1;1;NaN;f;0',
  '0;P;c;8;b;1;t;1;o;1;z;2;a;1;0t;2;0l;6;0v;6;0o;3;0a;0.8;0s;1;0e;1;1t;2;1l;2;1v;2;1o;10;1a;0.35;1s;1;1e;1;u;FFFFFF;d;1;h;1;0g;0;1g;0;0f;1;1f;1;0m;0;1m;1;0b;0;1b;0;m;0',
  '0;P;c;6;o;0.35;0t;10;0l;20;0a;0;0f;0;1l;1;1o;23;1a;1;1m;0;1f;0',
  '0;P;c;8;b;1;t;4;o;1;z;5;a;0.556;0t;10;0l;20;0v;0;0o;13;0a;1;0s;1;0e;1;1t;1;1l;1;1v;0;1o;14;1a;1;1s;0.064;1e;0.375;u;FFFFFF;d;1;h;1;0g;1;1g;1;0f;0;1f;1;0m;0;1m;1;0b;1;1b;1;m;0;1;NaN',
  '0;P;c;8;b;1;t;1;o;1;z;1;a;1;0t;1;0l;1;0v;1;0o;0;0a;1;0s;1;0e;1;1t;2;1l;2;1v;2;1o;10;1a;0.35;1s;1;1e;1;u;FFFFFFFF;d;1;h;1;0g;0;1g;0;0f;0;1f;0;0m;0;1m;0;0b;0;1b;0;m;0',
  '0;P;c;8;b;1;t;6;o;0.5;z;6;a;1;0t;1;0l;0;0v;20;0o;0;0a;1;0s;1;0e;0.1;1t;4;1l;0;1v;3;1o;32;1a;1;1s;1.6;1e;1;u;061843FF;d;1;h;1;0g;1;1g;1;0f;1;1f;1;0m;0;1m;1;0b;1;1b;1;m;0',
  '0;P;u;FC5A8DFF;h;0;d;1;z;3;f;0;m;1;0t;10;0l;0;0v;3;0g;1;0o;1;0a;1;0f;0;1t;9;1v;0;1g;1;1o;3;1a;1;1m;0;1f;0',
  '0;P;c;8;u;D48787FF;h;0;d;1;b;1;z;6;0t;10;0v;0;0g;1;0o;2;0a;1;0f;0;1t;6;1v;10;1g;1;1o;8;1a;1;1m;0;1f;0',
  '0;P;c;7;h;0;f;0;0t;3;0l;1;0v;1;0g;1;0o;1;0a;1;0f;0;1t;0;1l;0;1o;0;1a;0;1f;0',
  '0;P;c;5;h;0;0l;4;0o;2;0a;1;0f;0;1b;0',
  '0;P;c;7;o;1;d;1;f;0;0b;0;1b;0',
  '0;P;o;1;f;0;0t;4;0l;1;0o;5;0a;0;0f;0;1l;4;1o;3;1a;0;1m;0;1f;0'
  

  // Add your custom crosshairs below this line!
  // To get a crosshair code: Go to Valorant > Settings > Crosshair > Copy the code
])

// Settings
const selectedAgents = ref<string[]>([])
const weaponType = ref<'both' | 'sidearms' | 'primaries'>('both')
const crosshairEnabled = ref(false)
const crosshairChangeInterval = ref(3)

// Game State
const gameStarted = ref(false)
const currentAgent = ref('')
const currentRound = ref(1)
const currentWeapon = ref('')
const currentCrosshair = ref<any>(null)
const currentCrosshairCode = ref('')
const previewCrosshair = ref<any>({
  color: '#FFFFFF',
  outlineOpacity: 1,
  centerDot: true,
  centerDotOpacity: 1,
  centerDotSize: 4,
  innerLines: {
    show: true,
    opacity: 1,
    length: 20,
    thickness: 3,
    offset: 6,
  },
  outerLines: {
    show: true,
    opacity: 1,
    length: 20,
    thickness: 3,
    offset: 16,
  },
})
const previewCrosshairCode = ref('')
const isSpinning = ref(false)
const rouletteWeapons = ref<string[]>([])
const rouletteOffset = ref(0)
const rouletteContainer = ref<HTMLElement | null>(null)
const rouletteItems = ref<HTMLElement | null>(null)
const rouletteItem = ref<HTMLElement[]>([])

// Computed
const shouldShowCrosshair = computed(() => {
  return crosshairEnabled.value && (currentRound.value - 1) % crosshairChangeInterval.value === 0
})

const rouletteStyle = computed(() => {
  return {
    transform: `translateX(-${rouletteOffset.value}px)`,
    transition: isSpinning.value ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
  }
})

// LocalStorage Key
const STORAGE_KEY = 'valorant_roulette_settings'

// Load Settings
const loadSettings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const settings = JSON.parse(stored)
      selectedAgents.value = settings.selectedAgents || []
      weaponType.value = settings.weaponType || 'both'
      crosshairEnabled.value = settings.crosshairEnabled || false
      crosshairChangeInterval.value = settings.crosshairChangeInterval || 3
    }
  } catch (e) {
    console.error('Failed to load settings:', e)
  }
}

// Save Settings
const saveSettings = () => {
  try {
    const settings = {
      selectedAgents: selectedAgents.value,
      weaponType: weaponType.value,
      crosshairEnabled: crosshairEnabled.value,
      crosshairChangeInterval: crosshairChangeInterval.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.error('Failed to save settings:', e)
  }
}

// Agent Selection
const toggleAgent = (agent: string) => {
  const index = selectedAgents.value.indexOf(agent)
  if (index > -1) {
    selectedAgents.value.splice(index, 1)
  } else {
    selectedAgents.value.push(agent)
  }
  saveSettings()
}

const selectAllAgents = () => {
  selectedAgents.value = [...agents]
  saveSettings()
}

const deselectAllAgents = () => {
  selectedAgents.value = []
  saveSettings()
}

// Random Selection
const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

// Valorant Crosshair Code Generation
const generateValorantCrosshairCode = (forceRandom: boolean = false): string => {
  // 1 in 5 chance (20%) to use a custom crosshair
  if (!forceRandom && customCrosshairs.value.length > 0 && Math.random() < 0.33) {
    return getRandomItem(customCrosshairs.value)
  }

  // Generate random crosshair
  // Valorant crosshair format breakdown:
  // 0;P - version and profile type
  // c;1 - color (0=white, 1=green, 2=yellow-green, 3=yellow, 4=cyan, 5=pink, 6=red, 7=custom)
  // t;# - crosshair type (0-5)
  // o;# - outline opacity (0-1)
  // d;# - center dot (0 or 1)
  // z;# - center dot thickness (1-5)
  // a;# - center dot opacity (0-1)
  // 0t;# - inner line thickness (0-10)
  // 0l;# - inner line length (0-20)
  // 0a;# - inner line opacity (0-1)
  // 0o;# - inner line offset (0-20)
  // 0m;# - movement error (0 or 1)
  // 0s;# - firing error (0-5)
  // 0e;# - fixed error (0-5)
  // 1t;# - outer line thickness (0-10)
  // 1l;# - outer line length (0-20)
  // 1a;# - outer line opacity (0-1)
  // 1o;# - outer line offset (0-20)
  // 1m;# - movement error (0 or 1)
  // 1s;# - firing error multiplier (0-5)
  // 1e;# - fixed error (0-5)

  const color = Math.floor(Math.random() * 7) // 0-6
  const type = Math.floor(Math.random() * 6) // 0-5
  const outlineOpacity = (Math.random() * 0.5 + 0.3).toFixed(2) // 0.3-0.8
  const centerDot = Math.random() > 0.5 ? 1 : 0
  const centerDotThickness = Math.floor(Math.random() * 4) + 1 // 1-4
  const centerDotOpacity = (Math.random() * 0.5 + 0.5).toFixed(2) // 0.5-1

  // Inner lines
  const innerThickness = Math.floor(Math.random() * 8) + 1 // 1-8
  const innerLength = Math.floor(Math.random() * 15) + 3 // 3-17
  const innerOpacity = (Math.random() * 0.4 + 0.4).toFixed(2) // 0.4-0.8
  const innerOffset = Math.floor(Math.random() * 8) // 0-7
  const innerMovementError = Math.random() > 0.5 ? 1 : 0
  const innerFiringError = (Math.random() * 2).toFixed(2) // 0-2
  const innerFixedError = (Math.random() * 2).toFixed(2) // 0-2

  // Outer lines
  const outerThickness = Math.floor(Math.random() * 6) + 1 // 1-6
  const outerLength = Math.floor(Math.random() * 15) + 3 // 3-17
  const outerOpacity = (Math.random() * 0.4 + 0.3).toFixed(2) // 0.3-0.7
  const outerOffset = Math.floor(Math.random() * 12) + 6 // 6-17
  const outerMovementError = Math.random() > 0.5 ? 1 : 0
  const outerFiringError = (Math.random() * 3).toFixed(2) // 0-3
  const outerFixedError = (Math.random() * 2.5).toFixed(2) // 0-2.5

  return `0;P;c;${color};t;${type};o;${outlineOpacity};d;${centerDot};z;${centerDotThickness};a;${centerDotOpacity};0t;${innerThickness};0l;${innerLength};0a;${innerOpacity};0o;${innerOffset};0m;${innerMovementError};0s;${innerFiringError};0e;${innerFixedError};1t;${outerThickness};1l;${outerLength};1a;${outerOpacity};1o;${outerOffset};1m;${outerMovementError};1s;${outerFiringError};1e;${outerFixedError}`
}

// Parse Valorant crosshair code to visual representation with accurate scaling
const parseCrosshairCode = (code: string): any => {
  const parts = code.split(';')
  const params: any = {}

  for (let i = 0; i < parts.length; i += 2) {
    if (i + 1 < parts.length) {
      params[parts[i]] = parseFloat(parts[i + 1])
    }
  }

  const colors = ['#FFFFFF', '#00FF00', '#7FFF00', '#FFFF00', '#00FFFF', '#FF00FF', '#FF4655']

  // More accurate scaling to match Valorant's crosshair system
  // Based on Valorant's actual pixel scaling
  const pixelScale = 2.5 // Base scaling factor for better visibility

  return {
    color: colors[params['c'] || 0] || '#FFFFFF',
    outlineOpacity: params['o'] || 0.5,
    centerDot: params['d'] === 1,
    centerDotOpacity: params['a'] || 1,
    centerDotSize: (params['z'] || 1) * pixelScale, // Accurate center dot size
    innerLines: {
      show: (params['0l'] || 0) > 0,
      opacity: params['0a'] || 1,
      length: (params['0l'] || 10) * pixelScale, // Accurate length
      thickness: (params['0t'] || 2) * pixelScale, // Accurate thickness
      offset: (params['0o'] || 3) * pixelScale, // Accurate offset
    },
    outerLines: {
      show: (params['1l'] || 0) > 0,
      opacity: params['1a'] || 1,
      length: (params['1l'] || 10) * pixelScale, // Accurate length
      thickness: (params['1t'] || 2) * pixelScale, // Accurate thickness
      offset: (params['1o'] || 8) * pixelScale, // Accurate offset
    },
  }
}

// Crosshair Generation
const generateRandomCrosshair = () => {
  const code = generateValorantCrosshairCode()
  previewCrosshairCode.value = code
  previewCrosshair.value = parseCrosshairCode(code)
}

// Copy to clipboard
const copyToClipboard = (event: any) => {
  const text = event.target.value
  navigator.clipboard.writeText(text).then(() => {
    alert('Crosshair code copied! Paste it in Valorant settings.')
  })
}

// Get round phase (Attacking/Defending/Overtime)
const getRoundPhase = (): string => {
  if (currentRound.value <= 12) {
    return 'Attacking'
  } else if (currentRound.value <= 24) {
    return 'Defending (Side Switch)'
  } else {
    return 'Overtime'
  }
}

// Weapon Emoji
const getWeaponEmoji = (weapon: string): string => {
  if (weapon === 'Knife') return '🔪'
  if (sidearms.includes(weapon)) return '🔫'
  if (['Bucky', 'Judge'].includes(weapon)) return '💥'
  if (['Marshal', 'Outlaw', 'Operator'].includes(weapon)) return '🎯'
  if (['Ares', 'Odin'].includes(weapon)) return '⚡'
  return '🔫'
}

// Weapon Category
const getWeaponCategory = (weapon: string): string => {
  if (weapon === 'Knife') return 'Melee'
  if (sidearms.includes(weapon)) return 'Sidearm'
  if (['Stinger', 'Spectre'].includes(weapon)) return 'SMG'
  if (['Bucky', 'Judge'].includes(weapon)) return 'Shotgun'
  if (['Bulldog', 'Guardian', 'Phantom', 'Vandal'].includes(weapon)) return 'Rifle'
  if (['Marshal', 'Outlaw', 'Operator'].includes(weapon)) return 'Sniper'
  if (['Ares', 'Odin'].includes(weapon)) return 'Heavy'
  return ''
}

// Get weapons for current round with 12/24 round logic
const getWeaponsForRound = (round: number): string[] => {
  if (weaponType.value === 'sidearms') {
    return [...sidearms, melee]
  } else if (weaponType.value === 'primaries') {
    return [...primaries, melee]
  } else {
    // both: special logic for rounds
    // Round 1-2: ONLY sidearms
    // Round 3-12: ALL weapons (primaries + sidearms)
    // Round 13-14: ONLY sidearms (side switch)
    // Round 15-24: ALL weapons (primaries + sidearms)
    // Round 25+: ALL weapons (overtime)

    const roundInHalf = ((round - 1) % 12) + 1

    if (round <= 12) {
      // First half
      if (roundInHalf <= 2) {
        return [...sidearms, melee]
      } else {
        return [...primaries, ...sidearms, melee]
      }
    } else if (round <= 24) {
      // Second half (side switch at round 13)
      if (roundInHalf <= 2) {
        return [...sidearms, melee]
      } else {
        return [...primaries, ...sidearms, melee]
      }
    } else {
      // Overtime (round 25+): all weapons
      return [...primaries, ...sidearms, melee]
    }
  }
}

// Roulette Animation - FIXED VERSION
const spinRoulette = (): Promise<string> => {
  return new Promise((resolve) => {
    isSpinning.value = true

    const availableWeapons = getWeaponsForRound(currentRound.value)
    const finalWeapon = getRandomItem(availableWeapons)

    // Create roulette array with many items for smooth spinning effect
    const allWeapons: any[] = []
    const finalPosition = 45 // Position of the final weapon in the array

    // Fill array with random weapons
    for (let i = 0; i < finalPosition; i++) {
      allWeapons.push(getRandomItem(availableWeapons))
    }

    // Place the final weapon at the designated position
    allWeapons[finalPosition] = finalWeapon

    // Add more weapons after the final weapon so it doesn't look like it ends
    for (let i = 0; i < 15; i++) {
      allWeapons.push(getRandomItem(availableWeapons))
    }

    rouletteWeapons.value = allWeapons

    // Reset position
    rouletteOffset.value = 0

    // Calculate final position to center the final weapon
    setTimeout(() => {
      // Measure actual DOM element dimensions
      if (!rouletteContainer.value || !rouletteItem.value || rouletteItem.value.length === 0) {
        console.error('Roulette elements not found')
        return
      }

      const firstItem = rouletteItem.value[0]
      const itemRect = firstItem.getBoundingClientRect()
      const containerRect = rouletteContainer.value.getBoundingClientRect()

      // Get computed style to read gap
      const itemsElement = rouletteItems.value
      const computedStyle = itemsElement ? window.getComputedStyle(itemsElement) : null
      const gap = computedStyle ? parseFloat(computedStyle.gap) || 20 : 20

      const itemWidth = itemRect.width
      const containerWidth = containerRect.width

      // The center of item at position N is at: N * (itemWidth + gap) + itemWidth/2
      // We want this center to align with containerWidth/2 (where the pointer is)
      // So offset = center of item - center of container
      const itemCenter = finalPosition * (itemWidth + gap) + itemWidth / 2
      const containerCenter = containerWidth / 2
      const targetOffset = itemCenter - containerCenter

      console.log('Roulette Debug:', {
        finalPosition,
        finalWeapon,
        itemWidth,
        gap,
        containerWidth,
        itemCenter,
        containerCenter,
        targetOffset,
        weaponAtPosition: allWeapons[finalPosition],
      })

      rouletteOffset.value = targetOffset
    }, 100)

    // End animation
    setTimeout(() => {
      isSpinning.value = false
      currentWeapon.value = finalWeapon
      resolve(finalWeapon)
    }, 3100)
  })
}

// Game Flow
const startGame = () => {
  if (selectedAgents.value.length === 0) return

  currentAgent.value = getRandomItem(selectedAgents.value)
  currentRound.value = 1
  gameStarted.value = true

  // Generate initial crosshair if enabled
  if (crosshairEnabled.value) {
    const code = generateValorantCrosshairCode()
    currentCrosshairCode.value = code
    currentCrosshair.value = parseCrosshairCode(code)
  }

  // Spin for first weapon
  spinRoulette()
}

const nextRound = () => {
  currentRound.value++

  // Check if we need new crosshair
  if (crosshairEnabled.value && shouldShowCrosshair.value) {
    const code = generateValorantCrosshairCode()
    currentCrosshairCode.value = code
    currentCrosshair.value = parseCrosshairCode(code)
  }

  // Spin for next weapon
  spinRoulette()
}

const resetGame = () => {
  gameStarted.value = false
  currentRound.value = 1
  currentWeapon.value = ''
  currentAgent.value = ''
  isSpinning.value = false
}

// Initialize
onMounted(() => {
  loadSettings()
  generateRandomCrosshair()
})
</script>

<script lang="ts">
import { defineComponent, h } from 'vue'

// Crosshair Preview Component
const CrosshairPreview = defineComponent({
  name: 'CrosshairPreview',
  props: {
    crosshair: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const ch = props.crosshair
      if (!ch) return null

      const containerStyle = {
        width: '300px',
        height: '300px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        position: 'relative',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
      }

      const crosshairContainerStyle = {
        position: 'relative',
        width: '200px',
        height: '200px',
      }

      const elements = []

      // Center Dot
      if (ch.centerDot) {
        const outlineWidth = ch.outlineOpacity > 0 ? 1 : 0
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: ch.centerDotSize + 'px',
              height: ch.centerDotSize + 'px',
              borderRadius: '50%',
              backgroundColor: ch.color,
              opacity: ch.centerDotOpacity,
              boxShadow:
                ch.outlineOpacity > 0
                  ? `0 0 0 ${outlineWidth}px rgba(0, 0, 0, ${ch.outlineOpacity})`
                  : 'none',
              zIndex: 10,
            },
          }),
        )
      }

      // Inner Lines
      if (ch.innerLines && ch.innerLines.show) {
        const outlineWidth = ch.outlineOpacity > 0 ? 1 : 0
        const innerOutline =
          ch.outlineOpacity > 0
            ? `0 0 0 ${outlineWidth}px rgba(0, 0, 0, ${ch.outlineOpacity})`
            : 'none'

        // Top
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: `calc(50% - ${ch.innerLines.offset + ch.innerLines.length}px)`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${ch.innerLines.thickness}px`,
              height: `${ch.innerLines.length}px`,
              backgroundColor: ch.color,
              opacity: ch.innerLines.opacity,
              boxShadow: innerOutline,
              zIndex: 5,
            },
          }),
        )

        // Bottom
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: `calc(50% + ${ch.innerLines.offset}px)`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${ch.innerLines.thickness}px`,
              height: `${ch.innerLines.length}px`,
              backgroundColor: ch.color,
              opacity: ch.innerLines.opacity,
              boxShadow: innerOutline,
              zIndex: 5,
            },
          }),
        )

        // Left
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: '50%',
              left: `calc(50% - ${ch.innerLines.offset + ch.innerLines.length}px)`,
              transform: 'translateY(-50%)',
              width: `${ch.innerLines.length}px`,
              height: `${ch.innerLines.thickness}px`,
              backgroundColor: ch.color,
              opacity: ch.innerLines.opacity,
              boxShadow: innerOutline,
              zIndex: 5,
            },
          }),
        )

        // Right
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: '50%',
              left: `calc(50% + ${ch.innerLines.offset}px)`,
              transform: 'translateY(-50%)',
              width: `${ch.innerLines.length}px`,
              height: `${ch.innerLines.thickness}px`,
              backgroundColor: ch.color,
              opacity: ch.innerLines.opacity,
              boxShadow: innerOutline,
              zIndex: 5,
            },
          }),
        )
      }

      // Outer Lines
      if (ch.outerLines && ch.outerLines.show) {
        const outlineWidth = ch.outlineOpacity > 0 ? 1 : 0
        const outerOutline =
          ch.outlineOpacity > 0
            ? `0 0 0 ${outlineWidth}px rgba(0, 0, 0, ${ch.outlineOpacity})`
            : 'none'

        // Top
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: `calc(50% - ${ch.outerLines.offset + ch.outerLines.length}px)`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${ch.outerLines.thickness}px`,
              height: `${ch.outerLines.length}px`,
              backgroundColor: ch.color,
              opacity: ch.outerLines.opacity,
              boxShadow: outerOutline,
              zIndex: 4,
            },
          }),
        )

        // Bottom
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: `calc(50% + ${ch.outerLines.offset}px)`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${ch.outerLines.thickness}px`,
              height: `${ch.outerLines.length}px`,
              backgroundColor: ch.color,
              opacity: ch.outerLines.opacity,
              boxShadow: outerOutline,
              zIndex: 4,
            },
          }),
        )

        // Left
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: '50%',
              left: `calc(50% - ${ch.outerLines.offset + ch.outerLines.length}px)`,
              transform: 'translateY(-50%)',
              width: `${ch.outerLines.length}px`,
              height: `${ch.outerLines.thickness}px`,
              backgroundColor: ch.color,
              opacity: ch.outerLines.opacity,
              boxShadow: outerOutline,
              zIndex: 4,
            },
          }),
        )

        // Right
        elements.push(
          h('div', {
            style: {
              position: 'absolute',
              top: '50%',
              left: `calc(50% + ${ch.outerLines.offset}px)`,
              transform: 'translateY(-50%)',
              width: `${ch.outerLines.length}px`,
              height: `${ch.outerLines.thickness}px`,
              backgroundColor: ch.color,
              opacity: ch.outerLines.opacity,
              boxShadow: outerOutline,
              zIndex: 4,
            },
          }),
        )
      }

      // Center reference dot
      elements.push(
        h('div', {
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '2px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            zIndex: 1,
          },
        }),
      )

      return h('div', { class: 'crosshair-preview', style: containerStyle }, [
        h('div', { style: crosshairContainerStyle }, elements),
        h(
          'div',
          {
            style: {
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'monospace',
            },
          },
          'Preview',
        ),
      ])
    }
  },
})

export default defineComponent({
  name: 'ValorantPage',
  components: {
    CrosshairPreview,
  },
})
</script>

<style scoped>
.grid-pattern-dark {
  width: 100%;
  height: 100%;
  background-color: #000000;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: 0 0;
}

.glass-surface {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.agent-card {
  transition: all 0.3s ease;
}

.agent-card:hover {
  transform: translateY(-4px);
}

/* Roulette Animation */
.weapon-roulette {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 40px 0;
}

.roulette-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.roulette-items {
  display: flex;
  gap: 20px;
  transition: transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99);
}

.roulette-item {
  min-width: 130px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;
}

.roulette-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 120%;
  background: linear-gradient(to bottom, transparent, #ff4655, transparent);
  pointer-events: none;
  z-index: 10;
}

.roulette-pointer::before,
.roulette-pointer::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
}

.roulette-pointer::before {
  top: -10px;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #ff4655 transparent;
}

.roulette-pointer::after {
  bottom: -10px;
  border-width: 10px 10px 0 10px;
  border-color: #ff4655 transparent transparent transparent;
}
</style>
