<template>
  <header class="ecc-header">
    <div class="bar">
      <router-link to="/" class="brand" @click="closeMenu">
        <span class="brand-mark">EC</span>
        <span class="brand-name">Elder Care Connect</span>
      </router-link>

      <button
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>

      <nav class="nav" :class="{ open: menuOpen }" @click="closeMenu">
        <!-- Public links (always visible) -->
        <router-link to="/" class="link" active-class="active" exact>About Us</router-link>
        <router-link to="/rating" class="link" active-class="active">Rating</router-link>
        <router-link to="/generateapikey" class="link" active-class="active">ECC API</router-link>

        <!-- Authenticated links -->
        <template v-if="currentUser">
          <router-link
            v-if="currentUser.role === 'admin'"
            to="/admin"
            class="link"
            active-class="active"
            >Admin Dashboard</router-link
          >
          <router-link
            v-if="currentUser.role === 'admin'"
            to="/add-patient"
            class="link"
            active-class="active"
            >Add Patient</router-link
          >
          <router-link
            v-if="currentUser.role === 'user'"
            to="/user"
            class="link"
            active-class="active"
            >User Dashboard</router-link
          >
          <router-link to="/patient" class="link" active-class="active">Patients</router-link>
          <router-link to="/events" class="link" active-class="active">Events</router-link>
          <router-link to="/interactivechart" class="link" active-class="active"
            >Charts</router-link
          >
          <router-link to="/map" class="link" active-class="active">Map</router-link>
          <router-link to="/send-email" class="link" active-class="active">Email</router-link>
          <router-link to="/gemini" class="link" active-class="active">AI Assistant</router-link>
          <router-link to="/account" class="link" active-class="active">Account</router-link>
          <button class="link logout" @click="logout">Logout</button>
        </template>

        <!-- Logged-out CTA -->
        <router-link v-else to="/login" class="link login-cta" active-class="active"
          >Login</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase/init'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const currentUser = ref(null)
const menuOpen = ref(false)

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      currentUser.value = docSnap.exists() ? docSnap.data() : null
    } else {
      currentUser.value = null
    }
  })
})

const logout = async () => {
  await signOut(auth)
  currentUser.value = null
  closeMenu()
  router.push('/login')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@500;600;700&display=swap');

.ecc-header {
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --line: #e8eef0;

  position: sticky;
  top: 0;
  z-index: 1030;
  background: #ffffff;
  border-bottom: 1px solid var(--line);
  box-shadow: 0 2px 14px -8px rgba(10, 55, 68, 0.35);
  font-family: 'Source Sans 3', system-ui, sans-serif;
}
.bar {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.7rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* BRAND */
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
}
.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--teal);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.02em;
}
.brand-name {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--teal-deep);
  white-space: nowrap;
}

/* NAV */
.nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.25rem;
}
.link {
  font-size: 0.95rem;
  font-weight: 600;
  color: #46555c;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition:
    color 0.15s ease,
    background 0.15s ease;
}
.link:hover {
  color: var(--teal-deep);
  background: #f1f6f7;
}
.link.active {
  color: var(--teal-deep);
  background: #e6eff1;
}
.logout {
  color: var(--coral);
}
.logout:hover {
  background: #fdeee9;
  color: var(--coral);
}
.login-cta {
  background: var(--coral);
  color: #fff;
  padding: 0.5rem 1.25rem;
}
.login-cta:hover {
  background: #d65f43;
  color: #fff;
}

/* MOBILE TOGGLE */
.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
}
.menu-toggle span {
  width: 24px;
  height: 2.5px;
  background: var(--teal-deep);
  border-radius: 2px;
}

@media (max-width: 860px) {
  .menu-toggle {
    display: flex;
  }
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    align-items: stretch;
    gap: 0.15rem;
    padding: 0.5rem 1rem 1rem;
    border-bottom: 1px solid var(--line);
    box-shadow: 0 12px 24px -16px rgba(10, 55, 68, 0.4);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
  }
  .nav.open {
    max-height: 90vh;
    overflow-y: auto;
  }
  .link {
    padding: 0.7rem 0.75rem;
  }
  .login-cta {
    text-align: center;
    margin-top: 0.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav {
    transition: none;
  }
}
</style>
