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
      <!-- Lokale Farbakzente, die sich mit dem globalen Hintergrund vermischen -->
      <div class="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-emerald-100/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-100/20 filter blur-3xl"></div>
    </div>

    <!-- Hauptinhalt -->
    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col items-center mb-16">
        <!-- Überschrift im hellen Design -->
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium text-emerald-600 mb-4 hover-glow">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span>Über mich</span>
        </div>
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-2">Meine <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Geschichte</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mt-4"></div>
      </div>

      <!-- About Content mit hellem Design und verbesserten Hover-Effekten -->
      <div class="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover-lift">
        <div class="p-8 md:p-10">
          <!-- Bio-Text -->
          <div class="space-y-6 text-gray-700">
            <p class="text-lg leading-relaxed">
              Ich bin ein motivierter Entwickler mit Erfahrung in der Erstellung
              benutzerfreundlicher Webanwendungen. Meine Reise begann mit HTML und CSS und führte mich zur Beherrschung
              moderner Frameworks wie <span class="text-emerald-600 tech-highlight">Vue.js</span> und <span class="text-blue-600 tech-highlight">Express.js</span>.
            </p>
            <p class="text-lg leading-relaxed">
              In meinem ersten Programmier-Projekt bei Swisscom hatte ich die möglichkeit die basic skills wie HTML, CSS und JavaScript zu lernen.
              Später im Projekt habe ich dann den ersten Einblick in das Framework Angular bekommen.
            </p>
            <p class="text-lg leading-relaxed">
              In späteren Projekten habe ich dann mit Vue.js und Express.js gearbeitet. Ich hatte auch die möglichkeit andere Lernende zu betreuen und ihnen men wissen weiterzugeben als rolle eines Projekt Anbieters.

            </p>

            <!-- Call to Action mit verbessertem Hover-Effekt -->
            <div class="pt-6">
              <a
                href="#projects"
                class="cta-button group relative px-6 py-3 rounded-md bg-emerald-500 text-white font-medium shadow-md inline-flex items-center overflow-hidden"
              >
                <span class="relative z-10">Meine Projekte</span>
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
        <div class="absolute inset-0 border border-gray-200 rounded-full"></div>
        <div class="absolute inset-0 scale-75 border border-gray-200 rounded-full"></div>
        <div class="absolute inset-0 scale-50 border border-gray-200 rounded-full"></div>
      </div>
    </div>

    <div class="hidden lg:block absolute top-20 right-10 w-32 h-32 float-slow">
      <div class="relative w-full h-full">
        <div class="absolute inset-0 border border-gray-200 rounded-md rotate-45"></div>
        <div class="absolute inset-0 border border-gray-200 rounded-md rotate-[30deg]"></div>
        <div class="absolute inset-0 border border-gray-200 rounded-md rotate-[60deg]"></div>
      </div>
    </div>

    <!-- Leichte schwebende Elemente -->
    <div class="hidden md:block absolute top-40 right-20 w-16 h-16 rounded-full border border-gray-200 bg-white/50 float-slow"></div>
    <div class="hidden md:block absolute bottom-40 left-20 w-24 h-24 rounded-full border border-gray-200 bg-white/50 float-fast"></div>
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
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
}

/* Lift-Effekt für die Biokarte */
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Hervorhebung für Technologie-Namen */
.tech-highlight:hover {
  transition: color 0.3s ease;
}

.tech-highlight.text-emerald-600:hover {
  color: #059669; /* emerald-500 */
}

.tech-highlight.text-blue-600:hover {
  color: #3b82f6; /* blue-500 */
}

/* CTA-Button Hover-Effekte */
.cta-button {
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #059669; /* emerald-600 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
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
  background-color: rgba(255, 255, 255, 0.2);
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
