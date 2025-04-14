<!-- AboutSection.vue -->
<template>
  <section
    :id="id"
    class="min-h-screen py-20 relative overflow-hidden"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <!-- Hintergrund mit ähnlicher Ästhetik wie Intro-Sektion -->
    <div class="absolute inset-0 bg-slate-900">
      <div class="absolute inset-0 bg-gradient-to-tl from-violet-500/10 to-cyan-400/10"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full filter blur-3xl translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
    </div>

    <!-- Dekorative Floating-Elemente -->
    <div class="hidden md:block absolute top-40 right-20 w-16 h-16 rounded-full border border-white/10 backdrop-blur-xl bg-white/5 floating"></div>
    <div class="hidden md:block absolute bottom-40 left-20 w-24 h-24 rounded-full border border-white/10 backdrop-blur-xl bg-white/5 floating-delay"></div>

    <!-- Hauptinhalt -->
    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col items-center mb-16">
        <div class="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-cyan-300 mb-4">
          Über mich
        </div>
        <h2 class="text-4xl font-bold text-white text-center mb-2">Meine <span class="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">Geschichte</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-4"></div>
      </div>

      <!-- About Content mit Glassmorphism -->
      <div class="max-w-4xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div class="p-8 md:p-10">
          <!-- Bio-Text mit Styling, das zum Intro passt -->
          <div class="space-y-6 text-slate-300">
            <p class="text-lg leading-relaxed">
              Ich bin ein leidenschaftlicher Web-Entwickler mit über 5 Jahren Erfahrung in der Erstellung moderner,
              benutzerfreundlicher Webanwendungen. Meine Reise begann mit HTML und CSS und führte mich zur Beherrschung
              moderner Frameworks wie <span class="text-cyan-300">Vue.js</span> und <span class="text-violet-400">React</span>.
            </p>
            <p class="text-lg leading-relaxed">
              Mein Ansatz zur Webentwicklung konzentriert sich auf die Erstellung intuitiver, zugänglicher und
              performanter Nutzererfahrungen. Ich liebe es, komplexe Probleme zu lösen und innovative Lösungen zu finden,
              die sowohl technisch solide als auch ästhetisch ansprechend sind.
            </p>
            <p class="text-lg leading-relaxed">
              Wenn ich nicht code, findet man mich beim Wandern, Lesen oder beim Experimentieren mit neuen Technologien,
              um stets auf dem neuesten Stand zu bleiben.
            </p>

            <!-- Call to Action -->
            <div class="pt-6">
              <a href="#projects" class="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <span class="relative z-10">Meine Projekte</span>
                <span class="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Zusätzliche dekorative Elemente -->
    <div class="hidden lg:block absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-30">
      <svg width="800" height="60" viewBox="0 0 800 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 30C200 60 600 60 800 30M0 30C200 0 600 0 800 30M0 30H800" stroke="url(#paint0_linear)" stroke-opacity="0.5" />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="30" x2="800" y2="30" gradientUnits="userSpaceOnUse">
            <stop stop-color="#8B5CF6" stop-opacity="0" />
            <stop offset="0.5" stop-color="#22D3EE" />
            <stop offset="1" stop-color="#8B5CF6" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutSection',
  props: {
    id: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

.floating-delay {
  animation: float 8s ease-in-out infinite;
  animation-delay: 1s;
}
</style>
