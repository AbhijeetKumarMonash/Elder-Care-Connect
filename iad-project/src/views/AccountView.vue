<template>
  <div class="account-page">
    <section class="account-hero">
      <span class="eyebrow">Your profile</span>
      <h1>Account information</h1>
      <p class="lede">The details you registered with. Get in touch if anything needs updating.</p>
    </section>

    <section v-if="currentUser" class="profile-card">
      <div class="profile-head">
        <div class="avatar">{{ initials }}</div>
        <div>
          <h2>{{ currentUser.username }}</h2>
          <span class="role-badge" :class="currentUser.role">{{ currentUser.role }}</span>
        </div>
      </div>

      <dl class="detail-grid">
        <div class="detail">
          <dt>Email</dt>
          <dd>{{ currentUser.email }}</dd>
        </div>
        <div class="detail">
          <dt>Age</dt>
          <dd>{{ currentUser.age }}</dd>
        </div>
        <div class="detail">
          <dt>Contact</dt>
          <dd>{{ currentUser.contactDetails }}</dd>
        </div>
        <div class="detail">
          <dt>Emergency contact</dt>
          <dd>{{ currentUser.emergencyContact }}</dd>
        </div>
        <div class="detail full">
          <dt>Address</dt>
          <dd>{{ currentUser.Address }}</dd>
        </div>
      </dl>
    </section>

    <section v-else class="loading-card">
      <div class="spinner" aria-hidden="true"></div>
      <p>Loading account information…</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { auth, db } from '@/firebase/init'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const currentUser = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        currentUser.value = docSnap.data()
      }
    }
  })
})

const initials = computed(() => {
  const name = currentUser.value?.username || ''
  return (
    name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'EC'
  )
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.account-page {
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --sand: #fbf7f1;
  --line: #ece3d6;
  --muted: #5d6b73;
  --ink: #22333b;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  color: var(--ink);
  background: var(--sand);
  margin: -1rem auto 0;
  padding: clamp(5rem, 9vw, 7rem) 1.25rem 3rem;
  max-width: 880px;
}

.account-hero {
  text-align: center;
  margin-bottom: 2rem;
}
.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
}
.account-hero h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  color: var(--teal-deep);
  margin: 0.5rem 0 0.6rem;
}
.lede {
  color: var(--muted);
  font-size: 1.1rem;
  margin: 0;
}

.profile-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: clamp(1.75rem, 3vw, 2.5rem);
  box-shadow: 0 24px 60px -34px rgba(15, 76, 92, 0.4);
}
.profile-head {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--line);
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--teal);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1.4rem;
  flex-shrink: 0;
}
.profile-head h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--teal-deep);
  margin: 0 0 0.3rem;
}
.role-badge {
  display: inline-block;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}
.role-badge.admin {
  background: #fdeee9;
  color: var(--coral);
}
.role-badge.user {
  background: #e0f0f3;
  color: var(--teal-deep);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
  margin: 0;
}
.detail {
  padding: 0.75rem 0;
}
.detail.full {
  grid-column: 1 / -1;
}
.detail dt {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.detail dd {
  margin: 0;
  color: var(--ink);
  font-size: 1.05rem;
  word-break: break-word;
}

.loading-card {
  text-align: center;
  padding: 3rem 1.5rem;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 22px;
  color: var(--muted);
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--line);
  border-top-color: var(--teal);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 560px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
