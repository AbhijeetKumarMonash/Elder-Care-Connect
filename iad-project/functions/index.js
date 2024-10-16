const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const { v4: uuidv4 } = require('uuid')
admin.initializeApp()
const db = admin.firestore()

// Cloud Function to add a new patient document
exports.addPatient = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Extract patient data from the request body
      const { name, careProvider, insuranceProvider, country, age, phone, occupation } = req.body

      // Check if all fields are present
      if (
        !name ||
        !careProvider ||
        !insuranceProvider ||
        !country ||
        !age ||
        !phone ||
        !occupation
      ) {
        res.status(400).send('Missing patient data fields')
        return
      }

      // Add the new patient document to Firestore
      const newPatientRef = await admin.firestore().collection('patients').add({
        name,
        careProvider,
        insuranceProvider,
        country,
        age,
        phone,
        occupation
      })

      res.status(200).send({ success: true, message: `Patient added with ID: ${newPatientRef.id}` })
    } catch (error) {
      console.error('Error adding patient document:', error.message)
      res.status(500).send({ success: false, error: error.message })
    }
  })
})

// Cloud Function to count the total number of patients
exports.countPatients = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const patientsCollection = admin.firestore().collection('patients')
      const snapshot = await patientsCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting patients:', error.message)
      res.status(500).send('Error counting patients')
    }
  })
})

// API to fetch all events
exports.getAllEvents = onRequest((req, res) => {
  cors(req, res, async () => {
    apiKeyAuth(req, res, async () => {
      try {
        const eventsCollection = db.collection('events')
        const snapshot = await eventsCollection.get()
        const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        res.status(200).send(events)
      } catch (error) {
        console.error('Error fetching events:', error.message)
        res.status(500).send({ success: false, error: error.message })
      }
    })
  })
})

// API to fetch all patients
exports.getAllPatients = onRequest((req, res) => {
  cors(req, res, async () => {
    apiKeyAuth(req, res, async () => {
      try {
        const patientsCollection = db.collection('patients')
        const snapshot = await patientsCollection.get()
        const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        res.status(200).send(patients)
      } catch (error) {
        console.error('Error fetching patients:', error.message)
        res.status(500).send({ success: false, error: error.message })
      }
    })
  })
})

// API to fetch a specific patient by ID
exports.getPatientById = onRequest((req, res) => {
  cors(req, res, async () => {
    apiKeyAuth(req, res, async () => {
      const patientId = req.query.id

      if (!patientId) {
        res.status(400).send({ success: false, message: 'Patient ID is required' })
        return
      }

      try {
        const patientDoc = await db.collection('patients').doc(patientId).get()

        if (!patientDoc.exists) {
          res.status(404).send({ success: false, message: 'Patient not found' })
        } else {
          res.status(200).send({ id: patientDoc.id, ...patientDoc.data() })
        }
      } catch (error) {
        console.error('Error fetching patient:', error.message)
        res.status(500).send({ success: false, error: error.message })
      }
    })
  })
})
// Cloud Function to generate API key and store it in Firestore
exports.generateApiKey = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Generate a unique API key using UUID
      const apiKey = uuidv4()

      // Add API key to Firestore in the 'api_keys' collection
      await db.collection('api_keys').add({
        apiKey: apiKey,
        createdAt: admin.firestore.FieldValue.serverTimestamp(), // Store the creation time
        status: 'active', // Status of the API key ('active' or 'inactive')
        usageLimit: 1000 // Optional: usage limit for the API key
      })

      // Return the generated API key to the client
      res.status(200).json({ success: true, apiKey: apiKey })
    } catch (error) {
      console.error('Error generating API key:', error)
      res.status(500).json({ success: false, message: 'Error generating API key' })
    }
  })
})
// Middleware function for API key authentication
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] // Fetch the API key from the headers

  if (!apiKey) {
    console.error('API key is missing from the request headers.')
    return res.status(401).json({ message: 'API key is missing' })
  }

  console.log('API Key provided: ', apiKey) // Log the provided API key

  // Query Firestore for the provided API key
  db.collection('api_keys')
    .where('apiKey', '==', apiKey)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.error('Invalid API key: ', apiKey) // Log invalid API key
        return res.status(403).json({ message: 'Invalid API key' })
      }

      // If valid API key, proceed with the request
      console.log('Valid API key: ', apiKey) // Log valid API key
      next()
    })
    .catch((error) => {
      console.error('Error verifying API key:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    })
}
