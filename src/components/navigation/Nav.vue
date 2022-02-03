<template>
  <div class="nav" :class="{ open: isOpen }">
    <button class="trigger" @click="handleNavigationToggle">
      <div class="trigger__inner">
        <span></span>
        <span></span>
      </div>
    </button>
    <nav class="nav__items" :style="getNavState">
      <router-link to="/home" @click="handleMenuClose">Home</router-link>
      <router-link to="/about" @click="handleMenuClose">About</router-link>
      <router-link to="/login" @click="handleMenuClose">Login</router-link>
      <router-link to="/add" @click="handleMenuClose">Add</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, reactive } from 'vue'

export default defineComponent({
  name: 'Nav',
  setup () {
    const state = reactive({
      isOpen: false
    })

    const handleNavigationToggle = () => {
      console.log('hi')
      state.isOpen = !state.isOpen
    }

    const getNavState = computed(() => {
      return { display: (state.isOpen) ? 'flex' : 'none' }
    })

    const handleMenuClose = () => {
      state.isOpen = false
    }

    return {
      handleNavigationToggle,
      getNavState,
      handleMenuClose,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>
