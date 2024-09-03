<template>
  <div>
    <BHeader />
    <div class="container mt-4">
      <div class="row">
        <div class="col text-center">
          <img src="../images/websitemain.jpg" alt="Elderly people smiling" class="img-fluid" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col text-center bg-primary text-white py-4">
          <h2>About Us</h2>
          <h3>Our Mission</h3>
          <p>
            At ElderAwesome, our mission is to enhance the well-being and quality of life for the
            elderly population by providing accessible healthcare resources, fostering social
            connections, and promoting mental and physical wellness.
          </p>
          <h3>Who We Are</h3>
          <p>
            Founded in [Year], we are a dedicated health charity that offers a variety of services
            aimed at supporting seniors in their journey toward healthier, more fulfilling lives.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BHeader from '../components/BHeader.vue'

export default {
  name: 'HomeView',
  components: {
    BHeader
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
.bg-primary {
  background-color: #007bff !important;
}
</style>
