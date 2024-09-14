<template>
  <div>
    <h2>Books with ISBN > 1000</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="editBook(book)">Edit</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
    <div v-if="isEditing">
      <h3>Edit Book</h3>
      <form @submit.prevent="updateBook">
        <input type="text" v-model="editName" placeholder="New Book Name" required />
        <input type="text" v-model="editIsbn" placeholder="New ISBN" required />
        <button type="submit">Update</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const isEditing = ref(false)
    const editBookId = ref(null)
    const editName = ref('')
    const editIsbn = ref('')

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'desc'),
          limit(5)
        )
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id))
        fetchBooks()
        alert('Book deleted successfully!')
      } catch (error) {
        console.error('Error deleting book: ', error)
      }
    }

    const editBook = (book) => {
      isEditing.value = true
      editBookId.value = book.id
      editName.value = book.name
      editIsbn.value = book.isbn
    }

    const updateBook = async () => {
      try {
        const bookRef = doc(db, 'books', editBookId.value)
        await updateDoc(bookRef, {
          name: editName.value,
          isbn: Number(editIsbn.value)
        })
        isEditing.value = false
        fetchBooks()
        alert('Book updated successfully!')
      } catch (error) {
        console.error('Error updating book: ', error)
      }
    }

    const cancelEdit = () => {
      isEditing.value = false
      editBookId.value = null
      editName.value = ''
      editIsbn.value = ''
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      isEditing,
      editName,
      editIsbn,
      editBook,
      updateBook,
      deleteBook,
      cancelEdit
    }
  }
}
</script>
