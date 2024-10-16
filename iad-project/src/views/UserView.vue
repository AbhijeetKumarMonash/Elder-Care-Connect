<template>
  <div class="container mt-5">
    <BHeader />
    <div class="dashboard-content">
      <h2 class="text-center">User Dashboard</h2>
      <h4 class="text-center">
        Welcome to the Elder Care Connect Platform! <br />
        Here, you can use the following features:
      </h4>

      <!-- Dashboard Feature Cards -->
      <div class="features-container">
        <div class="feature-card">
          <h5>View and manage patient information</h5>
          <p>
            Navigate to the <strong>"Patient Table"</strong> from the navbar for advanced search and
            sorting options.
          </p>
        </div>

        <div class="feature-card">
          <h5>Check out upcoming events</h5>
          <p>
            Navigate to the <strong>"Event Table"</strong> to explore upcoming events and details
            about organizers and schedules.
          </p>
        </div>

        <div class="feature-card">
          <h5>Ask for help or advice</h5>
          <p>
            Use our <strong>"Gemini AI Assistant"</strong> to get advice or help by asking any
            questions you may have.
          </p>
        </div>

        <div class="feature-card">
          <h5>Explore charts with interactive data visualizations</h5>
          <p>
            Visit the <strong>"Charts"</strong> section to explore and analyze data related to
            patients, events, and more.
          </p>
        </div>

        <div class="feature-card">
          <h5>View maps for better navigation</h5>
          <p>
            Go to the <strong>"Map"</strong> section for location-based services and navigation
            assistance within the platform.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BHeader from '@/components/BHeader.vue'
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
}

.text-center {
  text-align: center;
  margin-bottom: 20px;
}

.dashboard-content {
  padding: 20px;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.feature-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.feature-card:hover {
  transform: translateY(-5px);
}

h5 {
  color: #007bff;
  margin-bottom: 10px;
}

p {
  color: #333;
  font-size: 1rem;
}
</style>
