<template>
  <div class="ecc-rating">
    <!-- HEADER -->
    <section class="rate-hero">
      <span class="eyebrow">Member voices</span>
      <h1>How has Elder Care Connect helped you?</h1>
      <p class="lede">
        Your feedback shapes our community events, our AI health assistant and the care we
        coordinate. Tell us what's working — and what we can do better.
      </p>
    </section>

    <div class="rate-grid">
      <!-- LEFT: FORM -->
      <section class="card form-card">
        <h2>Leave a review</h2>

        <form @submit.prevent="submitForm" novalidate>
          <fieldset class="stars-field">
            <legend>Your rating</legend>
            <div
              class="star-row"
              role="radiogroup"
              aria-label="Rating from 1 to 5 stars"
              @mouseleave="hover = 0"
            >
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                class="star"
                role="radio"
                :aria-checked="formData.rating === n"
                :aria-label="`${n} star${n > 1 ? 's' : ''}`"
                :class="{ filled: n <= (hover || formData.rating) }"
                @click="setRating(n)"
                @mouseenter="hover = n"
                @keydown.enter.prevent="setRating(n)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 21.4l1.5-6.8L2.2 9l6.9-.7z"
                  />
                </svg>
              </button>
              <span class="star-caption">{{ ratingCaption }}</span>
            </div>
            <p v-if="errors.rating" class="field-error">{{ errors.rating }}</p>
          </fieldset>

          <div class="field">
            <label for="reviewer">Your name <span class="optional">(optional)</span></label>
            <input
              id="reviewer"
              v-model="formData.name"
              type="text"
              placeholder="e.g. Margaret R."
            />
          </div>

          <div class="field">
            <label for="review">Your review</label>
            <textarea
              id="review"
              v-model="formData.review"
              rows="4"
              placeholder="What did you enjoy? Did our events, assistant or care support make a difference?"
            ></textarea>
            <p v-if="errors.review" class="field-error">{{ errors.review }}</p>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary">Share review</button>
            <button type="button" class="btn-ghost" @click="clearForm">Clear</button>
          </div>
          <p v-if="justSubmitted" class="success-note">
            Thank you — your review has been added below.
          </p>
        </form>
      </section>

      <!-- RIGHT: SUMMARY -->
      <section class="card summary-card">
        <div class="score-block">
          <span class="score-num">{{ averageRating }}</span>
          <div class="score-stars" :aria-label="`Average ${averageRating} out of 5`">
            <svg
              v-for="n in 5"
              :key="n"
              viewBox="0 0 24 24"
              class="mini-star"
              :class="{ on: n <= Math.round(averageRating) }"
              aria-hidden="true"
            >
              <path
                d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 21.4l1.5-6.8L2.2 9l6.9-.7z"
              />
            </svg>
          </div>
          <span class="score-count"
            >{{ ratings.length }} review{{ ratings.length === 1 ? '' : 's' }}</span
          >
        </div>

        <div class="distribution">
          <div v-for="row in distribution" :key="row.star" class="dist-row">
            <span class="dist-label">{{ row.star }}★</span>
            <div class="dist-track">
              <div class="dist-fill" :style="{ width: row.pct + '%' }"></div>
            </div>
            <span class="dist-count">{{ row.count }}</span>
          </div>
        </div>

        <p class="summary-foot">
          Looking for support? Sign in to chat with our
          <router-link to="/login">AI health assistant</router-link> or browse
          <router-link to="/login">upcoming events</router-link>.
        </p>
      </section>
    </div>

    <!-- REVIEWS WALL -->
    <section class="reviews" v-if="recentReviews.length">
      <h2>What members are saying</h2>
      <div class="review-list">
        <article v-for="(r, i) in recentReviews" :key="i" class="review">
          <div class="review-top">
            <div class="avatar">{{ initials(r.name) }}</div>
            <div>
              <p class="review-name">{{ r.name || 'Community member' }}</p>
              <div class="review-stars" :aria-label="`${r.rating} out of 5`">
                <svg
                  v-for="n in 5"
                  :key="n"
                  viewBox="0 0 24 24"
                  class="mini-star"
                  :class="{ on: n <= r.rating }"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 21.4l1.5-6.8L2.2 9l6.9-.7z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p class="review-text">{{ r.review }}</p>
        </article>
      </div>
    </section>

    <section class="reviews empty" v-else>
      <p>No reviews yet — be the first to share your experience.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'ratings'

