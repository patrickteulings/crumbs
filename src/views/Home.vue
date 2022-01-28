<template>
  <div class="wrapper page-home" style="padding-top: 300px">
    <div class="wrapper__inner">
      <AddButton :buttonData="demoData" :labelTotal="31"></AddButton>
      <div>Mooie illustratie hier</div>
      <h1>Track anything, anywehere...</h1>
      <router-link to="/login">Login</router-link> |
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

import AddButton from '@/components/add/AddButton.vue'

export default defineComponent({
  name: 'Home',
  components: { AddButton },
  setup () {
    const state = {
      demoData: { id: '', label: 'Meditate', date: new Date(), categoryID: 'health', amount: 1, color: '#ff9900', target: 31, increase: true, timespan: 'week' }
    }
    return {
      iets: 'bla',
      ...toRefs(state)
    }
  }
})

</script>

<style lang="scss">
</style>
