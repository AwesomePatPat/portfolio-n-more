<!-- SkillsSection.vue -->
<template>
  <section
    :id="id"
    class="py-20 relative overflow-hidden"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <!-- Heller Hintergrund -->
    <div class="absolute inset-0 bg-white">
      <!-- Subtiles Grid-Pattern im Hintergrund -->
      <div class="absolute inset-0 opacity-5">
        <div class="grid-pattern"></div>
      </div>

      <!-- Subtile Farbverläufe -->
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50 to-transparent"></div>
      <div class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-blue-50 to-transparent"></div>

      <!-- Dezente Akzente -->
      <div class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-100/30 filter blur-3xl"></div>
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100/30 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Überschrift im hellen Design -->
      <div class="flex flex-col items-center mb-16">
        <div class="inline-block px-4 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium text-emerald-600 mb-4">
          Technisches Profil
        </div>
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-2">Meine <span class="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Fähigkeiten</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mt-4"></div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md p-6 group hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex items-center justify-center mb-4">
            <!-- Skill icon -->
            <div class="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 mb-2 group-hover:bg-emerald-50 transition-colors duration-300">
              <div class="text-emerald-600 text-xl group-hover:scale-110 transition-transform duration-300">
                {{ getSkillIcon(skill.name) }}
              </div>
            </div>
          </div>

          <h3 class="text-gray-800 font-medium text-center text-lg">{{ skill.name }}</h3>

          <!-- Skill level indicator -->
          <div class="mt-4">
            <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full"
                :class="`bg-${skill.color}-500`"
                :style="`width: ${skill.level}%`"
              ></div>
            </div>
            <div class="text-xs text-gray-500 text-right mt-1">{{ skill.level }}%</div>
          </div>
        </div>
      </div>

      <!-- Dezente Dekorationselemente -->
      <div class="hidden lg:block absolute top-40 right-20 w-16 h-16 float-slow">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-gray-200 rounded-md rotate-45"></div>
          <div class="absolute inset-0 border border-gray-200 rounded-md rotate-[30deg]"></div>
        </div>
      </div>

      <div class="hidden lg:block absolute bottom-40 left-20 w-24 h-24 float-fast">
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
  },
  methods: {
    // Ein einfaches Icon-System für die Skills
    getSkillIcon(skillName: string): string {
      const iconMap: Record<string, string> = {
        "JavaScript": "JS",
        "TypeScript": "TS",
        "Vue.js": "Vue",
        "React": "⚛️",
        "Node.js": "Node",
        "HTML/CSS": "</>",
        "Python": "Py",
        "PHP": "PHP",
        "Java": "Java",
        "C#": "C#",
        "SQL": "SQL",
        "GraphQL": "GQL",
        "Git": "Git",
        "Docker": "🐳",
        "AWS": "AWS",
        "Firebase": "🔥",
        "MongoDB": "DB",
        "UX/UI": "UX",
        "Tailwind CSS": "TW"
      };

      return iconMap[skillName] || "•";
    }
  }
})
</script>

<style scoped>
/* Grid-Pattern für einen dezenten Tech-Look */
.grid-pattern {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  width: 100%;
  height: 100%;
}

/* Subtile Keyframe-Animationen für schwebende Elemente */
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
