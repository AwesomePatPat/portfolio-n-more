<!-- LanguagesSection.vue -->
<template>
  <section
    :id="id"
    class="py-20 relative"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <!-- Entfernen des vollständigen Hintergrunds, nur lokale Akzente -->
    <div class="absolute inset-0 z-0">
      <!-- Lokale Farbakzente die sich mit dem globalen Hintergrund vermischen -->
      <div class="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-emerald-100/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-blue-100/20 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Überschrift im hellen Design -->
      <div class="flex flex-col items-center mb-16">
        <div class="inline-block px-4 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium text-emerald-600 mb-4 hover-glow">
          Meine Fähigkeiten
        </div>
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-2">Sprach<span class="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">kenntnisse</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mt-4"></div>
      </div>

      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(language, index) in languages"
          :key="language.name"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 150 } }"
          class="relative group language-card"
        >
          <!-- Karten mit verbesserten Hover-Effekten -->
          <div class="h-full bg-white border border-gray-200 p-6 rounded-xl shadow-md relative z-10 language-card-inner">
            <div class="text-center">
              <!-- Icon mit verbesserter Animation -->
              <div class="rounded-full bg-gray-50 w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-gray-200 overflow-hidden language-icon-container">
                <svg class="w-8 h-8 text-emerald-600 language-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                </svg>
                <!-- Hintergrund-Glow-Effekt beim Hover -->
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-100 to-blue-100 opacity-0 transform scale-0 icon-glow"></div>
              </div>

              <!-- Sprach-Titel mit Animation -->
              <h3 class="text-xl font-semibold mb-2 text-gray-800 relative inline-block language-title">
                {{ language.name }}
                <!-- Animierter Unterstrich -->
                <div class="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-500 title-underline"></div>
              </h3>

              <p class="text-gray-600 mb-3">{{ language.level }}</p>

              <!-- Verbessertes visuelles Element für Sprachniveau mit Animation -->
              <div class="mt-4 flex justify-center">
                <div v-if="language.level === 'Muttersprache'" class="flex">
                  <div
                    v-for="i in 5"
                    :key="i"
                    class="w-2 h-8 mx-1 rounded-full bg-emerald-500 level-bar"
                    :style="{ 'transition-delay': `${i * 50}ms` }"
                  ></div>
                </div>
                <div v-else-if="language.level.includes('Fliessend')" class="flex">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="w-2 h-8 mx-1 rounded-full bg-emerald-500 level-bar"
                    :style="{ 'transition-delay': `${i * 50}ms` }"
                  ></div>
                  <div class="w-2 h-8 mx-1 rounded-full bg-gray-200 level-bar-inactive"></div>
                </div>
                <div v-else class="flex">
                  <div
                    v-for="i in 2"
                    :key="i"
                    class="w-2 h-8 mx-1 rounded-full bg-emerald-500 level-bar"
                    :style="{ 'transition-delay': `${i * 50}ms` }"
                  ></div>
                  <div
                    v-for="i in 3"
                    :key="i + 2"
                    class="w-2 h-8 mx-1 rounded-full bg-gray-200 level-bar-inactive"
                    :style="{ 'transition-delay': `${(i + 2) * 50}ms` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hintergrundeffekt -->
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-blue-100/30 rounded-xl translate-x-2 translate-y-2 card-background"></div>
        </div>
      </div>
      <!-- Dezente Dekorationselemente -->
      <div class="hidden lg:block absolute top-20 left-10 w-20 h-20 float-slow">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-gray-200 rounded-md rotate-45"></div>
          <div class="absolute inset-0 border border-gray-200 rounded-md rotate-[30deg]"></div>
        </div>
      </div>

      <div class="hidden lg:block absolute bottom-20 right-10 w-16 h-16 float-fast">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-gray-200 rounded-full"></div>
          <div class="absolute inset-0 scale-75 border border-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Language } from '../types'

export default defineComponent({
  name: 'LanguagesSection',
  props: {
    id: {
      type: String,
      required: true
    },
    languages: {
      type: Array as PropType<Language[]>,
      required: true
    }
  }
})
</script>

<style scoped>
/* Hover-Glow Effekt für den Skills-Button */
.hover-glow:hover {
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
}

/* Sprach-Karten Hover-Effekte */
.language-card-inner {
  transition: all 500ms;
}

.language-card:hover .language-card-inner {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

/* Icon Container Hover-Effekte */
.language-icon-container {
  transition: all 500ms;
}

.language-card:hover .language-icon-container {
  background-color: rgba(16, 185, 129, 0.1);
  transform: scale(1.1);
}

/* Icon Dreheffekt */
.language-icon {
  transform: rotate(0);
  transition: transform 500ms;
}

.language-card:hover .language-icon {
  transform: rotate(12deg);
}

/* Icon Glow Hintergrund-Effekt */
.icon-glow {
  transition: all 500ms;
}

.language-card:hover .icon-glow {
  opacity: 1;
  transform: scale(1);
}

/* Titel-Unterstrich Animation */
.title-underline {
  transition: width 500ms;
}

.language-card:hover .title-underline {
  width: 100%;
}

/* Level-Bars Animation */
.level-bar {
  transition: height 300ms;
}

.language-card:hover .level-bar {
  height: 40px;
}

.level-bar-inactive {
  transition: background-color 300ms;
}

.language-card:hover .level-bar-inactive {
  background-color: rgb(209, 213, 219);
}

/* Karten-Hintergrund-Effekt */
.card-background {
  transition: all 500ms;
}

.language-card:hover .card-background {
  transform: translate(12px, 12px);
}
</style>
