<template>
  <div class="wrapper page-editLabelTemplate">
    <div class="wrapper__inner">
      <div class="editcrumb-preview-wrapper" :style="getPreviewBackground">
        <div class="button-wrapper" :style="demoButtonPosition()">
          <AddButton :buttonData="currentTemplate" :labelTotal="10"></AddButton>
        </div>
      </div>

      <div class="editLabelTemplate">
        <h1>Crumb Template {{x}} {{y}} get {{getWrapperHeight}}</h1>
        <EditCrumb :crumbTemplate="currentTemplate"></EditCrumb>
        <div>{{ currentTemplate.label }}</div>
        <div>{{ currentTemplate.amount }}</div>
        <div>{{ currentTemplate.target }}</div>
      </div>
    </div>
    <div style="height: 1000px;"></div>
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
import { useScroll } from '@/use/scroll/useScroll'


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

    const getPreviewBackground = computed(() => {
      const { hexToHSL } = useColors()
      const { h, s, l } = hexToHSL(state.currentTemplate.color)
      const hslLight = 'hsl(' + h + ',' + (s) + '%,' + (80) + '%)'
      const hslDark = 'hsl(' + h + ',' + (s) + '%,' + 50 + '%)'
      const yVal = el.y.value as number
      // return { background: `linear-gradient(138.49deg, ${hslLight} 2.6%, ${hslDark} 99.01%)`, height: `${340 - yVal}px` }
      const minHeight = ((340 - yVal) >= 240) ? (340 - yVal) : 240
      return { background: `linear-gradient(138.49deg, ${hslLight} 2.6%, ${hslDark} 99.01%)`, height: `${minHeight}px` }
    })


    const { x, y } = useScroll()
    const el = useScroll()

    const getWrapperHeight = computed((): any => {
      console.log('y', y)
      const bla = el.y.value as number
      return { height: `${340 - bla}px}` }
    })

    const demoButtonPosition = () => {
      let ei = (el.y.value)
      const dist = 200
      ei = ei < dist ? ei : dist
      return { transform: `translateY(${ei * 0.4}px)` }
    }

    onMounted(() => {
      console.log('')
    })

    return {
      ...toRefs(state),
      route,
      getPreviewBackground,
      x,
      y,
      getWrapperHeight,
      demoButtonPosition
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
