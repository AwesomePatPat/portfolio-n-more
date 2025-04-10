<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader :links="navLinks" />
    <main class="flex-grow">
      <HeroSection />
      <AboutSection />
      <SkillsSection :skills="skills" />
      <OtherSkillsSection :languages="languages" :otherSkills="otherSkills" />
      <ProjectsSection :projects="projects" />
    </main>
    <FooterSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import OtherSkillsSection from './components/OtherSkillsSection.vue';
import ProjectsSection from './components/ProjectSection.vue';
import FooterSection from './components/FooterSection.vue';
import type { NavLink, Skill, Language, Project } from './types';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    HeroSection,
    AboutSection,
    SkillsSection,
    OtherSkillsSection,
    ProjectsSection,
    FooterSection,
  },
  setup() {
    const navLinks: NavLink[] = [
      { name: 'Home', href: '#home' },
      { name: 'Über mich', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projekte', href: '#projects' },
      { name: 'Kontakt', href: '#contact' },
    ];

    const skills: Skill[] = [
      { name: 'Vue.js', level: 90, icon: 'fab fa-vuejs' },
      { name: 'TypeScript', level: 85, icon: 'fab fa-js' },
      { name: 'React', level: 80, icon: 'fab fa-react' },
      { name: 'Node.js', level: 75, icon: 'fab fa-node-js' },
      { name: 'CSS/Tailwind', level: 88, icon: 'fab fa-css3-alt' },
      { name: 'HTML5', level: 95, icon: 'fab fa-html5' },
    ];

    const languages: Language[] = [
      { name: 'Deutsch', level: 'Muttersprache' },
      { name: 'Englisch', level: 'Fließend (C1)' },
      { name: 'Spanisch', level: 'Grundkenntnisse (A2)' },
    ];

    const otherSkills: string[] = [
      'Git & GitHub',
      'Agile Entwicklung',
      'REST APIs',
      'Docker',
      'CI/CD',
      'Unit Testing',
    ];

    const projects: Project[] = [
      {
        title: 'E-Commerce Platform',
        description: 'Eine moderne E-Commerce-Plattform mit Vue.js und Node.js. Features: Warenkorb, Benutzerprofile, Zahlungsabwicklung.',
        icon: 'fas fa-shopping-cart',
        technologies: ['Vue.js', 'Node.js', 'MongoDB'],
      },
      {
        title: 'Task Management App',
        description: 'Eine Aufgabenverwaltungs-App mit Drag-and-Drop-Funktionalität, Erinnerungen und Team-Kollaboration.',
        icon: 'fas fa-tasks',
        technologies: ['React', 'Firebase', 'Redux'],
      },
      {
        title: 'Fitness Tracker',
        description: 'Eine mobile App zur Verfolgung von Workouts, Ernährung und Fortschritten mit Datenvisualisierung.',
        icon: 'fas fa-heartbeat',
        technologies: ['Vue Native', 'GraphQL', 'Chart.js'],
      },
    ];

    return {
      navLinks,
      skills,
      languages,
      otherSkills,
      projects,
    };
  },
});
</script>
