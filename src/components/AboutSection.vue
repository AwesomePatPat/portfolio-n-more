<!-- AboutSection.vue -->
<template>
  <section
    :id="id"
    class="min-h-screen py-20 relative overflow-hidden"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <!-- Moderner Hintergrund im gleichen Stil wie Intro-Sektion -->
    <div class="absolute inset-0 bg-neutral-950">
      <!-- Modernes Grid-Pattern im Hintergrund -->
      <div class="absolute inset-0 opacity-10">
        <div class="grid-pattern"></div>
      </div>

      <!-- Subtile Farbverläufe im gleichen Stil -->
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-indigo-600/10 to-transparent"></div>

      <!-- Farbige Lichtpunkte für eine moderne Aura -->
      <div class="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-emerald-500/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl"></div>
    </div>

    <!-- Hauptinhalt -->
    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col items-center mb-16">
        <!-- Badge im gleichen Stil -->
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 text-sm font-medium text-emerald-400 mb-4">
          <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>Über mich</span>
        </div>
        <h2 class="text-4xl font-bold text-white text-center mb-2">Meine <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">Geschichte</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full mt-4"></div>
      </div>

      <!-- About Content mit modernem Design -->
      <div class="max-w-4xl mx-auto backdrop-blur-md bg-neutral-800/30 border border-neutral-700/50 rounded-2xl overflow-hidden shadow-xl">
        <div class="p-8 md:p-10">
          <!-- Bio-Text mit Styling, das zum Intro passt -->
          <div class="space-y-6 text-neutral-300">
            <p class="text-lg leading-relaxed">
              Ich bin ein leidenschaftlicher Web-Entwickler mit über 5 Jahren Erfahrung in der Erstellung moderner,
              benutzerfreundlicher Webanwendungen. Meine Reise begann mit HTML und CSS und führte mich zur Beherrschung
              moderner Frameworks wie <span class="text-emerald-400">Vue.js</span> und <span class="text-indigo-400">React</span>.
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

            <!-- Call to Action im gleichen Stil wie Intro -->
            <div class="pt-6">
              <a
                href="#projects"
                class="group relative px-6 py-3 rounded-md bg-emerald-500 text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden inline-flex items-center"
              >
                <span class="relative z-10">Meine Projekte</span>
                <span class="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dekorative Elemente im Stil der Intro-Sektion -->
    <div class="hidden lg:block absolute bottom-20 left-10 w-24 h-24">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-neutral-800 rounded-full"></div>
        <div class="absolute inset-0 scale-75 border border-neutral-800 rounded-full"></div>
        <div class="absolute inset-0 scale-50 border border-neutral-800 rounded-full"></div>
      </div>
    </div>

    <div class="hidden lg:block absolute top-20 right-10 w-32 h-32">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-45"></div>
        <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-[30deg]"></div>
        <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-[60deg]"></div>
      </div>
    </div>

    <!-- Leichte schwebende Elemente für einen dynamischen Look -->
    <div class="hidden md:block absolute top-40 right-20 w-16 h-16 rounded-full border border-neutral-700/50 backdrop-blur-xl bg-neutral-800/20 float-slow"></div>
    <div class="hidden md:block absolute bottom-40 left-20 w-24 h-24 rounded-full border border-neutral-700/50 backdrop-blur-xl bg-neutral-800/20 float-fast"></div>
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
/* Grid-Pattern für modernen Tech-Look */
.grid-pattern {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  width: 100%;
  height: 100%;
}

/* Subtile Keyframe-Animationen für schwebende Elemente */
@keyframes floatSlow {
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-15px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0); }
}

@keyframes floatFast {
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-8px) rotate(-2deg); }
  100% { transform: translateY(0) rotate(0); }
}

.float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}

.float-fast {
  animation: floatFast 5s ease-in-out infinite;
}
</style>
