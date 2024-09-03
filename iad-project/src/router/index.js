import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import RatingView from '@/views/RatingView.vue'
import LoginView from '@/views/LoginView.vue'
import signup from '@/views/signup.vue'
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/rating', name: RatingView, component: RatingView },
  { path: '/login', name: LoginView, component: LoginView },
  { path: '/signup', name: signup, component: signup }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
