<template>
    <div class="container mt-5">
      <h2 class="text-center">Ask Gemini AI</h2>
      <p class="description">
        Welcome to Gemini AI! You can ask me any questions related to elder care, health advice, or general queries.
        Simply type your question in the box below, and I'll do my best to provide a helpful answer. Here are some examples of questions you can ask:
        <ul>
          <li>“What exercises are good for seniors?”</li>
          <li>“How can I improve my memory?”</li>
          <li>“What foods should I avoid for high blood pressure?”</li>
        </ul>
        Feel free to ask anything!
      </p>
      
      <textarea v-model="userPrompt" placeholder="Ask me anything..." class="form-control"></textarea>
      <button @click="getGeminiResponse" class="btn btn-primary mt-3" :disabled="!userPrompt">
        {{ isLoading ? 'Fetching response...' : 'Ask Gemini' }}
      </button>
  
      <div v-if="response" class="response mt-4">
        <h5>Response:</h5>
        <p>{{ response }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useGemini } from '@/GeminiService'
  
  export default {
    name: 'GeminiPrompt',
    setup() {
      const userPrompt = ref('')
      const response = ref('')
      const isLoading = ref(false)
  
      const getGeminiResponse = async () => {
        if (userPrompt.value) {
          isLoading.value = true
          try {
            response.value = await useGemini(userPrompt.value)
          } catch (error) {
            console.error('Error fetching Gemini response:', error)
          } finally {
            isLoading.value = false
          }
        }
      }
  
      return {
        userPrompt,
        response,
        isLoading,
        getGeminiResponse
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: auto;
  }
  
  .description {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  textarea {
    width: 100%;
    height: 150px;
    margin-bottom: 15px;
  }
  
  button {
    margin-top: 10px;
  }
  
  .response {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
  }
  </style>
  