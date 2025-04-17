<template>
  <header
    class="sticky top-0 z-50 bg-white/90 backdrop-blur-lg transition-all duration-500 border-b border-gray-200"
    :class="{'shadow-md': scrolled, 'py-6': !scrolled, 'py-3': scrolled}"
  >
    <nav class="container mx-auto px-6">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="logo-wrapper group relative overflow-hidden">
          <div class="text-2xl font-extrabold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent transform transition-all duration-500">
            Portfolio
          </div>
          <!-- Animierter Unterstrich -->
          <div class="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-blue-500 transform transition-all duration-500"></div>
          <!-- Subtiler Glüh-Effekt beim Hover -->
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur-lg opacity-0 transition-opacity duration-700"></div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-1">
          <div v-for="item in navItems" :key="item.id" class="relative">
            <a
              :href="'#'+item.id"
              class="nav-link relative px-4 py-2 rounded-full text-gray-700 transition-all duration-300 overflow-hidden font-medium"
              :class="{
                'nav-active': activeSection === item.id
              }"
              @mouseenter="createParticles($event)"
            >
              <span class="relative z-10">{{ item.name }}</span>
              <!-- Verbesserte aktive/hover Indikator -->
              <span
                class="active-indicator absolute inset-0 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full opacity-0 transition-all duration-300 transform scale-95"
                :class="{
                  'opacity-100 scale-100': activeSection === item.id
                }"
              ></span>
              <!-- Zusätzlicher Highlight-Effekt für aktiven Status -->
              <span
                v-if="activeSection === item.id"
                class="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
              ></span>
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="mobile-button relative w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-800 overflow-hidden transition-colors duration-300 group">
            <div class="w-6 h-6 flex flex-col justify-between transform transition-all duration-300" :class="{'rotate-180': mobileMenuOpen}">
              <span
                class="w-full h-0.5 bg-current transform transition-all duration-300 origin-left"
                :class="{'rotate-45 translate-y-px translate-x-px': mobileMenuOpen}"
              ></span>
              <span
                class="w-full h-0.5 bg-current transition-all duration-300"
                :class="{'opacity-0 translate-x-4': mobileMenuOpen}"
              ></span>
              <span
                class="w-full h-0.5 bg-current transform transition-all duration-300 origin-left"
                :class="{'-rotate-45 -translate-y-px translate-x-px': mobileMenuOpen}"
              ></span>
            </div>
            <!-- Ripple-Effekt beim Klicken -->
            <span class="ripple-effect absolute inset-0 bg-emerald-100 transform scale-0 opacity-0 transition-all duration-300"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu mit verbesserten Übergängen -->
      <div
        class="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
        :style="{ maxHeight: mobileMenuOpen ? '400px' : '0px', opacity: mobileMenuOpen ? '1' : '0' }"
      >
        <div class="mt-4 pb-4 bg-white rounded-xl p-2 border border-gray-200 shadow-md">
          <a
            v-for="(item, index) in navItems"
            :key="item.id"
            :href="'#'+item.id"
            class="mobile-link group block py-3 px-4 my-2 rounded-xl text-gray-700 transition-all duration-300 font-medium"
            :class="{
              'bg-gradient-to-r from-emerald-50 to-blue-50': activeSection === item.id,
              'transform transition-all duration-300 delay-100': true,
              'translate-x-2 opacity-0': mobileMenuOpen && !mobileItemsVisible,
              'translate-x-0 opacity-100': mobileMenuOpen && mobileItemsVisible
            }"
            :style="{ 'transition-delay': `${index * 100}ms` }"
            @click="closeMobileMenu"
          >
            <div class="flex items-center">
              <!-- Icon mit Hover-Effekt -->
              <div class="mobile-icon mr-3 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 transition-all duration-300">
                <!-- Icon basierend auf Menüpunkt -->
                <svg class="w-4 h-4 text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getMenuIcon(item.id)"></path>
                </svg>
              </div>
              <span class="mobile-link-text">{{ item.name }}</span>
            </div>
            <!-- Verbesserte aktive Indikator -->
            <div v-if="activeSection === item.id" class="h-0.5 mt-2 w-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-400"></div>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import type { PropType } from 'vue'
import type { NavItem } from '../types'

