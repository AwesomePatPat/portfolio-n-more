<template>
  <div class="min-h-screen bg-white">
    <NavigationBar :navItems="navItems" />

    <IntroSection id="intro" />
    <AboutSection id="about" />
    <SkillsSection id="skills" :skills="skills" />
    <LanguagesSection id="languages" :languages="languages" />
    <ProjectsSection id="projects" :projects="projects" />

    <FooterSection />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import IntroSection from './components/IntroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import LanguagesSection from './components/LanguagesSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import FooterSection from './components/FooterSection.vue'
import type { Skill, Language, Project, NavItem } from './types'

export default defineComponent({
  name: 'App',
  components: {
    NavigationBar,
    IntroSection,
    AboutSection,
    SkillsSection,
    LanguagesSection,
    ProjectsSection,
    FooterSection
  },
  setup() {
    const navItems = ref<NavItem[]>([
      { id: 'intro', name: 'Start' },
      { id: 'about', name: 'Über mich' },
      { id: 'skills', name: 'Fähigkeiten' },
      { id: 'languages', name: 'Sprachen' },
      { id: 'projects', name: 'Projekte' }
    ])

    const skills = ref<Skill[]>([
      { name: 'Vue.js', level: 90, color: 'emerald' },
      { name: 'TypeScript', level: 85, color: 'blue' },
      { name: 'Tailwind CSS', level: 80, color: 'cyan' },
      { name: 'Node.js', level: 75, color: 'green' },
      { name: 'React', level: 70, color: 'indigo' }
    ])

    const languages = ref<Language[]>([
      { name: 'Deutsch', level: 'Muttersprache' },
      { name: 'Englisch', level: 'Fliessend' },
      { name: 'Französisch', level: 'Grundkenntnisse' }
    ])

    const projects = ref<Project[]>([
      {
        id: 1,
        title: 'E-Commerce Shop',
        description: 'Ein moderner Online-Shop mit Vue 3, Typescript und Pinia',
        icon: 'shopping-cart'
      },
      {
        id: 2,
        title: 'Task Manager',
        description: 'Eine Produktivitäts-App mit Drag & Drop Funktionalität',
        icon: 'clipboard-list'
      },
      {
        id: 3,
        title: 'Portfolio Website',
        description: 'Eine responsive Portfolio-Webseite mit Vue und Tailwind',
        icon: 'user'
      }
    ])

    return {
      navItems,
      skills,
      languages,
      projects
    }
  }
})
</script>
