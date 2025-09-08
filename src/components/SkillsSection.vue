<!-- SkillsSection.vue -->
<template>
  <section
    :id="id"
    class="py-20 relative"
    ref="skillsSection"
  >
    <!-- Entfernen des vollständigen Hintergrunds, nur lokale Akzente für nahtlosen Übergang -->
    <div class="absolute inset-0 z-0">
      <!-- Lokale Farbakzente die sich mit dem globalen Hintergrund vermischen -->
      <div class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-100/20 filter blur-3xl"></div>
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100/20 filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Überschrift im hellen Design -->
      <div class="flex flex-col items-center mb-16">
        <div class="inline-block px-4 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium text-emerald-600 mb-4 hover-glow">
          Technisches Profil
        </div>
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-2">Erlernte <span class="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Technologien</span></h2>
        <div class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mt-4"></div>
      </div>

      <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" ref="skillsGrid">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          :ref="el => setSkillRef(el, index)"
          class="relative skill-card"
          :class="[
            `skill-card-${skill.color}`,
            { 'animate-in': animatedSkills[index] }
          ]"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="skill-card-content">
            <div class="flex flex-col items-center">
              <!-- Skill icon -->
              <div class="skill-icon">
                <div class="skill-icon-text">
                  {{ getSkillIcon(skill.name) }}
                </div>
                <!-- Subtiler Hintergrund-Effekt -->
                <div class="skill-icon-bg"></div>
              </div>

              <!-- Skill name -->
              <h3 class="skill-name">
                {{ skill.name }}
                <!-- Subtiler Unterstrich -->
                <span class="skill-underline"></span>
              </h3>
            </div>
          </div>

          <!-- Dezenter Hintergrundeffekt -->
          <div class="skill-card-bg" style="translate: 0.5rem 0.5rem;"></div>
        </div>
      </div>

      <!-- Dezente Dekorationselemente mit Animation -->
      <div class="hidden lg:block absolute top-40 right-20 w-16 h-16 float-slow">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-gray-200 rounded-md rotate-45"></div>
          <div class="absolute inset-0 border border-gray-200 rounded-md rotate-[30deg]"></div>
        </div>
      </div>

      <div class="hidden lg:block absolute bottom-40 left-20 w-24 h-24 float-fast">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 border border-gray-200 rounded-full"></div>
          <div class="absolute inset-0 scale-75 border border-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue'
import type { PropType } from 'vue'
import type { Skill } from '../types'

export default defineComponent({
  name: 'SkillsSection',
  props: {
    id: {
      type: String,
      required: true
    },
    skills: {
      type: Array as PropType<Skill[]>,
      required: true
    }
  },
  setup(props) {
    const skillsSection = ref<HTMLElement>()
    const skillsGrid = ref<HTMLElement>()
    const skillRefs = ref<(HTMLElement | null)[]>([])
    const animatedSkills = ref<boolean[]>([])
    const observer = ref<IntersectionObserver | null>(null)

    // Initialize animated skills array
    const initAnimatedSkills = () => {
      animatedSkills.value = new Array(props.skills.length).fill(false)
    }

    // Set skill refs
    const setSkillRef = (el: Element | ComponentPublicInstance | null, index: number) => {
      // Only store if it's an HTMLElement
      if (el instanceof HTMLElement) {
        skillRefs.value[index] = el
      } else {
        skillRefs.value[index] = null
      }
    }

    // Setup intersection observer
    const setupObserver = () => {
      observer.value = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = skillRefs.value.indexOf(entry.target as HTMLElement)
              if (index !== -1 && !animatedSkills.value[index]) {
                // Delay animation based on index
                setTimeout(() => {
                  animatedSkills.value[index] = true
                }, index * 150)
              }
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      // Observe all skill cards
      nextTick(() => {
        skillRefs.value.forEach((ref) => {
          if (ref && observer.value) {
            observer.value.observe(ref)
          }
        })
      })
    }

    onMounted(() => {
      initAnimatedSkills()
      setupObserver()
    })

    onUnmounted(() => {
      if (observer.value) {
        observer.value.disconnect()
      }
    })

    return {
      skillsSection,
      skillsGrid,
      animatedSkills,
      setSkillRef
    }
  },
  methods: {
    // Ein einfaches Icon-System für die Skills
    getSkillIcon(skillName: string): string {
      const iconMap: Record<string, string> = {
        "JavaScript": "JS",
        "TypeScript": "TS",
        "Vue.js": "Vue",
        "Node.js": "Node",
        "HTML": "</>",
        "SQL": "SQL",
        "Git": "🐺",
        "Docker": "🐳",
        "AWS": "AWS",
        "Firebase": "🔥",
        "Tailwind CSS": "🍃",
        "CSS": "CSS",
        "Express.js": "Ex",
        "Nest.js": "🦁",
        "Angular": "A",
        "Nuxt.js": "N",
        "Java": "☕",
        "Springboot": "SB",
      };

      return iconMap[skillName] || "•";
    }
  }
})
</script>