export default defineComponent({
  name: 'NavigationBar',
  props: {
    navItems: {
      type: Array as PropType<NavItem[]>,
      required: true
    }
  },
  setup() {
    const mobileMenuOpen = ref(false)
    const mobileItemsVisible = ref(false)
    const activeSection = ref('intro')
    const scrolled = ref(false)

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value

      if (mobileMenuOpen.value) {
        setTimeout(() => {
          mobileItemsVisible.value = true
        }, 50)
      } else {
        mobileItemsVisible.value = false
      }
    }

    const closeMobileMenu = () => {
      mobileItemsVisible.value = false
      setTimeout(() => {
        mobileMenuOpen.value = false
      }, 300)
    }

    // Verbesserte Partikel-Funktion mit mehr Variationen
    const createParticles = (event: MouseEvent) => {
      const colors = ['#10b981', '#3b82f6', '#06b6d4', '#059669']
      const shapes = ['circle', 'square', 'triangle']
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div')
        particle.className = 'nav-particle'

        // Zufällige Form auswählen
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
        if (shape === 'circle') {
          particle.style.borderRadius = '50%'
        } else if (shape === 'square') {
          particle.style.borderRadius = '2px'
        } else if (shape === 'triangle') {
          particle.style.width = '0'
          particle.style.height = '0'
          particle.style.backgroundColor = 'transparent'
          particle.style.borderLeft = '4px solid transparent'
          particle.style.borderRight = '4px solid transparent'
          particle.style.borderBottom = `8px solid ${colors[Math.floor(Math.random() * colors.length)]}`
        }

        if (shape !== 'triangle') {
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        }

        particle.style.left = `${rect.left + rect.width / 2}px`
        particle.style.top = `${rect.top + rect.height / 2}px`

        document.body.appendChild(particle)

        const angle = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 4
        const size = 3 + Math.random() * 5
        const opacity = 0.6 + Math.random() * 0.4

        if (shape !== 'triangle') {
          particle.style.width = `${size}px`
          particle.style.height = `${size}px`
        }
        particle.style.opacity = opacity.toString()

        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed
        let rotation = Math.random() * 360
        const rotationSpeed = (Math.random() - 0.5) * 10

        let posX = rect.left + rect.width / 2
        let posY = rect.top + rect.height / 2

        const animate = () => {
          posX += vx
          posY += vy
          rotation += rotationSpeed

          particle.style.left = `${posX}px`
          particle.style.top = `${posY}px`

          if (shape !== 'circle') {
            particle.style.transform = `rotate(${rotation}deg)`
          }

          // Fadeout-Effekt am Ende
          const distance = Math.sqrt(
            Math.pow(posX - (rect.left + rect.width / 2), 2) +
            Math.pow(posY - (rect.top + rect.height / 2), 2)
          )

          if (distance > 50) {
            particle.style.opacity = (1 - (distance - 50) / 50 * opacity).toString()
          }

          if (posX < rect.left - 50 || posX > rect.right + 50 ||
              posY < rect.top - 50 || posY > rect.bottom + 50) {
            document.body.removeChild(particle)
          } else {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      }
    }

    const handleScroll = () => {
      scrolled.value = window.scrollY > 20

      const sections = document.querySelectorAll('section[id]')

      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.getAttribute('id')

        if (sectionTop <= 100 && sectionId) {
          activeSection.value = sectionId
        }
      })
    }

    const getMenuIcon = (id: string): string => {
      switch (id) {
        case 'intro':
          return 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        case 'about':
          return 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        case 'skills':
          return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
        case 'languages':
          return 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129'
        case 'projects':
          return 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
        default:
          return 'M13 10V3L4 14h7v7l9-11h-7z'
      }
    }

    watch(mobileMenuOpen, (newVal) => {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    })

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      mobileMenuOpen,
      mobileItemsVisible,
      activeSection,
      scrolled,
      toggleMobileMenu,
      closeMobileMenu,
      createParticles,
      getMenuIcon
    }
  }
})
</script>

<style>
/* Logo Animations */
.logo-wrapper {
  position: relative;
  cursor: pointer;
}

/* Hover-Effekte für Logo */

.logo-wrapper:hover .absolute.-inset-1 {
  opacity: 1;
}

/* Navigation Links */
.nav-link {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
}

/* Hover-Effekte für Navigation Links */
.nav-link:hover {
  transform: translateY(-2px);
  color: #059669; /* emerald-600 */
}

.nav-link:hover .active-indicator {
  opacity: 0.5;
  transform: scale(1);
}

/* Mobile Button Hover-Effekte */
.mobile-button:hover {
  background-color: #e5e7eb; /* gray-200 */
}

.mobile-button:hover .ripple-effect {
  opacity: 1;
  transform: scale(1);
}

/* Mobile Navigation Links Hover-Effekte */
.mobile-link:hover .mobile-icon {
  background-color: #d1fae5; /* emerald-100 */
  transform: scale(1.1);
}

.mobile-link:hover svg {
  color: #059669; /* emerald-600 */
}

.mobile-link:hover .mobile-link-text {
  transform: translateX(4px);
}

/* Verbesserte Partikel-Effekte */
.nav-particle {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.8;
  z-index: 100;
  animation: fade-out 1s forwards;
  will-change: transform, opacity;
}

@keyframes fade-out {
  0% { opacity: 0.8; }
  100% { opacity: 0; }
}

/* Verbesserte Animation für aktive Navigationsindikatoren */
@keyframes pulse-border {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

/* Responsive Anpassungen */
@media (prefers-reduced-motion) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
