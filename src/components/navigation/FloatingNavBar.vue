<template>
  <nav id="primary-nav" class="floatNav-wrapper">
    <div class="floatNav">
      {{route.params.id}}
      <div class="floatNav__inner">
        <button class="floatNav__button" @click="jumpToPage('/editcrumbtemplate/FAl8D6VywHwNhUU1JZ2b')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </button>
        <button class="floatNav__button" @click="jumpToPage('/crumb/category/FAl8D6VywHwNhUU1JZ2b')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        </button>
        <button class="floatNav__button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hash"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
        </button>
        <button class="floatNav__button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hash"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
        </button>
        <button class="floatNav__button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hash"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ComputedRef, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import store from '@/store'
import { Crumbs } from '@/types/Crumbs'

interface State {
  crumbTemplates: ComputedRef<Crumbs>
}

export default defineComponent({
  name: 'FloatingNavBar',
  components: {
  },
  setup () {
    const state: State = {
      crumbTemplates: computed((): Crumbs => store.getters['crumbStore/getCrumbTemplates'])
    }

    const route = useRoute()

    // ----------------------------------------------------
    // NAVIGATION TRIGGERS
    // ----------------------------------------------------

    const jumpToPage = (page: string): void => {
      router.push(page)
    }

    onMounted(() => {
      console.log(state)
    })

    return {
      ...toRefs(state),
      route,
      jumpToPage
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
