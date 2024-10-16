import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import RatingView from '@/views/RatingView.vue'
import LoginView from '@/views/LoginView.vue'
import signup from '@/views/signup.vue'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'
import AccountView from '@/views/AccountView.vue'
import sendEmailView from '@/views/sendEmailView.vue'
import patientView from '@/views/patientView.vue'
import EventTableView from '@/views/EventTableView.vue'
import mapView from '@/views/mapView.vue'
import addPatientView from '@/views/addPatientView.vue'
import Interactivechart from '@/views/InteractiveChart.vue'
import GenerateApiKey from '@/views/GenerateApiKey.vue'
import Gemini from '@/views/Gemini.vue'
const routes = [
  { path: '/gemini', name: 'Gemini', component: Gemini },
  { path: '/generateapikey', name: 'Generate Api Key', component: GenerateApiKey },
  { path: '/interactivechart', name: 'Interactivechart', component: Interactivechart },
  { path: '/add-patient', name: 'addPatientView', component: addPatientView },
  { path: '/map', name: 'mapView', component: mapView },
  { path: '/events', name: 'EventTableView', component: EventTableView },
  { path: '/patient', name: 'patientView', component: patientView },
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
