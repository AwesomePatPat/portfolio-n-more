<!-- IntroSection.vue -->
<template>
  <section
    :id="id"
    class="min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <!-- Neuer moderner Hintergrund mit Verlaufseffekten -->
    <div class="absolute inset-0 bg-neutral-950">
      <!-- Modernes Grid-Pattern im Hintergrund -->
      <div class="absolute inset-0 opacity-10">
        <div class="grid-pattern"></div>
      </div>

      <!-- Subtile Farbverläufe für ein weiches Ambiente -->
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-indigo-600/10 to-transparent"></div>

      <!-- Farbige Lichtpunkte für eine moderne Aura -->
      <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-500/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl"></div>
    </div>

    <!-- Hauptinhalt mit minimalistischem, modernem Ansatz -->
    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <!-- Linke Seite: Profilbild mit modernem Design -->
        <div class="order-2 lg:order-1 flex justify-center">
          <div class="relative group">
            <!-- Hauptbild mit scharfem, klarem Design -->
            <div class="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-xl transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 bg-neutral-900/80 backdrop-blur-sm">
              <div class="aspect-square w-72 md:w-80 lg:w-96 overflow-hidden relative">
                <img
                  src="../assets/me.jpg"
                  alt="Profilbild"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                >

                <!-- Moderner Overlay-Effekt -->
                <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-indigo-600/10 mix-blend-overlay"></div>
              </div>
            </div>

            <!-- Hintergrundformen für Tiefe -->
            <div class="absolute inset-0 -z-10 rounded-2xl bg-emerald-500/20 translate-x-4 translate-y-4 transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>

            <!-- Dekorative Elemente -->
            <div class="absolute -top-3 -left-3 w-6 h-6 rounded-md bg-emerald-500 shadow-lg"></div>
            <div class="absolute -bottom-3 -right-3 w-6 h-6 rounded-md bg-indigo-600 shadow-lg"></div>

            <!-- Gestrichelte Linien für ein technischeres Aussehen -->
            <div class="absolute -top-1 -right-1 w-12 h-12 border-t-2 border-r-2 border-neutral-400/20 rounded-tr-lg"></div>
            <div class="absolute -bottom-1 -left-1 w-12 h-12 border-b-2 border-l-2 border-neutral-400/20 rounded-bl-lg"></div>
          </div>
        </div>

        <!-- Rechte Seite: Text und Aktionsschaltflächen -->
        <div class="order-1 lg:order-2 text-white space-y-8">
          <!-- Badge mit minimalistischem Design -->
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 text-sm font-medium text-emerald-400">
            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span>Portfolio 2025</span>
          </div>

          <!-- Headline mit schärferem, klarerem Typografiedesign -->
          <div class="space-y-4">
            <h1 class="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Hallo, ich bin <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">Dein Name</span>
            </h1>
            <p class="text-xl text-neutral-400 leading-relaxed max-w-xl">
              Frontend Developer & UI/UX Designer mit Fokus auf minimalistische und nutzerzentrierte Designlösungen
            </p>
          </div>

          <!-- Key Skills mit modernem Badge-Design -->
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 text-sm text-white">Vue.js</span>
            <span class="px-3 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 text-sm text-white">React</span>
            <span class="px-3 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 text-sm text-white">UX Design</span>
            <span class="px-3 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 text-sm text-white">TailwindCSS</span>
          </div>

          <!-- CTA Buttons mit cleanerem Design -->
          <div class="flex flex-wrap gap-4 pt-4">
            <a
              href="#about"
              class="group relative px-6 py-3 rounded-md bg-emerald-500 text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span class="relative z-10">Mehr erfahren</span>
              <span class="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
            <a
              href="#contact"
              class="group relative px-6 py-3 rounded-md bg-transparent border border-neutral-700 text-white font-medium transition-all duration-300 hover:border-emerald-500/50 hover:bg-neutral-800/50"
            >
              <span>Kontaktiere mich</span>
            </a>
          </div>

          <!-- Social Icons mit minimalistischem Design -->
          <div class="flex items-center gap-6 pt-6">
            <a href="#" class="text-neutral-500 hover:text-emerald-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="#" class="text-neutral-500 hover:text-emerald-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" class="text-neutral-500 hover:text-emerald-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-neutral-500 hover:text-emerald-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.738.364 1.1.207 1.762 1.342 1.762 2.313v1.5a1.5 1.5 0 01-1.5 1.5h-1.039c-.84 3.313-3.484 5.872-6.861 6.66v2.08a3 3 0 01-3 3h-3a3 3 0 01-3-3v-2.08c-3.377-.788-6.022-3.347-6.861-6.66H2.25a1.5 1.5 0 01-1.5-1.5v-1.5c0-.971.662-2.107 1.762-2.313A19.748 19.748 0 015.25 5.457V5.25zm7.5 0v-.167c0-.414-.336-.75-.75-.75h-3a.75.75 0 00-.75.75V5.25a11.395 11.395 0 012.25-.22c.751 0 1.505.074 2.25.22zM9.5 18.75a.75.75 0 00-.75.75v.75h3v-.75a.75.75 0 00-.75-.75h-1.5zm-1.5.75v.75a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-.75h3a1.5 1.5 0 001.5-1.5v-3a.75.75 0 00-.75-.75H2.25a.75.75 0 00-.75.75v3a1.5 1.5 0 001.5 1.5h5.25z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Floating elements with minimal modern design -->
    <div class="hidden lg:block absolute top-20 left-10 w-32 h-32">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-45"></div>
        <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-[30deg]"></div>
        <div class="absolute inset-0 border border-neutral-800 rounded-md rotate-[60deg]"></div>
      </div>
    </div>

    <div class="hidden lg:block absolute bottom-20 right-10 w-24 h-24">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-neutral-800 rounded-full"></div>
        <div class="absolute inset-0 scale-75 border border-neutral-800 rounded-full"></div>
        <div class="absolute inset-0 scale-50 border border-neutral-800 rounded-full"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IntroSection',
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
