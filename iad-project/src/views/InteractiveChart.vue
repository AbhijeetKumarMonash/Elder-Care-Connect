<template>
  <div class="container mt-5">
    <BHeader />
    <h2>Interactive Patient Data Chart</h2>
    <!-- Display loading message while fetching the data -->
    <div v-if="isLoading">Loading chart...</div>

    <!-- Render the chart when loading is complete -->
    <div v-else>
      <apexchart type="pie" :options="chartOptions" :series="chartData" width="500"></apexchart>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init' // Firestore initialization file
import { collection, getDocs } from 'firebase/firestore'
import ApexCharts from 'vue3-apexcharts'
import BHeader from '@/components/BHeader.vue'

export default {
  components: {
    BHeader,
    apexchart: ApexCharts
  },
  setup() {
    const isLoading = ref(true) // Manage loading state
    const patientData = ref([]) // Store patient data
    const chartData = ref([]) // Data for chart
    const chartOptions = ref({}) // Options for chart

    // Fetch patient data from Firestore
    const fetchPatientData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'patients'))
        patientData.value = querySnapshot.docs.map((doc) => doc.data())
      } catch (error) {
        console.error('Error fetching patient data:', error)
      }
    }

    // Set up the chart after loading data
    const setupChart = () => {
      // Group patients by country
      const countryCount = patientData.value.reduce((acc, patient) => {
        acc[patient.country] = (acc[patient.country] || 0) + 1
        return acc
      }, {})

      // Prepare data for the chart
      chartData.value = Object.values(countryCount)

      // Set up the chart options
      chartOptions.value = {
        chart: {
          type: 'pie'
        },
        labels: Object.keys(countryCount),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }

    // Fetch data and stop loading on mounted
    onMounted(async () => {
      await fetchPatientData()
      isLoading.value = false // Mark loading as complete
      setupChart() // Setup chart after data is loaded
    })

    return {
      isLoading,
      chartData,
      chartOptions
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px;
}
</style>
