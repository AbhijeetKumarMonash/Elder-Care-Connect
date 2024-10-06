<template>
  <div class="container">
    <h1>All Books API</h1>
    <pre>{{ bookData }}</pre>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, getDocs } from 'firebase/firestore'

export default {
  setup() {
    const bookData = ref(null)

    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'))
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        bookData.value = { books: booksArray }
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      bookData
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
