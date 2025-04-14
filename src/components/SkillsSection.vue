<!-- SkillsSection.vue -->
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
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
      <div class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-indigo-600/10 to-transparent"></div>

      <!-- Colored light spots for modern aura -->
      <div class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-500/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Header with modern styling -->
      <div class="flex flex-col items-center mb-16">
        <div class="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-emerald-400 mb-4">
          Technisches Profil
        </div>
        <h2 class="text-4xl font-bold text-white text-center mb-2">Meine <span class="bg-gradient-to-r from-emerald-400 to-indigo-500 bg-clip-text text-transparent">Fähigkeiten</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mt-4"></div>
      </div>

      <div class="max-w-3xl mx-auto backdrop-blur-md bg-neutral-900/30 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl p-8">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
          class="mb-8 group"
        >
          <div class="flex justify-between mb-2">
            <span class="text-white font-medium">{{ skill.name }}</span>
            <span class="text-emerald-400">{{ skill.level }}%</span>
          </div>
          <div class="h-3 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-indigo-600 group-hover:from-indigo-600 group-hover:to-emerald-500 transition-all duration-500"
              :style="{ width: `${skill.level}%` }"
              v-motion
              :initial="{ width: '0%' }"
              :visible="{ width: `${skill.level}%`, transition: { duration: 1000, delay: index * 100 } }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Floating elements with minimal modern design -->
      <div class="hidden lg:block absolute top-40 right-20 w-16 h-16 float-slow">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-45"></div>
          <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-[30deg]"></div>
        </div>
      </div>

      <div class="hidden lg:block absolute bottom-40 left-20 w-24 h-24 float-fast">
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
import type { Skill } from '../types'

export default defineComponent({
  name: 'SkillsSection',
  props: {
    id: {
      type: String,
      required: true
    },
    skills: {
      type: Array as PropType<Skill[]>,
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
