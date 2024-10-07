<template>
  <div class="container mt-5">
    <BHeader />
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <h3 class="text-center">Welcome To login</h3>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                required
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                required
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
        <div class="text-center mt-3">
          <p>Don't have an account?</p>
          <button @click="redirectToSignup" class="btn btn-link">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BHeader from '@/components/BHeader.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase/init'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})
const errors = ref({
  email: null,
  password: null
})

const clearErrors = () => {
  errors.value = {
    email: null,
    password: null
  }
}
const submitForm = async () => {
  clearErrors()
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.value.email,
      formData.value.password
    )
    const user = userCredential.user

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()
      if (userData.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/user')
      }
    } else {
      console.error('No user data found!')
    }
  } catch (error) {
    console.error('Error logging in: ', error)
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errors.value.email = 'Invalid email or password'
      errors.value.password = 'Invalid email or password'
    }
  }
}

const clearForm = () => {
  formData.value = {
    email: '',
    password: ''
  }
}
const redirectToSignup = () => {
  router.push('/signup')
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
