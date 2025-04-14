<!-- ProjectsSection.vue -->
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
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-indigo-600/10 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-emerald-500/10 to-transparent"></div>

      <!-- Colored light spots for modern aura -->
      <div class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-500/20 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Header with modern styling -->
      <div class="flex flex-col items-center mb-16">
        <div class="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-emerald-400 mb-4">
          Meine Arbeit
        </div>
        <h2 class="text-4xl font-bold text-white text-center mb-2">Portfolio <span class="bg-gradient-to-r from-emerald-400 to-indigo-500 bg-clip-text text-transparent">Projekte</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          class="group"
        >
          <div class="relative rounded-xl backdrop-blur-md bg-neutral-900/30 border border-neutral-800 overflow-hidden shadow-xl transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:shadow-emerald-500/20">
            <div class="p-6">
              <div class="rounded-full bg-gradient-to-br from-emerald-500/20 to-indigo-600/20 w-12 h-12 flex items-center justify-center mb-4 border border-neutral-700">
                <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(project.icon)"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-2 text-white">{{ project.title }}</h3>
              <p class="text-neutral-400 mb-4">{{ project.description }}</p>
              <a href="#" class="group inline-flex items-center text-emerald-400 font-medium hover:text-emerald-300 transition-colors duration-300">
                <span class="mr-2">Mehr erfahren</span>
                <svg class="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
          <!-- Decorative background element -->
          <div class="absolute inset-0 -z-10 rounded-xl bg-emerald-500/10 translate-x-2 translate-y-2 transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3"></div>
        </div>
      </div>

      <!-- Floating decorative elements -->
      <div class="hidden lg:block absolute top-40 left-10 w-16 h-16 float-slow">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-neutral-800 rounded-full"></div>
          <div class="absolute inset-0 border border-neutral-800 rounded-full scale-75"></div>
        </div>
      </div>

      <div class="hidden lg:block absolute bottom-40 right-10 w-20 h-20 float-fast">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-45"></div>
          <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-[30deg]"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Project } from '../types'

export default defineComponent({
  name: 'ProjectsSection',
  props: {
    id: {
      type: String,
      required: true
    },
    projects: {
      type: Array as PropType<Project[]>,
      required: true
    }
  },
  setup() {
    const getIconPath = (icon: string): string => {
      switch (icon) {
        case 'shopping-cart':
          return 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
        case 'clipboard-list':
          return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
        case 'user':
          return 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        default:
          return 'M12 6v6m0 0v6m0-6h6m-6 0H6'
      }
    }

    return {
      getIconPath
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