<style scoped>
/* Hover-Glow Effekt für den Technisches Profil Badge */
.hover-glow {
  transition: box-shadow 0.3s ease;
}
.hover-glow:hover {
  box-shadow: 0 0 10px 0 rgba(16, 185, 129, 0.3);
}

/* Skill Card Base Styling - Einheitliche Animation für alle */
.skill-card {
  opacity: 0;
  transform: translateY(50px) scale(0.8);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Einheitliche Animation für alle Skills */
.skill-card.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.skill-card-content {
  background-color: white;
  border: 1px solid #e5e7eb;
  padding: 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.skill-card:hover .skill-card-content {
  transform: translate(-0.25rem, -0.25rem);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Skill Icon Styling */
.skill-icon {
  position: relative;
  border-radius: 9999px;
  background-color: #f9fafb;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.skill-card:hover .skill-icon {
  background-color: rgba(16, 185, 129, 0.1);
}

.skill-icon-text {
  font-size: 1.25rem;
  color: #10b981;
  position: relative;
  z-index: 10;
  transition: transform 0.3s ease;
}

.skill-card:hover .skill-icon-text {
  transform: scale(1.1);
}

.skill-icon-bg {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  opacity: 0;
  transform: scale(0);
  transition: all 0.5s ease;
}

.skill-card:hover .skill-icon-bg {
  opacity: 1;
  transform: scale(1);
}

/* Skill Name Styling */
.skill-name {
  color: #1f2937;
  font-weight: 500;
  text-align: center;
  position: relative;
}

.skill-underline {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0.125rem;
  background-color: #10b981;
  transition: width 0.3s ease;
}

.skill-card:hover .skill-underline {
  width: 100%;
}

/* Skill Card Background Styling */
.skill-card-bg {
  position: absolute;
  inset: 0;
  z-index: -10;
  border-radius: 0.75rem;
  transition: transform 0.3s ease;
}

.skill-card:hover .skill-card-bg {
  transform: translate(0.5rem, 0.5rem);
}

/* Background colors for different skill types */
.skill-card-emerald .skill-card-bg {
  background-color: rgba(16, 185, 129, 0.1);
}

.skill-card-blue .skill-card-bg {
  background-color: rgba(59, 130, 246, 0.1);
}

.skill-card-indigo .skill-card-bg {
  background-color: rgba(99, 102, 241, 0.1);
}

.skill-card-purple .skill-card-bg {
  background-color: rgba(139, 92, 246, 0.1);
}

.skill-card-pink .skill-card-bg {
  background-color: rgba(236, 72, 153, 0.1);
}

/* Fallback for any other colors */
[class*="skill-card-"] .skill-card-bg {
  background-color: rgba(16, 185, 129, 0.1);
}

/* Floating animations for decorative elements */
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
</style>
