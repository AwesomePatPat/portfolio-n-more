<template>
  <section id="skills" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Meine Skills</h2>
      <div class="max-w-3xl mx-auto grid gap-6">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <i :class="skill.icon" class="text-2xl text-primary mr-3"></i>
              <h3 class="text-xl font-semibold">{{ skill.name }}</h3>
            </div>
            <span class="text-lg font-medium">{{ skill.level }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-primary h-2.5 rounded-full"
              :style="{ width: `${skill.level}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Skill } from '../types';

export default defineComponent({
  name: 'SkillsSection',
  props: {
    skills: {
      type: Array as () => Skill[],
      required: true,
    },
  },
});
</script>
