<template>
  <header class="sticky top-0 z-50 bg-white shadow-md">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="#home" class="text-2xl font-bold text-primary">Portfolio</a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          class="text-gray-700 hover:text-primary transition-colors duration-300"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- Mobile Navigation Toggle -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden text-gray-700 focus:outline-none"
      >
        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
      </button>
    </nav>

    <!-- Mobile Navigation Menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-white shadow-lg py-2 px-4 absolute w-full"
    >
      <a
        v-for="link in links"
        :key="link.name"
        :href="link.href"
        @click="isMenuOpen = false"
        class="block py-2 text-gray-700 hover:text-primary transition-colors duration-300"
      >
        {{ link.name }}
      </a>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { NavLink } from '../types';

export default defineComponent({
  name: 'AppHeader',
  props: {
    links: {
      type: Array as () => NavLink[],
      required: true,
    },
  },
  setup() {
    const isMenuOpen = ref(false);

    return {
      isMenuOpen,
    };
  },
});
</script>
