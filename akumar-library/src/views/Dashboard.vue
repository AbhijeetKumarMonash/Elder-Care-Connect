<template>
  <div class="container mt-5">
    <div class="center-content">
      <div class="row">
        <h1>Dashboard</h1>
        <p>Welcome, {{ role }}</p>
        <p><button @click="handleLogout">Log out</button></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const role = ref('')
const auth = getAuth()
const router = useRouter()

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log('User logged out:', auth.currentUser)
      router.push('/logout')
    })
    .catch((error) => {
      console.log('Logout error:', error.code)
    })
}
</script>
