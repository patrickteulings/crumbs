<template>
  <div class="teaser__item">
    <div class="teaser__title" :style="getTitleStyle">
      <slot name="title"></slot>
    </div>
    <div class="teaser__image" :style="getImageStyle">
      <slot name="image"></slot>
    </div>
     <div class="teaser__image" :style="getActionStyle">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, toRef, computed, StyleValue } from 'vue'

export default defineComponent({
  name: 'HomepageCarouselItem',
  props: {
    percentage: {
      required: true,
      type: Number
    },
    slideID: {
      required: true,
      type: Number
    }
  },
  setup (props) {
    const state = reactive({
    })
    // Props
    const parallaxPercentage = toRef(props, 'percentage')
    const slideIDOffset = toRef(props, 'slideID')


    const getLocalPercentage = computed((): number => {
      console.log(slideIDOffset.value, '.', slideIDOffset.value * 100, parallaxPercentage.value)
      return (parallaxPercentage.value + (slideIDOffset.value * 100))
    })

    // Style getters for Parallax

    const getTitleStyle = computed((): StyleValue => {
      return {
        left: `${getLocalPercentage.value * 0.7}%`
      }
    })

    const getImageStyle = computed((): StyleValue => {
      return {
        left: `${getLocalPercentage.value * 0.3}%`
      }
    })

    const getActionStyle = computed((): StyleValue => {
      return {
        left: `${getLocalPercentage.value * 0.5}%`
      }
    })

    return {
      ...toRefs(state),
      parallaxPercentage,
      slideIDOffset,
      getTitleStyle,
      getImageStyle,
      getActionStyle
    }
  }
})
</script>

<style scoped>

</style>
