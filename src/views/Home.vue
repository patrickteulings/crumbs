<template>
  <div class="wrapper page-home">
    <div class="wrapper__inner">
      <div class="teaser">
        <div class="teaser__item">
          <h2>I track my meditations as encouragement</h2>
        </div>
      </div>
      <CrumbPreviewButton :buttonData="demoData" :labelTotal="31"></CrumbPreviewButton>
      <div>Mooie illustratie hier</div>
      <h1>Track anything, anywehere...</h1>
      <router-link to="/login" class="btn btn__small">Login</router-link> |
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'

import CrumbPreviewButton from '@/components/crumb/CrumbPreviewButton.vue'

export default defineComponent({
  name: 'Home',
  components: { CrumbPreviewButton },
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
