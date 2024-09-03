<template>
  <div class="container mt-5">
    <header class="d-flex justify-content-between align-items-center py-3">
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

.container {
  max-width: 1200px;
}
</style>
