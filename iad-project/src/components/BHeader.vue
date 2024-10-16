<template>
  <div class="fixed-top bg-primary">
    <header class="d-flex justify-content-between align-items-center p-3">
      <h1 class="logo mb-0">Elder Care Connect</h1>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            About Us
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/rating" class="nav-link" active-class="active">Rating</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/generateapikey" class="nav-link" active-class="active"
            >ECC API</router-link
          >
        </li>
        <li v-if="currentUser && currentUser.role === 'admin'" class="nav-item">
          <router-link to="/admin" class="nav-link" active-class="active"
            >Admin Dashboard</router-link
          >
        </li>
        <li v-if="currentUser && currentUser.role === 'admin'" class="nav-item">
          <router-link to="/add-patient" class="nav-link" active-class="active"
            >Add New Patient</router-link
          >
        </li>
        <li v-if="currentUser && currentUser.role === 'user'" class="nav-item">
          <router-link to="/user" class="nav-link" active-class="active"
            >User Dashboard</router-link
          >
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/account" class="nav-link" active-class="active"
            >Account Information</router-link
          >
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/gemini" class="nav-link" active-class="active">Gemini AI</router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/patient" class="nav-link" active-class="active"
            >Patient Table</router-link
          >
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/events" class="nav-link" active-class="active">Event Table</router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/interactivechart" class="nav-link" active-class="active"
            >Charts</router-link
          >
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/map" class="nav-link" active-class="active">Map</router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/send-email" class="nav-link" active-class="active"
            >Send Email</router-link
          >
        </li>
        <li v-if="currentUser" class="nav-item">
          <button @click="logout" class="btn btn-link nav-link text-light">Logout</button>
        </li>
        <li v-else class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase/init'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const currentUser = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, fetch user info from Firestore
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        currentUser.value = docSnap.data()
        console.log('Current User in Header:', currentUser.value)
      } else {
        console.error('No such document!')
      }
    } else {
      currentUser.value = null
      console.log('No user signed in')
    }
  })
})

const logout = async () => {
  await signOut(auth)
  currentUser.value = null
  router.push('/login')
}
</script>

<style scoped>
.fixed-top {
  top: 0;
  width: 100%;
  z-index: 1030;
  background-color: #0056b3;
}

header {
  background-color: #0056b3;
  color: white;
  padding: 10px 20px;
}

h1.logo {
  margin: 0;
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
}

.nav-pills .nav-link {
  color: #e6f2ff;
  font-weight: 500;
  margin-left: 10px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.nav-pills .nav-link:hover {
  color: #ffffff;
}

.nav-pills .nav-link.active {
  background-color: white;
  color: #0056b3;
  border-radius: 5px;
}

.btn-link {
  color: #e6f2ff;
}
</style>
