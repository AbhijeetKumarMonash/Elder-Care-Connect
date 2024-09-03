<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">ElderCareConnect</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link">Featured Services</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/testimonials" class="nav-link">Testimonial</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BHeader'
}
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
