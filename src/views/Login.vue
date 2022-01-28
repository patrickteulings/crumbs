<template>
  <div class="wrapper page-login">
    <section class="section loginPage">
      <div class="wrapper__inner">
        <div>
          <h2 class="loginPage__title">
            Well howdy, it appears you're not logged in yet?
          </h2>
          <div class="login__actions">
            <p>{{error}}</p>
          </div>
          <div class="login__actions">
            <h3>SIGN IN WITH GOOGLE</h3>
            <div class="login__loginWithGoogle" @click="loginWithGoogle">
              <div class="loginWithGoogle__inner">
                <button type="button" class="login-with-google-btn">Sign in with google</button>
              </div>
            </div>
            <h3>OR WITH EMAIL</h3>
            <div class="login__loginWithEmail">
              <div class="loginWithEmail__inner">
                <form @submit.prevent="handleEmailSignUp">
                  <div class="input-row">
                    <label for="emailSignUp">email</label>
                    <input id="emailSignUp" v-model="email" type="email" placeholder="you@example.com" @input="resetError">
                  </div>
                  <div class="input-row">
                    <label for="passwordSignup">password</label>
                    <input id="passwordSignup" v-model="password" type="password" placeholder="you@example.com" @input="resetError">
                  </div>
                  <button type="submit">LOGIN</button>
                </form>
              </div>
            </div>
            <h3>SIGN IN WITH EMAIL</h3>
            <div class="login__loginWithEmail">
              <div class="loginWithEmail__inner">
                <form @submit.prevent="handleEmailSignIn">
                  <div class="input-row">
                    <label for="email">email</label>
                    <input id="email" v-model="email" type="email" placeholder="you@example.com" :class="loginErrors.emailError.length ? 'has-error' : ''" @focus="resetError">
                    <span v-if="loginErrors.emailError.length" class="inputError">{{loginErrors.emailError}}</span>
                  </div>
                  <div class="input-row">
                    <label for="password">password</label>
                    <input id="password" v-model="password" type="password" placeholder="Make it a good one!" :class="loginErrors.passwordError.length ? 'has-error' : ''" @input="resetError">
                    <span v-if="loginErrors.passwordError.length" class="inputError">{{loginErrors.passwordError}}</span>
                  </div>
                  <button type="submit">LOGIN</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs } from 'vue'
import store from '@/store'
import { useLogin } from './../use/auth/useLogin'

// interface LoginErrors {
//   emailError: string;
//   passwordError: string;
// }

export default defineComponent({
  setup () {
    const { loginWithGoogle, error, registerWithEmail, loginWithEmail } = useLogin()

    const state = reactive({
      email: '',
      password: '',
      loginErrors: { error: false, emailError: '', passwordError: '' }
    })

    const handleEmailSignUp = (e: any) => {
      console.log('e', state.password, state.email)
      registerWithEmail(state.email, state.password)
    }

    const handleEmailSignIn = (e: any): void => {
      loginWithEmail(state.email, state.password).then((userCredential) => {
        state.loginErrors.error = false
        store.dispatch('userStore/setUser', userCredential)
      }).catch((error) => {
        const errorCode = error.code
        console.log('fouttt!', errorCode)
        store.dispatch('userStore/setUser', null)

        state.loginErrors.error = true
        state.loginErrors.emailError = ''
        state.loginErrors.passwordError = ''

        switch (errorCode) {
          case 'auth/internal-error':
            state.loginErrors.emailError = errorCode
            state.loginErrors.passwordError = errorCode
            break
          case 'auth/wrong-password':
            state.loginErrors.passwordError = errorCode
            break
          case 'auth/user-not-found':
            state.loginErrors.emailError = errorCode
            break
          case 'auth/invalid-email':
            state.loginErrors.emailError = 'Does not appear to be a valid email-address'
            break
        }
      })
    }

    const resetError = (e: Event) => {
      console.log(e.target)
      const el = e.target as HTMLInputElement
      el.classList.remove('has-error')
    }

    return {
      ...toRefs(state),
      loginWithGoogle,
      handleEmailSignUp,
      handleEmailSignIn,
      resetError,
      error
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
