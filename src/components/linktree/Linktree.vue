<template>
  <TargetCursor :spin-duration="2" :hide-default-cursor="true" />

  <div class="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
    <div class="max-w-2xl w-full">
      <h1 class="text-6xl font-bold text-center mb-16 text-[#4a5a4a]">My Links.</h1>

      <div class="flex flex-col items-center gap-6">
        <router-link
          to="/"
          class="cursor-target cursor-none px-16 py-6 text-3xl font-bold text-[#4ade80] bg-transparent border-2 border-dashed border-[#4a5a4a] rounded-2xl hover:border-[#4ade80] transition-colors w-full text-center"
        >
          Portfolio
        </router-link>

        <router-link
          to="/valorant"
          class="cursor-target cursor-none px-16 py-6 text-3xl font-bold text-[#4ade80] bg-transparent border-2 border-dashed border-[#4a5a4a] rounded-2xl hover:border-[#4ade80] transition-colors w-full text-center"
        >
          Valorant Roulette
        </router-link>

        <!-- Add more links as needed -->
        <!--
        <router-link
          to="/projects"
          class="cursor-target cursor-none px-16 py-6 text-3xl font-bold text-[#4ade80] bg-transparent border-2 border-dashed border-[#4a5a4a] rounded-2xl hover:border-[#4ade80] transition-colors w-full text-center"
        >
          Projects
        </router-link>
        -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TargetCursor from '../vueBits/Components/TargetCursor/TargetCursor.vue'
</script>
