import { toRefs, reactive, computed } from 'vue'
import { fire, provider } from '@/config/firebaseConfigTypeScript'
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'

export const useLogin = () => {
  const state = reactive({
    error: null,
    username: 'null',
    password: 'null',
    user: null
  })

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


  const loginWithGoogle = () => {
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)!
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
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
    logout
  }
}
