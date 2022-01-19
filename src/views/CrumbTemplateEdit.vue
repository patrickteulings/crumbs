<template>
  <div class="wrapper page-editLabelTemplate">
    <div class="wrapper__inner">
      <div class="editcrumb-preview-wrapper" :style="getPreviewBackground()">
        <AddButton :buttonData="currentTemplate" :labelTotal="10"></AddButton>
      </div>

      <div class="editLabelTemplate">
        <h1>Crumb Template</h1>
        <EditCrumb :crumbTemplate="currentTemplate"></EditCrumb>
        <div v-for="crumb in crumbTemplates" :key="crumb.label">
          {{crumb.label}} <br>
          {{crumb.color}} <br>
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
import EditCrumb from '@/components/crumb/EditCrumb.vue'
import AddButton from '@/components/add/AddButton.vue'
import store from '@/store'
import { CrumbTemplate } from '@/types/CrumbTemplate'
import { useColors } from '@/use/colors/useColors'


export default defineComponent({
  name: 'EditCrumbTemplate',
  components: {
    EditCrumb,
    AddButton
  },
  setup () {
    const state = reactive({
      route: useRoute(),
      crumbTemplates: computed(() => store.getters['crumbStore/getCrumbTemplates']),
      currentTemplate: computed(() => getSelectedCrumb())
    })

    const route = useRoute()

    const getSelectedCrumb = (): CrumbTemplate => {
      const el = state.crumbTemplates.find((item: CrumbTemplate) => item.id === state.route.params.id)
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
