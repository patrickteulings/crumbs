<template>
  <div class="teaser__item">
    <slot name="header"></slot>
    <div ref="teaserImage" class="teaser__image">
      {{$props.percentage}}
      <slot name="image"></slot>
    </div>
    <slot name="action"></slot>

    <main>
      <!-- We want main content here -->
    </main>
    <footer>
      <!-- We want footer content here -->
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'HomepageCarouselItem',
  props: {
    percentage: {
      required: true,
      type: Number
    }
  },
  setup (props) {
    const state = reactive({
      parallaxPercentage: props.percentage
    })

    const teaserImage = ref<HTMLDivElement>()

    return {
      ...toRefs(state),
      teaserImage
    }
  }
})
</script>

<style scoped>

</style>
