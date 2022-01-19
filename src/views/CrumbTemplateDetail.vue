<template>
  <div class="wrapper page-crumbTemplateDetail">
    <div class="wrapper__inner">
      <div class="hero crumbdetail-calendar" :style="getPreviewBackground()">
        <div class="crumbdetail-calendar__inner">
          calendar here
        </div>
      </div>

      <div class="editLabelTemplate">
        <h1>Crumb Template</h1>
        <div v-for="crumb in crumbTemplates" :key="crumb.label">
          {{crumb.label}} <br>
          {{crumb.color}} <br>
          {{crumb.id}}
          ROUTE: {{route.params.id}} <br><br>
        </div>
        <div v-if="currentTemplate !== undefined">
        <div>{{ currentTemplate.label }}</div>
        <div>{{ currentTemplate.amount }}</div>
        <div>{{ currentTemplate.target }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import store from '@/store'

import { CrumbTemplate } from '@/types/CrumbTemplate'

import { useRoute } from 'vue-router'
import { useColors } from '@/use/colors/useColors'


export default defineComponent({
  name: 'CrumbTemplateDetail',
  components: {},
  setup () {
    const state = reactive({
      route: useRoute(),
      crumbTemplates: computed(() => store.getters['crumbStore/getCrumbTemplates']),
      currentTemplate: computed(() => getSelectedCrumb())
    })

    const route = useRoute()

    const getSelectedCrumb = (): CrumbTemplate => {
      const el = state.crumbTemplates.find((item: CrumbTemplate) => item.categoryID === route.params.categoryID)
      console.log('ELLLL', route.params.categoryID)
      return el
    }

    // -------------------------------------------------------------------------- //
    // COLOR FUNCTIONS
    // -------------------------------------------------------------------------- //

    const getPreviewBackground = () => {
      const { hexToHSL } = useColors()
      const { h, s, l } = hexToHSL(state.currentTemplate.color)
      const hslLight = 'hsl(' + h + ',' + (s) + '%,' + (80) + '%)'
      const hslDark = 'hsl(' + h + ',' + (s) + '%,' + 50 + '%)'

      return { background: `linear-gradient(138.49deg, ${hslLight} 2.6%, ${hslDark} 99.01%)` }
    }


    onMounted(() => {
      console.log('')
    })

    return {
      ...toRefs(state),
      route,
      getPreviewBackground
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
