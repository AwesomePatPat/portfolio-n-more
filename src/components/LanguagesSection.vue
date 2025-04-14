<!-- LanguagesSection.vue -->
<template>
  <section
    :id="id"
    class="py-20 relative overflow-hidden"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <!-- Modern background with gradient effects -->
    <div class="absolute inset-0 bg-neutral-950">
      <!-- Modern grid pattern in background -->
      <div class="absolute inset-0 opacity-10">
        <div class="grid-pattern"></div>
      </div>

      <!-- Subtle color gradients for soft ambiance -->
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-indigo-600/10 to-transparent"></div>

      <!-- Colored light spots for modern aura -->
      <div class="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-emerald-500/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Header with modern styling -->
      <div class="flex flex-col items-center mb-16">
        <div class="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-emerald-400 mb-4">
          Meine Fähigkeiten
        </div>
        <h2 class="text-4xl font-bold text-white text-center mb-2">Sprach<span class="bg-gradient-to-r from-emerald-400 to-indigo-500 bg-clip-text text-transparent">kenntnisse</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mt-4"></div>
      </div>

      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(language, index) in languages"
          :key="language.name"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          class="relative group rounded-xl overflow-hidden"
        >
          <div class="backdrop-blur-md bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl shadow-xl transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
            <div class="text-center">
              <div class="rounded-full bg-gradient-to-br from-emerald-500/20 to-indigo-600/20 w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-neutral-700">
                <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-white">{{ language.name }}</h3>
              <p class="text-neutral-400">{{ language.level }}</p>
            </div>
          </div>
          <!-- Decorative background elements -->
          <div class="absolute inset-0 -z-10 rounded-xl bg-emerald-500/10 translate-x-2 translate-y-2 transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3"></div>
        </div>
      </div>

      <!-- Floating elements with minimal modern design -->
      <div class="hidden lg:block absolute top-20 left-10 w-20 h-20">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-45"></div>
          <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-[30deg]"></div>
        </div>
      </div>

      <div class="hidden lg:block absolute bottom-20 right-10 w-16 h-16">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-neutral-800 rounded-full"></div>
          <div class="absolute inset-0 scale-75 border border-neutral-800 rounded-full"></div>
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
/* Grid-Pattern for modern tech look */
.grid-pattern {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  width: 100%;
  height: 100%;
}

/* Subtle keyframe animations for floating elements */
@keyframes floatSlow {
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-15px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0); }
}

@keyframes floatFast {
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-8px) rotate(-2deg); }
  100% { transform: translateY(0) rotate(0); }
}

.float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}

.float-fast {
  animation: floatFast 5s ease-in-out infinite;
}
</style>
