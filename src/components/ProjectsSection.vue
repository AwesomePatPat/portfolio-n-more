<!-- ProjectsSection.vue -->
<template>
  <section
    :id="id"
    class="py-20 relative"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <!-- Lokale Akzente statt vollständigem Hintergrund -->
    <div class="absolute inset-0 z-0">
      <!-- Lokale Farbakzente, die sich mit dem globalen Hintergrund vermischen -->
      <div class="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-blue-100/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-emerald-100/20 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Überschrift im hellen Design -->
      <div class="flex flex-col items-center mb-16">
        <div class="portfolio-badge inline-block px-4 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium text-emerald-600 mb-4">
          Portfolio
        </div>
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-2">Meine <span class="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Projekte bei Swisscom</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mt-4"></div>
      </div>

      <!-- Projekte mit verbesserten Hover-Effekten -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
          :visible="{ opacity: 1, x: 0, transition: { delay: index * 150 } }"
          class="project-card-wrapper relative group"
        >
          <!-- Projekt-Karte mit Hover-Effekten -->
          <div class="project-card h-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md p-6 relative z-10">
            <div class="flex flex-col h-full">
              <!-- Icon mit Animation -->
              <div class="project-icon mb-6 w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="getIconPath(project.icon)" />
                </svg>
              </div>

              <!-- Projekt-Titel mit Unterstrich-Animation -->
              <h3 class="project-title text-xl font-semibold text-center mb-3 text-gray-800 relative">
                {{ project.title }}
                <!-- Animierter Unterstrich beim Hover -->
                <div class="project-underline absolute left-1/2 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transform -translate-x-1/2"></div>
              </h3>

              <p class="text-gray-600 text-center flex-grow">{{ project.description }}</p>

              <!-- Interaktiver Button - Klickevent hinzugefügt -->
              <div class="mt-6 flex justify-center">
                <button
                  class="details-button group relative px-4 py-2 text-sm rounded-md bg-white border border-gray-300 text-gray-700 overflow-hidden"
                  @click="openProjectDetail(project)"
                >
                  <span class="relative z-10 flex items-center">
                    Mehr Details
                    <svg xmlns="http://www.w3.org/2000/svg" class="details-arrow h-4 w-4 ml-1 transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <!-- Subtiler Hover-Effekt -->
                  <span class="details-background absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 transform scale-x-0 origin-left"></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Hintergrundeffekt -->
          <div class="project-background absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-blue-100/30 rounded-xl translate-x-2 translate-y-2"></div>
        </div>
      </div>

      <!-- Dezente Dekorationselemente -->
      <div class="hidden lg:block absolute bottom-20 left-10 w-16 h-16 float-slow">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-gray-200 rounded-md rotate-45"></div>
          <div class="absolute inset-0 border border-gray-200 rounded-md rotate-[30deg]"></div>
        </div>
      </div>

      <div class="hidden lg:block absolute top-20 right-10 w-20 h-20 float-fast">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-gray-200 rounded-full"></div>
          <div class="absolute inset-0 scale-75 border border-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>

    <!-- Modal für Projektdetails -->
    <ProjectDetailModal
      :show="showDetailModal"
      :project="selectedProject"
      @close="closeProjectDetail"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { Project } from '../types'
import ProjectDetailModal from './ProjectDetailModal.vue'

export default defineComponent({
  name: 'ProjectsSection',
  components: {
    ProjectDetailModal
  },
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
    const showDetailModal = ref(false)
    const selectedProject = ref<Project>({
      id: 0,
      title: '',
      description: '',
      icon: ''
    })

    const openProjectDetail = (project: Project) => {
      selectedProject.value = project
      showDetailModal.value = true
    }

    const closeProjectDetail = () => {
      showDetailModal.value = false
    }

    return {
      showDetailModal,
      selectedProject,
      openProjectDetail,
      closeProjectDetail
    }
  },
  methods: {
    getIconPath(icon: string): string {
      switch (icon) {
  case 'shopping-cart':
    return 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
  case 'clipboard-list':
    return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
  case 'user':
    return 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  case 'bell':
    return 'M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z'
  case 'home':
    return 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-7m-6 0a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1'
  case 'star':
    return 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
  case 'cog':
    return 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  case 'document':
    return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
  case 'calendar':
    return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  case 'heart':
    return 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  case 'trash':
    return 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
  case 'code':
    return 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  case 'terminal':
    return 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  case 'database':
    return 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
  case 'server':
    return 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
  case 'chip':
    return 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
  default:
    return 'M12 6v6m0 0v6m0-6h6m-6 0H6'
}
    }
  }
})
</script>

<style scoped>
/* Hover Effekte */

/* Portfolio Badge */
.portfolio-badge {
  transition: all 0.3s;
}
.portfolio-badge:hover {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
}

/* Project Card */
.project-card {
  transition: all 0.5s;
}
.project-card-wrapper:hover .project-card {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(167, 243, 208, 1);
}

/* Icon Animation */
.project-icon {
  transition: transform 0.5s;
}
.project-card-wrapper:hover .project-icon {
  transform: scale(1.1);
}

/* Title Underline Animation */
.project-underline {
  width: 0;
  transition: width 0.3s;
}
.project-card-wrapper:hover .project-underline {
  width: 66.666667%;
}

/* Details Button */
.details-button {
  transition: all 0.3s;
}
.details-button:hover {
  color: rgb(16, 185, 129);
  border-color: rgb(167, 243, 208);
}

/* Arrow Animation */
.details-arrow {
  transition: transform 0.3s;
}
.details-button:hover .details-arrow {
  transform: translateX(4px);
}

/* Button Background Animation */
.details-background {
  transition: transform 0.3s;
}
.details-button:hover .details-background {
  transform: scaleX(1);
}

/* Project Background Effect */
.project-background {
  transition: all 0.5s;
}
.project-card-wrapper:hover .project-background {
  transform: translate(12px, 12px);
}

/* Floating Animations */
@keyframes float-slow {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

@keyframes float-fast {
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-8px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0); }
}

.float-slow {
  animation: float-slow 5s ease-in-out infinite;
}

.float-fast {
  animation: float-fast 4s ease-in-out infinite;
}
</style>
