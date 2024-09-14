import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCDGMnPb9zdqc38Zy7CQbkROBCC45bBhw4',
  authDomain: 'week7-abhijeet.firebaseapp.com',
  projectId: 'week7-abhijeet',
  storageBucket: 'week7-abhijeet.appspot.com',
  messagingSenderId: '113188171568',
  appId: '1:113188171568:web:611dd4bf7ae030b18562f5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
export default db
