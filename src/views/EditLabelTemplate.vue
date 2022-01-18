<template>
  <div class="wrapper page-editLabelTemplate">
    <div class="wrapper__inner">
      <div class="editLabelTemplate">
        <h1>Crumb Template</h1>
        <div v-for="crumb in crumbTemplates" :key="crumb.label">
          {{crumb.label}} <br>
          {{crumb.colour}} <br>
          {{crumb.id}}
          ROUTE: {{route.params.id}} <br><br>
        </div>
        <div>{{ currentTemplate.label }}</div>
        <div>{{ currentTemplate.amount }}</div>
        <div>{{ currentTemplate.target }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'


export default defineComponent({
  name: 'EditLabelTemplate',
  setup () {
    const state = reactive({
      route: useRoute(),
      crumbTemplates: computed(() => store.getters['crumbStore/getCrumbTemplates']),
      currentTemplate: computed(() => getSelectedCrumb())
    })

    const route = useRoute()

    const getSelectedCrumb = (): Record<string, unknown> => {
      const el = state.crumbTemplates.find((item: any) => item.id === state.route.params.id)
      return el
    }

    onMounted(() => {
      console.log('')
    })

    return {
      ...toRefs(state),
      route
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
