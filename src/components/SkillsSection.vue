<template>
  <section
    :id="id"
    class="py-20 bg-gray-50"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">Meine Fähigkeiten</h2>

      <div class="max-w-3xl mx-auto space-y-8">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
          class="mb-6"
        >
          <div class="flex justify-between mb-2">
            <span class="text-gray-700 font-medium">{{ skill.name }}</span>
            <span class="text-gray-500">{{ skill.level }}%</span>
          </div>
          <div class="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full"
              :class="`bg-${skill.color}-500`"
              :style="{ width: `${skill.level}%` }"
              v-motion
              :initial="{ width: '0%' }"
              :visible="{ width: `${skill.level}%`, transition: { duration: 1000, delay: index * 100 } }"
            ></div>
          </div>
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
