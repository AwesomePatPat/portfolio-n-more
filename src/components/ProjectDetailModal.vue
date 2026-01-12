<!-- ProjectDetailModal.vue -->
<template>
  <transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Hintergrund-Overlay mit Animation -->
      <div
        class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        @click="close"
      ></div>

      <!-- Modal-Container -->
      <div class="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
        <div
          class="relative bg-black/70 border border-white/20 rounded-xl overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl w-full"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 300 } }"
        >
          <!-- Close Button -->
          <button
            type="button"
            class="absolute top-4 right-4 text-white/70 focus:outline-none z-10 close-button"
            @click="close"
          >
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Content -->
          <div class="px-6 pt-6 pb-8">
            <!-- Header mit Projekt-Icon und Titel -->
            <div class="flex items-center mb-6">
              <div class="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="getIconPath(project.icon)" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white">{{ project.title }}</h3>
            </div>

            <!-- Provider wenn vorhanden -->
            <div v-if="project.provider" class="mb-6">
              <div class="text-sm text-white/60 mb-1">{{ $t('projects.modal.provider') }}</div>
              <div class="font-medium text-white">{{ project.provider }}</div>
            </div>

            <!-- Zeitraum wenn vorhanden -->
            <div v-if="project.startDate || project.endDate" class="mb-6">
              <div class="text-sm text-white/60 mb-1">{{ $t('projects.modal.period') }}</div>
              <div class="font-medium text-white">
                <span v-if="project.startDate">{{ project.startDate }}</span>
                <span v-if="project.startDate && project.endDate"> - </span>
                <span v-if="project.endDate">{{ project.endDate }}</span>
              </div>
            </div>

            <!-- Ausführliche Beschreibung -->
            <div class="mb-6">
              <div class="text-sm text-white/60 mb-1">{{ $t('projects.modal.description') }}</div>
              <p class="text-white/80" v-html="project.longDescription || project.description"></p>
            </div>

            <!-- Technologien wenn vorhanden -->
            <div v-if="project.technologies && project.technologies.length > 0" class="mb-6">
              <div class="text-sm text-white/60 mb-2">{{ $t('projects.modal.technologies') }}</div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-white/10 text-white border border-white/20 text-sm rounded-full"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Project } from '../types'

export default defineComponent({
  name: 'ProjectDetailModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    project: {
      type: Object as PropType<Project>,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    },
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
  case 'ai-challenge':
    return 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  case 'mini-net':
    return 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
  default:
    return 'M12 6v6m0 0v6m0-6h6m-6 0H6'
}
    }
  }
})
</script>

<style scoped>
/* Modal-Animationen */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

/* Hover Effects */
.close-button:hover {
  color: rgba(255, 255, 255, 0.7);
}
</style>
