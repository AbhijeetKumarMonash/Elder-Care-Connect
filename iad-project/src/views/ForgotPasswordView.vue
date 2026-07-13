<template>
  <div class="auth-page">
    <div class="auth-card">
      <!-- STATE 1: FORM -->
      <div v-if="!sent">
        <div class="auth-head">
          <span class="brand-mark">EC</span>
          <h1>Reset your password</h1>
          <p>
            Enter the email associated with your Elder Care Connect account. We'll send you a link
            to choose a new password.
          </p>
        </div>

        <div v-if="errorMessage" class="alert error">
          <strong>{{ errorMessage.title }}</strong>
          <p>{{ errorMessage.body }}</p>
        </div>

        <form @submit.prevent="submit" novalidate>
          <div class="field">
            <label for="email">Email address</label>
            <input
              id="email"
              type="email"
              v-model="email"
              autocomplete="email"
              placeholder="you@example.com"
              required
            />
            <p v-if="emailError" class="field-error">{{ emailError }}</p>
          </div>

          <button type="submit" class="btn-primary block" :disabled="loading">
            {{ loading ? 'Sending…' : 'Send reset link' }}
          </button>
        </form>

        <p class="auth-foot">
          Remembered it?
          <router-link to="/login" class="text-link strong">Back to sign in</router-link>
        </p>
      </div>

      <!-- STATE 2: SENT CONFIRMATION -->
      <div v-else class="sent-state">
        <div class="check-circle" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M20 6L9 17l-5-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1>Check your inbox</h1>
        <p class="muted">
          If an account exists for <strong>{{ sentEmail }}</strong
          >, we've sent a password reset link. Open it from your email to choose a new password.
        </p>

        <div class="next-steps">
          <p class="next-title">Didn't get the email?</p>
          <ul>
            <li>Check your <strong>spam or promotions</strong> folder.</li>
            <li>The sender is <code>noreply@&lt;project&gt;.firebaseapp.com</code>.</li>
            <li>Make sure the address above is correct — typos are common.</li>
            <li>Wait a minute, then try again.</li>
          </ul>
        </div>

        <div class="actions">
          <button class="btn-ghost" @click="resetState">Try a different email</button>
          <router-link to="/login" class="btn-primary">Back to sign in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/firebase/init'
import { sendPasswordResetEmail } from 'firebase/auth'

const email = ref('')
const emailError = ref(null)
const errorMessage = ref(null)
const loading = ref(false)
const sent = ref(false)
const sentEmail = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const submit = async () => {
  emailError.value = null
  errorMessage.value = null

  if (!emailPattern.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }

  loading.value = true
  try {
    await sendPasswordResetEmail(auth, email.value)
    sentEmail.value = email.value
    sent.value = true
  } catch (err) {
    console.error('Password reset error:', err)
    // Distinguish CONFIG problems (surface them so we/user can fix)
    // from USER-EXISTENCE problems (hide them to prevent enumeration).
    switch (err.code) {
      case 'auth/invalid-email':
        emailError.value = 'That email address looks invalid.'
        break

      case 'auth/network-request-failed':
        errorMessage.value = {
          title: 'Network problem',
          body: 'Please check your internet connection and try again.'
        }
        break

      case 'auth/too-many-requests':
        errorMessage.value = {
          title: 'Too many attempts',
          body: 'Please wait a few minutes before trying again.'
        }
        break

      case 'auth/operation-not-allowed':
        // Most common cause of "forgot password not working" in a new project.
        errorMessage.value = {
          title: 'Password reset is not enabled',
          body: 'Firebase → Authentication → Sign-in method: enable Email/Password. Then try again.'
        }
        break

      case 'auth/unauthorized-domain':
        errorMessage.value = {
          title: 'Domain not authorized',
          body: "Firebase → Authentication → Settings → Authorized domains: add this site's domain."
        }
        break

      case 'auth/user-not-found':
        // Deliberately show the same success screen (prevents account enumeration).
        sentEmail.value = email.value
        sent.value = true
        break

      default:
        // Unknown / unexpected — show generic error with the code for debugging.
        errorMessage.value = {
          title: 'Something went wrong',
          body: `Please try again. (${err.code || 'unknown error'})`
        }
    }
  } finally {
    loading.value = false
  }
}

const resetState = () => {
  sent.value = false
  email.value = ''
  emailError.value = null
  errorMessage.value = null
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.auth-page {
  --ink: #22333b;
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --green: #2a7f62;
  --sand: #fbf7f1;
  --line: #ece3d6;
  --muted: #5d6b73;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  background: var(--sand);
  color: var(--ink);
  margin: -1rem 0 0;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(5.5rem, 11vw, 8rem) 1.25rem 3rem;
}
.auth-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: 0 24px 60px -34px rgba(15, 76, 92, 0.5);
  width: 100%;
  max-width: 460px;
  padding: clamp(1.75rem, 4vw, 2.5rem);
}
.auth-head {
  text-align: center;
  margin-bottom: 1.5rem;
}
.brand-mark {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--teal);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.auth-head h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.7rem;
  color: var(--teal-deep);
  margin: 0 0 0.5rem;
  line-height: 1.2;
}
.auth-head p {
  color: var(--muted);
  margin: 0;
  line-height: 1.55;
}

.field {
  margin-bottom: 1.25rem;
}
.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.field input {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  background: #fffdf9;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.field input:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}
.field-error {
  color: var(--coral);
  font-size: 0.9rem;
  margin: 0.4rem 0 0;
}

.btn-primary,
.btn-ghost {
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: 1.5px solid transparent;
  font-family: inherit;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
}
.btn-primary {
  background: var(--coral);
  color: #fff;
  box-shadow: 0 10px 22px -12px rgba(231, 111, 81, 0.85);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}
.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-primary.block {
  width: 100%;
  display: block;
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

.auth-foot {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--muted);
}
.text-link {
  color: var(--teal);
  text-decoration: underline;
}
.text-link.strong {
  color: var(--coral);
  font-weight: 600;
}

.alert {
  border-radius: 12px;
  padding: 0.85rem 1rem;
  margin-bottom: 1.1rem;
  font-size: 0.95rem;
}
.alert.error {
  background: #fdeee9;
  color: #b8472d;
}
.alert.error strong {
  display: block;
  margin-bottom: 0.25rem;
}
.alert.error p {
  margin: 0;
  color: #96341f;
  font-size: 0.9rem;
  line-height: 1.45;
}

/* SENT STATE */
.sent-state {
  text-align: center;
}
.check-circle {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #e6f3ec;
  color: var(--green);
  display: grid;
  place-items: center;
  margin: 0 auto 1.25rem;
}
.check-circle svg {
  width: 32px;
  height: 32px;
}
.sent-state h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--teal-deep);
  margin: 0 0 0.75rem;
}
.muted {
  color: var(--muted);
  line-height: 1.6;
  margin: 0 0 1.5rem;
}
.muted strong {
  color: var(--ink);
  word-break: break-all;
}
.next-steps {
  background: #fdf6ec;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 1rem 1.25rem;
  text-align: left;
  margin-bottom: 1.5rem;
}
.next-title {
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--teal-deep);
}
.next-steps ul {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
}
.next-steps code {
  background: #fff;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--teal-deep);
}
.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
.actions .btn-primary,
.actions .btn-ghost {
  flex: 1;
  min-width: 140px;
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary,
  .btn-ghost {
    transition: none;
  }
}
</style>
