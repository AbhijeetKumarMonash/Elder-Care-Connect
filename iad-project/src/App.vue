<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BHeader from './components/BHeader.vue'

export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
}

img {
  max-width: 100%;
  height: Auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.navbar-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.about-us-section {
  background-color: #007bff;
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 1200px;
  margin: 20px auto;
}

@media (max-width: 768px) {
  .about-us-section h2 {
    font-size: 2rem;
  }
  .about-us-section h3 {
    font-size: 1.5rem;
  }
  .about-us-section p {
    font-size: 1rem;
  }
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}
</style>
