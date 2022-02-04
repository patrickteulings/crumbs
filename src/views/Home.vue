<template>
  <div class="wrapper page-home">

    <!-- <HomepageCarousel /> -->

    <div class="wrapper__inner">
      <router-link to="/login" class="btn btn__small">Get started</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
// import HomepageCarousel from '@/components/carousel/HomepageCarousel.vue'

export default defineComponent({
  name: 'Home',
  components: {
    // HomepageCarousel
  },
  setup () {
    const state = reactive({
      demoData: { id: '', label: 'Meditatie', date: new Date(), categoryID: 'health', amount: 1, color: '#456B99', target: 31, increase: true, timespan: 'week' }
    })
    return {
      iets: 'bla',
      ...toRefs(state)
    }
  }
})

</script>

<style lang="scss">
</style>
