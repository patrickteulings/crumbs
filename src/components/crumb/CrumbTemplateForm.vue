<template>
  <div class="crumbForm">
    <div class="inputRow inputRow--label">
      <label :style="getLabelColor(-20)">Label</label>
      <input ref="crumbLabel" :style="getBackgrounColor(45)" class="input__label" type="text" :value="crumbTemplate.label" @keyup="handleLabelChange($event)">
    </div>
    <div class="inputRow">
      <label :style="getLabelColor(-20)">Amount</label>
      <input ref="crumbAmount" :style="getBackgrounColor()" type="number" :value="crumbTemplate.amount" @change="handleAmountChange($event)">
    </div>
    <div class="inputRow">
      <label :style="getLabelColor(-20)">Target / Max</label>
      <input ref="crumbAmount" :style="getBackgrounColor()" type="number" :value="crumbTemplate.target" @change="handleTargetChange($event)">
    </div>
    <div class="inputRow">
      <label :style="getLabelColor(-20)">WHAT DO YOU WANT TO TRACK</label>
      <DropDown :dropdownData="{triggerLabel:'eg. Amount, Miles ran', color: getBackgrounColor(), items: [{label: 'item nummer 1'}, {label: 'item nummer 2'}, {label: 'item nummer 3'}]}" />
    </div>

    <div>{{ crumbTemplate.target }}</div>
    <div>{{ crumbTemplate.timespan }}</div>
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
  setup (props) {
    const state: any = reactive({
      crumbTemplate: props.crumbTemplate,
      crumbLabel: props.crumbTemplate.label,
      crumbTarget: props.crumbTemplate.target
    })
    const crumbLabel = ref(null)
    const handleLabelChange = (e: any & {
      target: HTMLInputElement
    }): void => {
      if (e && e.target) {
        const el = e.target as HTMLInputElement
      }
    }
    const handleAmountChange = (e: any & {
      target: HTMLInputElement
    }) => {
      console.log(e.target.value)
    }
    const handleTargetChange = (e: any & {
      target: HTMLInputElement
    }) => {
      console.log(e.target.value)
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
      getLabelColor
    }
  },
  components: { DropDown }
})
</script>

<style scoped></style>
