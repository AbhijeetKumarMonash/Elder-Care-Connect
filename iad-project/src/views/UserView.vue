<template>
  <div class="dash-page">
    <section class="dash-hero">
      <span class="eyebrow">Member dashboard</span>
      <h1>Welcome back{{ greetingName }}.</h1>
      <p class="lede">Everything you need to stay well and stay connected — one tap away.</p>
    </section>

    <section class="features">
      <router-link v-for="f in features" :key="f.to" :to="f.to" class="feature-tile">
        <div class="tile-icon" v-html="f.icon"></div>
        <div class="tile-text">
          <h3>{{ f.title }}</h3>
          <p>{{ f.body }}</p>
        </div>
        <span class="tile-arrow" aria-hidden="true">→</span>
      </router-link>
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
      if (docSnap.exists()) currentUser.value = docSnap.data()
    }
  })
})

const greetingName = computed(() =>
  currentUser.value?.username ? `, ${currentUser.value.username}` : ''
)

const icon = {
  users:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.38 8.38 0 0 1 8.5-8.5A8.5 8.5 0 0 1 21 11.5z"/></svg>',
  chart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
}

const features = [
  {
    icon: icon.users,
    title: 'Patient records',
    body: 'Search and sort patient information.',
    to: '/patient'
  },
  {
    icon: icon.calendar,
    title: 'Upcoming events',
    body: 'Browse workshops and gatherings.',
    to: '/events'
  },
  {
    icon: icon.chat,
    title: 'AI health assistant',
    body: 'Ask health and wellness questions.',
    to: '/gemini'
  },
  {
    icon: icon.chart,
    title: 'Health insights',
    body: 'Interactive charts and trends.',
    to: '/interactivechart'
  },
  { icon: icon.map, title: 'Map & directions', body: 'Find services near you.', to: '/map' },
  { icon: icon.send, title: 'Send an email', body: 'Reach our team directly.', to: '/send-email' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.dash-page {
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
  padding: clamp(5rem, 9vw, 7rem) clamp(1.25rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
  max-width: 1180px;
}

.dash-hero {
  text-align: center;
  margin-bottom: 2.5rem;
}
.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
}
.dash-hero h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: var(--teal-deep);
  margin: 0.5rem 0 0.75rem;
  line-height: 1.15;
}
.lede {
  color: var(--muted);
  font-size: 1.15rem;
  margin: 0;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.feature-tile {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1.75rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  position: relative;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}
.feature-tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px -22px rgba(15, 76, 92, 0.45);
  border-color: #d7e3e6;
}
.feature-tile:hover .tile-arrow {
  transform: translateX(4px);
  color: var(--coral);
}
.tile-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(15, 76, 92, 0.08);
  color: var(--teal);
  margin-bottom: 1.1rem;
}
.tile-icon :deep(svg) {
  width: 26px;
  height: 26px;
}
.tile-text h3 {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--teal-deep);
  margin: 0 0 0.4rem;
}
.tile-text p {
  color: var(--muted);
  font-size: 0.98rem;
  line-height: 1.5;
  margin: 0;
}
.tile-arrow {
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  color: var(--muted);
  font-size: 1.2rem;
  transition:
    transform 0.18s ease,
    color 0.18s ease;
}

@media (max-width: 880px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .features {
    grid-template-columns: 1fr;
  }
}
@media (prefers-reduced-motion: reduce) {
  .feature-tile,
  .tile-arrow {
    transition: none;
  }
}
</style>
