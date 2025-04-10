<template>
  <section id="home" class="relative py-20 md:py-32 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Hallo, ich bin <span class="text-yellow-300">Max Mustermann</span>
        </h1>
        <h2 class="text-2xl md:text-3xl mb-8">Full-Stack Web Developer</h2>
        <p class="text-lg md:text-xl mb-10">
          Ich entwickle moderne Web-Anwendungen mit Leidenschaft für UX/UI Design und sauberen Code.
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="#projects"
            class="px-8 py-3 bg-white text-blue-600 rounded-full shadow-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Meine Projekte
          </a>
          <a
            href="#contact"
            class="px-8 py-3 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
          >
            Kontakt
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroSection',
});
</script>
