<template>
  <div class="nav" :class="{ open: isOpen }">
    <button class="nav__trigger" @click="handleNavigationToggle">
      <span></span>
      <span></span>
    </button>
    <nav class="nav__items" :style="getNavState">
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/add">Add</router-link>
      <router-link to="/login">Login</router-link>
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

    return {
      handleNavigationToggle,
      getNavState,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>
