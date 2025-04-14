<template>
  <header
    class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg transition-all duration-500 border-b border-gray-200"
    :class="{'shadow-lg shadow-purple-500/10': scrolled, 'py-6': !scrolled, 'py-3': scrolled}"
  >
    <nav class="container mx-auto px-6">
      <div class="flex justify-between items-center">
        <!-- Logo with enhanced animation -->
        <div class="logo-wrapper group relative overflow-hidden">
          <div class="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent transform transition-all duration-500 group-hover:scale-110">
            Portfolio
          </div>
          <div class="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 transform transition-all duration-500 group-hover:w-full"></div>
          <div class="absolute -bottom-1 left-0 h-0.5 w-0 bg-white/40 transform transition-all duration-700 delay-200 group-hover:w-full"></div>
        </div>

        <!-- Desktop Navigation with particle effects -->
        <div class="hidden md:flex space-x-1">
          <div v-for="item in navItems" :key="item.id" class="relative">
            <a
              :href="'#'+item.id"
              class="nav-link relative px-4 py-2 rounded-full text-gray-800 hover:text-white transition-all duration-300 overflow-hidden font-medium"
              :class="{
                'nav-active': activeSection === item.id,
                'hover:-translate-y-1': true
              }"
              @mouseenter="createParticles($event)"
            >
              <span class="relative z-10">{{ item.name }}</span>
              <span
                class="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-full opacity-0 transition-all duration-300"
                :class="{'opacity-0': activeSection !== item.id}"
              ></span>
            </a>

          </div>
        </div>

        <!-- Mobile Menu Button with animation -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="text-gray-800 relative w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
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
            <div class="absolute inset-0 rounded-full bg-gray-100 transform scale-0 transition-all duration-300" :class="{'scale-100 opacity-10': mobileMenuOpen}"></div>
          </button>
        </div>
      </div>

      <!-- Mobile Menu with enhanced animation -->
      <div
        class="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
        :style="{ maxHeight: mobileMenuOpen ? '400px' : '0px', opacity: mobileMenuOpen ? '1' : '0' }"
      >
        <div class="mt-4 pb-4 bg-white/90 backdrop-blur-md rounded-xl p-2 border border-gray-200 shadow-lg">
          <a
            v-for="(item, index) in navItems"
            :key="item.id"
            :href="'#'+item.id"
            class="mobile-link block py-3 px-4 my-2 rounded-xl text-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-indigo-600 hover:text-white transition-all duration-300 font-medium"
            :class="{
              'bg-gradient-to-r from-purple-500/20 to-indigo-500/20': activeSection === item.id,
              'transform transition-all duration-300 delay-100': true,
              'translate-x-2 opacity-0': mobileMenuOpen && !mobileItemsVisible,
              'translate-x-0 opacity-100': mobileMenuOpen && mobileItemsVisible
            }"
            :style="{ 'transition-delay': `${index * 100}ms` }"
            @click="closeMobileMenu"
          >
            <div class="flex items-center">
              <div class="mr-3 w-8 h-8 rounded-full flex items-center justify-center bg-purple-100"></div>
              {{ item.name }}
            </div>
            <div v-if="activeSection === item.id" class="h-0.5 mt-2 w-1/2 rounded-full bg-gradient-to-r from-purple-600 to-transparent"></div>
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

    const createParticles = (event: MouseEvent) => {
      const colors = ['#6d28d9', '#db2777', '#4f46e5']
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()

      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div')
        particle.className = 'nav-particle'
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        particle.style.left = `${rect.left + rect.width / 2}px`
        particle.style.top = `${rect.top + rect.height / 2}px`

        document.body.appendChild(particle)

        const angle = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 3
        const size = 3 + Math.random() * 5

        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed

        let posX = rect.left + rect.width / 2
        let posY = rect.top + rect.height / 2

        const animate = () => {
          posX += vx
          posY += vy
          particle.style.left = `${posX}px`
          particle.style.top = `${posY}px`

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
      createParticles
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

/* Navigation Links */
.nav-link {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
}

.nav-link:hover {
  transform: translateY(-2px);
}

.active-indicator {
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 4px;
  height: 4px;
  background: linear-gradient(to right, #6d28d9, #db2777);
  border-radius: 50%;
  transform: translateX(-50%);
  filter: blur(1px);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
  100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
}

/* Particles effect */
.nav-particle {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.8;
  z-index: 100;
  animation: fade-out 1s forwards;
}

@keyframes fade-out {
  0% { opacity: 0.8; }
  100% { opacity: 0; }
}

/* Additional animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes subtle-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(124, 58, 237, 0.5); }
  50% { box-shadow: 0 0 15px rgba(124, 58, 237, 0.8); }
}

/* Mobile menu transitions */
.mobile-link {
  transform: translateX(0);
  opacity: 1;
  transition: all 0.3s ease;
}

@media (prefers-reduced-motion) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
