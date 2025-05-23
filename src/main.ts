import { createApp } from 'vue'
import App from './App.vue'
  import './assets/main.css'
import { MotionPlugin } from '@vueuse/motion'

createApp(App).mount('#app')
App.use(MotionPlugin)
