<template>
  <section id="about" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Über mich</h2>
        <div class="flex flex-col md:flex-row gap-10 items-center">
          <div class="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            <img
              src="https://via.placeholder.com/192"
              alt="Profilbild"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <p class="text-lg text-gray-700 mb-4">
              Ich bin ein erfahrener Full-Stack Entwickler mit 5 Jahren Berufserfahrung. Mein Fokus liegt auf der Entwicklung
              von benutzerfreundlichen und skalierbaren Web-Anwendungen mit modernen Technologien.
            </p>
            <p class="text-lg text-gray-700 mb-4">
              Nach meinem Informatikstudium habe ich in verschiedenen Startups und Agenturen gearbeitet,
              wo ich meine Fähigkeiten in der Frontend- und Backend-Entwicklung vertiefen konnte.
            </p>
            <p class="text-lg text-gray-700">
              Ich bin ein leidenschaftlicher Problemlöser und halte mich ständig über die neuesten Technologietrends
              auf dem Laufenden, um innovative Lösungen zu entwickeln.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutSection',
});
</script>
