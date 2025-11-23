<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
.grid-pattern-dark {
  width: 100%;
  height: 100%;
  background-color: #000000;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: 0 0;
}

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

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.05);
}

.hover-glow {
  transition: box-shadow 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

section {
  position: relative;
  z-index: 1;
}
</style>
