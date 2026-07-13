<template>
  <div class="admin-page">
    <section class="admin-hero">
      <span class="eyebrow">Administrator</span>
      <h1>Admin dashboard</h1>
      <p class="lede">Oversee members, patients and events across the platform.</p>
    </section>

    <div v-if="isLoading" class="loading-card">
      <div class="spinner" aria-hidden="true"></div>
      <p>Loading dashboard…</p>
    </div>

    <template v-if="dashboardData && !isLoading">
      <!-- STATS -->
      <section class="stats">
        <div class="stat">
          <span class="stat-label">Total users</span>
          <span class="stat-num">{{ dashboardData.totalUsers }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Admins</span>
          <span class="stat-num">{{ dashboardData.adminCount }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Members</span>
          <span class="stat-num">{{ dashboardData.userCount }}</span>
        </div>
      </section>

      <!-- FEATURES -->
      <section class="feature-grid">
        <div class="feature-card">
          <h3>Manage patient data</h3>
          <p>
            View, edit or remove patient information from the
            <router-link to="/patient">Patient Table</router-link>.
          </p>
        </div>
        <div class="feature-card">
          <h3>Manage events</h3>
          <p>
            Handle upcoming and past events via the
            <router-link to="/events">Event Table</router-link>.
          </p>
        </div>
        <div class="feature-card">
          <h3>AI assistant</h3>
          <p>
            Review member interactions with the
            <router-link to="/gemini">Gemini AI Assistant</router-link>.
          </p>
        </div>
        <div class="feature-card">
          <h3>Data visualisations</h3>
          <p>
            Explore trends in the <router-link to="/interactivechart">Charts</router-link>
            section.
          </p>
        </div>
      </section>

      <!-- USERS TABLE -->
      <section class="users-section">
        <div class="section-head">
          <h2>Manage users</h2>
          <router-link to="/add-patient" class="btn-secondary">+ Add patient</router-link>
        </div>

        <div class="table-wrap">
          <table class="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th class="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td class="mono">{{ user.email }}</td>
                <td>
                  <span class="role-badge" :class="user.role">{{ user.role }}</span>
                </td>
                <td class="right">
                  <button class="btn-ghost small" @click="editUser(user)">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <!-- EDIT MODAL -->
    <div v-if="selectedUser" class="modal-overlay" @click.self="selectedUser = null">
      <div class="modal">
        <h2>Edit {{ selectedUser.username }}</h2>
        <form @submit.prevent="updateUser">
          <div class="field">
            <label for="e-username">Username</label>
            <input id="e-username" type="text" v-model="selectedUser.username" />
          </div>
          <div class="field">
            <label for="e-address">Address</label>
            <input id="e-address" type="text" v-model="selectedUser.Address" />
          </div>
          <div class="grid-2">
            <div class="field">
              <label for="e-age">Age</label>
              <input id="e-age" type="number" v-model="selectedUser.age" />
            </div>
            <div class="field">
              <label for="e-contact">Contact</label>
              <input id="e-contact" type="text" v-model="selectedUser.contactDetails" />
            </div>
          </div>
          <div class="field">
            <label for="e-emergency">Emergency contact</label>
            <input id="e-emergency" type="text" v-model="selectedUser.emergencyContact" />
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-ghost" @click="selectedUser = null">Cancel</button>
            <button type="submit" class="btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { db } from '@/firebase/init'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'

export default {
  name: 'AdminDashboard',
  setup() {
    const isLoading = ref(true)
    const dashboardData = ref(null)
    const users = ref([])
    const selectedUser = ref(null)

    const fetchUsers = async () => {
      isLoading.value = true
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'))
        users.value = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        fetchDashboardData()
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        isLoading.value = false
      }
    }

    const fetchDashboardData = () => {
      dashboardData.value = {
        totalUsers: users.value.length,
        adminCount: users.value.filter((user) => user.role === 'admin').length,
        userCount: users.value.filter((user) => user.role === 'user').length
      }
    }

    const editUser = (user) => {
      selectedUser.value = { ...user }
    }

    const updateUser = async () => {
      try {
        const userRef = doc(db, 'users', selectedUser.value.id)
        await updateDoc(userRef, {
          username: selectedUser.value.username,
          Address: selectedUser.value.Address,
          age: selectedUser.value.age,
          contactDetails: selectedUser.value.contactDetails,
          emergencyContact: selectedUser.value.emergencyContact
        })
        selectedUser.value = null
        fetchUsers()
      } catch (error) {
        console.error('Error updating user:', error)
      }
    }

    fetchUsers()

    return { isLoading, dashboardData, users, selectedUser, editUser, updateUser }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap');

.admin-page {
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --gold: #e9c46a;
  --sand: #fbf7f1;
  --line: #ece3d6;
  --muted: #5d6b73;
  --ink: #22333b;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  color: var(--ink);
  background: var(--sand);
  margin: -1rem auto 0;
  padding: clamp(5rem, 9vw, 7rem) clamp(1.25rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
  max-width: 1240px;
}

.admin-hero {
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
.admin-hero h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: var(--teal-deep);
  margin: 0.5rem 0 0.6rem;
  line-height: 1.15;
}
.lede {
  color: var(--muted);
  font-size: 1.1rem;
  margin: 0;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}
.stat {
  background: var(--teal-deep);
  color: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
}
.stat-label {
  display: block;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a8c3ca;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.stat-num {
  font-family: 'Fraunces', serif;
  font-size: 2.75rem;
  font-weight: 600;
  color: var(--gold);
  line-height: 1;
}

/* FEATURES */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.feature-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 1.5rem;
}
.feature-card h3 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--teal-deep);
  margin: 0 0 0.5rem;
}
.feature-card p {
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}
.feature-card a {
  color: var(--coral);
  text-decoration: none;
  font-weight: 600;
}
.feature-card a:hover {
  text-decoration: underline;
}

/* USERS TABLE */
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.section-head h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--teal-deep);
  margin: 0;
}
.table-wrap {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  overflow-x: auto;
}
.users-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 560px;
}
.users-table thead {
  background: #f6efe2;
}
.users-table th {
  text-align: left;
  padding: 0.85rem 1.25rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 600;
}
.users-table th.right,
.users-table td.right {
  text-align: right;
}
.users-table td {
  padding: 0.9rem 1.25rem;
  border-top: 1px solid var(--line);
  color: var(--ink);
}
.users-table td.mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: var(--muted);
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

/* BUTTONS */
.btn-primary,
.btn-ghost,
.btn-secondary {
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid transparent;
  font-family: inherit;
  text-decoration: none;
  display: inline-block;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
}
.btn-primary {
  background: var(--coral);
  color: #fff;
}
.btn-primary:hover {
  transform: translateY(-2px);
}
.btn-secondary {
  background: var(--teal);
  color: #fff;
}
.btn-secondary:hover {
  background: var(--teal-deep);
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
.btn-ghost.small {
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
}

/* LOADING */
.loading-card {
  text-align: center;
  padding: 3rem 1.5rem;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
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

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 55, 68, 0.45);
  display: grid;
  place-items: center;
  padding: 1.25rem;
  z-index: 1050;
}
.modal {
  background: #fff;
  border-radius: 20px;
  padding: 1.75rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.5);
  max-height: 90vh;
  overflow-y: auto;
}
.modal h2 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--teal-deep);
  margin: 0 0 1.25rem;
}
.field {
  margin-bottom: 1rem;
}
.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
}
.field input {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  padding: 0.7rem 0.85rem;
  font-family: inherit;
  font-size: 1rem;
  background: #fffdf9;
}
.field input:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.25rem;
}

@media (max-width: 880px) {
  .stats,
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
