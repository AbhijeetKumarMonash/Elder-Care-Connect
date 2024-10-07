import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyC07bTdqd97G8IpWJUvzdePkEe46kCF2v8',
  authDomain: 'iad-project-2b1d0.firebaseapp.com',
  projectId: 'iad-project-2b1d0',
  storageBucket: 'iad-project-2b1d0.appspot.com',
  messagingSenderId: '742064002628',
  appId: '1:742064002628:web:92e6ba9cb6e18e120e0e11'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)

export { auth, db, functions }
