<template>
  <div class="container mt-5">
    <BHeader />
    <ExportComponent :tableData="events" fileName="event-data" />
    <h2 class="text-center">Upcoming Events</h2>
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
      :value="events"
      paginator
      paginatorPosition="bottom"
      rows="10"
      :filters="filters"
      :sortMode="'multiple'"
      responsiveLayout="scroll"
    >
      <Column
        field="eventName"
        header="Event Name"
        sortable
        filter
        filterPlaceholder="Search by event name"
      ></Column>
      <Column
        field="eventDate"
        header="Date of Event"
        sortable
        filter
        filterPlaceholder="Search by event date"
      ></Column>
      <Column
        field="eventTime"
        header="Time of Event"
        sortable
        filter
        filterPlaceholder="Search by event time"
      ></Column>
      <Column
        field="organizer"
        header="Organizer"
        sortable
        filter
        filterPlaceholder="Search by organizer"
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import BHeader from '@/components/BHeader.vue'
import { events } from '@/mockEventData'
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
      eventName: { value: null, matchMode: 'contains' },
      eventDate: { value: null, matchMode: 'contains' },
      eventTime: { value: null, matchMode: 'contains' },
      organizer: { value: null, matchMode: 'contains' }
    })

    return {
      events,
      filters
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px;
}

.global-filter-container {
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
  margin-bottom: 20px;
}
</style>
