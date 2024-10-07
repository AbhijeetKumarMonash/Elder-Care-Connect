<template>
  <div class="container mt-5">
    <BHeader />
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <h3 class="text-center">Admin Dashboard</h3>
        <p class="text-center">Welcome, Admin! You have access to manage the application.</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import BHeader from '@/components/BHeader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<style scoped>
.justify-content-center p {
  background-color: #007bff;
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
