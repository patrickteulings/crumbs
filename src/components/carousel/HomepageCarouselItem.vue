<template>
  <div class="teaser__item">
    <div class="teaser__title" :style="getTitleStyle">
      <slot name="title"></slot>
    </div>
    <div class="teaser__image" :style="getImageStyle">
      <slot name="image"></slot>
    </div>
    <div class="teaser__action" :style="getActionStyle">
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
    const state = reactive({})
    // Props
    const parallaxPercentage = toRef(props, 'percentage')
    const slideIDOffset = toRef(props, 'slideID')

    const getLocalPercentage = computed((): number => {
      return parallaxPercentage.value + slideIDOffset.value * 100
    })

    // Style getters for Parallax

    const getTitleStyle = computed((): StyleValue => {
      return {
        transform: `translateX(${getLocalPercentage.value * 1.4}%)`
      }
    })

    const getImageStyle = computed((): StyleValue => {
      return {
        left: `${getLocalPercentage.value * 0.7}%`
      }
    })

    const getActionStyle = computed((): StyleValue => {
      return {
        left: `${getLocalPercentage.value * 0.9}%`
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

<style scoped></style>
