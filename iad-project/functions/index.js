const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()

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
