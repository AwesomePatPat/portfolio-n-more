<template>
  <div class="min-h-screen bg-black relative">
    <div class="fixed inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0">
        <div class="grid-pattern-dark"></div>
      </div>
    </div>

    <NavigationBar :navItems="navItems" />

    <div class="relative z-10">
      <IntroSection id="intro" />
      <AboutSection id="about" />
      <SkillsSection id="skills" :skills="skills" />
      <LanguagesSection id="languages" :languages="languages" />
      <ProjectsSection id="projects" :projects="projects" />
      <ErfolgeSection id="erfolge" :erfolge="erfolge" />
    </div>

    <SplashCursor
      :SIM_RESOLUTION="128"
      :DYE_RESOLUTION="1024"
      :DENSITY_DISSIPATION="3"
      :VELOCITY_DISSIPATION="2"
      :PRESSURE="0.6"
      :CURL="3.5"
      :SPLAT_RADIUS="0.12"
      :SPLAT_FORCE="3500"
      :TRANSPARENT="true"
      :BACK_COLOR="{ r: 0, g: 0, b: 0 }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationBar from '../components/NavigationBar.vue'
import IntroSection from '../components/IntroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import LanguagesSection from '../components/LanguagesSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ErfolgeSection from '../components/ErfolgeSection.vue'
import SplashCursor from '../components/vueBits/Animations/SplashCursor/SplashCursor.vue'
import type { Skill, Language, Project, Erfolg, NavItem } from '../types'

export default defineComponent({
  name: 'HomeView',
  components: {
    NavigationBar,
    IntroSection,
    AboutSection,
    SkillsSection,
    LanguagesSection,
    ProjectsSection,
    ErfolgeSection,
    SplashCursor,
  },
  setup() {
    const { t, tm } = useI18n()

    const navItems = computed<NavItem[]>(() => [
      { id: 'intro', name: t('nav.intro') },
      { id: 'about', name: t('nav.about') },
      { id: 'skills', name: t('nav.skills') },
      { id: 'languages', name: t('nav.languages') },
      { id: 'projects', name: t('nav.projects') },
      { id: 'erfolge', name: t('nav.erfolge') },
    ])

    const skills = ref<Skill[]>([
      { name: 'Angular', color: 'blue' },
      { name: 'AWS', color: 'orange' },
      { name: 'CSS', color: 'green' },
      { name: 'Docker', color: 'blue' },
      { name: 'Express.js', color: 'purple' },
      { name: 'Firebase', color: 'yellow' },
      { name: 'Git', color: 'blue' },
      { name: 'HTML', color: 'green' },
      { name: 'Java', color: 'purple' },
      { name: 'JavaScript', color: 'yellow' },
      { name: 'MCP', color: 'purple' },
      { name: 'Nest.js', color: 'yellow' },
      { name: 'Next.js', color: 'gray' },
      { name: 'Node.js', color: 'gray' },
      { name: 'Nuxt.js', color: 'purple' },
      { name: 'OpenTofu', color: 'green' },
      { name: 'React', color: 'blue' },
      { name: 'Springboot', color: 'purple' },
      { name: 'SQL', color: 'green' },
      { name: 'Tailwind CSS', color: 'cyan' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Vue.js', color: 'emerald' },
    ])

    const languages = computed<Language[]>(() => {
      const langList = tm('languages.list') as Array<{ name: string; level: string }>
      return langList.map((lang) => ({
        name: lang.name,
        level: lang.level,
      }))
    })

    const technologiesMap: { [key: number]: string[] } = {
      1: ['Windows', 'Android', 'Fiori', 'eNex', 'MS Teams', 'MS Office'],
      2: ['Angular', 'Java Script', 'Type Script', 'CSS', 'HTML', 'Git', 'Scrum', 'Jira'],
      3: ['Kommunikation', 'Networking'],
      4: ['Vue.js', 'Nuxt.js', 'Type Script', 'sAFE', 'Prisma', 'Jira'],
      5: ['Vue.js', 'Express.js', 'Type Script', 'PowerApps', 'Sharepoint', 'PowerAutomate'],
      6: [
        'Vue.js',
        'Nest.js',
        'Type Script',
        'PowerApps',
        'Sharepoint',
        'PowerAutomate',
        'Docker',
        'Git',
        'Prisma',
        'iAPC',
      ],
      7: ['Java', 'Springboot', 'AWS', 'MCP', 'AI'],
      8: ['python', 'pandas'],
      9: ['?', '?', '?'],
    }

    const iconsMap: { [key: number]: string } = {
      1: 'home',
      2: 'code',
      3: 'heart',
      4: 'chip',
      5: 'terminal',
      6: 'clipboard-list',
      7: 'server',
      8: 'ai-challenge',
      9: 'mini-net',
    }

    const projects = computed<Project[]>(() => {
      const projectsList = tm('projects.list') as Array<{
        id: number
        title: string
        description: string
        longDescription: string
        provider?: string
        startDate: string
        endDate: string
        erfolgId?: number
      }>
      return projectsList.map((proj) => ({
        id: proj.id,
        title: proj.title,
        description: proj.description,
        longDescription: proj.longDescription,
        provider: proj.provider,
        technologies: technologiesMap[proj.id] || [],
        startDate: proj.startDate,
        endDate: proj.endDate,
        icon: iconsMap[proj.id] || 'star',
        erfolgId: proj.erfolgId,
      }))
    })

    const erfolge = computed<Erfolg[]>(() => {
      const erfolgeList = tm('erfolge.list') as Array<{
        id: number
        title: string
        description: string
        longDescription?: string
        category?: string
        date?: string
        images?: string[]
        achievements?: string[]
        links?: Array<{
          type: 'linkedin' | 'instagram' | 'youtube' | 'twitter' | 'website' | 'github' | 'facebook'
          url: string
          label?: string
        }>
      }>
      return erfolgeList.map((erfolg) => ({
        id: erfolg.id,
        title: erfolg.title,
        description: erfolg.description,
        longDescription: erfolg.longDescription,
        category: erfolg.category,
        date: erfolg.date,
        images: erfolg.images || [],
        achievements: erfolg.achievements || [],
        links: erfolg.links || [],
        icon: getErfolgIcon(erfolg.id),
      }))
    })

    function getErfolgIcon(id: number): string {
      const icons: { [key: number]: string } = {
        1: 'trophy',
        2: 'code',
        3: 'academic-cap',
        4: 'badge-check',
        5: 'sparkles',
      }
      return icons[id] || 'star'
    }

    return {
      navItems,
      skills,
      languages,
      projects,
      erfolge,
    }
  },
})
</script>

<style scoped>
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
</style>
