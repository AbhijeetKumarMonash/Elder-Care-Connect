<template>
  <div class="container mt-5">
    <header><BHeader /></header>
    <h2>Add New Patient</h2>
    <form @submit.prevent="addPatient">
      <div class="form-group">
        <label for="name">Patient Name:</label>
        <input v-model="patient.name" class="form-control" id="name" required />
      </div>
      <div class="form-group">
        <label for="careProvider">Care Provider:</label>
        <input v-model="patient.careProvider" class="form-control" id="careProvider" required />
      </div>
      <div class="form-group">
        <label for="insuranceProvider">Insurance Provider:</label>
        <input
          v-model="patient.insuranceProvider"
          class="form-control"
          id="insuranceProvider"
          required
        />
      </div>
      <div class="form-group">
        <label for="country">Country:</label>
        <input v-model="patient.country" class="form-control" id="country" required />
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input v-model="patient.age" class="form-control" id="age" required type="number" />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number:</label>
        <input v-model="patient.phone" class="form-control" id="phone" required />
      </div>
      <div class="form-group">
        <label for="occupation">Occupation Before Retirement:</label>
        <input v-model="patient.occupation" class="form-control" id="occupation" required />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Add Patient</button>
    </form>
    <div class="mt-5">
      <h2>Patient Count: {{ patientCount }}</h2>
      <button @click="getPatientCount" class="btn btn-info">Refresh Count</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import BHeader from '@/components/BHeader.vue'
export default {
  components: {
    BHeader
  },
  name: 'AddPatientView',
  setup() {
    const patient = ref({
      name: '',
      careProvider: '',
      insuranceProvider: '',
      country: '',
      age: '',
      phone: '',
      occupation: ''
    })

    const patientCount = ref(0)

    const addPatient = async () => {
      try {
        const response = await axios.post(
          'https://addpatient-mmuxaelp3q-uc.a.run.app',
          patient.value
        )
        patients.push({ ...patient.value })
        alert('Patient added successfully!')
      } catch (error) {
        console.error('Error adding patient:', error.message)
        alert('Failed to add patient.')
      }
    }

    const getPatientCount = async () => {
      try {
        const response = await axios.get('https://countpatients-mmuxaelp3q-uc.a.run.app')
        patientCount.value = response.data.count
      } catch (error) {
        console.error('Error getting patient count:', error.message)
      }
    }

    return {
      patient,
      addPatient,
      getPatientCount,
      patientCount
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px;
}

button {
  margin-top: 20px;
}
</style>
