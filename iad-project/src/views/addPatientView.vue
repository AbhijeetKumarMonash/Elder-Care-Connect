<template>
  <div class="add-patient-page">
    <section class="ap-hero">
      <span class="eyebrow">Admin</span>
      <h1>Add a new patient</h1>
      <p class="lede">Register a patient record in the Elder Care Connect system.</p>
    </section>

    <div class="ap-grid">
      <!-- FORM -->
      <section class="card form-card">
        <h2>Patient details</h2>

        <div v-if="successMessage" class="alert success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>

        <form @submit.prevent="addPatient" novalidate>
          <div class="field">
            <label for="name">Patient name</label>
            <input id="name" v-model="patient.name" type="text" required />
          </div>

          <div class="grid-2">
            <div class="field">
              <label for="age">Age</label>
              <input id="age" v-model="patient.age" type="number" required />
            </div>
            <div class="field">
              <label for="phone">Phone number</label>
              <input id="phone" v-model="patient.phone" type="text" required />
            </div>
          </div>

          <div class="field">
            <label for="careProvider">Care provider</label>
            <input id="careProvider" v-model="patient.careProvider" type="text" required />
          </div>

          <div class="field">
            <label for="insuranceProvider">Insurance provider</label>
            <input
              id="insuranceProvider"
              v-model="patient.insuranceProvider"
              type="text"
              required
            />
          </div>

          <div class="grid-2">
            <div class="field">
              <label for="country">Country</label>
              <input id="country" v-model="patient.country" type="text" required />
            </div>
            <div class="field">
              <label for="occupation">Occupation before retirement</label>
              <input id="occupation" v-model="patient.occupation" type="text" required />
            </div>
          </div>

          <button type="submit" class="btn-primary block" :disabled="submitting">
            {{ submitting ? 'Adding…' : 'Add patient' }}
          </button>
        </form>
      </section>

      <!-- COUNT / QUICK INFO -->
      <aside class="card count-card">
        <p class="count-label">Total patients on record</p>
        <p class="count-num">{{ patientCount }}</p>
        <button class="btn-ghost" @click="getPatientCount" :disabled="refreshing">
          {{ refreshing ? 'Refreshing…' : 'Refresh count' }}
        </button>
        <p class="count-hint">
          Counts are updated live from our patient database. Newly added patients appear immediately
          in the <router-link to="/patient">Patient Table</router-link>.
        </p>
      </aside>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
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
    const submitting = ref(false)
    const refreshing = ref(false)
    const successMessage = ref(null)
    const errorMessage = ref(null)

    const addPatient = async () => {
      successMessage.value = null
      errorMessage.value = null
      submitting.value = true
      try {
        await axios.post('https://addpatient-mmuxaelp3q-uc.a.run.app', patient.value)
        successMessage.value = `Patient "${patient.value.name}" was added successfully.`
        patient.value = {
          name: '',
          careProvider: '',
          insuranceProvider: '',
          country: '',
          age: '',
          phone: '',
          occupation: ''
        }
        await getPatientCount()
      } catch (error) {
        console.error('Error adding patient:', error.message)
        errorMessage.value = 'Failed to add patient. Please check your details and try again.'
      } finally {
        submitting.value = false
      }
    }

    const getPatientCount = async () => {
      refreshing.value = true
      try {
        const response = await axios.get('https://countpatients-mmuxaelp3q-uc.a.run.app')
        patientCount.value = response.data.count
      } catch (error) {
        console.error('Error getting patient count:', error.message)
      } finally {
        refreshing.value = false
      }
    }

    onMounted(getPatientCount)

    return {
      patient,
      patientCount,
      submitting,
      refreshing,
      successMessage,
      errorMessage,
      addPatient,
      getPatientCount
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.add-patient-page {
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --gold: #e9c46a;
  --sand: #fbf7f1;
  --line: #ece3d6;
  --muted: #5d6b73;
  --ink: #22333b;
  --green: #2a7f62;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  color: var(--ink);
  background: var(--sand);
  margin: -1rem auto 0;
  padding: clamp(5rem, 9vw, 7rem) clamp(1.25rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
  max-width: 1100px;
}

.ap-hero {
  text-align: center;
  margin-bottom: 2.5rem;
}
.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
}
.ap-hero h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  color: var(--teal-deep);
  margin: 0.5rem 0 0.6rem;
}
.lede {
  color: var(--muted);
  font-size: 1.1rem;
  margin: 0;
}

.ap-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 1.5rem;
  align-items: start;
}
.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: clamp(1.5rem, 3vw, 2.25rem);
}
.card h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--teal-deep);
  margin: 0 0 1.25rem;
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
.field input {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  font-family: inherit;
  font-size: 1rem;
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

.btn-primary,
.btn-ghost {
  padding: 0.8rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: 1.5px solid transparent;
  font-family: inherit;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    opacity 0.15s ease;
}
.btn-primary {
  background: var(--coral);
  color: #fff;
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}
.btn-primary:disabled,
.btn-ghost:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-primary.block {
  width: 100%;
  display: block;
}
.btn-ghost {
  background: transparent;
  color: var(--teal);
  border-color: var(--teal);
}
.btn-ghost:hover:not(:disabled) {
  background: var(--teal);
  color: #fff;
}

/* COUNT CARD */
.count-card {
  text-align: center;
  background: linear-gradient(160deg, #ffffff 0%, #fdf6ec 100%);
}
.count-label {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 600;
  margin: 0 0 0.5rem;
}
.count-num {
  font-family: 'Fraunces', serif;
  font-size: 3.5rem;
  font-weight: 600;
  color: var(--teal-deep);
  line-height: 1;
  margin: 0 0 1.25rem;
}
.count-hint {
  margin-top: 1rem;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.5;
}
.count-hint a {
  color: var(--coral);
  text-decoration: none;
  font-weight: 600;
}
.count-hint a:hover {
  text-decoration: underline;
}

/* ALERTS */
.alert {
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  font-weight: 600;
}
.alert.success {
  background: #e6f3ec;
  color: var(--green);
}
.alert.error {
  background: #fdeee9;
  color: #b8472d;
}

@media (max-width: 880px) {
  .ap-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 520px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
