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
                <form @submit.prevent="handleEmailLogin">
                  <div class="input-row">
                    <label for="email">email</label>
                    <input id="email" v-model="email" type="email" placeholder="you@example.com">
                  </div>
                  <div class="input-row">
                    <label for="password">password</label>
                    <input id="password" v-model="password" type="password" placeholder="you@example.com">
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
import { useLogin } from './../use/auth/useLogin'

export default defineComponent({
  setup () {
    const { loginWithGoogle, error } = useLogin()

    const state = reactive({
      email: '',
      password: ''
    })

    const handleEmailLogin = (e: any) => {
      console.log('e', state.password, state.email)
    }

    return {
      ...toRefs(state),
      loginWithGoogle,
      handleEmailLogin,
      error
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
