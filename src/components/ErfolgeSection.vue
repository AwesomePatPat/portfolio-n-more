<!-- ErfolgeSection.vue -->
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
      <!-- Removed colored gradients for dark theme -->
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Überschrift im hellen Design -->
      <div class="flex flex-col items-center mb-16">
        <div
          class="portfolio-badge inline-block px-4 py-1 rounded-full bg-white/10 border border-blue-500/40 text-sm font-medium text-white mb-4"
        >
          {{ $t('erfolge.badge') }}
        </div>
        <h2 class="text-4xl font-bold text-white text-center mb-2">
          {{ $t('erfolge.title') }}
          <span class="text-white">{{ $t('erfolge.titleHighlight') }}</span>
        </h2>
        <div class="w-24 h-1 bg-blue-500 rounded-full mt-4"></div>
      </div>

      <!-- Erfolge mit direkter Anzeige -->
      <div class="max-w-6xl mx-auto space-y-16">
        <div
          v-for="(erfolg, index) in erfolge"
          :key="erfolg.id"
          :data-erfolg-id="erfolg.id"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 150 } }"
          class="erfolg-item relative"
        >
          <!-- Erfolg-Container -->
          <div
            class="erfolg-card bg-black/50 border border-white/20 rounded-xl overflow-hidden shadow-md hover:border-white/40 transition-all duration-500"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <!-- Linke Seite: Bildkarussell -->
              <div class="erfolg-gallery">
                <div v-if="erfolg.images && erfolg.images.length > 0" class="relative">
                  <!-- Karussell Container -->
                  <div class="overflow-hidden rounded-lg bg-white/5">
                    <div class="relative h-64 sm:h-80 lg:h-96">
                      <!-- Bilder -->
                      <transition-group name="slide">
                        <div
                          v-for="(image, imgIndex) in erfolg.images"
                          :key="imgIndex"
                          v-show="currentImageIndices[erfolg.id] === imgIndex"
                          class="absolute inset-0 w-full h-full"
                        >
                          <img
                            :src="image"
                            :alt="`${erfolg.title} - Bild ${imgIndex + 1}`"
                            class="w-full h-full object-cover"
                          />
                        </div>
                      </transition-group>
                    </div>
                  </div>

                  <!-- Navigation Buttons (nur wenn mehr als 1 Bild) -->
                  <div
                    v-if="erfolg.images.length > 1"
                    class="flex items-center justify-center mt-4 gap-4"
                  >
                    <button
                      @click="previousImage(erfolg.id, erfolg.images.length)"
                      class="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                    >
                      <svg
                        class="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <!-- Dots Indicator -->
                    <div class="flex gap-2">
                      <button
                        v-for="(image, imgIndex) in erfolg.images"
                        :key="imgIndex"
                        @click="setImageIndex(erfolg.id, imgIndex)"
                        class="w-2 h-2 rounded-full transition-all"
                        :class="
                          currentImageIndices[erfolg.id] === imgIndex
                            ? 'bg-blue-500 w-8'
                            : 'bg-white/30 hover:bg-white/50'
                        "
                      ></button>
                    </div>

                    <button
                      @click="nextImage(erfolg.id, erfolg.images.length)"
                      class="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                    >
                      <svg
                        class="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Fallback wenn keine Bilder vorhanden -->
                <div
                  v-else
                  class="h-64 sm:h-80 lg:h-96 bg-white/5 rounded-lg flex items-center justify-center border border-white/10"
                >
                  <div class="text-center">
                    <div
                      class="w-20 h-20 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-10 w-10 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          :d="getIconPath(erfolg.icon)"
                        />
                      </svg>
                    </div>
                    <p class="text-white/40 text-sm">{{ $t('erfolge.noImages') }}</p>
                  </div>
                </div>
              </div>

              <!-- Rechte Seite: Informationen -->
              <div class="erfolg-info flex flex-col">
                <!-- Header mit Icon und Titel -->
                <div class="flex items-start gap-4 mb-6">
                  <div
                    class="w-14 h-14 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        :d="getIconPath(erfolg.icon)"
                      />
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <h3 class="text-2xl font-bold text-white mb-2">{{ erfolg.title }}</h3>
                    <div class="flex flex-wrap gap-3 text-sm">
                      <span
                        v-if="erfolg.category"
                        class="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full"
                      >
                        {{ erfolg.category }}
                      </span>
                      <span
                        v-if="erfolg.date"
                        class="px-3 py-1 bg-white/10 text-white/80 border border-white/20 rounded-full"
                      >
                        📅 {{ erfolg.date }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Beschreibung -->
                <div class="mb-6 flex-grow">
                  <div
                    class="text-white/80 leading-relaxed"
                    v-html="erfolg.longDescription || erfolg.description"
                  ></div>
                </div>

                <!-- Achievements wenn vorhanden -->
                <div v-if="erfolg.achievements && erfolg.achievements.length > 0" class="mt-auto">
                  <div class="text-sm text-white/60 mb-3 font-semibold">
                    {{ $t('erfolge.modal.achievements') }}
                  </div>
                  <ul class="space-y-2">
                    <li
                      v-for="(achievement, achIndex) in erfolg.achievements"
                      :key="achIndex"
                      class="flex items-start gap-2"
                    >
                      <svg
                        class="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span class="text-white/80">{{ achievement }}</span>
                    </li>
                  </ul>
                </div>

                <!-- External Links wenn vorhanden -->
                <div
                  v-if="erfolg.links && erfolg.links.length > 0"
                  class="mt-6 pt-6 border-t border-white/10"
                >
                  <div class="text-sm text-white/60 mb-3 font-semibold">
                    {{ $t('erfolge.externalLinks') }}
                  </div>
                  <div class="flex flex-wrap gap-3">
                    <a
                      v-for="(link, linkIndex) in erfolg.links"
                      :key="linkIndex"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-500/50 rounded-lg transition-all group"
                      :title="link.label || link.type"
                    >
                      <Icon :icon="getSocialIcon(link.type)" class="w-5 h-5" />
                      <span class="text-white/80 group-hover:text-white text-sm">
                        {{ link.label || getLinkLabel(link.type) }}
                      </span>
                      <svg
                        class="w-4 h-4 text-white/40 group-hover:text-white/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dezente Dekorationselemente -->
      <div class="hidden lg:block absolute bottom-20 left-10 w-16 h-16 float-slow">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-white/20 rounded-md rotate-45"></div>
          <div class="absolute inset-0 border border-white/20 rounded-md rotate-[30deg]"></div>
        </div>
      </div>

      <div class="hidden lg:block absolute top-20 right-10 w-20 h-20 float-fast">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-white/20 rounded-full"></div>
          <div class="absolute inset-0 scale-75 border border-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { PropType } from 'vue'
import type { Erfolg, ExternalLink } from '../types'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'ErfolgeSection',
  components: {
    Icon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    erfolge: {
      type: Array as PropType<Erfolg[]>,
      required: true,
    },
  },
  setup(props) {
    // Track current image index for each erfolg
    const currentImageIndices = reactive<{ [key: number]: number }>({})

    // Initialize indices
    props.erfolge.forEach((erfolg) => {
      currentImageIndices[erfolg.id] = 0
    })

    const nextImage = (erfolgId: number, totalImages: number) => {
      if (currentImageIndices[erfolgId] < totalImages - 1) {
        currentImageIndices[erfolgId]++
      }
    }

    const previousImage = (erfolgId: number, totalImages: number) => {
      if (currentImageIndices[erfolgId] > 0) {
        currentImageIndices[erfolgId]--
      }
    }

    const setImageIndex = (erfolgId: number, index: number) => {
      currentImageIndices[erfolgId] = index
    }

    return {
      currentImageIndices,
      nextImage,
      previousImage,
      setImageIndex,
    }
  },
  methods: {
    getIconPath(icon: string): string {
      switch (icon) {
        case 'trophy':
          return 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
        case 'star':
          return 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
        case 'academic-cap':
          return 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
        case 'badge-check':
          return 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
        case 'certificate':
          return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        case 'gift':
          return 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
        case 'lightning-bolt':
          return 'M13 10V3L4 14h7v7l9-11h-7z'
        case 'sparkles':
          return 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        case 'chart-bar':
          return 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        case 'fire':
          return 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
        case 'rocket':
          return 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
        case 'code':
          return 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
        default:
          return 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      }
    },
    getSocialIcon(type: string): string {
      const icons: { [key: string]: string } = {
        linkedin: 'mdi:linkedin',
        instagram: 'mdi:instagram',
        youtube: 'mdi:youtube',
        twitter: 'mdi:twitter',
        github: 'mdi:github',
        facebook: 'mdi:facebook',
        website: 'mdi:web',
      }
      return icons[type] || 'mdi:link'
    },
    getLinkLabel(type: string): string {
      const labels: { [key: string]: string } = {
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        youtube: 'YouTube',
        twitter: 'Twitter',
        github: 'GitHub',
        facebook: 'Facebook',
        website: 'Website',
      }
      return labels[type] || 'Link'
    },
  },
})
</script>

<style scoped>
/* Hover Effekte */

/* Portfolio Badge */
.portfolio-badge {
  transition: all 0.3s;
}
.portfolio-badge:hover {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  border-color: rgba(59, 130, 246, 0.6);
  background-color: rgba(59, 130, 246, 0.1);
}

/* Erfolg Card */
.erfolg-card {
  transition: all 0.5s;
}

.erfolg-item:hover .erfolg-card {
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.2);
}

/* Slide Transition für Karussell */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Floating Animations */
@keyframes float-slow {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes float-fast {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-8px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

.float-slow {
  animation: float-slow 5s ease-in-out infinite;
}

.float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

/* Highlight Animation */
@keyframes highlight-flash {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(59, 130, 246, 0);
    border-color: rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
    border-color: rgba(59, 130, 246, 0.8);
  }
}

.erfolg-highlight .erfolg-card {
  animation: highlight-flash 2s ease-in-out;
}
</style>
