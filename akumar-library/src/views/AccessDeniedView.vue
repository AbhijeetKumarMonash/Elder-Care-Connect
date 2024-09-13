<template>
    <div class="center-content">
      <h1>Access Denied</h1>
      <p>You must be logged in to view this page.</p>
      <router-link to="/login" class="btn btn-primary">Go to Login</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 20px;
  }
  </style>
  