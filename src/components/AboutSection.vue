<!-- AboutSection.vue -->
<template>
  <section
    :id="id"
    class="py-20 relative"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <!-- Lokale Akzente, aber kein vollständiger Hintergrund mehr -->
    <div class="absolute inset-0 z-0">
      <!-- Removed colored gradients for dark theme -->
    </div>

    <!-- Hauptinhalt -->
    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col items-center mb-16">
        <!-- Überschrift im hellen Design -->
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white mb-4 hover-glow">
          <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span>{{ $t('about.badge') }}</span>
        </div>
        <h2 class="text-4xl font-bold text-white text-center mb-2">{{ $t('about.title') }} <span class="text-white">{{ $t('about.titleHighlight') }}</span></h2>
        <div class="w-24 h-1 bg-blue-500 rounded-full mt-4"></div>
      </div>

      <!-- About Content mit hellem Design und verbesserten Hover-Effekten -->
      <div class="max-w-4xl mx-auto bg-black/50 border border-white/20 rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover-lift">
        <div class="p-8 md:p-10">
          <!-- Bio-Text -->
          <div class="space-y-6 text-white/80">
            <p class="text-lg leading-relaxed">
              {{ $t('about.paragraph1', { vue: 'Vue.js', express: 'Express.js' }) }}
            </p>
            <p class="text-lg leading-relaxed">
              {{ $t('about.paragraph2') }}
            </p>
            <p class="text-lg leading-relaxed">
              {{ $t('about.paragraph3') }}
            </p>

            <!-- Call to Action mit verbessertem Hover-Effekt -->
            <div class="pt-6">
              <a
                href="#projects"
                class="cta-button group relative px-6 py-3 rounded-md bg-blue-600 text-white font-medium shadow-md inline-flex items-center overflow-hidden"
              >
                <span class="relative z-10">{{ $t('about.cta') }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 relative z-10 arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <!-- Ripple-Effekt beim Hover -->
                <span class="ripple-overlay"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dekorative Elemente im hellen Design -->
    <div class="hidden lg:block absolute bottom-20 left-10 w-24 h-24 float-slow">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-white/20 rounded-full"></div>
        <div class="absolute inset-0 scale-75 border border-white/20 rounded-full"></div>
        <div class="absolute inset-0 scale-50 border border-white/20 rounded-full"></div>
      </div>
    </div>

    <div class="hidden lg:block absolute top-20 right-10 w-32 h-32 float-slow">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-white/20 rounded-md rotate-45"></div>
        <div class="absolute inset-0 border border-white/20 rounded-md rotate-[30deg]"></div>
        <div class="absolute inset-0 border border-white/20 rounded-md rotate-[60deg]"></div>
      </div>
    </div>

    <!-- Leichte schwebende Elemente -->
    <div class="hidden md:block absolute top-40 right-20 w-16 h-16 rounded-full border border-blue-500/30 bg-blue-500/10 float-slow"></div>
    <div class="hidden md:block absolute bottom-40 left-20 w-24 h-24 rounded-full border border-blue-500/30 bg-blue-500/10 float-fast"></div>
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
/* Hover-Effekte für verschiedene Elemente */

/* Glow-Effekt für die Überschrift "Über mich" */
.hover-glow:hover {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
  border-color: rgba(59, 130, 246, 0.4);
}

/* Lift-Effekt für die Biokarte */
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 255, 255, 0.1);
}

/* Hervorhebung für Technologie-Namen */
.tech-highlight:hover {
  transition: color 0.3s ease;
}

.tech-highlight.text-white:hover {
  color: #ffffff;
}

/* CTA-Button Hover-Effekte */
.cta-button {
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: rgb(29, 78, 216);
  box-shadow: 0 10px 25px -3px rgba(37, 99, 235, 0.5), 0 10px 10px -5px rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

/* Arrow Icon Animation in CTA Button */
.arrow-icon {
  transition: transform 0.3s ease;
}

.group:hover .arrow-icon {
  transform: translateX(4px);
}

/* Ripple-Overlay für den Button */
.ripple-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: rgba(29, 78, 216, 0.3);
  transition: all 0.5s ease;
}

.group:hover .ripple-overlay {
  height: 100%;
}

/* Ripple-Effekt für Buttons */
@keyframes ripple {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  background-color: rgba(255, 255, 255, 0.4);
}

/* Floating-Animationen für dekorative Elemente */
.float-slow {
  animation: float 6s ease-in-out infinite;
}

.float-fast {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
