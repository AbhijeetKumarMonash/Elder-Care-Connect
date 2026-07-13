<template>
  <div class="email-page">
    <section class="email-hero">
      <span class="eyebrow">Communications</span>
      <h1>Send an email</h1>
      <p class="lede">Compose and send a message through Elder Care Connect.</p>
    </section>

    <section class="card">
      <div v-if="statusMessage" class="alert" :class="statusType">{{ statusMessage }}</div>

      <form @submit.prevent="sendEmail" novalidate>
        <div class="grid-2">
          <div class="field">
            <label for="to_name">To</label>
            <input
              id="to_name"
              v-model="to_name"
              type="text"
              placeholder="Recipient's name"
              required
            />
          </div>
          <div class="field">
            <label for="from_name">From</label>
            <input
              id="from_name"
              v-model="from_name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>
        </div>

        <div class="field">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="message"
            rows="8"
            placeholder="Write your message here…"
            required
          ></textarea>
        </div>

        <div class="actions">
          <button type="button" class="btn-ghost" @click="clearForm" :disabled="sending">
            Clear
          </button>
          <button type="submit" class="btn-primary" :disabled="sending">
            {{ sending ? 'Sending…' : 'Send email' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { send } from 'emailjs-com'

export default {
  name: 'SendEmailView',
  data() {
    return {
      to_name: '',
      from_name: '',
      message: '',
      sending: false,
      statusMessage: null,
      statusType: 'success'
    }
  },
  methods: {
    async sendEmail() {
      this.sending = true
      this.statusMessage = null
      const templateParams = {
        to_name: this.to_name,
        from_name: this.from_name,
        message: this.message
      }

      try {
        const result = await send(
          'service_575oj4d',
          'template_v4qlyip',
          templateParams,
          '4JIWbDtdQkVtwEC8K'
        )
        console.log('Email successfully sent!', result.status, result.text)
        this.statusType = 'success'
        this.statusMessage = `Email sent successfully to ${this.to_name}.`
        this.clearForm()
      } catch (error) {
        console.error('Error sending email:', error)
        this.statusType = 'error'
        this.statusMessage = 'Failed to send email. Please try again later.'
      } finally {
        this.sending = false
      }
    },
    clearForm() {
      this.to_name = ''
      this.from_name = ''
      this.message = ''
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.email-page {
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --green: #2a7f62;
  --sand: #fbf7f1;
  --line: #ece3d6;
  --muted: #5d6b73;
  --ink: #22333b;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  color: var(--ink);
  background: var(--sand);
  margin: -1rem auto 0;
  padding: clamp(5rem, 9vw, 7rem) 1.25rem 3rem;
  max-width: 780px;
}

.email-hero {
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
.email-hero h1 {
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

.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: clamp(1.75rem, 3vw, 2.5rem);
  box-shadow: 0 24px 60px -34px rgba(15, 76, 92, 0.4);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.field {
  margin-bottom: 1.1rem;
}
.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.field input,
.field textarea {
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
.field textarea {
  resize: vertical;
  min-height: 160px;
  line-height: 1.6;
}
.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.btn-primary,
.btn-ghost {
  padding: 0.8rem 1.75rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: 1.5px solid transparent;
  font-family: inherit;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    opacity 0.15s ease;
}
.btn-primary {
  background: var(--coral);
  color: #fff;
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}
.btn-primary:disabled,
.btn-ghost:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-ghost {
  background: transparent;
  color: var(--teal);
  border-color: var(--teal);
}
.btn-ghost:hover:not(:disabled) {
  background: var(--teal);
  color: #fff;
}

.alert {
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.1rem;
  font-size: 0.95rem;
  font-weight: 600;
}
.alert.success {
  background: #e6f3ec;
  color: var(--green);
}
.alert.error {
  background: #fdeee9;
  color: #b8472d;
}

@media (max-width: 560px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .actions {
    flex-direction: column-reverse;
  }
  .actions button {
    width: 100%;
  }
}
</style>
