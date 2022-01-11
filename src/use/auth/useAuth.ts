import { toRefs, reactive } from 'vue'
import router from './../../router/index'

import { fire } from '@/config/firebaseConfigTypeScript'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import store from '@/store'
import { IUser } from '@/types/UserType'

interface IState {
  user: IUser | null;
  loading: boolean;
  error: boolean | null;

}

export default function () {
  // our reactive properties...
  const state: IState = reactive({
    user: null,
    loading: true,
    error: null
  })

  // make the firebase call to listen for change in auth state,
  // we have set initial loading status to true so nothing happens on UI
  // side until loading is set to false

  const auth = getAuth()

  onAuthStateChanged(auth, (_user: any) => {
    if (_user) {
      const user: IUser = {
        displayName: _user.displayName,
        uid: _user.uid,
        email: _user.email,
        photoURL: _user.photoURL ? _user.photoURL : ''
      }
      state.user = user
      store.dispatch('userStore/setUser', user)
      console.log('setting user', user)
      router.push('/add')
      // ...
    } else {
      state.user = null
      store.dispatch('userStore/setUser', null) // User is gone, nullify
      router.push('/login')
    }
    state.loading = false
  })

  // return all of the properties from the function
  return {
    ...toRefs(state)
  }
}
