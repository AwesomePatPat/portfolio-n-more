<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Weitere Kenntnisse</h2>

      <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        <!-- Languages -->
        <div class="bg-gray-50 rounded-lg shadow-md p-6">
          <h3 class="text-2xl font-semibold mb-6 text-center">Sprachen</h3>
          <div class="space-y-4">
            <div
              v-for="language in languages"
              :key="language.name"
              class="flex justify-between items-center"
            >
              <span class="text-lg">{{ language.name }}</span>
              <span class="px-3 py-1 bg-primary text-white rounded-full text-sm">
                {{ language.level }}
              </span>
            </div>
          </div>
        </div>

        <!-- Other Skills -->
        <div class="bg-gray-50 rounded-lg shadow-md p-6">
          <h3 class="text-2xl font-semibold mb-6 text-center">Sonstige Fähigkeiten</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in otherSkills"
              :key="skill"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Language } from '../types';

export default defineComponent({
  name: 'OtherSkillsSection',
  props: {
    languages: {
      type: Array as () => Language[],
      required: true,
    },
    otherSkills: {
      type: Array as () => string[],
      required: true,
    },
  },
});
</script>
