<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >About Us</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/rating" class="nav-link" active-class="active">Rating</router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/account" class="nav-link" active-class="active"
            >Account Information</router-link
          >
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

const currentUser = ref(null)

// Get current user from localStorage if available
onMounted(() => {
  currentUser.value = JSON.parse(localStorage.getItem('currentUser'))
  console.log('Current User in Header:', currentUser.value)
})
const router = useRouter()

// Logout function to clear user session
const logout = () => {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
