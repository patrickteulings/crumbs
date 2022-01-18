<template>
  <div class="most-used-button" :style="getButtonColor()">
    <div class="most-used-button__inner">
      <span class="mub-progress" :style="[getTotalPercentage(), getProgressColor()]"></span>
      <span class="mub-label disable-select">{{ labelData.label }} - </span>
      <div class="mub-total disable-select"><span class="mub-total__euros">{{ getTotalCosts(labelData.label)[0] }}</span><span class="mub-total__cents">{{ getTotalCosts(labelData.label)[1] }}</span></div>
      <div class="mub-add disable-select"
        @mousedown="handleDown($event)"
        @mouseup="handleUp($event)"
        @touchstart="handleDown($event)"
        @touchend="handleUp($event)" :style="getAddButtonColor()">
        <span v-if="!isAdding">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </span>
        <span class="spinner-wrapper" v-if="isAdding">
          <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="2"></circle>
          </svg>
        </span>
      </div>
    </div>
  </div>
  <div v-if="extended" class="most-used-button__extended">
      <label for="extended__amount" >{{(labelData.amount === labelTemplate.amount) ? "Your default value" : "Custom"}}</label>
      <div class="extended-input-row">
        <span class="extended__type">€</span>
        <input id="extended__amount" type="number" class="extended__amount" :class="(labelData.amount === labelTemplate.amount) ? 'default' : '' " v-model="labelData.amount" >
        <button class="btn extended__button" @click="handleExtendedClick(labelData)">ADD</button>
      </div>
    <div class="extended__date-wrapper">
      <div class="extended__date">{{ new Date().toLocaleDateString() }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, PropType, computed } from 'vue'
import store from '@/store'
import { ICrumb } from '@/types/CrumbType'
import { useColors } from '@/use/colors/useColors'

interface CrumbType {
  id: string;
  label: string;
  date?: string;
  categoryID: string;
  amount: number;
  colour: string;
}


interface IState {
  label: CrumbType;
  labelData: ICrumb;
  labelTemplate: ICrumb;
  labelTotal: number;
  crumbs: Array<ICrumb>;
  extended: boolean;
  isAdding: boolean;
  isGetting: boolean;
}

export default defineComponent({
  name: 'AddButton',
  emits: ['clicked'],
  props: {
    buttonData: {
      type: Object as PropType<ICrumb>,
      required: true
    },
    labelTotal: {
      type: Number,
      required: true
    }
  },

  setup (props) {
    const state: IState = reactive({
      label: { date: new Date().toString(), id: 'hoi', label: 'tabak', categoryID: '12', amount: 23, colour: '444', max: 10 },
      labelTemplate: { ...props.buttonData },
      labelData: props.buttonData,
      labelTotal: props.labelTotal,
      crumbs: computed(() => store.getters['crumbStore/getAllCrumbs']),
      extended: false,
      isAdding: false,
      isGetting: true
    })

    const getTotalCosts = (label: string): Array<string> => {
      const filteredArray = state.crumbs.filter(function (el:ICrumb):boolean {
        return el.label === label
      })

      const newTotal = filteredArray.reduce((accumulator: number, current: ICrumb) => accumulator + current.amount, 0)
      return [round(newTotal).split('.')[0], round(newTotal).split('.')[1]]
    }

    const getTotalPercentage = () => {
      const max = (state.labelTemplate.target || 100)

      const filteredArray = state.crumbs.filter(function (el:ICrumb):boolean {
        return el.label === state.labelTemplate.label
      })

      const newTotal = filteredArray.reduce((accumulator: number, current: ICrumb) => accumulator + current.amount, 0)
      console.log(state.labelTemplate.label, state.labelTemplate.target, newTotal)
      console.log(state.labelTemplate.label, newTotal / max)
      const percentageOfTarget = (newTotal / max) * 100

      return {
        width: `${percentageOfTarget}%`
      }
    }

    const round = (num: number): string => {
      const m = Number((Math.abs(num) * 100).toPrecision(15))
      const r = Math.round(m) / 100 * Math.sign(num)
      return r.toFixed(2)
    }

    const handleClick = (crumb: ICrumb): void => {
      saveNewCrumb(crumb)
    }

    const handleExtendedClick = (crumb: ICrumb): void => {
      saveNewCrumb(crumb)
    }

    const saveNewCrumb = (crumb: ICrumb) => {
      state.isAdding = true
      crumb.date = new Date()

      store.dispatch('crumbStore/addCrumb', crumb).then(() => {
        setTimeout(() => { state.isAdding = false }, 500)
        store.dispatch('crumbStore/setCurrentCrumb', crumb)
      })
    }

    // -------------------------------- //
    // COLOR FUNCTIONS
    // -------------------------------- //

    const { hexToRGB, rgbToHSL, hexToHSL } = useColors()

    const getButtonColor = (): Record<string, unknown> => {
      const { h, s, l } = hexToHSL(state.labelTemplate.colour)
      return { backgroundColor: 'hsl(' + h + ',' + s + '%,' + l + '%)' }
    }

    const getAddButtonColor = () => {
      const { h, s, l } = hexToHSL(state.labelTemplate.colour)
      const lCustom = l - 10

      return { backgroundColor: 'hsl(' + h + ',' + s + '%,' + (l - 20) + '%)' }
    }

    const getProgressColor = () => {
      const { h, s, l } = hexToHSL(state.labelTemplate.colour)
      return { backgroundColor: 'hsl(' + h + ',' + s + '%,' + (l + 15) + '%)' }
    }

    let timer = 0
    let startMouseDownTimer = 0
    let stopMouseDownTimer = 0

    const handleDown = (event: MouseEvent | TouchEvent): void => {
      startMouseDownTimer = performance.now()
      event.preventDefault()
      timer = setTimeout(() => {
        checkStatus()
      }, 500)
    }

    const handleUp = (event: MouseEvent | TouchEvent): void => {
      event.preventDefault()
      clearTimeout(timer)
      isClick()
    }

    const checkStatus = () => {
      stopMouseDownTimer = performance.now()
      console.log(`Call to checkStatus took ${stopMouseDownTimer - startMouseDownTimer} milliseconds.`)
      if (stopMouseDownTimer - startMouseDownTimer > 500) {
        console.log('should open')
        state.extended = !state.extended
      }
    }

    const isClick = () => {
      stopMouseDownTimer = performance.now()
      console.log(`Call to isClick took ${stopMouseDownTimer - startMouseDownTimer} milliseconds.`)
      if (stopMouseDownTimer - startMouseDownTimer < 400) {
        if (!state.extended) handleClick(state.labelData)
      }
    }

    onMounted(() => {
      console.log('')
    })

    return {
      ...toRefs(state),
      getTotalCosts,
      handleClick,
      handleExtendedClick,
      handleDown,
      handleUp,
      getButtonColor,
      getAddButtonColor,
      getProgressColor,
      getTotalPercentage
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
