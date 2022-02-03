<template>
  <div class="crumbCardWrapper">
    <div class="crumbCard" :style="getCrumbBackgroundColor()">
      <h3 class="crumbCard__title">{{crumbItem.label}}</h3>
      <span class="crumbCard__amount">€{{ crumbItem.amount }}</span>
      <div class="crumbCard__date">
        <span class="day">{{ crumbItem.date.getDate() }}</span>
        <span class="month">{{ format(crumbItem.date, 'MMM') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue'

import { format } from 'date-fns'
import { Crumb } from '@/types/Crumb'
import { useColors } from '@/use/colors/useColors'

export default defineComponent({
  name: 'CrumbCard',
  props: {
    cardData: {
      required: true,
      type: Object as PropType<Crumb>
    }
  },
  setup (props) {
    const state = reactive({
      crumbItem: { ...props.cardData }
    })

    const getCrumbBackgroundColor = () => {
      const { hexToHSL } = useColors()
      const { h, s, l } = hexToHSL(state.crumbItem.color)
      const hslLight = 'hsl(' + h + ',' + s + '%,' + 80 + '%)'

      return { background: hslLight }
    }

    return {
      ...toRefs(state),
      getCrumbBackgroundColor,
      format
    }
  }
})
</script>

<style scoped>

</style>
