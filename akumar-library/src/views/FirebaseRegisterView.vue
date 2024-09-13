<template>
  <div class="container mt-5">
    <div class="center-content">
      <div class="row">
        <h1>Create an Account</h1>
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <p><input type="text" placeholder="Email" v-model="email" /></p>
          </div>
          <div class="mb-3">
            <p><input type="password" placeholder="Password" v-model="password" /></p>
          </div>
          <p><button @click="register">Save to Firebase</button></p>
          <div class="mb-3">
            <p>
              <select v-model="role">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const role = ref('user')
const router = useRouter()
const auth = getAuth()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      const user = data.user
      localStorage.setItem(user.uid, role.value)
      console.log('User registered and role saved locally and firebase registered!')
      router.push('/FireLogin')
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
