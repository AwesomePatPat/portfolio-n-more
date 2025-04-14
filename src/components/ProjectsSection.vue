<template>
  <section
    :id="id"
    class="py-20 bg-gray-50"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">Meine Projekte</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(project.icon)"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 mb-4">{{ project.description }}</p>
            <a href="#" class="text-indigo-600 font-medium hover:text-indigo-500 transition-colors duration-300 flex items-center">
              Mehr erfahren
              <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
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
