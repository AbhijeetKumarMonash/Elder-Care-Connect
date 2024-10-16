<template>
  <div class="container mt-5">
    <BHeader />
    <h2 class="text-center">Interactive Patient Data Charts</h2>

    <!-- Dropdown for Chart Selection -->
    <div class="form-group text-center">
      <label for="chartSelection">Select Chart to Display:</label>
      <select v-model="selectedChart" class="form-control" id="chartSelection">
        <option value="ageDistribution">Patient Age Distribution (Bar Chart)</option>
        <option value="countOverTime">Patient Count Over Time (Line Chart)</option>
        <option value="countryDistribution">Patient Country Distribution (Pie Chart)</option>
      </select>
    </div>

    <!-- Show Loading Text -->
    <div v-if="isLoading" class="text-center">Loading chart...</div>

    <!-- Conditionally Render Charts -->
    <div v-else>
      <!-- Bar Chart: Age Distribution -->
      <div v-if="selectedChart === 'ageDistribution'">
        <h3>Patient Age Distribution</h3>
        <apexchart
          type="bar"
          :options="ageChartOptions"
          :series="ageChartData"
          width="600"
        ></apexchart>
      </div>

      <!-- Line Chart: Count Over Time -->
      <div v-if="selectedChart === 'countOverTime'">
        <h3>Patient Count Over Time</h3>
        <apexchart
          type="line"
          :options="countChartOptions"
          :series="countChartData"
          width="600"
        ></apexchart>
      </div>

      <!-- Pie Chart: Country Distribution -->
      <div v-if="selectedChart === 'countryDistribution'">
        <h3>Patient Country Distribution</h3>
        <apexchart
          type="pie"
          :options="countryChartOptions"
          :series="countryChartData"
          width="600"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init'
import { collection, getDocs } from 'firebase/firestore'
import ApexCharts from 'vue3-apexcharts'
import BHeader from '@/components/BHeader.vue'

export default {
  components: {
    BHeader,
    apexchart: ApexCharts
  },
  setup() {
    const isLoading = ref(true)
    const selectedChart = ref('ageDistribution')
    const patientData = ref([])

    // Data for all charts
    const ageChartData = ref([])
    const countChartData = ref([])
    const countryChartData = ref([])

    // Options for all charts
    const ageChartOptions = ref({})
    const countChartOptions = ref({})
    const countryChartOptions = ref({})

    const fetchPatientData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'patients'))
        patientData.value = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date()
        }))
      } catch (error) {
        console.error('Error fetching patient data:', error)
      }
    }

    // Setup Age Distribution Chart (Bar)
    const setupAgeChart = () => {
      const ageGroups = patientData.value.reduce((acc, patient) => {
        const ageGroup = Math.floor(patient.age / 10) * 10
        acc[ageGroup] = (acc[ageGroup] || 0) + 1
        return acc
      }, {})

      ageChartData.value = [
        {
          name: 'Number of Patients',
          data: Object.values(ageGroups)
        }
      ]

      ageChartOptions.value = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Patient Age Distribution'
        },
        xaxis: {
          categories: Object.keys(ageGroups).map((ageGroup) => `${ageGroup}s`)
        },
        yaxis: {
          title: {
            text: 'Number of Patients'
          }
        }
      }
    }

    // Setup Patient Count Over Time (Line)
    const setupCountChart = () => {
      const patientCountByDate = patientData.value.reduce((acc, patient) => {
        const date = patient.createdAt.toISOString().split('T')[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {})

      const sortedDates = Object.keys(patientCountByDate).sort()

      countChartData.value = [
        {
          name: 'Patient Count',
          data: sortedDates.map((date) => patientCountByDate[date])
        }
      ]

      countChartOptions.value = {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Patient Count Over Time'
        },
        xaxis: {
          categories: sortedDates
        },
        yaxis: {
          title: {
            text: 'Number of Patients'
          }
        }
      }
    }

    // Setup Country Distribution Chart (Pie)
    const setupCountryChart = () => {
      const countryGroups = patientData.value.reduce((acc, patient) => {
        acc[patient.country] = (acc[patient.country] || 0) + 1
        return acc
      }, {})

      countryChartData.value = Object.values(countryGroups)
      countryChartOptions.value = {
        chart: {
          type: 'pie'
        },
        labels: Object.keys(countryGroups),
        title: {
          text: 'Patient Country Distribution'
        }
      }
    }

    // Fetch Data and Setup Charts on Component Mount
    onMounted(async () => {
      await fetchPatientData()
      isLoading.value = false
      setupAgeChart()
      setupCountChart()
      setupCountryChart()
    })

    return {
      isLoading,
      selectedChart,
      ageChartData,
      ageChartOptions,
      countChartData,
      countChartOptions,
      countryChartData,
      countryChartOptions
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px;
}
.text-center {
  text-align: center;
}
</style>