const formData = ref({ rating: 0, name: '', review: '' })
const errors = ref({ rating: null, review: null })
const ratings = ref([])
const hover = ref(0)
const justSubmitted = ref(false)

const captions = ['Tap a star to rate', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']
const ratingCaption = computed(() => captions[hover.value || formData.value.rating])

onMounted(() => {
  try {
    ratings.value = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    ratings.value = []
  }
})

const setRating = (n) => {
  formData.value.rating = n
  errors.value.rating = null
}

const submitForm = () => {
  errors.value.rating = formData.value.rating ? null : 'Please choose a rating from 1 to 5.'
  errors.value.review = formData.value.review.trim() ? null : 'Please write a short review.'
  if (errors.value.rating || errors.value.review) return

  ratings.value.unshift({
    rating: Number(formData.value.rating),
    name: formData.value.name.trim(),
    review: formData.value.review.trim()
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings.value))

  clearForm()
  justSubmitted.value = true
  setTimeout(() => (justSubmitted.value = false), 4000)
}

const clearForm = () => {
  formData.value = { rating: 0, name: '', review: '' }
  errors.value = { rating: null, review: null }
  hover.value = 0
}

const averageRating = computed(() => {
  if (!ratings.value.length) return 0
  const total = ratings.value.reduce((s, r) => s + r.rating, 0)
  return (total / ratings.value.length).toFixed(1)
})

const distribution = computed(() => {
  const total = ratings.value.length || 1
  return [5, 4, 3, 2, 1].map((star) => {
    const count = ratings.value.filter((r) => r.rating === star).length
    return { star, count, pct: Math.round((count / total) * 100) }
  })
})

const recentReviews = computed(() => ratings.value.filter((r) => r.review).slice(0, 9))

const initials = (name) => {
  if (!name) return 'EC'
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.ecc-rating {
  --ink: #22333b;
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --gold: #e9a32a;
  --sand: #fbf7f1;
  --cloud: #ffffff;
  --muted: #5d6b73;
  --line: #ece3d6;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  color: var(--ink);
  background: var(--sand);
  margin: -1rem auto 0;
  padding: clamp(5rem, 9vw, 7rem) clamp(1.25rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
  max-width: 1180px;
}

/* HERO */
.rate-hero {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 3rem;
}
.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
}
.rate-hero h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  color: var(--teal-deep);
  margin: 0.75rem 0 1rem;
}
.lede {
  color: var(--muted);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 0;
}

/* GRID */
.rate-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.5rem;
  align-items: start;
}
.card {
  background: var(--cloud);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: clamp(1.5rem, 3vw, 2.25rem);
}
.card h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--teal-deep);
  margin: 0 0 1.25rem;
}

/* FORM — STARS */
.stars-field {
  border: 0;
  padding: 0;
  margin: 0 0 1.25rem;
}
.stars-field legend {
  font-weight: 600;
  font-size: 1rem;
  color: var(--ink);
  margin-bottom: 0.5rem;
  padding: 0;
}
.star-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.star {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.15rem;
  line-height: 0;
  transition: transform 0.12s ease;
}
.star svg {
  width: 34px;
  height: 34px;
  fill: #d9d0c2;
  transition: fill 0.12s ease;
}
.star:hover {
  transform: scale(1.12);
}
.star.filled svg {
  fill: var(--gold);
}
.star:focus-visible {
  outline: 3px solid var(--teal);
  outline-offset: 2px;
  border-radius: 6px;
}
.star-caption {
  margin-left: 0.75rem;
  font-size: 0.95rem;
  color: var(--muted);
  font-weight: 500;
}

