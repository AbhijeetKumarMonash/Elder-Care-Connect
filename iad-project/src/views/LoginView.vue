<template>
  <div class="container mt-5">
    <BHeader />
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <h1 class="text-center">Elder Care Connect</h1>
        <h3 class="text-center">Welcome To login</h3>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import BHeader from '@/components/BHeader.vue'
import { ref, watch, onMounted } from 'vue'

const formData = ref({
  username: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || ''
})

const submittedCards = ref([])

watch(
  formData,
  (newData) => {
    localStorage.setItem('username', newData.username)
    localStorage.setItem('password', newData.password)
  },
  { deep: true }
)

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  if (!errors.value.username && !errors.value.password) {
    // Authenticate user
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(
      (u) => u.username === formData.value.username && u.password === formData.value.password
    )

    if (user) {
      console.log('User logged in:', user)
      if (user.role === 'admin') {
        // Redirect to admin page
        console.log('Redirecting to admin page...')
      } else {
        // Redirect to user page
        console.log('Redirecting to user page...')
      }
    } else {
      errors.value.username = 'Invalid username or password'
      errors.value.password = 'Invalid username or password'
    }
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: ''
  }
}
const errors = ref({
  username: null,
  password: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}
</script>

<style>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}
.form-label {
  font-size: 1.25rem;
}

.text-center {
  width: 100%;
}
</style>
