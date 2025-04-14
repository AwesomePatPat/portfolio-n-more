<template>
  <section
    :id="id"
    class="py-20 bg-white"
    v-motion
    :initial="{ opacity: 0 }"
    :visible="{ opacity: 1, transition: { duration: 800 } }"
  >
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">Sprachkenntnisse</h2>

      <div class="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(language, index) in languages"
          :key="language.name"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          class="bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <div class="text-center">
            <div class="rounded-full bg-indigo-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ language.name }}</h3>
            <p class="text-gray-600">{{ language.level }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Language } from '../types'

export default defineComponent({
  name: 'LanguagesSection',
  props: {
    id: {
      type: String,
      required: true
    },
    languages: {
      type: Array as PropType<Language[]>,
      required: true
    }
  }
})
</script>
