<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-head">
        <span class="brand-mark">EC</span>
        <h1>Welcome back</h1>
        <p>Sign in to access your dashboard, events and AI assistant.</p>
      </div>

      <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>

      <form @submit.prevent="submitForm" novalidate>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="formData.email" autocomplete="email" required />
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="formData.password"
            autocomplete="current-password"
            required
          />
          <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
        </div>

        <div class="actions">
          <button type="submit" class="btn-primary">Sign in</button>
          <button type="button" class="btn-ghost" @click="clearForm">Clear</button>
        </div>
      </form>

      <div class="auth-foot">
        <button class="text-link" @click="openForgotPassword">Forgot password?</button>
        <span class="sep">·</span>
        <span
          >New here?
          <button class="text-link strong" @click="redirectToSignup">
            Create an account
          </button></span
        >
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="modal-overlay" @click.self="closeForgotPassword">
      <div class="modal">
        <h2>Reset your password</h2>
        <p>Enter your email and we'll send instructions to reset your password.</p>
        <input
          type="email"
          v-model="resetEmail"
          placeholder="you@example.com"
          class="modal-input"
        />
        <div class="actions">
          <button class="btn-primary" @click="sendPasswordReset">Send reset email</button>
          <button class="btn-ghost" @click="closeForgotPassword">Close</button>
        </div>
        <div v-if="resetMessage" class="alert info">{{ resetMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth, db } from '@/firebase/init'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const route = useRoute()

const formData = ref({ email: '', password: '' })
const errors = ref({ email: null, password: null })
const errorMessage = ref(null)

const showForgotPassword = ref(false)
const resetEmail = ref('')
const resetMessage = ref(null)

const clearErrors = () => {
  errors.value = { email: null, password: null }
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

    // If the guard sent the user here, return them to where they were headed.
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : null

    if (docSnap.exists()) {
      const userData = docSnap.data()
      if (redirect) {
        router.push(redirect)
      } else if (userData.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/user')
      }
    } else {
      router.push(redirect || '/')
    }
  } catch (error) {
    console.error('Error logging in: ', error)
    errorMessage.value = 'Login unsuccessful. Please check your email and password and try again.'
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
    resetMessage.value = 'Password reset email sent. Please check your inbox.'
  } catch (error) {
    resetMessage.value = 'Could not send reset email. Please check the address and try again.'
  }
}
const clearForm = () => {
  formData.value = { email: '', password: '' }
  clearErrors()
}
const redirectToSignup = () => {
  router.push('/signup')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.auth-page {
  --ink: #22333b;
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --sand: #fbf7f1;
  --line: #ece3d6;
  --muted: #5d6b73;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  background: var(--sand);
  color: var(--ink);
  margin: -1rem 0 0;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(5.5rem, 11vw, 8rem) 1.25rem 3rem;
}
.auth-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: 0 24px 60px -34px rgba(15, 76, 92, 0.5);
  width: 100%;
  max-width: 440px;
  padding: clamp(1.75rem, 4vw, 2.5rem);
}
.auth-head {
  text-align: center;
  margin-bottom: 1.5rem;
}
.brand-mark {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--teal);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.auth-head h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.9rem;
  color: var(--teal-deep);
  margin: 0 0 0.4rem;
}
.auth-head p {
  color: var(--muted);
  margin: 0;
}

.field {
  margin-bottom: 1.1rem;
}
.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.field input {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  background: #fffdf9;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.field input:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}
.field-error {
  color: var(--coral);
  font-size: 0.9rem;
  margin: 0.4rem 0 0;
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.btn-primary,
.btn-ghost {
  flex: 1;
  padding: 0.8rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: 1.5px solid transparent;
  font-family: inherit;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
}
.btn-primary {
  background: var(--coral);
  color: #fff;
  box-shadow: 0 10px 22px -12px rgba(231, 111, 81, 0.85);
}
.btn-primary:hover {
  transform: translateY(-2px);
}
.btn-ghost {
  background: transparent;
  color: var(--teal);
  border-color: var(--teal);
}
.btn-ghost:hover {
  background: var(--teal);
  color: #fff;
}

.auth-foot {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.95rem;
}
.sep {
  margin: 0 0.5rem;
  color: #c9bfae;
}
.text-link {
  background: none;
  border: none;
  color: var(--teal);
  cursor: pointer;
  font: inherit;
  padding: 0;
  text-decoration: underline;
}
.text-link.strong {
  color: var(--coral);
  font-weight: 600;
}

.alert {
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.1rem;
  font-size: 0.95rem;
}
.alert.error {
  background: #fdeee9;
  color: #b8472d;
}
.alert.info {
  background: #e6eff1;
  color: var(--teal-deep);
  margin-top: 1rem;
  margin-bottom: 0;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 55, 68, 0.45);
  display: grid;
  place-items: center;
  padding: 1.25rem;
  z-index: 1050;
}
.modal {
  background: #fff;
  border-radius: 18px;
  padding: 1.75rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.5);
}
.modal h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--teal-deep);
  margin: 0 0 0.5rem;
}
.modal p {
  color: var(--muted);
  margin: 0 0 1rem;
}
.modal-input {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.modal-input:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary,
  .btn-ghost {
    transition: none;
  }
}
</style>
