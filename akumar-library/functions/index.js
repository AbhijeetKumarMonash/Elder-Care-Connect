const { onRequest } = require('firebase-functions/v2/https')
const { onDocumentCreated } = require('firebase-functions/v2/firestore') // Import Firestore trigger
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()

// Cloud Function to capitalize book data on creation
exports.capitalizeBookData = onDocumentCreated('books/{bookId}', (event) => {
  const bookData = event.data.data() // Get the book data
  const capitalizedData = {
    name: bookData.name.toUpperCase(), // Update to capitalize 'name'
    isbn: bookData.isbn // Keep ISBN unchanged
  }

  // Update the document with the capitalized data
  return event.data.ref.update(capitalizedData)
})

// Cloud Function to count books in Firestore
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting books:', error.message)
      res.status(500).send('Error counting books')
    }
  })
})
