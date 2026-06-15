<template>
  <div class="ecc-about">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">Elder Care Connect · since 2023</span>
          <h1 class="hero-title">
            Care that keeps people <em>connected</em>, not just looked after.
          </h1>
          <p class="hero-lede">
            We're a health charity helping older adults live healthier, more social and more
            independent lives — bringing their care team, community and health insights together in
            one warm, simple place.
          </p>
          <div class="hero-actions">
            <router-link to="/signup" class="btn-primary">Join the community</router-link>
            <router-link to="/login" class="btn-ghost">Sign in to explore features</router-link>
          </div>
        </div>
        <div class="hero-media">
          <img src="../images/websitemain.jpg" alt="Older adults supported by Elder Care Connect" />
          <div class="hero-badge">
            <span class="badge-num">5</span>
            <span class="badge-label">ways we support every member</span>
          </div>
        </div>
      </div>
    </section>

    <!-- MISSION -->
    <section class="mission">
      <p class="mission-label">Our mission</p>
      <p class="mission-statement">
        To enhance the well-being and quality of life of the elderly by making healthcare resources
        accessible, nurturing social connection, and championing mental and physical wellness.
      </p>
    </section>

    <!-- HOW WE HELP -->
    <section class="help">
      <header class="section-head">
        <h2>How we help</h2>
        <p>Everything a member or carer needs, gathered into one platform. Sign in to use them.</p>
      </header>

      <div class="pillars">
        <article v-for="f in features" :key="f.title" class="pillar">
          <div class="pillar-icon" v-html="f.icon"></div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.body }}</p>
          <router-link :to="f.to" class="pillar-link">{{ f.cta }} →</router-link>
        </article>
      </div>
      <p class="help-note">
        These features are available to members. If you're not signed in, we'll take you to the
        login page first.
      </p>
    </section>

    <!-- STORY -->
    <section class="story">
      <div class="story-grid">
        <div class="story-media">
          <img src="../images/Elder2.jpg" alt="A member of the Elder Care Connect community" />
        </div>
        <div class="story-copy">
          <p class="mission-label">Who we are</p>
          <h2>A charity built around the people we serve.</h2>
          <p>
            Founded in 2023, Elder Care Connect is a dedicated health charity offering a range of
            services that support seniors on their journey toward healthier, more fulfilling lives.
          </p>
          <p>
            We believe technology should feel kind. Every feature here exists to remove a barrier —
            whether that's a question at midnight, a hard-to-reach appointment, or simply staying
            close to the people who matter.
          </p>
        </div>
      </div>
    </section>

    <!-- TRUST BAND -->
    <section class="stats">
      <div class="stat">
        <span class="stat-num">2023</span>
        <span class="stat-label">Founded as a health charity</span>
      </div>
      <div class="stat">
        <span class="stat-num">6</span>
        <span class="stat-label">Connected services in one place</span>
      </div>
      <div class="stat">
        <span class="stat-num">24/7</span>
        <span class="stat-label">AI assistant availability</span>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Become part of Elder Care Connect.</h2>
      <p>Join a community designed to uplift, support and keep you connected.</p>
      <div class="hero-actions center">
        <router-link to="/signup" class="btn-primary">Create an account</router-link>
        <router-link to="/rating" class="btn-ghost light">Read member reviews</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// App.vue already renders the shared header and footer, so this view holds
// only the About Us content (no duplicate <BHeader />).
//
// Feature links point to the real protected routes. The router's navigation
// guard redirects signed-out visitors to /login (with a ?redirect back here),
// and lets signed-in members straight through — so the buttons behave
// correctly for both states without exposing protected pages.

// Inline SVGs are used instead of icon-font classes so icons always render,
// regardless of whether the PrimeIcons stylesheet is loaded.
const icon = {
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.38 8.38 0 0 1 8.5-8.5A8.5 8.5 0 0 1 21 11.5z"/></svg>',
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.9z"/></svg>',
  chart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
}

