<template>
    <div class="teaser" ref="teaserItemsWrapper">
      <div ref="teaserItems" class="teaser__items" :style="getCarouselPosition" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove">
        <HomepageCarouselItem v-for="item, index in teaserItemsData" :key="`blabla${index}`" :percentage="getPercentageValue" :slideID="index">
          <template v-slot:title>
            <h2>{{ item.label }}</h2>
          </template>
          <template v-slot:image>
            <div v-html="item.image"></div>
          </template>
          <template v-slot:action>
            <CrumbPreviewButton :buttonData="item.demoData" :labelTotal="31"></CrumbPreviewButton>
          </template>
        </HomepageCarouselItem>
      </div>
      <div class="teaser__bullets">
        <div class="teaser__bullets__inner">
          <button class="teaser__bullet" type="button" v-for="item, index in teaserItemsData" :key="index" :data="item" :data-id="index" @click="handleBulletClick(index)" :class="activeIndex === index ? 'active' : ''"></button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, StyleValue, toRefs, computed, ref, onMounted } from 'vue'
import CrumbPreviewButton from '../crumb/CrumbPreviewButton.vue'
import HomepageCarouselItem from './HomepageCarouselItem.vue'
import { useImages } from './Images'

export default defineComponent({
  name: 'HomepageCarousel',
  components: {
    CrumbPreviewButton,
    HomepageCarouselItem
  },
  setup () {
    const state = reactive({
      demoData: { id: '', label: 'Meditatie', date: new Date(), categoryID: 'health', amount: 1, color: '#FFFFFF', target: 31, increase: true, timespan: 'week' },
      teaserItemsData: [
        { label: 'Will your morning coffee bankrupt you?', image: useImages().coffeeImage, demoData: { id: '', label: 'Coffee', date: new Date(), categoryID: 'health', amount: 1, color: '#FFFFFF', target: 31, increase: true, timespan: 'week' } },
        { label: 'Am I hitting my meditation goals?', image: useImages().meditate, demoData: { id: '', label: 'Meditate', date: new Date(), categoryID: 'health', amount: 1, color: '#456B99', target: 31, increase: true, timespan: 'week' } },
        { label: 'Run Forest, Run', image: useImages().run, demoData: { id: '', label: 'Running', date: new Date(), categoryID: 'health', amount: 1, color: '#CFDBDC', target: 31, increase: true, timespan: 'week' } },
        { label: 'Mindfull walk', image: useImages().meditate, demoData: { id: '', label: 'Meditatie', date: new Date(), categoryID: 'health', amount: 1, color: '#BA8EC2', target: 31, increase: true, timespan: 'week' } }
      ],
      activeIndex: 0,
      windowProps: { width: 0, height: 0 },
      percentageDragged: 0,
      startPos: { x: 0, y: 0 },
      isDragging: false,
      targetValue: 0,
      newVal: 0
    })


    // ---------------------------------------------
    // CAROUSEL POSITIONING
    // ---------------------------------------------


    const getCarouselPosition = computed((): StyleValue => {
      return {
        left: `${(state.newVal)}%`
      }
    })


    const updateTeaserPosition = () => {
      const el = teaserItems.value as HTMLDivElement
      const currentPos = parseFloat(el.style.left)

      state.percentageDragged = (state.isDragging) ? ((touchStart.x - touchMove.x) / state.windowProps.width) : 0
      state.targetValue = (state.startPos.x - state.percentageDragged) * 100

      const diff = (state.targetValue - currentPos) * 0.1

      state.newVal = (currentPos + diff)

      // if (Math.abs(diff) < 0.1) state.newVal = state.targetValue // round off if difference is neglectible

      window.requestAnimationFrame(updateTeaserPosition)
    }


    const getPercentageValue = computed((): number => {
      return state.newVal
    })


    // ---------------------------------------------
    // BULLET NAVIGATION
    // ---------------------------------------------


    const handleBulletClick = (index: number) => {
      state.activeIndex = index
      state.percentageDragged = 0
      state.startPos.x = -index
    }


    // ---------------------------------------------
    // TOUCH EVENTS
    // ---------------------------------------------

    const teaserItemsWrapper = ref<HTMLDivElement>()
    const teaserItems = ref<HTMLDivElement>()
    const nrTeaserItems = state.teaserItemsData.length
    const touchStart = { x: 0, y: 0 }
    const touchEnd = { x: 0, y: 0 }
    const touchMove = { x: 0, y: 0 }

    const handleTouchStart = (e: TouchEvent) => {
      const el = teaserItems.value as HTMLDivElement
      state.startPos.x = parseInt(el.style.left, 10) / 100
      state.startPos.y = parseInt(el.style.top, 10) / 100

      touchMove.x = e.touches[0].clientX
      touchStart.x = e.touches[0].clientX
      touchStart.y = e.touches[0].clientY
    }


    const handleTouchEnd = (e: TouchEvent) => {
      touchEnd.x = touchMove.x
      touchEnd.y = touchMove.x


      console.log(Math.abs(touchMove.x - touchStart.x))
      if (Math.abs(touchMove.x - touchStart.x) < 70) {
        state.isDragging = false
        return
      }

      state.activeIndex = (touchMove.x < touchStart.x) ? state.activeIndex + 1 : state.activeIndex - 1
      state.activeIndex = (state.activeIndex < 0) ? 0 : state.activeIndex
      state.activeIndex = (state.activeIndex > (nrTeaserItems - 1)) ? (nrTeaserItems - 1) : state.activeIndex

      state.percentageDragged = 0
      state.startPos.x = -state.activeIndex

      state.isDragging = false
    }


    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()

      touchMove.x = e.touches[0].clientX
      touchMove.y = e.touches[0].clientY
      state.isDragging = true
    }

    onMounted(() => {
      const el = teaserItemsWrapper.value
      state.windowProps = { width: (el) ? el.clientWidth : 0, height: (el) ? el.clientHeight : 0 }

      updateTeaserPosition()
    })

    return {
      ...toRefs(state),
      handleBulletClick,
      getCarouselPosition,
      getPercentageValue,
      handleTouchStart,
      handleTouchEnd,
      handleTouchMove,
      teaserItemsWrapper,
      teaserItems
    }
  }
})
</script>

<style scoped>

</style>
