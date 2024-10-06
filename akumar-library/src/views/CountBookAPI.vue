<template>
  <div class="container">
    <div>
      <h1>Book Count API</h1>
      <pre>{{ countData }}</pre>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      countData: null
    }
  },
  mounted() {
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-yxbcacykna-uc.a.run.app')
        this.countData = response.data
      } catch (error) {
        console.error('Error fetching book count:', error)
      }
    }
  }
}
</script>
