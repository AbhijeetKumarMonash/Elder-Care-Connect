<template>
  <div class="container mt-5">
    <BHeader />
    <h3 class="text-center">Send an Email</h3>
    <form @submit.prevent="submitEmail">
      <div class="mb-3">
        <label for="email" class="form-label">Recipient Email</label>
        <input type="email" class="form-control" id="email" v-model="emailData.to" required />
      </div>
      <div class="mb-3">
        <label for="subject" class="form-label">Subject</label>
        <input type="text" class="form-control" id="subject" v-model="emailData.subject" required />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea class="form-control" id="message" v-model="emailData.text" required></textarea>
      </div>
      <div class="mb-3">
        <label for="attachment" class="form-label">Attachment (Optional)</label>
        <input type="file" class="form-control" id="attachment" @change="onFileChange" />
      </div>
      <button type="submit" class="btn btn-primary">Send Email</button>
    </form>
    <div
      v-if="responseMessage"
      class="alert mt-3"
      :class="{ 'alert-success': success, 'alert-danger': !success }"
    >
      {{ responseMessage }}
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const emailData = ref({
  to: '',
  subject: '',
  text: '',
  attachment: null
})

const responseMessage = ref('')
const success = ref(false)

const onFileChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (event) => {
    emailData.value.attachment = {
      filename: file.name,
      content: event.target.result.split(',')[1], // Base64 content
      type: file.type
    }
  }
  reader.readAsDataURL(file)
}

const submitEmail = async () => {
  try {
    const response = await axios.post(
      'https://us-central1-iad-project-2b1d0.cloudfunctions.net/sendEmail',
      emailData.value,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    responseMessage.value = response.data.message
    success.value = response.data.success
  } catch (error) {
    responseMessage.value = error.response?.data?.message || 'Failed to send email.'
    success.value = false
  }
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}

h3 {
  margin-bottom: 20px;
}

.form-label {
  font-size: 1.1rem;
}

textarea {
  min-height: 100px;
}

.alert {
  text-align: center;
}
</style>
