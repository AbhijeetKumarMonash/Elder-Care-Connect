<template>
  <div class="export-buttons">
    <button @click="exportCSV" class="btn btn-primary">Export CSV</button>
    <button @click="exportPDF" class="btn btn-secondary">Export PDF</button>
  </div>
</template>

<script>
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    fileName: {
      type: String,
      default: 'data'
    }
  },
  methods: {
    // CSV export
    exportCSV() {
      const csv = Papa.unparse(this.tableData)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', `${this.fileName}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    // PDF export
    exportPDF() {
      const doc = new jsPDF()

      const headers = Object.keys(this.tableData[0]).map((header) => ({
        title: header,
        dataKey: header
      }))

      const data = this.tableData.map((item) => {
        return Object.values(item)
      })

      doc.autoTable({
        head: [headers],
        body: data
      })

      doc.save(`${this.fileName}.pdf`)
    }
  }
}
</script>

<style scoped>
.export-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

button {
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
}
</style>
