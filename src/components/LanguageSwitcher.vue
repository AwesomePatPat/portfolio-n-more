<!-- LanguageSwitcher.vue -->
<template>
  <div class="language-switcher relative" ref="dropdownRef">
    <!-- Button -->
    <button
      @click="toggleDropdown"
      class="language-button flex items-center gap-2 px-4 py-2 rounded-full transition-all font-bold text-sm uppercase tracking-wide"
      :style="{
        background: '#000000',
        color: '#ffffff',
        height: '42px',
        display: 'flex',
      }"
      :title="`Language: ${getCurrentLanguage().name}`"
    >
      <Icon :icon="getCurrentFlag()" class="w-5 h-5" />
      <span>{{ currentLocale }}</span>
      <svg
        class="w-3 h-3 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="language-dropdown absolute top-full left-0 mt-2 w-40 rounded-2xl shadow-2xl overflow-hidden z-[9999]"
        :style="{ background: '#3b82f6' }"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="language-option w-full flex items-center gap-2 px-4 py-3 transition-all text-left font-bold text-sm"
          :style="{
            background: currentLocale === lang.code ? '#000000' : 'transparent',
            color: '#ffffff',
          }"
        >
          <Icon :icon="lang.flag" class="w-5 h-5 flex-shrink-0" />
          <span>{{ lang.name }}</span>
          <svg
            v-if="currentLocale === lang.code"
            class="w-4 h-4 ml-auto flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    Icon,
  },
  setup() {
    const { locale } = useI18n()
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLElement | null>(null)

    const languages = [
      {
        code: 'de',
        name: 'Deutsch',
        flag: 'circle-flags:de',
      },
      {
        code: 'en',
        name: 'English',
        flag: 'circle-flags:us',
      },
      {
        code: 'fr',
        name: 'Français',
        flag: 'circle-flags:fr',
      },
    ]

    const currentLocale = computed(() => locale.value)

    const getCurrentLanguage = () => {
      return languages.find((lang) => lang.code === currentLocale.value) || languages[0]
    }

    const getCurrentFlag = () => {
      return getCurrentLanguage().flag
    }

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const changeLanguage = (lang: string) => {
      locale.value = lang
      localStorage.setItem('locale', lang)
      isOpen.value = false
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isOpen,
      dropdownRef,
      languages,
      currentLocale,
      getCurrentLanguage,
      getCurrentFlag,
      toggleDropdown,
      changeLanguage,
    }
  },
})
</script>

<style scoped>
.language-switcher {
  min-width: fit-content;
  z-index: 1001;
}

.language-button {
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1001;
}

.language-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-5px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.95);
}

.language-button {
  position: relative;
}

.language-option {
  position: relative;
}

.language-option:hover {
  background: #000000 !important;
}

.language-dropdown {
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
