<template>
  <footer class="ecc-footer">
    <div class="inner">
      <div class="brand-col">
        <div class="brand">
          <span class="brand-mark">EC</span>
          <span class="brand-name">Elder Care Connect</span>
        </div>
        <p class="tagline">
          A health charity helping older adults live healthier, more connected lives.
        </p>
      </div>

      <nav class="col">
        <h4>Explore</h4>
        <router-link to="/">About Us</router-link>
        <router-link to="/rating">Ratings &amp; reviews</router-link>
        <router-link to="/generateapikey">ECC API</router-link>
      </nav>

      <nav class="col">
        <h4>Get started</h4>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Create an account</router-link>
        <a href="mailto:hello@eldercareconnect.org">Contact us</a>
      </nav>
    </div>

    <div class="bottom">
      <p>© {{ year }} Elder Care Connect. All rights reserved.</p>
      <p class="muted">Made with care for our community.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600&display=swap');

.ecc-footer {
  --teal-deep: #0a3744;
  --coral: #e76f51;

  background: var(--teal-deep);
  color: #cfe0e4;
  font-family: 'Source Sans 3', system-ui, sans-serif;
  margin-top: auto;
}
.inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 2rem;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
}
.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--coral);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
}
.brand-name {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.3rem;
  color: #fff;
}
.tagline {
  max-width: 34ch;
  line-height: 1.6;
  margin: 0;
  color: #aecbd2;
}
.col h4 {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #84a7b0;
  margin: 0 0 0.9rem;
}
.col a {
  display: block;
  color: #cfe0e4;
  text-decoration: none;
  padding: 0.3rem 0;
  transition: color 0.15s ease;
}
.col a:hover {
  color: #fff;
}
.bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1240px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.9rem;
}
.bottom p {
  margin: 0;
}
.muted {
  color: #84a7b0;
}

@media (max-width: 720px) {
  .inner {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    padding-bottom: 1.5rem;
  }
  .bottom {
    justify-content: center;
    text-align: center;
  }
}
</style>
