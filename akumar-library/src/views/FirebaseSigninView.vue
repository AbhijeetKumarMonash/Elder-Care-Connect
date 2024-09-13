<template>
  <div class="container mt-5">
    <div class="center-content">
      <div class="row">
        <h1>Sign in</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <p><input type="text" placeholder="Email" v-model="email" /></p>
          </div>
          <div class="mb-3">
            <p><input type="password" placeholder="Password" v-model="password" /></p>
          </div>
          <p><button @click="signin">Sign in via Firebase</button></p>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const signin = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Firebase Register Successful !')
      router.push('/')
      console.log(auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
// hello
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
