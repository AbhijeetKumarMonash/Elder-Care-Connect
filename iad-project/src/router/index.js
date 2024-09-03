import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home }
  // Add other routes here as needed, for example:
  // { path: '/about', name: 'About', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
