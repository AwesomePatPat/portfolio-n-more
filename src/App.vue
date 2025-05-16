<template>
  <div class="min-h-screen bg-white relative">
    <div class="fixed inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="grid-pattern"></div>
      </div>

      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-emerald-50 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-blue-50 to-transparent"></div>

      <div class="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-emerald-100/20 filter blur-[100px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full bg-blue-100/20 filter blur-[100px]"></div>
      <div class="absolute top-3/4 right-1/3 w-[35rem] h-[35rem] rounded-full bg-cyan-100/15 filter blur-[100px]"></div>
    </div>

    <NavigationBar :navItems="navItems" />

    <div class="relative z-10">
      <IntroSection id="intro" />
      <AboutSection id="about" />
      <SkillsSection id="skills" :skills="skills" />
      <LanguagesSection id="languages" :languages="languages" />
      <ProjectsSection id="projects" :projects="projects" />
    </div>
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
      { name: 'Vue.js', color: 'emerald' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Tailwind CSS', color: 'cyan' },
      { name: 'HTML', color: 'green' },
      { name: 'CSS', color: 'green' },
      { name: 'JavaScript', color: 'yellow' },
      { name: 'Node.js', color: 'gray' },
      { name: 'Express.js', color: 'purple' },
      { name: 'SQL', color: 'green' },
      { name: 'Git', color: 'blue' },
      { name: 'Angular', color: 'blue' },
      { name: 'Nest.js', color: 'yellow' },
      { name: 'Docker', color: 'blue' },
      { name: 'AWS', color: 'orange' },
      { name: 'Firebase', color: 'yellow' },
      { name: 'Nuxt.js', color: 'purple' },

    ])

    const languages = ref<Language[]>([
      { name: 'Deutsch', level: 'Muttersprache' },
      { name: 'Englisch', level: 'Fliessend' },
      { name: 'Französisch', level: 'Fliessend' }
    ])

    const projects = ref<Project[]>([
  {
    id: 1,
    title: 'FirstSteps 2023',
    description: 'Einstieg bei Swisscom',
    longDescription: 'Ich habe in den First Steps meine Lehre begonnen. Dort habe ich alles rund um die Swisscom gelernt und meine Arbeitsgeräte mit den verschiedenen Tools eingerichtet und auch gelernt, wie man diese verwendet. Wir haben auch Themen wie die Arbeitssicherheit angeschaut. Sie dienten dazu uns auf die Lehre vorzubereiten.',
    provider: 'Andreas Mast',
    technologies: ['Windows', 'Android', 'Fiori', 'eNex', 'MS Teams', 'MS Office'],
    icon: 'home'
  },
  {
    id: 2,
    title: 'Team HIVE',
    description: 'Einstieg ins Programmieren',
    longDescription: 'Im Team HIVE hatte ich meinen Einstieg ins Programmieren. Ich lernte die Basics von HTML, CSS, JS, TS, Angular und GIT. Ich lernte auch agil zu arbeiten und machte mich dabei mit dem Tool Jira vertraut. Diese Technologien konnten wir in vielen verschiedenen praktischen Übungen umsetzen. Im Projekt hatten wir die Freiheit, in unserem eigenen Tempo daran zu arbeiten und ein gutes Basiswissen für die Lehre anzueigenen.',
    provider: 'Patrice Stämpfli',
    technologies: ['Angular', 'Java Script', 'Type Script', 'CSS', 'HTML', "Git", "Scrum", "Jira"],
    icon: 'code'
  },
  {
    id: 3,
    title: 'Minds in the Cloud',
    description: 'Leitung einer Gruppe bestehend aus Lernenden im Bereich Cloud & IT',
    longDescription: 'Meine Kollegen Janic Moos und Panat Ruangsri leiteten zusammen mit mir die Minds in the Clouds Gruppe (eine Gruppe bestehend aus Lernenden im Bereich Cloud & IT). Wir haben uns jeweils, wenn möglich einmal im Monat, getroffen, um uns auszutauschen und verschiedene Themen zu besprechen. Ausserdem diente es uns auch dazu, neue Kontakte zu knüpfen, was sehr wichtig ist im Berufsleben. Meine Kollegen und ich leiteten und planen jeweils die Meetings vom Team und organisieren Führungen wenn die Gruppe dabei zustimmt. Dabei kam beispielsweise auch eine Führung im Swisscom Datencenter Wankdorf zustande. Dies war ein Nebenprojekt.',
    technologies: ['Kommunikation', 'Networking'],
    icon: 'heart'
  },
  {
    id: 4,
    title: 'Core Automation Team (CAT)',
    description: 'In diesem Team habe ich die Technologien Vuejs und Nuxt kennengelernt',
    longDescription: 'Ich bin am Februar 2024 in dem Agilen Core Automation Team (CAT) in Empfang genommen worden. Ich habe in diesem Team die Technologien Vue.js und Nuxt kennengelernt. Ich konnte bereits von Anfang an an einer Webseite arbeiten, welche alle Automatisierungen unseres Teams aufzeigt. Bis zum Ende konnte ich an dieser Seite bis zum letzten Feinschliff arbeiten. In diesem Team haben wir nach dem Agilen sAFE gearbeitet.',
    provider: 'Roger Negri',
    technologies: ['Vue.js', 'Nuxt', 'Type Script', 'sAFE', "Prisma", "Jira"],
    icon: 'chip'
  },
  {
    id: 5,
    title: 'Applikationsentwickler@NexCC',
    description: 'Im NexCC konnte ich Applikationen mithilfe von Vue.js, Express.js, PowerApps und PowerAutomate entwickeln.',
    longDescription: 'Im Next Competence Center hatte ich die Möglichkeit mir viele Technologien anzueignen. Begonnen habe ich mit einer Einstiegs Aufgabe mit Vue.js im Frontend und Express.js im Backend. Später habe ich das erste Mal eine Applikation mit einem Low Code Programm mit dem Namen Powerapps umgesetzt. Berechtigungsverwaltung und Automatisationen habe ich mit PowerAutomate umgesetzt. Im Projekt hatte ich auch die Möglichkeit in den Support zu schnuppern.',
    provider: 'Urs Gloggner',
    technologies: ['Vue.js', 'Express.js', 'Type Script', 'PowerApps', "Sharepoint", "PowerAutomate"],
    icon: 'terminal'
  },
  {
    id: 6,
    title: 'PA@NexCC',
    description: 'Ich hatte die Möglichkeit ein zweites Projekt bei NexCC als Projektanbieter zu machen.',
    longDescription: 'Nach meinem Projekt "Applikationsentwickler@NexCC" hatte ich die Möglichkeit ein weiteres Projekt beim Next Competence Center als Projektanbieter zu absolvieren. Hierbei musste ich viel Verantwortung tragen da mein ursprünglicher Projektanbieter für eine längere Zeit ausgefallen ist und ich statt einem Lernenden gleich zwei betreuen durfte. Ich habe den Lernenden Colin Walker und Nico Benninger zu Beginn einen Einstieg in Vue.js gegeben. Dies konnten sie bei ihrer Einstiegsaufgabe und kurz danach auch beim Projektarchiv anwenden. Dieses haben wir mit Vue.js, Nest.js und einer Docker Pipeline innerhalb von 6 Tagen umgesetzt. Anschliessend habe ich ihnen auch den Einstieg in die Power Plattformen PowerApps, PowerAutomate und Sharepoint gegeben. Sie hatten auch die Möglichkeit Einblicke in den Support zu gewinnen. Als die Lernenden fleissig am Arbeiten waren, habe ich auch einige Tools in PowerApps umgesetzt und am Projektarchiv gearbeitet.',
    provider: 'Janis Ringli',
    technologies: ['Vue.js', 'Nest.js', 'Type Script', 'PowerApps', "Sharepoint", "PowerAutomate", "Docker", "Git", "Prisma", "iAPC"],
    icon: 'clipboard-list'
  },
    {
    id: 7,
    title: 'AI@Nex',
    description: 'Noch in der Zukunft',
    longDescription: 'Noch in der Zukunft',
    provider: 'Waser Sven',
    technologies: [],
    icon: 'server'
  },
  {
    id: 8,
    title: '???',
    description: 'Hier ist Platz für mein Projekt bei dir.',
    longDescription: 'Hier ist Platz für mein Projekt bei dir.',
    provider: '???',
    technologies: ['?', '?', '?'],
    icon: 'star'
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

<style>
.grid-pattern {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  width: 100%;
  height: 100%;
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
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover-glow {
  transition: box-shadow 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
}

section {
  position: relative;
  z-index: 1;
}
</style>
