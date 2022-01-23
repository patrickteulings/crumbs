import { toRefs, reactive, computed } from 'vue'
import { fire, provider } from '@/config/firebaseConfigTypeScript'
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import store from '@/store'

export const useLogin = () => {
  const state = reactive({
    error: null,
    username: 'null',
    password: 'null',
    user: null
  })

  const auth = getAuth()

  /**
  * have this value `isValid` get updated when the dependent properties
  * are changed in the composition function
  */
  const isValid = computed(() => {
    const { username, password } = state
    return (
      username !== null &&
      username.length !== 0 &&
      password !== null &&
      password.length !== 0
    )
  })


  const registerWithEmail = (email: string, password: string): void => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
      })
  }

  const loginWithEmail = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password)
  }


  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)!
        const token = credential.accessToken
        const user = result.user
        store.dispatch('userStore/setUser', user)
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        store.dispatch('userStore/setUser', null)
        // ...
      })
  }

  const logout = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error)
    })
  }

  return {
    // return all of the properties from the function
    ...toRefs(state),

    // return all of the computed value to make sure we
    // get non null values for username/password from the
    // function
    isValid,

    // pass back a login and logout function to be utilized
    // by the login form
    loginWithGoogle,
    registerWithEmail,
    loginWithEmail,
    logout
  }
}
