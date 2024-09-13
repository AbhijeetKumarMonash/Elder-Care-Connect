<template>
    <div class="center-content">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" id="username" v-model="username" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <div v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  const handleLogin = () => {
    if (username.value === 'admin' && password.value === 'password') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/')
    } else {
      errorMessage.value = 'Invalid username or password'
    }
  }
  </script>
  
  <style scoped>
  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 20px;
  }
  </style>
  