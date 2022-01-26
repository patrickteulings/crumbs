<template>
  <div>
    <div ref="mostUsedButton" class="most-used-button" :style="getButtonColor()">
      <div class="most-used-button__inner">
        <span class="mub-progress" :style="[getTotalPercentage(), getProgressColor()]"></span>
        <span class="mub-label disable-select" :style="getTextLabelColor()">{{ getCurrentTemplate.label }}</span>
        <div class="mub-details disable-select">
          <div class="timespan">Sofar this {{ getCurrentTemplate.timespan }}</div>
          <div class="mub-total">
            <span class="mub-total__euros">{{ getTotalCosts(labelData.label)[0] }}</span><span class="mub-total__cents">{{ getTotalCosts(labelData.label)[1] }}</span>
          </div>
        </div>
        <div class="mub-add disable-select" :style="getAddButtonColor()">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </span>
        </div>
      </div>
    </div>
    <div v-if="extended" class="most-used-button__extended">
        <label for="extended__amount" >{{(labelData.amount === crumbTemplate.amount) ? "Your default value" : "Custom"}}</label>
        <div class="extended-input-row">
          <span class="extended__type">€</span>
          <input id="extended__amount" type="number" class="extended__amount" :class="(labelData.amount === crumbTemplate.amount) ? 'default' : '' " v-model="labelData.amount" >
          <button class="btn extended__button">ADD</button>
        </div>
      <div class="extended__date-wrapper">
        <div class="extended__date">{{ new Date().toLocaleDateString() }}</div>
      </div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, PropType, computed, ref } from 'vue'
import store from '@/store'
import { Crumb } from '@/types/Crumb'
import { useColors } from '@/use/colors/useColors'
import { CrumbTemplate } from '@/types/CrumbTemplate'

interface IState {
  label: Crumb;
  labelData: Crumb;
  crumbTemplate: Crumb;
  labelTotal: number;
  crumbs: Array<Crumb>;
  extended: false;
}

export default defineComponent({
  name: 'CrumbPreviewButton',
  emits: ['clicked'],
  props: {
    buttonData: {
      type: Object as PropType<Crumb>,
      required: true
    },
    labelTotal: {
      type: Number,
      required: true
    }
  },

  setup (props) {
    const state: IState = reactive({
      label: { date: new Date().toString(), id: 'hoi', label: 'tabak', categoryID: '12', amount: 23, color: '444', max: 10 },
      crumbTemplate: { ...props.buttonData },
      labelData: props.buttonData,
      labelTotal: props.labelTotal,
      crumbColor: props.buttonData.color,
      crumbs: computed(() => store.getters['crumbStore/getAllCrumbs']),
      extended: false,
      isAdding: false,
      isGetting: true
    })

    const getCurrentTemplate = computed((): CrumbTemplate => {
      return props.buttonData
    })

    const getTotalCosts = (label: string): Array<string> => {
      const filteredArray = state.crumbs.filter(function (el:Crumb):boolean {
        return el.label === label
      })

      const newTotal = filteredArray.reduce((accumulator: number, current: Crumb) => accumulator + current.amount, 0)
      return [round(newTotal).split('.')[0], round(newTotal).split('.')[1]]
    }

    const mostUsedButton = ref<HTMLElement>()

    const getTotalPercentage = () => {
      const max = (props.buttonData.target || 100)
      const mub: HTMLDivElement = mostUsedButton.value as HTMLDivElement

      const filteredArray = state.crumbs.filter(function (el:Crumb):boolean {
        return el.label === state.crumbTemplate.label
      })

      const maxie = (mub) ? (mub.offsetWidth - 8) : (window.innerWidth - 8) // Border / padding offset hardcoded
      const newTotal = filteredArray.reduce((accumulator: number, current: Crumb) => accumulator + current.amount, 0)
      const percentageOfTarget = (newTotal / max) * 100
      const pixelsOfTarget = (percentageOfTarget <= 100) ? (percentageOfTarget / 100) * maxie : maxie

      if (mub) {
        console.log('MUB', mub.offsetWidth, maxie, percentageOfTarget, pixelsOfTarget)
      }
      return {
        width: `${pixelsOfTarget}px`
      }
    }

    const round = (num: number): string => {
      const m = Number((Math.abs(num) * 100).toPrecision(15))
      const r = Math.round(m) / 100 * Math.sign(num)
      return r.toFixed(2)
    }

    // -------------------------------- //
    // COLOR FUNCTIONS
    // -------------------------------- //

    const { hexToRGB, rgbToHSL, hexToHSL } = useColors()

    const getButtonColor = (): Record<string, unknown> => {
      const { h, s, l } = hexToHSL(props.buttonData.color)
      return { backgroundColor: 'hsl(' + h + ',' + s + '%,' + l + '%)' }
    }

    const getAddButtonColor = () => {
      const { h, s, l } = hexToHSL(props.buttonData.color)
      const lCustom = l - 10

      return { backgroundColor: 'hsl(' + h + ',' + s + '%,' + (l - 20) + '%)' }
    }

    const getProgressColor = () => {
      const { h, s, l } = hexToHSL(props.buttonData.color)
      return { backgroundColor: 'hsl(' + h + ',' + s + '%,' + (l + 15) + '%)' }
    }

    const getTextLabelColor = () => {
      const { h, s, l } = hexToHSL(props.buttonData.color)
      return { color: 'hsl(' + h + ',' + s + '%,' + 25 + '%)' }
    }



    onMounted(() => {
      console.log('----------------- MOUTED CRUMBPREVIEW ------------------')
    })

    return {
      ...toRefs(state),
      getTotalCosts,
      getButtonColor,
      getAddButtonColor,
      getProgressColor,
      getTextLabelColor,
      getTotalPercentage,
      getCurrentTemplate,
      mostUsedButton
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
