<template>
  <div class="wrapper page-editLabelTemplate">
    <div class="wrapper__inner">
      <div class="crumb-preview-wrapper" :style="getPreviewBackground">
        <div class="button-wrapper previewButton" ref="previewButton" id="previewButton" :style="demoButtonPosition()">
          <ColorDropDown id="colorDropDown" @onItemSelected="handleColorClick" :templateData="getCurrentTemplate" :dropdownData="{triggerLabel:'eg. Amount, Miles ran', items: [{label: 'item nummer 1',color: '714A6A'}, {label: 'item nummer 2', color: '26B8BF'}, {label: 'item nummer 3', color:'7DACE5'}, {label: 'item nummer 3', color:'4BD1B6'}, {label: 'item nummer 3', color:'456B99'}]}"></ColorDropDown>
          <CrumbPreviewButton class="preview__previeButton" :buttonData="getCurrentTemplate" :labelTotal="10"></CrumbPreviewButton>
        </div>
      </div>
      <div class="editLabelTemplate">
        <CrumbTemplateForm :crumbTemplate="getCurrentTemplate" @updated="onFormUpdate"></CrumbTemplateForm>
      </div>
    </div>
    <div style="height: 1000px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'

import gsap from 'gsap'
import { Expo } from 'gsap/all'

import CrumbPreviewButton from '@/components/crumb/CrumbPreviewButton.vue'
import CrumbTemplateForm from '@/components/crumbtemplate/CrumbTemplateForm.vue'
import ColorDropDown from '@/components/ui/dropdown/ColorDropDown.vue'

import { CrumbTemplate } from '@/types/CrumbTemplate'
import { useColors } from '@/use/colors/useColors'
import { useScroll } from '@/use/scroll/useScroll'


export default defineComponent({
  name: 'CrumbTemplateEdit',
  components: {
    CrumbTemplateForm,
    CrumbPreviewButton,
    ColorDropDown
  },
  setup () {
    const state = reactive({
      route: useRoute(),
      crumbTemplates: computed(() => store.getters['crumbStore/getCrumbTemplates']),
      currentTemplate: computed(() => getSelectedCrumb()),
      currentTemplateCopy: { id: '0', amount: 0, label: 'label', categoryID: '0', color: 'FBFBFB', target: 31, timespan: 'month' }
    })

    state.currentTemplateCopy = store.getters['crumbStore/getCrumbTemplateByID'](state.route.params.id)

    const route = useRoute()

    const getSelectedCrumb = (): CrumbTemplate => {
      const el = state.crumbTemplates.find((item: CrumbTemplate) => item.id === state.route.params.id)
      return el
    }

    const getCurrentTemplate = computed((): CrumbTemplate => {
      return state.currentTemplateCopy
    })

    const onFormUpdate = (data: CrumbTemplate): void => {
      state.currentTemplateCopy.label = data.label
      state.currentTemplateCopy.amount = data.amount
      state.currentTemplateCopy.target = (data.target) ? data.target : 31
      state.currentTemplateCopy.timespan = (data.timespan) ? data.timespan : 'month'
      state.currentTemplateCopy.label = data.label
      console.log(state.currentTemplateCopy)
    }

    // -------------------------------------------------------------------------- //
    // COLOR FUNCTIONS
    // -------------------------------------------------------------------------- //

    const handleColorClick = (arg: CrumbTemplate) => {
      state.currentTemplateCopy.color = (arg.color) ? arg.color : 'FBFBFB'
    }

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

    const getColorDropdownColor = computed(() => {
      return state.currentTemplate.color
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
      const drop: HTMLElement | null = document.getElementById('colorDropDown')

      gsap.to(el, {
        duration: 0.7,
        left: 0,
        delay: 0.1,
        ease: Expo.easeOut
      })

      gsap.to(drop, {
        duration: 0.7,
        translateX: 0,
        delay: 0.3,
        ease: Expo.easeOut
      })
    })

    return {
      ...toRefs(state),
      route,
      getPreviewBackground,
      x,
      y,
      getWrapperHeight,
      demoButtonPosition,
      getCurrentTemplate,
      handleColorClick,
      getSelectedCrumb,
      onFormUpdate
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
