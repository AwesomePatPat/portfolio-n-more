import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/valorant',
    name: 'Valorant',
    component: () => import('../components/valorant/Valorant.vue')
  },
  {
    path: '/linktree',
    name: 'Linktree',
    component: () => import('../components/linktree/Linktree.vue')
  },
  {
    path: '/spotify',
    name: 'Spotify',
    component: () => import('../components/spotify/Spotify.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../components/contact/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
