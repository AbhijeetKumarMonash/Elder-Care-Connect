<template>
  <div class="fixed-top">
    <header class="d-flex justify-content-between align-items-center py-3 bg-primary">
      <h1 class="logo">Elder Care Connect</h1>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >About Us</router-link
          >
        </li>

        <li class="nav-item">
          <router-link to="/rating" class="nav-link" active-class="active">Rating</router-link>
        </li>
        <li v-if="currentUser && currentUser.role === 'admin'" class="nav-item">
          <router-link to="/admin" class="nav-link" active-class="active"
            >Admin Dashboard</router-link
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
          <router-link to="/send-email" class="nav-link" active-class="active">
            Send Email
          </router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <button @click="logout" class="btn btn-link nav-link">Logout</button>
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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1030;
  background-color: #007bff;
}

header {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

h1.logo {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-pills .nav-link {
  color: white;
}

.nav-pills .nav-link.active {
  background-color: white;
  color: #007bff;
}

.btn-link {
  color: white;
}
</style>
