<template>
  <div v-if='loading'>
    <div class="splashscreen">SPLASH</div>
  </div>
  <User></User>
  <div id="nav">
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/add">Add</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="slide" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
      <component :is="Component" />
    </transition>
  </router-view>
  <FloatingNavBar></FloatingNavBar>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, computed } from 'vue'
import User from '@/components/add/User.vue'
import store from './store'
import FloatingNavBar from './components/navigation/FloatingNavBar.vue'
import useAuth from './use/auth/useAuth'
import gsap from 'gsap'

export default defineComponent({
  name: 'App',
  components: {
    User,
    FloatingNavBar
  },
  setup () {
    const state: any = reactive({
      stateUser: computed(() => store.getters['userStore/getUser'])
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

    onMounted(() => {
      console.log('')
    })

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
