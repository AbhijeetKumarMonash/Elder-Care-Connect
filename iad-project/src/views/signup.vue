<template>
  <div class="container mt-5">
    <BHeader />
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <h1 class="text-center">Elder Care Connect</h1>
        <h3 class="text-center">Welcome To Sign-Up page</h3>
        <p class="text-center">
          Please fill out the form to join a community designed to uplift and support you. With our
          services, you'll make new friends and create lasting memories, making this chapter of your
          life truly wonderful
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="role" class="form-label">Role</label>
              <select v-model="formData.role" id="role" class="form-select">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-md-6 col-sm-6">
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
            <div class="col-md-6 col-sm-6">
              <label for="age" class="form-label">Age</label>
              <input
                type="number"
                class="form-control"
                id="age"
                @blur="() => validateAge(true)"
                v-model="formData.age"
              />
              <div v-if="errors.age" class="text-danger">{{ errors.age }}</div>
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                @blur="() => validateEmail(true)"
                v-model="formData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="Address" class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                id="Address"
                @blur="() => validateAddress(true)"
                v-model="formData.Address"
              />
              <div v-if="errors.Address" class="text-danger">{{ errors.Address }}</div>
            </div>
          </div>

          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="contactDetails" class="form-label">Contact Details</label>
              <input
                type="text"
                class="form-control"
                id="contactDetails"
                @blur="() => validateContactDetails(true)"
                v-model="formData.contactDetails"
              />
              <div v-if="errors.contactDetails" class="text-danger">
                {{ errors.contactDetails }}
              </div>
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-12">
              <label for="emergencyContact" class="form-label">Emergency Contact Details</label>
              <input
                type="text"
                class="form-control"
                id="emergencyContact"
                @blur="() => validateEmergencyContact(true)"
                v-model="formData.emergencyContact"
              />
              <div v-if="errors.emergencyContact" class="text-danger">
                {{ errors.emergencyContact }}
              </div>
            </div>
          </div>

          <div class="row mb-3 justify-content-center">
            <div class="col-md-6 col-sm-6">
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
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
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

import { ref } from 'vue'

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

const submittedCards = ref([])

const submitForm = () => {
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
    const users = JSON.parse(localStorage.getItem('users')) || []
    users.push({
      role: formData.value.role,
      username: formData.value.username,
      age: formData.value.age,
      email: formData.value.email,
      Address: formData.value.Address,
      contactDetails: formData.value.contactDetails,
      emergencyContact: formData.value.emergencyContact,
      password: formData.value.password
    })
    localStorage.setItem('users', JSON.stringify(users))

    // Redirect or notify success
    console.log('User registered:', formData.value)
    clearForm()
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

const validateContactDetails = (blur) => {
  if (formData.value.contactDetails.length == 10) {
    if (blur) errors.value.contactDetails = 'Please enter a valid contact number'
  } else {
    errors.value.contactDetails = null
  }
}

const validateEmergencyContact = (blur) => {
  if (formData.value.emergencyContact.length == 10) {
    if (blur) errors.value.emergencyContact = 'Please enter a valid emergency contact number'
  } else {
    errors.value.emergencyContact = null
  }
}

const clearForm = () => {
  formData.value = {
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

const validateName = (blur) => {
  if (formData.value.username.length < 5) {
    if (blur) errors.value.username = 'Name must be at least 5 characters'
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

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>

<style scoped>
.justify-content-center p {
  background-color: #007bff;
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
