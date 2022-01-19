<template>
  <div class="editcrumb">
    <h1>HALLO</h1>
    <h2>{{ crumbTemplate.label }}</h2>
    <small>{{ crumbTemplate.id }}</small>
    <input ref="crumbLabel" type="text" :value="crumbTemplate.label" @keyup="handleLabelChange($event)">
    <input ref="crumbAmount" type="number" :value="crumbTemplate.amount" @change="handleAmountChange($event)" @keyup="handleAmountChange($event)">
    <div>{{ crumbTemplate.target }}</div>
    <div>{{ crumbTemplate.timespan }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref, toRefs, onMounted } from 'vue'
import { CrumbTemplate } from '@/types/CrumbTemplate'

export default defineComponent({
  name: 'EditCrumb',
  props: {
    crumbTemplate: {
      type: Object as PropType<CrumbTemplate>,
      required: true
    }
  },
  setup (props) {
    const state: any = reactive({
      crumbTemplate: props.crumbTemplate,
      crumbLabel: props.crumbTemplate.label
    })

    const crumbLabel = ref(null)

    const handleLabelChange = (e: Event & {target: HTMLInputElement}): void => {
      console.log(e.target.value)
    }

    const handleAmountChange = (e: {target: HTMLInputElement}) => {
      console.log(e.target.value)
    }

    onMounted(() => {
      console.log('---------- ONNOUNTED ADDBUTTON ----------')
    })

    return {
      ...toRefs(state),
      crumbLabel,
      handleLabelChange,
      handleAmountChange
    }
  }
})
</script>

<style scoped></style>
