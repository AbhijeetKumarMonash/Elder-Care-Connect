<template>
  <div class="container mt-5">
    <h2 class="text-center">Admin Dashboard</h2>
    <h4 class="text-center">
      Welcome to the Elder Care Connect Platform! <br />
      Here, you can manage and oversee the following features:
    </h4>

    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-if="dashboardData && !isLoading" class="admin-features">
      <div class="row mb-4">
        <div class="col-md-4">
          <div class="dashboard-box">
            <h5>Total Users</h5>
            <p>{{ dashboardData.totalUsers }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="dashboard-box">
            <h5>Admin Users</h5>
            <p>{{ dashboardData.adminCount }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="dashboard-box">
            <h5>General Users</h5>
            <p>{{ dashboardData.userCount }}</p>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-6">
          <div class="feature-box">
            <h6>Manage Patient Data</h6>
            <p>
              View, edit, or remove patient information by navigating to the "Patient Table" in the
              navigation bar.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="feature-box">
            <h6>Manage Event Data</h6>
            <p>
              Manage upcoming and past events in the system. Go to the "Event Table" for full
              control over event listings.
            </p>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-6">
          <div class="feature-box">
            <h6>Gemini AI Usage Monitoring</h6>
            <p>
              Oversee the usage of the Gemini AI assistant by users. Check the "Gemini AI" tab to
              see interactions with the AI and track its utility for users.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="feature-box">
            <h6>Data Visualizations</h6>
            <p>
              Visualize system data using charts. Visit the "Charts" section to explore and create
              visual reports.
            </p>
          </div>
        </div>
      </div>
      <!-- Manage Users Section -->
      <h4 class="text-center mt-5">Manage Users</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editUser(user)" class="btn btn-primary">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit User Modal -->
    <div v-if="selectedUser" class="edit-modal">
      <h4>Edit User: {{ selectedUser.username }}</h4>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="selectedUser.username" class="form-control" />
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" v-model="selectedUser.Address" class="form-control" />
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input type="number" v-model="selectedUser.age" class="form-control" />
        </div>
        <div class="form-group">
          <label for="contactDetails">Contact Details:</label>
          <input type="text" v-model="selectedUser.contactDetails" class="form-control" />
        </div>
        <div class="form-group">
          <label for="emergencyContact">Emergency Contact:</label>
          <input type="text" v-model="selectedUser.emergencyContact" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success mt-3">Save Changes</button>
        <button @click="selectedUser = null" class="btn btn-secondary mt-3">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { db } from '@/firebase/init' // Make sure this points to your Firebase initialization file
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore' // Import necessary Firestore functions

export default {
  name: 'AdminDashboard',
  setup() {
    const isLoading = ref(true)
    const dashboardData = ref(null)
    const users = ref([])
    const selectedUser = ref(null)

    // Fetch Users from Firestore
    const fetchUsers = async () => {
      isLoading.value = true
      try {
        const usersSnapshot = await getDocs(collection(db, 'users')) // Use db here to query Firestore
        users.value = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        fetchDashboardData()
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        isLoading.value = false
      }
    }

    // Fetch Dashboard Data
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
        fetchUsers() // Refetch users after updating
      } catch (error) {
        console.error('Error updating user:', error)
      }
    }

    fetchUsers()

    return {
      isLoading,
      dashboardData,
      users,
      selectedUser,
      editUser,
      updateUser
    }
  }
}
</script>

<style scoped>
.dashboard-box {
  background-color: #007bff;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feature-box {
  background-color: #f8f9fa;
  color: #333;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 1.5rem;
}
</style>
