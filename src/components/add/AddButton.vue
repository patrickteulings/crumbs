<template>
  <div class="most-used-button">
    <div class="most-used-button__inner">
      <span class="mub-label disable-select">{{ labelData.label }} - </span>
      <div class="mub-total disable-select"><span class="mub-total__euros">{{ getTotalCosts(labelData.label)[0] }}</span><span class="mub-total__cents">{{ getTotalCosts(labelData.label)[1] }}</span></div>
      <div class="mub-add disable-select"
        @mousedown="handleDown($event)"
        @mouseup="handleUp($event)"
        @touchstart="handleDown($event)"
        @touchend="handleUp($event)">
        <span v-if="!isAdding">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
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
import { defineComponent, reactive, toRefs, onMounted, PropType } from 'vue'
import store from '@/store'
import { ICrumb } from '@/types/CrumbType'

interface CrumbType {
  id: string;
  label: string;
  date?: string;
  categoryID: string;
  amount: number;
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

interface Bla {
  item: Date;
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
      label: { date: new Date().toString(), id: 'hoi', label: 'tabak', categoryID: '12', amount: 23 },
      labelTemplate: { ...props.buttonData },
      labelData: props.buttonData,
      labelTotal: props.labelTotal,
      crumbs: store.getters['crumbStore/getAllCrumbs'],
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

    const round = (num: number): string => {
      const m = Number((Math.abs(num) * 100).toPrecision(15))
      const r = Math.round(m) / 100 * Math.sign(num)
      return r.toFixed(2)
    }

    const handleClick = (crumb: ICrumb): void => {
      // emit('clicked', e)
      saveNewCrumb(crumb)
    }

    const handleExtendedClick = (crumb: ICrumb): void => {
      // emit('clicked', crumb)
      saveNewCrumb(crumb)
    }

    const saveNewCrumb = (crumb: ICrumb) => {
      state.isAdding = true
      crumb.date = (crumb.date) ? new Date(crumb.date) : new Date()
      console.log('hier ooooook', crumb)
      store.dispatch('crumbStore/addCrumb', crumb).then(() => {
        console.log('added')
        state.isAdding = false
      })
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
      state,
      getTotalCosts,
      handleClick,
      handleExtendedClick,
      handleDown,
      handleUp
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

label {
  display: block;
  text-align: left;;
}
.wrapper {
  width: 100%;
  min-height: 100vh;
  background: #FFEFE5;
}

h1 {
    font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 900;
  font-size: 24px;
}

</style>
