<template>
  <div class="crt-effect"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

interface CRTEffectProps {
  scanlineIntensity?: number
  curvature?: number
  vignetteIntensity?: number
  chromaticAberration?: number
  noiseIntensity?: number
  flickerIntensity?: number
}

const props = withDefaults(defineProps<CRTEffectProps>(), {
  scanlineIntensity: 0.25,
  curvature: 0.15,
  vignetteIntensity: 0.3,
  chromaticAberration: 0.002,
  noiseIntensity: 0.05,
  flickerIntensity: 0.02,
})
</script>

<style scoped>
.crt-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 200;
  overflow: hidden;
}

/* Scanlines */
.crt-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, v-bind(scanlineIntensity)) 3px,
    rgba(0, 0, 0, v-bind(scanlineIntensity)) 5px
  );
  pointer-events: none;
  animation: scanline-flicker 0.1s infinite;
}

/* Vignette and CRT curvature effect */
.crt-effect::after {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, v-bind(vignetteIntensity)) 100%
  );
  box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.5);
  border-radius: 10% / 5%;
  pointer-events: none;
}

@keyframes scanline-flicker {
  0% {
    opacity: 0.95;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.95;
  }
}

/* Screen curvature simulation - subtle warping at edges */
@media (min-width: 768px) {
  .crt-effect {
    transform: perspective(1000px) rotateX(0deg);
    filter: brightness(0.98) contrast(1.05);
  }
}

/* Subtle glow effect */
.crt-effect {
  box-shadow:
    inset 0 0 100px rgba(255, 255, 255, 0.02),
    inset 0 0 50px rgba(255, 255, 255, 0.01);
}
</style>
