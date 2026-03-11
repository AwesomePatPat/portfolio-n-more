<template>
  <div ref="containerRef" class="contact-background">
    <div class="background-layer">
      <Balatro v-if="isReady" :is-rotate="false" :mouse-interaction="false" :pixel-filter="700" />
    </div>
    <div class="content-layer">
      <BounceCards
        :images="images"
        :links="links"
        :container-width="500"
        :container-height="250"
        :animation-delay="0.5"
        :animation-stagger="0.06"
        ease-type="elastic.out(1, 0.8)"
        :transform-styles="transformStyles"
        :enable-hover="true"
        class="custom-bounce-cards"
      />
    </div>
    <div class="effects-layer">
      <CRTEffect v-if="isReady" :scanline-intensity="0.3" :vignette-intensity="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Balatro from '../vueBits/Backgrounds/Balatro/Balatro.vue'
import CRTEffect from './CRTEffect.vue'
import BounceCards from '../vueBits/Components/BounceCards/BounceCards.vue'

const containerRef = ref<HTMLDivElement>()
const isReady = ref(false)

onMounted(async () => {
  // Wait for next tick to ensure DOM is fully rendered with proper height
  await nextTick()
  // Small delay to ensure CSS has been applied
  setTimeout(() => {
    isReady.value = true
  }, 50)
})

const images = [
  '/images/contact/github_joker.png',
  '/images/contact/insta_joker.png',
  '/images/contact/discord_joker.png',
  '/images/contact/email_joker.png',
]

const links = [
  'https://github.com/AwesomePatPat',
  'https://www.instagram.com/paduunknownnumber/',
  'https://discord.com/users/798931505262362654',
  'mailto:patrick1eichhorn@gmail.com',
]

const transformStyles = [
  'rotate(5deg) translate(-150px)',
  'rotate(0deg) translate(-70px)',
  'rotate(-5deg)',
  'rotate(5deg) translate(70px)',
  'rotate(-5deg) translate(150px)',
]
</script>

<style scoped>
.contact-background {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.content-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  pointer-events: none;
}

.custom-bounce-cards {
  z-index: 100;
  pointer-events: auto;
}

.effects-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  pointer-events: none;
}
</style>
