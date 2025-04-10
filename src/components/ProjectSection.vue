<template>
  <section id="projects" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Meine Projekte</h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in projects"
          :key="project.title"
          class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full mr-4">
                <i :class="project.icon" class="text-xl"></i>
              </div>
              <h3 class="text-xl font-bold">{{ project.title }}</h3>
            </div>
            <p class="text-gray-700 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Project } from '../types';

export default defineComponent({
  name: 'ProjectsSection',
  props: {
    projects: {
      type: Array as () => Project[],
      required: true,
    },
  },
});
</script>
