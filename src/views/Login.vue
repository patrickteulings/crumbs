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
            <div class="login__loginWithGoogle" @click="loginWithGoogle">
              <img width="191" src="@/assets/images/signin/btn_google_signin_light_normal_web@2x.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLogin } from './../use/auth/useLogin'

export default defineComponent({
  setup () {
    const { loginWithGoogle, error } = useLogin()

    return {
      loginWithGoogle,
      error
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
