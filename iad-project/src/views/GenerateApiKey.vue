<template>
    <div class="container mt-5">
      <BHeader />
      <h2 class="text-center text-primary">Generate Your API Key</h2>
      <p class="text-center">
        Welcome to the Elder Care Connect API Key generator! By generating an API key, you will gain access to our API 
        endpoints to retrieve information on patients and events from our system.
        <br />
        <strong>How to Use the API:</strong> Once you generate your key, use it as a header (`x-api-key`) in your
        requests to the following API endpoints.
      </p>
  
      <div class="text-center mt-4">
        <button @click="generateApiKey" class="btn btn-primary">Generate API Key</button>
      </div>
  
      <div class="mt-5">
        <h4 class="text-success text-center">Your API Key:</h4>
        <p class="text-center">
          <code v-if="apiKey">{{ apiKey }}</code>
          <span v-else class="text-muted">No API key generated yet.</span>
        </p>
  
        <h5 class="text-center mt-4">API Documentation:</h5>
        <div class="row justify-content-center mt-4">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Patients API</h6>
                <p>
                  Use this API to retrieve patient information from our database.
                  <br /><strong>Endpoint:</strong> <code>/patients</code>
                  <br /><strong>Method:</strong> <code>GET</code>
                  <br /><strong>Headers:</strong>
                  <ul>
                    <li><code>x-api-key: {{ apiKey || '[your-api-key]' }}</code></li>
                  </ul>
                  <strong>Example Request:</strong>
                  <pre><code>curl -X GET "https://getallpatients-mmuxaelp3q-uc.a.run.app" -H "x-api-key: {{ apiKey || '[your-api-key]' }}"</code></pre>
                </p>
              </div>
            </div>
          </div>
  
          <div class="col-md-6 mt-3 mt-md-0">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Events API</h6>
                <p>
                  Use this API to retrieve event information from our database.
                  <br /><strong>Endpoint:</strong> <code>/events</code>
                  <br /><strong>Method:</strong> <code>GET</code>
                  <br /><strong>Headers:</strong>
                  <ul>
                    <li><code>x-api-key: {{ apiKey || '[your-api-key]' }}</code></li>
                  </ul>
                  <strong>Example Request:</strong>
                  <pre><code>curl -X GET "https://getallevents-mmuxaelp3q-uc.a.run.app" -H "x-api-key: {{ apiKey || '[your-api-key]' }}"</code></pre>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import BHeader from '@/components/BHeader.vue'
  
  export default {
    name: 'GenerateApiKeyView',
    components: {
      BHeader,
    },
    data() {
      return {
        apiKey: null,
      }
    },
    methods: {
      async generateApiKey() {
        try {
          const response = await axios.get('https://generateapikey-mmuxaelp3q-uc.a.run.app')
          this.apiKey = response.data.apiKey
        } catch (error) {
          console.error('Error generating API key:', error.message)
          alert('Failed to generate API key')
        }
      },
    },
  }
  </script>
  
  <style scoped>
  .container {
    margin-top: 100px;
  }
  
  h2 {
    color: #007bff;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  code {
    background-color: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 5px;
  }
  
  pre {
    background-color: #f1f1f1;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  .text-muted {
    font-style: italic;
    color: #6c757d;
  }
  </style>
  