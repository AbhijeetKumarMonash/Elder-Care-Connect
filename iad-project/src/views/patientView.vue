<template>
  <div class="table-page">
    <section class="table-hero">
      <div class="hero-text">
        <span class="eyebrow">Care records</span>
        <h1>Patient data</h1>
        <p class="lede">Search, sort and export the Elder Care Connect patient list.</p>
      </div>
      <ExportComponent :tableData="patients" fileName="patients-data" />
    </section>

    <section class="card">
      <div class="table-toolbar">
        <div class="search-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="search-icon"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="filters.global.value"
            placeholder="Search all patient records…"
            class="search-input"
            @input="$refs.dataTable.filter($event.target.value, '', 'contains')"
          />
        </div>
      </div>

      <DataTable
        ref="dataTable"
        :value="patients"
        paginator
        paginatorPosition="bottom"
        rows="10"
        :filters="filters"
        :sortMode="'multiple'"
        responsiveLayout="scroll"
        class="ecc-datatable"
      >
        <Column
          field="name"
          header="Patient Name"
          sortable
          filter
          filterPlaceholder="Search by name"
        ></Column>
        <Column
          field="careProvider"
          header="Care Provider"
          sortable
          filter
          filterPlaceholder="Search by care provider"
        ></Column>
        <Column
          field="insuranceProvider"
          header="Insurance Provider"
          sortable
          filter
          filterPlaceholder="Search by insurance provider"
        ></Column>
        <Column
          field="country"
          header="Country of Origin"
          sortable
          filter
          filterPlaceholder="Search by country"
        ></Column>
        <Column field="age" header="Age" sortable filter filterPlaceholder="Search by age"></Column>
        <Column
          field="phone"
          header="Phone Number"
          sortable
          filter
          filterPlaceholder="Search by phone number"
        ></Column>
        <Column
          field="occupation"
          header="Occupation Before Retirement"
          sortable
          filter
          filterPlaceholder="Search by occupation"
        ></Column>
      </DataTable>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { patients } from '@/mockPatientData'
import ExportComponent from '@/components/ExportComponent.vue'

export default {
  components: {
    DataTable,
    Column,
    ExportComponent
  },
  setup() {
    const filters = ref({
      global: { value: null, matchMode: 'contains' },
      name: { value: null, matchMode: 'contains' },
      careProvider: { value: null, matchMode: 'contains' },
      insuranceProvider: { value: null, matchMode: 'contains' },
      country: { value: null, matchMode: 'contains' },
      age: { value: null, matchMode: 'gte' },
      phone: { value: null, matchMode: 'contains' },
      occupation: { value: null, matchMode: 'contains' }
    })

    return {
      patients,
      filters
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.table-page {
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
  max-width: 1280px;
}

.table-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.hero-text {
  text-align: left;
}
.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
}
.hero-text h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  color: var(--teal-deep);
  margin: 0.4rem 0 0.5rem;
  line-height: 1.15;
}
.lede {
  color: var(--muted);
  font-size: 1.05rem;
  margin: 0;
}

.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 24px 60px -34px rgba(15, 76, 92, 0.4);
}

.table-toolbar {
  margin-bottom: 1rem;
}
.search-wrap {
  position: relative;
  max-width: 480px;
}
.search-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--muted);
  pointer-events: none;
}
.search-input {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 0.65rem 0.9rem 0.65rem 2.5rem;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--ink);
  background: #fffdf9;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.search-input:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}

/* Gentle nudge to PrimeVue DataTable so it fits the palette without
   fighting its internals. */
.ecc-datatable :deep(.p-datatable-thead > tr > th) {
  background: #f6efe2;
  color: var(--muted);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
}
.ecc-datatable :deep(.p-datatable-tbody > tr) {
  transition: background 0.15s ease;
}
.ecc-datatable :deep(.p-datatable-tbody > tr:hover) {
  background: #fdf6ec;
}
</style>
