<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="{ 'py-6': !scrolled, 'py-3': scrolled }"
  >
    <div class="container mx-auto px-6 relative">
      <!-- Navigation centered -->
      <div class="flex justify-center items-center">
        <PillNav
          :items="pillNavItems"
          :activeHref="'#' + activeSection"
          baseColor="#3b82f6"
          pillColor="#000000"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#ffffff"
          :initialLoadAnimation="true"
        />
      </div>

      <!-- Language Switcher positioned absolutely to the right -->
      <div class="absolute right-6" style="top: 1em; z-index: 1001">
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { PropType } from 'vue'
import type { NavItem } from '../../types'
import PillNav from '../vueBits/Components/PillNav/PillNav.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

export default defineComponent({
  name: 'NavigationBar',
  components: {
    PillNav,
    LanguageSwitcher,
  },
  props: {
    navItems: {
      type: Array as PropType<NavItem[]>,
      required: true,
    },
  },
  setup(props) {
    const activeSection = ref('intro')
    const scrolled = ref(false)

    // Transform navItems to PillNav format
    const pillNavItems = computed(() => {
      return props.navItems.map((item) => ({
        label: item.name,
        href: '#' + item.id,
        ariaLabel: item.name,
      }))
    })

    const handleScroll = () => {
      scrolled.value = window.scrollY > 20

      const sections = document.querySelectorAll('section[id]')

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.getAttribute('id')

        if (sectionTop <= 100 && sectionId) {
          activeSection.value = sectionId
        }
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      activeSection,
      scrolled,
      pillNavItems,
    }
  },
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
