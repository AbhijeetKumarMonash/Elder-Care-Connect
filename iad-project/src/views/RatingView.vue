<template>
  <div class="container mt-5">
    <BHeader />
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <h1 class="text-center">Elder Care Connect</h1>
        <h3 class="text-center">Rating & reviews</h3>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 justify-content-center">
            <div class="col-md-6 col-sm-6">
              <label for="rating" class="form-label">Rating</label>
              <input
                type="number"
                class="form-control"
                id="rating"
                @input="() => validaterating(true)"
                v-model="formData.rating"
              />
              <div v-if="errors.rating" class="text-danger">{{ errors.rating }}</div>
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-md-6 col-sm-6">
              <label for="review" class="form-label">Review</label>
              <textarea
                class="form-control"
                id="review"
                rows="3"
                v-model="formData.review"
              ></textarea>
              <div v-if="errors.review" class="text-danger">{{ errors.review }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import BHeader from '@/components/BHeader.vue'
// No script needed for now
import { ref } from 'vue'

const formData = ref({
  rating: '',
  review: ''
})

const submittedCards = ref([])

const errors = ref({
  rating: null,
  review: null
})
</script>

<style></style>
