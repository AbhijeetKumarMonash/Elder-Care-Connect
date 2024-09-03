<template>
  <div class="container mt-5">
    <BHeader />
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <h3 class="text-center">Rating & reviews</h3>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 justify-content-center">
            <div class="col-md-6 col-sm-6">
              <label for="rating" class="form-label">Rating</label>
              <input
                type="number"
                class="form-control"
                id="rating"
                @input="() => validateRating(true)"
                v-model="formData.rating"
                min="1"
                max="5"
                placeholder="Rate from 1 to 5"
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
                placeholder="Write your review here"
              ></textarea>
              <div v-if="errors.review" class="text-danger">{{ errors.review }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
        <div class="text-center mt-4">
          <h4>Average Rating: {{ averageRating }} / 5</h4>
          <p>Based on {{ ratings.length }} ratings</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BHeader from '@/components/BHeader.vue'

import { ref, computed, onMounted } from 'vue'

const formData = ref({
  rating: '',
  review: ''
})

const errors = ref({
  rating: null,
  review: null
})
const ratings = ref([])

onMounted(() => {
  ratings.value = JSON.parse(localStorage.getItem('ratings')) || []
})

const validateRating = (blur) => {
  if (formData.value.rating < 1 || formData.value.rating > 5) {
    if (blur) errors.value.rating = 'Please enter a rating between 1 and 5'
  } else {
    errors.value.rating = null
  }
}

const submitForm = () => {
  validateRating(true)
  if (!errors.value.rating && formData.value.review.trim()) {
    ratings.value.push({
      rating: Number(formData.value.rating),
      review: formData.value.review.trim()
    })
    localStorage.setItem('ratings', JSON.stringify(ratings.value))

    clearForm()
  } else {
    if (!formData.value.review.trim()) {
      errors.value.review = 'Review cannot be empty'
    }
  }
}

const clearForm = () => {
  formData.value = {
    rating: '',
    review: ''
  }
  errors.value = {
    rating: null,
    review: null
  }
}

const averageRating = computed(() => {
  if (ratings.value.length === 0) return 0
  const total = ratings.value.reduce((sum, entry) => sum + entry.rating, 0)
  return (total / ratings.value.length).toFixed(1)
})
</script>

<style>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.text-center h4 {
  margin-top: 20px;
  color: #007bff;
}

.text-danger {
  margin-top: 5px;
  font-size: 0.875rem;
}
</style>
