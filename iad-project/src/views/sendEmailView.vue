<template>
  <div class="container mt-5">
    <header><BHeader /></header>

    <div class="email-form">
      <h2>Send an Email</h2>
      <form @submit.prevent="sendEmail">
        <div>
          <label for="to_name">To Name:</label>
          <input v-model="to_name" id="to_name" type="text" placeholder="Recipient Name" required />
        </div>
        <div>
          <label for="from_name">From Name:</label>
          <input v-model="from_name" id="from_name" type="text" placeholder="Your Name" required />
        </div>
        <div>
          <label for="message">Message:</label>
          <textarea
            v-model="message"
            id="message"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  </div>
</template>

<script>
import { send } from 'emailjs-com'
import BHeader from '@/components/BHeader.vue'

export default {
  components: {
    BHeader
  },
  name: 'SendEmailView',
  data() {
    return {
      to_name: '',
      from_name: '',
      message: ''
    }
  },
  methods: {
    async sendEmail() {
      const templateParams = {
        to_name: this.to_name,
        from_name: this.from_name,
        message: this.message
      }

      try {
        const result = await send(
          'service_575oj4d',
          'template_v4qlyip',
          templateParams,
          '4JIWbDtdQkVtwEC8K'
        )
        console.log('Email successfully sent!', result.status, result.text)
        alert('Email successfully sent!')
      } catch (error) {
        console.error('Error sending email:', error)
        alert('Failed to send email. Please try again later.')
      }
    }
  }
}
</script>

<style scoped>
.email-form {
  margin: 50px auto;
  width: 400px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
