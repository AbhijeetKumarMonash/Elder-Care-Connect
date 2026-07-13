import { createRouter, createWebHistory } from 'vue-router'
import { auth, db } from '@/firebase/init'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import Home from '../views/HomeView.vue'
import RatingView from '@/views/RatingView.vue'
import LoginView from '@/views/LoginView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
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
  // ---- Public (visible before login) ----
  { path: '/', name: 'Home', component: Home },
  { path: '/rating', name: 'Rating', component: RatingView },
  { path: '/generateapikey', name: 'GenerateApiKey', component: GenerateApiKey },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/signup', name: 'Signup', component: signup },

  // ---- Authenticated users ----
  { path: '/account', name: 'Account', component: AccountView, meta: { requiresAuth: true } },
  { path: '/gemini', name: 'Gemini', component: Gemini, meta: { requiresAuth: true } },
  { path: '/patient', name: 'PatientView', component: patientView, meta: { requiresAuth: true } },
  {
    path: '/events',
    name: 'EventTableView',
    component: EventTableView,
    meta: { requiresAuth: true }
  },
  { path: '/map', name: 'MapView', component: mapView, meta: { requiresAuth: true } },
  {
    path: '/send-email',
    name: 'SendEmailView',
    component: sendEmailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/interactivechart',
    name: 'Interactivechart',
    component: Interactivechart,
    meta: { requiresAuth: true }
  },

  // ---- Role-restricted ----
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/add-patient',
    name: 'addPatientView',
    component: addPatientView,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/user',
    name: 'UserView',
    component: UserView,
    meta: { requiresAuth: true, role: 'user' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Resolve the current Firebase user once (auth state isn't ready on first load).
const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })

// Global guard: protected routes redirect unauthenticated users to /login,
// and remember where they were headed via a ?redirect= query.
router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth)
  if (!requiresAuth) return true

  const user = await getCurrentUser()
  if (!user) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.role) {
    const snap = await getDoc(doc(db, 'users', user.uid))
    const role = snap.exists() ? snap.data().role : null
    if (role !== to.meta.role) {
      // Signed in but wrong role: send them to their own dashboard.
      return { path: role === 'admin' ? '/admin' : '/user' }
    }
  }

  return true
})

export default router
