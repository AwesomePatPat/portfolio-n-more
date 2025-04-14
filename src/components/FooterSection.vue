<template>
  <footer class="relative bg-neutral-950 text-white py-12 overflow-hidden">
    <!-- Moderner Hintergrund mit den gleichen Elementen -->
    <div class="absolute inset-0">
      <!-- Grid-Pattern im Hintergrund -->
      <div class="absolute inset-0 opacity-10">
        <div class="grid-pattern"></div>
      </div>

      <!-- Subtile Farbverläufe -->
      <div class="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
      <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-600/10 to-transparent"></div>

      <!-- Subtile Lichtpunkte -->
      <div class="absolute bottom-0 right-10 w-48 h-48 rounded-full bg-emerald-500/10 filter blur-3xl"></div>
      <div class="absolute top-0 left-10 w-48 h-48 rounded-full bg-indigo-600/10 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-8 md:mb-0 text-center md:text-left">
          <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">Mein Portfolio</h3>
          <p class="mt-2 text-neutral-400">Entwickelt mit Vue.js, TypeScript und Tailwind CSS</p>
        </div>

        <div class="flex space-x-6">
          <a href="#" class="group relative w-10 h-10 rounded-full flex items-center justify-center border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
            <span class="sr-only">GitHub</span>
            <svg class="h-5 w-5 text-neutral-400 group-hover:text-emerald-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
            <div class="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <a href="#" class="group relative w-10 h-10 rounded-full flex items-center justify-center border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-5 w-5 text-neutral-400 group-hover:text-emerald-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
            </svg>
            <div class="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <a href="#" class="group relative w-10 h-10 rounded-full flex items-center justify-center border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
            <span class="sr-only">Twitter</span>
            <svg class="h-5 w-5 text-neutral-400 group-hover:text-emerald-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            <div class="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-neutral-800 text-center text-neutral-400">
        <p>&copy; {{ new Date().getFullYear() }} Mein Portfolio. Alle Rechte vorbehalten.</p>
      </div>
    </div>

    <!-- Dekorative Elemente wie in den anderen Sektionen -->
    <div class="hidden lg:block absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-30">
      <svg width="400" height="2" viewBox="0 0 400 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1H400" stroke="url(#paint0_linear)" stroke-opacity="0.7" />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="1" x2="400" y2="1" gradientUnits="userSpaceOnUse">
            <stop stop-color="#10b981" stop-opacity="0" />
            <stop offset="0.5" stop-color="#6366f1" />
            <stop offset="1" stop-color="#10b981" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterSection'
})
</script>

<style scoped>
/* Grid-Pattern für modernen Tech-Look */
.grid-pattern {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  width: 100%;
  height: 100%;
}
</style>
