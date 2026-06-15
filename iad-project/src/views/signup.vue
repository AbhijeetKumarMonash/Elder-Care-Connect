<template>
  <div class="auth-page">
    <div class="auth-card wide">
      <div class="auth-head">
        <span class="brand-mark">EC</span>
        <h1>Join Elder Care Connect</h1>
        <p>
          Fill out the form to join a community designed to uplift and support you — make new
          friends, stay well, and stay connected.
        </p>
      </div>

      <div v-if="successMessage" class="alert info">{{ successMessage }}</div>

      <form @submit.prevent="submitForm" novalidate>
        <div class="field">
          <label for="role">Role</label>
          <select id="role" v-model="formData.role" class="select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="grid-2">
          <div class="field">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              v-model="formData.username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
            />
            <p v-if="errors.username" class="field-error">{{ errors.username }}</p>
          </div>
          <div class="field">
            <label for="age">Age</label>
            <input id="age" type="number" v-model="formData.age" @blur="() => validateAge(true)" />
            <p v-if="errors.age" class="field-error">{{ errors.age }}</p>
          </div>
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            v-model="formData.email"
            @blur="() => validateEmail(true)"
          />
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
        </div>

        <div class="field">
          <label for="Address">Address</label>
          <input
            id="Address"
            type="text"
            v-model="formData.Address"
            @blur="() => validateAddress(true)"
          />
          <p v-if="errors.Address" class="field-error">{{ errors.Address }}</p>
        </div>

        <div class="grid-2">
          <div class="field">
            <label for="contactDetails">Contact number</label>
            <input
              id="contactDetails"
              type="text"
              v-model="formData.contactDetails"
              @blur="() => validateContactDetails(true)"
            />
            <p v-if="errors.contactDetails" class="field-error">{{ errors.contactDetails }}</p>
          </div>
          <div class="field">
            <label for="emergencyContact">Emergency contact</label>
            <input
              id="emergencyContact"
              type="text"
              v-model="formData.emergencyContact"
              @blur="() => validateEmergencyContact(true)"
            />
            <p v-if="errors.emergencyContact" class="field-error">{{ errors.emergencyContact }}</p>
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              v-model="formData.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
            />
            <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
          </div>
          <div class="field">
            <label for="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              type="password"
              v-model="formData.confirmPassword"
              @blur="() => validateConfirmPassword(true)"
            />
            <p v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <div class="actions">
          <button type="submit" class="btn-primary">Create account</button>
          <button type="button" class="btn-ghost" @click="clearForm">Clear</button>
        </div>
      </form>

      <p class="auth-foot">
        Already a member?
        <router-link to="/login" class="text-link strong">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/init'

const router = useRouter()
const successMessage = ref(null)

const formData = ref({
  role: 'user',
  username: '',
  age: '',
  email: '',
  Address: '',
  contactDetails: '',
  emergencyContact: '',
  password: '',
  confirmPassword: ''
})
const errors = ref({
  username: null,
  age: null,
  email: null,
  Address: null,
  contactDetails: null,
  emergencyContact: null,
  password: null,
  confirmPassword: null
})

const submitForm = async () => {
  validateName(true)
  validateAge(true)
  validateEmail(true)
  validateAddress(true)
  validateContactDetails(true)
  validateEmergencyContact(true)
  validatePassword(true)
  validateConfirmPassword(true)
  if (
    !errors.value.username &&
    !errors.value.age &&
    !errors.value.email &&
    !errors.value.Address &&
    !errors.value.contactDetails &&
    !errors.value.emergencyContact &&
    !errors.value.password &&
    !errors.value.confirmPassword
  ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.value.email,
        formData.value.password
      )
      const user = userCredential.user

      // Store additional information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        role: formData.value.role,
        username: formData.value.username,
        age: formData.value.age,
        Address: formData.value.Address,
        contactDetails: formData.value.contactDetails,
        emergencyContact: formData.value.emergencyContact,
        email: formData.value.email
      })

      successMessage.value = 'Account created! Taking you to your dashboard…'
      const role = formData.value.role
      clearForm()
      setTimeout(() => router.push(role === 'admin' ? '/admin' : '/user'), 1200)
    } catch (error) {
      console.error('Error creating user:', error.message)
      errors.value.email = 'Could not create account. This email may already be in use.'
    }
  }
}

const validateAge = (blur) => {
  const age = parseInt(formData.value.age, 10)
  if (!age || age < 50 || age > 100) {
    if (blur) errors.value.age = 'Please enter a valid age between 50 and 100'
  } else {
    errors.value.age = null
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.value.email)) {
    if (blur) errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = null
  }
}

const validateAddress = (blur) => {
  if (formData.value.Address.length < 5) {
    if (blur) errors.value.Address = 'Address must be at least 5 characters long'
  } else {
    errors.value.Address = null
  }
}

// Fixed: previously this flagged an error when the number WAS 10 digits (inverted).
const validateContactDetails = (blur) => {
  if (formData.value.contactDetails.length !== 10) {
    if (blur) errors.value.contactDetails = 'Please enter a valid 10-digit contact number'
  } else {
    errors.value.contactDetails = null
  }
}

const validateEmergencyContact = (blur) => {
  if (formData.value.emergencyContact.length !== 10) {
    if (blur)
      errors.value.emergencyContact = 'Please enter a valid 10-digit emergency contact number'
  } else {
    errors.value.emergencyContact = null
  }
}

const clearForm = () => {
  formData.value = {
    role: 'user',
    username: '',
    age: '',
    email: '',
    Address: '',
    contactDetails: '',
    emergencyContact: '',
    password: '',
    confirmPassword: ''
  }
  errors.value = {
    username: null,
    age: null,
    email: null,
    Address: null,
    contactDetails: null,
    emergencyContact: null,
    password: null,
    confirmPassword: null
  }
}

const validateName = (blur) => {
  const invalidChars = /['"%;()<>\\]/
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else if (invalidChars.test(formData.value.username)) {
    if (blur) errors.value.username = 'Name contains invalid characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const invalidChars = /['"%;()<>\\]/
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (invalidChars.test(password)) {
    if (blur) errors.value.password = 'Password contains invalid characters'
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

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
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
.auth-card.wide {
  max-width: 620px;
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
  margin: 0 auto;
  max-width: 46ch;
  line-height: 1.5;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.field {
  margin-bottom: 1.1rem;
}
.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.field input,
.select {
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
.field input:focus,
.select:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}
.field-error {
  color: var(--coral);
  font-size: 0.88rem;
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
}
.text-link {
  color: var(--teal);
  text-decoration: underline;
}
.text-link.strong {
  color: var(--coral);
  font-weight: 600;
}

.alert.info {
  background: #e6f3ec;
  color: #2a7f62;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.1rem;
  text-align: center;
  font-weight: 600;
}

@media (max-width: 520px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .btn-primary,
  .btn-ghost {
    transition: none;
  }
}
</style>
