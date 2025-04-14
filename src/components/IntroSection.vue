<!-- IntroSection.vue -->
<template>
  <section
    :id="id"
    class="min-h-screen flex items-center relative overflow-hidden"
  >
    <!-- Hintergrund mit moderner Ästhetik -->
    <div class="absolute inset-0 bg-slate-900">
      <div class="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-400/20"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-violet-600/30 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
    </div>

    <!-- Foreground Elemente mit subtilen Animationen -->
    <div class="container mx-auto px-6 py-12 relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-16">

        <div class="lg:w-1/2 space-y-8 text-white">
          <div class="space-y-4">
            <div class="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-cyan-300 mb-2">
              Portfolio 2025
            </div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Hallo, ich bin <span class="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">Dein Name</span>
            </h1>
            <p class="text-xl text-slate-300 leading-relaxed">Frontend Developer & UI/UX Designer mit einer Leidenschaft für intuitive und immersive Nutzererfahrungen</p>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <a href="#about" class="group relative px-6 py-3 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <span class="relative z-10">Mehr erfahren</span>
              <span class="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
            </a>
            <a href="#contact" class="group relative px-6 py-3 overflow-hidden rounded-full backdrop-blur-md bg-white/10 border border-white/20 font-medium text-white hover:bg-white/20 transition-all duration-300">
              <span class="relative z-10">Kontaktiere mich</span>
            </a>
          </div>

          <div class="flex items-center gap-6 pt-8">
            <a href="#" class="text-slate-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.738.364 1.1.207 1.762 1.342 1.762 2.313v1.5a1.5 1.5 0 01-1.5 1.5h-1.039c-.84 3.313-3.484 5.872-6.861 6.66v2.08a3 3 0 01-3 3h-3a3 3 0 01-3-3v-2.08c-3.377-.788-6.022-3.347-6.861-6.66H2.25a1.5 1.5 0 01-1.5-1.5v-1.5c0-.971.662-2.107 1.762-2.313A19.748 19.748 0 015.25 5.457V5.25zm7.5 0v-.167c0-.414-.336-.75-.75-.75h-3a.75.75 0 00-.75.75V5.25a11.395 11.395 0 012.25-.22c.751 0 1.505.074 2.25.22zM9.5 18.75a.75.75 0 00-.75.75v.75h3v-.75a.75.75 0 00-.75-.75h-1.5zm-1.5.75v.75a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-.75h3a1.5 1.5 0 001.5-1.5v-3a.75.75 0 00-.75-.75H2.25a.75.75 0 00-.75.75v3a1.5 1.5 0 001.5 1.5h5.25z" />
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        <div class="lg:w-1/2 flex justify-center">
          <div class="relative">
            <!-- Glassmorphism Effekt unter dem Profilbild -->
            <div class="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-400/20 rounded-full blur-2xl transform scale-110"></div>

            <!-- 3D-Effekte und bessere Visualisierung -->
            <div class="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <div class="w-full h-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <img src="../assets/me.jpg" alt="Profilbild" class="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700">
              </div>
            </div>

            <!-- Dekorative Elemente -->
            <div class="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-cyan-400 shadow-lg"></div>
            <div class="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-violet-500 shadow-lg"></div>
            <div class="absolute top-1/2 -right-8 w-6 h-6 rounded-full bg-amber-400 shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating elements for modern feel -->
    <div class="hidden md:block absolute top-20 left-20 w-16 h-16 rounded-full border border-white/10 backdrop-blur-xl bg-white/5"></div>
    <div class="hidden md:block absolute bottom-20 right-20 w-24 h-24 rounded-full border border-white/10 backdrop-blur-xl bg-white/5"></div>
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
/* Optional: Füge zusätzliche Animationen für interaktive Elemente hinzu */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* Diese Klasse kann auf Elemente angewendet werden, die "schweben" sollen */
.floating {
  animation: float 6s ease-in-out infinite;
}
</style>
