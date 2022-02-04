<template>
  <div class="crumbForm">
    <h1>So, this is the gamechanger.... we start with 'Recipes'. Open source pre-defined setups, such as 'Running, track distance, progress per week... target 2000 meter'</h1>
    <div class="inputRow inputRow--label">
      <label :style="getLabelColor(-20)">Label</label>
      <input ref="crumbLabel" :style="getBackgrounColor(25)" class="input__label" type="text" :value="crumbTemplate.label" @keyup="handleLabelChange($event)">
    </div>
    <div class="inputRow">
      <label :style="getLabelColor(-20)">Default Increase each time you do this</label>
      <input ref="crumbAmount" :style="getBackgrounColor()" type="number" :value="crumbTemplate.amount" @change="handleAmountChange($event)">
    </div>
    <div class="inputRow">
      <label :style="getLabelColor(-20)">Target / Max</label>
      <input ref="crumbAmount" :style="getBackgrounColor()" type="number" :value="crumbTemplate.target" @change="handleTargetChange($event)">
    </div>
    <div class="inputRow">
      <label :style="getLabelColor(-20)">WHAT DO YOU WANT TO TRACK</label>
      <DropDown :dropdownData="{triggerLabel:'eg. Amount, Miles ran', color: crumbTemplate.color, items: [{label: 'Amount (€, $)'}, {label: 'Distance (km / mls)'}, {label: 'Nr times I do activity X'}]}" />
    </div>
    <div class="inputRow">
      <label :style="getLabelColor(-20)">Track progress per</label>
      <DropDown class="" @onItemSelected="handleTimespanChange" :dropdownData="{triggerLabel:'day / week / month', color: crumbTemplate.color, items: [{label: 'Day'}, {label: 'Week'}, {label: 'Month'}]}" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref, toRefs, onMounted } from 'vue'
import { CrumbTemplate } from '@/types/CrumbTemplate'
import { useColors } from '@/use/colors/useColors'
import DropDown from '@/components/ui/dropdown/DropDown.vue'

export default defineComponent({
  name: 'CrumbTemplateForm',
  props: {
    crumbTemplate: {
      type: Object as PropType<CrumbTemplate>,
      required: true
    }
  },
  setup (props, { emit }) {
    const state: any = reactive({
      crumbTemplate: props.crumbTemplate,
      crumbLabel: props.crumbTemplate.label,
      crumbTarget: props.crumbTemplate.target,
      crumbTemplateCopy: { ...props.crumbTemplate }
    })
    const crumbLabel = ref(null)

    const handleLabelChange = (e: Event & { target: HTMLInputElement }): void => {
      if (e && e.target) {
        const el = e.target as HTMLInputElement
        state.crumbTemplateCopy.label = el.value
        console.log(el.value)
        emit('updated', state.crumbTemplateCopy)
      }
    }

    const handleAmountChange = (e: any & {
      target: HTMLInputElement
    }) => {
      state.crumbTemplateCopy.amount = (e.target.value) ? e.target.value : 1
      emit('updated', state.crumbTemplateCopy)
    }

    const handleTargetChange = (e: any & {
      target: HTMLInputElement
    }) => {
      state.crumbTemplateCopy.target = (e.target.value) ? e.target.value : 10
      emit('updated', state.crumbTemplateCopy)
    }

    const handleTimespanChange = (labelData: any) => {
      state.crumbTemplateCopy.timespan = (labelData.label) ? labelData.label : 'month'
      emit('updated', state.crumbTemplateCopy)
    }

    const getBackgrounColor = (luminanceOffset = 0) => {
      const { hexToHSL } = useColors()
      const { h, s, l } = hexToHSL(state.crumbTemplate.color)
      const hsl = `hsl(${h}, ${s}%, ${l + luminanceOffset}%)`
      return { background: hsl }
    }

    const getLabelColor = (luminanceOffset = 0) => {
      const { hexToHSL } = useColors()
      const { h, s, l } = hexToHSL(state.crumbTemplate.color)
      const hsl = `hsl(${h}, ${s}%, ${l + luminanceOffset}%)`
      return { color: hsl }
    }

    onMounted(() => {
      console.log('---------- ONNOUNTED ADDBUTTON ----------')
    })

    return {
      ...toRefs(state),
      crumbLabel,
      handleLabelChange,
      handleAmountChange,
      handleTargetChange,
      getBackgrounColor,
      getLabelColor,
      handleTimespanChange
    }
  },
  components: { DropDown }
})
</script>

<style scoped></style>
