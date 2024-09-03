<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >About Us</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/rating" class="nav-link" active-class="active">Rating</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signup" class="nav-link" active-class="active">Sign-up</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </header>
  </div>
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
