<template>
  <div v-if='loading'>
    <div class="splashscreen">SPLASH</div>
  </div>
  <div id="nav">
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/add">Add</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <div><img :src="(user) ? user.photoURL : ''"/></div>
  <router-view v-slot="{ Component }">
    <transition name="slide" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import store from './store'
import useAuth from './use/auth/useAuth'
import gsap from 'gsap'

export default defineComponent({
  name: 'App',
  setup () {
    const state: any = reactive({
      stateUser: store.getters['userStore/getUser']
    })

    const { user, loading, error } = useAuth()

    const beforeEnter = (el: any) => {
      gsap.set(el, {
        scaleX: 1,
        scaleY: 1
      })
    }

    const enter = (el: any, done: any) => {
      gsap.to(el, {
        duration: 1,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        x: 0,
        ease: 'expo.inOut',
        onComplete: done
      })
    }

    const leave = (el: any, done: any) => {
      gsap.to(el, {
        duration: 1,
        delay: 0.5,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        ease: 'expo.inOut',
        conComplete: done
      })
    }

    return {
      ...toRefs(state),
      user,
      loading,
      error,
      beforeEnter,
      enter,
      leave
    }
  }
})

// beforeEnter
</script>

<style lang="scss" src='./styles/styles.scss'>

$abril: 'Abril Fatface', cursive;
$playfair: 'Playfair Display', serif;

html, body {
  margin: 0;
  padding: 0;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 1.5s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}

.wrapper {
  position: absolute;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
