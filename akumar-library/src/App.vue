<script>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'

export default {
  name: 'App',
  components: {
    BHeader
  },
  methods: {
    // Method to determine if the header should be shown
    showHeader() {
      // Check if the current route name includes 'CountBookAPI'
      return this.$route.name !== 'CountBookAPI'
    }
  }
}
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader()">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  min-height: 100vh;
  text-align: left;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
}

.main-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
}
</style>