const features = [
  {
    icon: icon.chat,
    title: 'AI health assistant',
    body: 'Friendly, around-the-clock answers on exercise, nutrition and everyday wellness, powered by our Gemini-based assistant.',
    cta: 'Try the assistant',
    to: '/gemini'
  },
  {
    icon: icon.calendar,
    title: 'Community events',
    body: 'A searchable calendar of gatherings, workshops and activities that keep members socially engaged and supported.',
    cta: "See what's on",
    to: '/events'
  },
  {
    icon: icon.heart,
    title: 'Coordinated care records',
    body: 'Care providers, insurance and key details kept organised so the right people always have the right information.',
    cta: 'View care records',
    to: '/patient'
  },
  {
    icon: icon.chart,
    title: 'Health insights',
    body: 'Clear, interactive charts that turn member data into patterns carers and admins can act on with confidence.',
    cta: 'Explore insights',
    to: '/interactivechart'
  },
  {
    icon: icon.map,
    title: 'Getting there',
    body: 'Built-in maps and routing help members and families find services and reach appointments without the stress.',
    cta: 'Open the map',
    to: '/map'
  },
  {
    icon: icon.send,
    title: 'Staying in touch',
    body: 'Direct messaging and email keep members, carers and our team connected between visits and events.',
    cta: 'Send a message',
    to: '/send-email'
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.ecc-about {
  --ink: #22333b;
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --gold: #e9c46a;
  --sand: #fbf7f1;
  --cloud: #ffffff;
  --muted: #5d6b73;
  --line: #ece3d6;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  color: var(--ink);
  background: var(--sand);
  margin: -1rem 0 0;
}

.ecc-about section {
  padding: clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 6vw, 5rem);
  max-width: 1240px;
  margin: 0 auto;
}

/* HERO */
.hero {
  padding-top: clamp(5rem, 9vw, 7rem) !important;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: center;
}
.eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
  margin-bottom: 1rem;
}
.hero-title {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--teal-deep);
  margin: 0 0 1.25rem;
}
.hero-title em {
  font-style: italic;
  color: var(--coral);
}
.hero-lede {
  font-size: clamp(1.05rem, 1.4vw, 1.3rem);
  line-height: 1.6;
  color: var(--muted);
  max-width: 34ch;
  margin: 0 0 1.75rem;
}
.hero-media {
  position: relative;
}
.hero-media img {
  width: 100%;
  border-radius: 22px;
  object-fit: cover;
  aspect-ratio: 4 / 3;
  box-shadow: 0 24px 50px -24px rgba(15, 76, 92, 0.45);
}
.hero-badge {
  position: absolute;
  bottom: -18px;
  left: -18px;
  background: var(--teal);
  color: #fff;
  border-radius: 16px;
  padding: 0.9rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 14px 30px -12px rgba(10, 55, 68, 0.6);
}
.badge-num {
  font-family: 'Fraunces', serif;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
}
.badge-label {
  font-size: 0.85rem;
  max-width: 12ch;
  line-height: 1.2;
  color: #d9ecef;
}

/* BUTTONS */
.hero-actions {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}
.hero-actions.center {
  justify-content: center;
}
.btn-primary,
.btn-ghost {
  display: inline-block;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}
.btn-primary {
  background: var(--coral);
  color: #fff;
  box-shadow: 0 10px 24px -10px rgba(231, 111, 81, 0.8);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px -10px rgba(231, 111, 81, 0.85);
}
.btn-ghost {
  background: transparent;
  color: var(--teal);
  border: 1.5px solid var(--teal);
}
.btn-ghost:hover {
  background: var(--teal);
  color: #fff;
}
.btn-ghost.light {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.7);
}
.btn-ghost.light:hover {
  background: #fff;
  color: var(--teal-deep);
}

/* MISSION */
.mission {
  text-align: center;
  max-width: 940px !important;
}
.mission-label {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
  margin-bottom: 1rem;
}
.mission-statement {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 500;
  font-size: clamp(1.4rem, 3vw, 2.1rem);
  line-height: 1.4;
  color: var(--teal-deep);
}

/* HOW WE HELP */
.section-head {
  text-align: center;
  margin-bottom: 2.75rem;
}
.section-head h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  color: var(--teal-deep);
  margin: 0 0 0.5rem;
}
.section-head p {
  color: var(--muted);
  font-size: 1.1rem;
  margin: 0;
}
.pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.pillar {
  background: var(--cloud);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}
.pillar:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px -22px rgba(15, 76, 92, 0.45);
  border-color: #d7e3e6;
}
.pillar-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(15, 76, 92, 0.08);
  color: var(--teal);
  margin-bottom: 1.1rem;
}
.pillar-icon :deep(svg) {
  width: 26px;
  height: 26px;
}
.pillar h3 {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--teal-deep);
  margin: 0 0 0.5rem;
}
.pillar p {
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.55;
  margin: 0 0 1rem;
  flex: 1;
}
.pillar-link {
  color: var(--coral);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.98rem;
}
.pillar-link:hover {
  text-decoration: underline;
}
.help-note {
  text-align: center;
  color: var(--muted);
  font-size: 0.95rem;
  margin: 1.75rem 0 0;
}

/* STORY */
.story-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: center;
}
.story-media img {
  width: 100%;
  border-radius: 22px;
  object-fit: cover;
  aspect-ratio: 3 / 4;
  max-height: 460px;
  box-shadow: 0 24px 50px -28px rgba(15, 76, 92, 0.45);
}
.story-copy h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.8rem, 3.2vw, 2.4rem);
  color: var(--teal-deep);
  margin: 0 0 1rem;
  line-height: 1.15;
}
.story-copy p {
  color: var(--muted);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 0 0 1rem;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  background: var(--teal-deep);
  border-radius: 24px;
  text-align: center;
  color: #fff;
}
.stat-num {
  display: block;
  font-family: 'Fraunces', serif;
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 600;
  color: var(--gold);
}
.stat-label {
  display: block;
  margin-top: 0.4rem;
  color: #cfe0e4;
  font-size: 1rem;
}

/* CTA */
.cta {
  text-align: center;
  background: linear-gradient(135deg, var(--teal) 0%, var(--teal-deep) 100%);
  border-radius: 28px;
  color: #fff;
  margin-bottom: clamp(2rem, 5vw, 4rem) !important;
}
.cta h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  margin: 0 0 0.6rem;
}
.cta p {
  color: #cfe0e4;
  font-size: 1.15rem;
  margin: 0 0 1.75rem;
}

/* RESPONSIVE */
@media (max-width: 880px) {
  .hero-grid,
  .story-grid {
    grid-template-columns: 1fr;
  }
  .story-media {
    order: 2;
  }
  .pillars {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}
@media (max-width: 560px) {
  .pillars {
    grid-template-columns: 1fr;
  }
  .hero-badge {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ecc-about * {
    transition: none !important;
  }
}
</style>
