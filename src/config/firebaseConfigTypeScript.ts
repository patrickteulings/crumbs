// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'

// NEW FireBase SYNTAX starting point

// https://stackoverflow.com/questions/69241381/property-auth-does-not-exist-on-type-firebaseapp-on-react


// import 'firebase/compat/firestore'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'

export const fire = initializeApp({
  projectId: 'crumbs-a3370',
  apiKey: 'AIzaSyAaPb7x5W62cWVGwOJGQBl55Sis2ZXWeCI',
  authDomain: 'crumbs-a3370.firebaseapp.com'
})

// export const fire = firebase
//   .initializeApp({
//     projectId: 'crumbs-a3370',
//     apiKey: 'AIzaSyAaPb7x5W62cWVGwOJGQBl55Sis2ZXWeCI',
//     authDomain: 'crumbs-a3370.firebaseapp.com'
//   })

// const googleProvider = new firebase.auth.GoogleAuthProvider()
const googleProvider = new GoogleAuthProvider()

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid
    // ...
  } else {
    // User is signed out
    // ...
  }
})


// Get a Firestore instance
export const provider = googleProvider
export const db = getFirestore(fire)

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { TimeStamp, GeoPoint } = firebase.firestore
// export { TimeStamp, GeoPoint }
