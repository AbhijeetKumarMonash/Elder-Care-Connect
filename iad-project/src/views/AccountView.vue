<template>
  <div class="container mt-5">
    <BHeader />
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10">
        <h1 class="text-center">Account Information</h1>
        <div v-if="currentUser" class="card mt-3 p-3">
          <h5>Username: {{ currentUser.username }}</h5>
          <h5>Age: {{ currentUser.age }}</h5>
          <h5>Email: {{ currentUser.email }}</h5>
          <h5>Address: {{ currentUser.Address }}</h5>
          <h5>Contact Details: {{ currentUser.contactDetails }}</h5>
          <h5>Emergency Contact: {{ currentUser.emergencyContact }}</h5>
          <h5>Role: {{ currentUser.role }}</h5>
        </div>
        <div v-else>
          <p>Loading account information...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BHeader from '@/components/BHeader.vue'
import { ref, onMounted } from 'vue'
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
</script>

<style scoped>
.card {
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
