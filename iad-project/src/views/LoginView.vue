<template>
  <div class="container mt-5">
    <BHeader />
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <h3 class="text-center">Welcome To login</h3>
        <div v-if="errorMessage" class="alert alert-danger text-center">
          {{ errorMessage }}
        </div>
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
        <div class="text-center mt-2">
          <button @click="openForgotPassword" class="btn btn-link">Forgot Password?</button>
        </div>
      </div>
    </div>
    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="forgot-password-modal">
      <div class="modal-content">
        <h5 class="text-center">Reset Your Password</h5>
        <p class="text-center">
          Enter your email address below and we will send you instructions to reset your password.
        </p>
        <input
          type="email"
          class="form-control mb-3"
          v-model="resetEmail"
          placeholder="Enter your email"
        />
        <button @click="sendPasswordReset" class="btn btn-primary w-100">Send Reset Email</button>
        <button @click="closeForgotPassword" class="btn btn-secondary mt-2 w-100">Close</button>
        <div v-if="resetMessage" class="alert alert-info mt-3 text-center">
          {{ resetMessage }}
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
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
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
const errorMessage = ref(null)

const showForgotPassword = ref(false)
const resetEmail = ref('')
const resetMessage = ref(null)

const clearErrors = () => {
  errors.value = {
    email: null,
    password: null
  }
  errorMessage.value = null
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
      errorMessage.value = 'An unknown error occurred. Please try again later.'
    } else {
      errorMessage.value = 'Login unsuccessful. Invalid email or password. Please try again.'
    }
  }
}

const openForgotPassword = () => {
  showForgotPassword.value = true
}

const closeForgotPassword = () => {
  showForgotPassword.value = false
  resetEmail.value = ''
  resetMessage.value = null
}

const sendPasswordReset = async () => {
  resetMessage.value = null
  try {
    await sendPasswordResetEmail(auth, resetEmail.value)
    resetMessage.value = 'Password reset email sent! Please check your inbox.'
  } catch (error) {
    resetMessage.value = 'Failed to send reset email. Please check the email address and try again.'
  }
}
const clearForm = () => {
  formData.value = {
    email: '',
    password: ''
  }
  clearErrors()
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
.forgot-password-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.modal-content {
  text-align: center;
}
</style>
