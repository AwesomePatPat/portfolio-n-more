<template>
  <section
    :id="id"
    class="min-h-screen flex items-center justify-center relative py-10"
  >
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-100/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-100/20 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div class="order-2 lg:order-1 flex justify-center">
          <div class="relative group cursor-pointer">
            <div class="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md profile-image-container bg-white">
              <div class="aspect-square w-72 md:w-80 lg:w-96 overflow-hidden relative">
                <img
                  src="../assets/me.jpg"
                  alt="Profilbild"
                  class="w-full h-full object-cover profile-image"
                >

                <div class="overlay-effect absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-blue-500/0"></div>

                <div class="border-effect absolute inset-0 border-0 rounded-xl"></div>
              </div>
            </div>

            <div class="bg-shape absolute inset-0 -z-10 rounded-2xl bg-emerald-100/50 translate-x-4 translate-y-4"></div>

            <div class="decor-1 absolute -top-3 -left-3 w-6 h-6 rounded-md bg-emerald-500 shadow-md"></div>
            <div class="decor-2 absolute -bottom-3 -right-3 w-6 h-6 rounded-md bg-blue-500 shadow-md"></div>

            <div class="line-1 absolute -top-1 -right-1 w-12 h-12 border-t-2 border-r-2 border-gray-200 rounded-tr-lg"></div>
            <div class="line-2 absolute -bottom-1 -left-1 w-12 h-12 border-b-2 border-l-2 border-gray-200 rounded-bl-lg"></div>
          </div>
        </div>

        <div class="order-1 lg:order-2 text-gray-800 space-y-8">
          <div class="badge inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium text-emerald-600">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Portfolio 2025</span>
          </div>

          <div class="space-y-4">
            <h1 class="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Hallo, ich bin <span class="name-gradient text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500 relative">
                Patrick
                <span class="name-underline block h-1 w-0 bg-gradient-to-r from-emerald-500/50 to-blue-500/50"></span>
              </span>
            </h1>
            <p class="text-xl text-gray-600 leading-relaxed max-w-xl">
              Ich bin 17 Jahre alt und zurzeit in meinem zweiten Lehrjahr als Applikationsentwickler EFZ. Ich habe im Sommer 2023 meine Lehre bei Swisscom (Schweiz) AG gestartet.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="skill-badge px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-800">Vue.js</span>
            <span class="skill-badge px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-800">Express.js</span>
            <span class="skill-badge px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-800">Design</span>
            <span class="skill-badge px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-800">TailwindCSS</span>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <a
              href="#about"
              class="cta-button relative px-6 py-3 rounded-md bg-emerald-500 text-white font-medium shadow-md overflow-hidden"
            >
              <span class="relative z-10">Mehr erfahren</span>
              <span class="btn-overlay absolute inset-0 w-full h-0 bg-white/20"></span>
            </a>
          </div>
        </div>

      </div>
    </div>

    <div class="hidden lg:block absolute top-20 left-10 w-32 h-32 float-slow">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-gray-200 rounded-md rotate-45"></div>
        <div class="absolute inset-0 border border-gray-200 rounded-md rotate-[30deg]"></div>
        <div class="absolute inset-0 border border-gray-200 rounded-md rotate-[60deg]"></div>
      </div>
    </div>

    <div class="hidden lg:block absolute bottom-20 right-10 w-24 h-24 float-fast">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-gray-200 rounded-full"></div>
        <div class="absolute inset-0 scale-75 border border-gray-200 rounded-full"></div>
        <div class="absolute inset-0 scale-50 border border-gray-200 rounded-full"></div>
      </div>
    </div>

    <div class="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <p class="text-gray-500 text-sm mb-2">Scroll für mehr</p>
      <div class="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
        <div class="w-1 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
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

<style>
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.profile-image-container {
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .profile-image-container {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateX(4px) translateY(-4px);
}

.profile-image {
  transition-property: all;
  transition-duration: 700ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .profile-image {
  transform: scale(1.02);
}

.overlay-effect {
  opacity: 0;
  transition-property: all;
  transition-duration: 700ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .overlay-effect {
  opacity: 0.3;
  --tw-gradient-from: rgba(16, 185, 129, 0.2);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  --tw-gradient-to: rgba(59, 130, 246, 0.2);
}

.border-effect {
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .border-effect {
  border-width: 4px;
  border-color: rgba(255, 255, 255, 0.3);
}

.bg-shape {
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .bg-shape {
  transform: translateX(16px) translateY(16px);
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
  --tw-gradient-from: rgba(16, 185, 129, 0.4);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  --tw-gradient-to: rgba(59, 130, 246, 0.4);
}

.decor-1, .decor-2 {
  transition-property: transform;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .decor-1 {
  transform: rotate(45deg) scale(1.1);
}

.group:hover .decor-2 {
  transform: rotate(-45deg) scale(1.1);
}

.line-1, .line-2 {
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .line-1 {
  border-color: rgba(167, 243, 208, 1);
  width: 4rem;
  height: 4rem;
}

.group:hover .line-2 {
  border-color: rgba(191, 219, 254, 1);
  width: 4rem;
  height: 4rem;
}

.badge {
  transition-property: background-color;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.badge:hover {
  background-color: rgba(16, 185, 129, 0.1);
}

.skill-badge {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-badge:hover {
  transform: translateY(-4px);
  background-color: rgba(16, 185, 129, 0.1);
  border-color: rgba(167, 243, 208, 1);
  color: rgba(4, 120, 87, 1);
}

.skill-badge:nth-child(1):hover {
  background-color: rgba(16, 185, 129, 0.1);
  border-color: rgba(167, 243, 208, 1);
  color: rgba(4, 120, 87, 1);
}

.skill-badge:nth-child(2):hover {
  background-color: rgba(59, 130, 246, 0.1);
  border-color: rgba(191, 219, 254, 1);
  color: rgba(29, 78, 216, 1);
}

.skill-badge:nth-child(3):hover {
  background-color: rgba(139, 92, 246, 0.1);
  border-color: rgba(221, 214, 254, 1);
  color: rgba(109, 40, 217, 1);
}

.skill-badge:nth-child(4):hover {
  background-color: rgba(6, 182, 212, 0.1);
  border-color: rgba(165, 243, 252, 1);
  color: rgba(14, 116, 144, 1);
}

.cta-button {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-button:hover {
  background-color: rgba(5, 150, 105, 1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.btn-overlay {
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-button:hover .btn-overlay {
  height: 100%;
}

.name-underline {
  transition-property: all;
  transition-duration: 700ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.name-gradient:hover .name-underline {
  width: 100%;
}
</style>
