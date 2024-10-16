<template>
  <div class="container mt-5">
    <BHeader />
    <!-- Header component -->
    <ExportComponent :tableData="patients" fileName="patients-data" />
    <h2 class="text-center">Elder Care Patient Data</h2>
    <div class="global-filter-container">
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <input
          v-model="filters.global.value"
          placeholder="Global Search"
          class="global-filter"
          @input="$refs.dataTable.filter($event.target.value, '', 'contains')"
        />
      </span>
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
  </div>
</template>

<script>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import BHeader from '@/components/BHeader.vue'
import { patients } from '@/mockPatientData'
import ExportComponent from '@/components/ExportComponent.vue'

export default {
  components: {
    DataTable,
    Column,
    BHeader,
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
.custom-table {
  margin-top: 20px;
  width: 100%;
}

.text-center {
  text-align: center;
  margin-bottom: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.container {
  margin-top: 100px;
}
</style>
