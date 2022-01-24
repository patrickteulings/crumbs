<template>
  <div class="wrapper page-editLabelTemplate">
    <div class="wrapper__inner">
      <div class="crumb-preview-wrapper" :style="getPreviewBackground">
        <div class="button-wrapper previewButton" ref="previewButton" id="previewButton" :style="demoButtonPosition()">
          <CrumbPreview class="preview__previeButton" :buttonData="currentTemplate" :labelTotal="10"></CrumbPreview>
        </div>
      </div>

      <div class="editLabelTemplate">
        <CrumbTemplateForm :crumbTemplate="currentTemplate"></CrumbTemplateForm>
      </div>
    </div>
    <div style="height: 1000px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import CrumbPreview from '@/components/crumb/CrumbPreview.vue'
import CrumbTemplateForm from '@/components/crumb/CrumbTemplateForm.vue'
import store from '@/store'
import { CrumbTemplate } from '@/types/CrumbTemplate'
import { useColors } from '@/use/colors/useColors'
import { useScroll } from '@/use/scroll/useScroll'
import gsap from 'gsap'
import { Expo } from 'gsap/all'


export default defineComponent({
  name: 'EditCrumbTemplate',
  components: {
    CrumbTemplateForm,
    CrumbPreview
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
      const minHeight = ((340 - yVal) >= 160) ? (340 - yVal) : 160
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
      const dist = 100
      ei = ei < dist ? ei : dist
      return { transform: `translateY(${ei * 0.75}px)` }
    }


    const previewButton = ref<HTMLElement>()

    onMounted(() => {
      const el: HTMLElement | null = document.getElementById('previewButton')

      gsap.to(el, {
        duration: 0.7,
        left: 0,
        delay: 0.1,
        ease: Expo.easeOut
        // ease: 'expo.Out'
      })

      // if (el) el.classList.add('show')
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
