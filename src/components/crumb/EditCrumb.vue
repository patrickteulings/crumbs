<template>
  <div>
    {{ crumbTemplate.label }}
    {{ crumbTemplate.id }}
    {{ crumbTemplate.amount }}
    {{ crumbTemplate.target }}
    {{ crumbTemplate.timespan }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
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
    const state = reactive({
      crumbTemplate: props.crumbTemplate
    })
    console.log('props.crumbTemplate', props.crumbTemplate)
    return {}
  }
})
</script>

<style scoped></style>
