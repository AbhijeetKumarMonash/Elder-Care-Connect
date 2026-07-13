<template>
  <div class="chart-page">
    <section class="chart-hero">
      <span class="eyebrow">Insights</span>
      <h1>Patient data charts</h1>
      <p class="lede">Explore trends across age, growth over time, and country of origin.</p>
    </section>

    <!-- Chart selector as tabs -->
    <div class="chart-tabs" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ active: selectedChart === tab.id }"
        role="tab"
        :aria-selected="selectedChart === tab.id"
        @click="selectedChart = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <section class="card">
      <div v-if="isLoading" class="loading">
        <div class="spinner" aria-hidden="true"></div>
        <p>Loading chart data…</p>
      </div>

      <div v-else>
        <div v-if="selectedChart === 'ageDistribution'" class="chart-block">
          <h2>Patient age distribution</h2>
          <p class="chart-sub">Members grouped by decade of life.</p>
          <div class="chart-wrap">
            <apexchart
              type="bar"
              :options="ageChartOptions"
              :series="ageChartData"
              height="380"
            ></apexchart>
          </div>
        </div>

        <div v-if="selectedChart === 'countOverTime'" class="chart-block">
          <h2>Patient count over time</h2>
          <p class="chart-sub">How the community has grown.</p>
          <div class="chart-wrap">
            <apexchart
              type="line"
              :options="countChartOptions"
              :series="countChartData"
              height="380"
            ></apexchart>
          </div>
        </div>

        <div v-if="selectedChart === 'countryDistribution'" class="chart-block">
          <h2>Patient country distribution</h2>
          <p class="chart-sub">Where members were born.</p>
          <div class="chart-wrap">
            <apexchart
              type="pie"
              :options="countryChartOptions"
              :series="countryChartData"
              height="380"
            ></apexchart>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init'
import { collection, getDocs } from 'firebase/firestore'
import ApexCharts from 'vue3-apexcharts'

export default {
  components: {
    apexchart: ApexCharts
  },
  setup() {
    const isLoading = ref(true)
    const selectedChart = ref('ageDistribution')
    const patientData = ref([])

    const tabs = [
      { id: 'ageDistribution', label: 'Age distribution' },
      { id: 'countOverTime', label: 'Growth over time' },
      { id: 'countryDistribution', label: 'By country' }
    ]

    const ageChartData = ref([])
    const countChartData = ref([])
    const countryChartData = ref([])

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
        chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Source Sans 3, sans-serif' },
        colors: ['#0f4c5c'],
        plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
        dataLabels: { enabled: false },
        xaxis: {
          categories: Object.keys(ageGroups).map((ageGroup) => `${ageGroup}s`),
          axisBorder: { show: false }
        },
        yaxis: { title: { text: 'Number of Patients' } },
        grid: { strokeDashArray: 4, borderColor: '#ece3d6' }
      }
    }

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
        chart: { type: 'line', toolbar: { show: false }, fontFamily: 'Source Sans 3, sans-serif' },
        colors: ['#e76f51'],
        stroke: { curve: 'smooth', width: 3 },
        markers: { size: 5 },
        xaxis: { categories: sortedDates, axisBorder: { show: false } },
        yaxis: { title: { text: 'Number of Patients' } },
        grid: { strokeDashArray: 4, borderColor: '#ece3d6' }
      }
    }

    const setupCountryChart = () => {
      const countryGroups = patientData.value.reduce((acc, patient) => {
        acc[patient.country] = (acc[patient.country] || 0) + 1
        return acc
      }, {})

      countryChartData.value = Object.values(countryGroups)
      countryChartOptions.value = {
        chart: { type: 'pie', fontFamily: 'Source Sans 3, sans-serif' },
        labels: Object.keys(countryGroups),
        colors: ['#0f4c5c', '#e76f51', '#e9c46a', '#2a7f62', '#8ab5be', '#c17b58', '#5d6b73'],
        legend: { position: 'bottom' }
      }
    }

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
      tabs,
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
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.chart-page {
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --sand: #fbf7f1;
  --line: #ece3d6;
  --muted: #5d6b73;
  --ink: #22333b;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  color: var(--ink);
  background: var(--sand);
  margin: -1rem auto 0;
  padding: clamp(5rem, 9vw, 7rem) clamp(1.25rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
  max-width: 1080px;
}

.chart-hero {
  text-align: center;
  margin-bottom: 2rem;
}
.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
}
.chart-hero h1 {
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

.chart-tabs {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.tab {
  background: transparent;
  border: 1.5px solid var(--line);
  color: var(--muted);
  border-radius: 999px;
  padding: 0.55rem 1.25rem;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}
.tab:hover {
  color: var(--teal-deep);
  border-color: var(--teal);
}
.tab.active {
  background: var(--teal);
  color: #fff;
  border-color: var(--teal);
}

.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: clamp(1.5rem, 3vw, 2rem);
  box-shadow: 0 24px 60px -34px rgba(15, 76, 92, 0.4);
}

.chart-block h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--teal-deep);
  margin: 0 0 0.4rem;
}
.chart-sub {
  color: var(--muted);
  margin: 0 0 1.25rem;
}
.chart-wrap {
  overflow-x: auto;
}

.loading {
  text-align: center;
  padding: 3rem 1.5rem;
  color: var(--muted);
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--line);
  border-top-color: var(--teal);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
