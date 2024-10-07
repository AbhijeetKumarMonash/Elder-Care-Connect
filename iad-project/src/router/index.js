import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import RatingView from '@/views/RatingView.vue'
import LoginView from '@/views/LoginView.vue'
import signup from '@/views/signup.vue'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'
import AccountView from '@/views/AccountView.vue'
import sendEmailView from '@/views/sendEmailView.vue'

const routes = [
  { path: '/send-email', name: 'sendEmailView', component: sendEmailView },
  { path: '/', name: 'Home', component: Home },
  { path: '/rating', name: RatingView, component: RatingView },
  { path: '/login', name: LoginView, component: LoginView },
  { path: '/signup', name: signup, component: signup },
  { path: '/admin', name: AdminView, component: AdminView },
  { path: '/user', name: UserView, component: UserView },
  { path: '/account', name: AccountView, component: AccountView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
