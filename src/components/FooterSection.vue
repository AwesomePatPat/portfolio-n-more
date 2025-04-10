<template>
  <footer id="contact" class="bg-dark text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-10">
        <div>
          <h2 class="text-2xl font-bold mb-6">Kontakt</h2>
          <ul class="space-y-3">
            <li class="flex items-center">
              <i class="fas fa-envelope text-primary mr-3"></i>
              <a href="mailto:mail@beispiel.de" class="hover:text-primary transition-colors">mail@beispiel.de</a>
            </li>
            <li class="flex items-center">
              <i class="fas fa-phone text-primary mr-3"></i>
              <a href="tel:+49123456789" class="hover:text-primary transition-colors">+49 123 456 789</a>
            </li>
            <li class="flex items-center">
              <i class="fas fa-map-marker-alt text-primary mr-3"></i>
              <span>Berlin, Deutschland</span>
            </li>
          </ul>

          <div class="flex space-x-4 mt-6">
            <a href="#" class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
              <i class="fab fa-github"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-6">Schreib mir eine Nachricht</h2>
          <form class="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                class="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="E-Mail"
                class="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <textarea
                rows="4"
                placeholder="Deine Nachricht"
                class="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              class="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Senden
            </button>
          </form>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Max Mustermann. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterSection',
});
</script>