.field {
  margin-bottom: 1.1rem;
}
.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.optional {
  font-weight: 400;
  color: var(--muted);
  font-size: 0.9rem;
}
.field input,
.field textarea {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  background: #fffdf9;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}
.field textarea {
  resize: vertical;
}
.field-error {
  color: var(--coral);
  font-size: 0.9rem;
  margin: 0.4rem 0 0;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.btn-primary,
.btn-ghost {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
}
.btn-primary {
  background: var(--coral);
  color: #fff;
  box-shadow: 0 10px 22px -12px rgba(231, 111, 81, 0.85);
}
.btn-primary:hover {
  transform: translateY(-2px);
}
.btn-ghost {
  background: transparent;
  color: var(--teal);
  border-color: var(--teal);
}
.btn-ghost:hover {
  background: var(--teal);
  color: #fff;
}
.success-note {
  margin-top: 1rem;
  color: #2a7f62;
  font-weight: 600;
}

/* SUMMARY */
.summary-card {
  background: linear-gradient(160deg, #ffffff 0%, #fdf6ec 100%);
}
.score-block {
  text-align: center;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--line);
}
.score-num {
  font-family: 'Fraunces', serif;
  font-size: 3.5rem;
  font-weight: 600;
  color: var(--teal-deep);
  line-height: 1;
}
.score-stars {
  margin: 0.5rem 0 0.35rem;
  display: flex;
  justify-content: center;
  gap: 3px;
}
.mini-star {
  width: 20px;
  height: 20px;
  fill: #e0d7c8;
}
.mini-star.on {
  fill: var(--gold);
}
.score-count {
  color: var(--muted);
  font-size: 0.95rem;
}
.distribution {
  padding: 1.25rem 0;
}
.dist-row {
  display: grid;
  grid-template-columns: 2.2rem 1fr 1.8rem;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}
.dist-label {
  font-size: 0.9rem;
  color: var(--muted);
  font-weight: 600;
}
.dist-track {
  background: #efe7d9;
  border-radius: 999px;
  height: 9px;
  overflow: hidden;
}
.dist-fill {
  height: 100%;
  background: var(--gold);
  border-radius: 999px;
  transition: width 0.4s ease;
}
.dist-count {
  font-size: 0.9rem;
  color: var(--muted);
  text-align: right;
}
.summary-foot {
  font-size: 0.95rem;
  color: var(--muted);
  margin: 0;
  padding-top: 0.5rem;
  border-top: 1px solid var(--line);
  line-height: 1.5;
}
.summary-foot a {
  color: var(--coral);
  font-weight: 600;
  text-decoration: none;
}
.summary-foot a:hover {
  text-decoration: underline;
}

/* REVIEWS WALL */
.reviews {
  margin-top: 3rem;
}
.reviews h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: var(--teal-deep);
  text-align: center;
  margin: 0 0 1.75rem;
}
.review-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.review {
  background: var(--cloud);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1.5rem;
}
.review-top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--teal);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
}
.review-name {
  font-weight: 600;
  margin: 0;
  color: var(--ink);
}
.review-stars {
  display: flex;
  gap: 2px;
  margin-top: 2px;
}
.review-stars .mini-star {
  width: 15px;
  height: 15px;
}
.review-text {
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
  word-break: break-word;
}

.reviews.empty {
  text-align: center;
  color: var(--muted);
  font-size: 1.05rem;
}

/* RESPONSIVE */
@media (max-width: 880px) {
  .rate-grid {
    grid-template-columns: 1fr;
  }
  .review-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .review-list {
    grid-template-columns: 1fr;
  }
  .star svg {
    width: 30px;
    height: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ecc-rating * {
    transition: none !important;
  }
}
</style>
