<template>
    <div class="teaser" ref="teaserItemsWrapper">
      <div ref="teaserItems" class="teaser__items" :style="getCarouselPosition" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove">
        <HomepageCarouselItem v-for="item, index in teaserItemsData" :key="`blabla${index}`" :percentage="getPercentageValue" :slideID="index">
          <template v-slot:title>
            <h2>{{ item.label }}</h2>
          </template>
          <template v-slot:image>
            <div v-html="iets"></div>
          </template>
          <template v-slot:action>
            <CrumbPreviewButton :buttonData="demoData" :labelTotal="31"></CrumbPreviewButton>
          </template>
        </HomepageCarouselItem>
      </div>
      <div class="teaser__bullets">
        <div class="teaser__bullets__inner">
          <button class="teaser__bullet" type="button" v-for="item, index in teaserItemsData" :key="index" :data="item" :data-id="index" @click="handleBulletClick(index)"></button>
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
      teaserItemsData: [{ label: 'Will your morning coffee bankrupt you?' }, { label: 'Am I hitting my meditation goals?' }, { label: 'Does this even work' }, { label: 'Will your morning coffee bankrupt you?' }],
      activeIndex: 0,
      windowProps: { width: 0, height: 0 },
      rafValue: 0,
      startPos: { x: 0, y: 0 }
    })

    const iets = useImages().coffeeImage

    const handleBulletClick = (index: number) => {
      state.activeIndex = index
      state.rafValue = index
    }

    const getCarouselPosition = computed((): StyleValue => {
      const maxValue = 0
      const minValue = state.teaserItemsData.length - 1
      let val = state.startPos.x - state.rafValue

      if (val > maxValue) {
        val = maxValue
      }
      if (val < -minValue) val = -minValue

      return {
        left: `${(val) * 100}%`
        // left: '0%'
      }
    })

    const getHeaderPosition = computed((): StyleValue => {
      // const val = state.startPos.x - state.rafValue

      return {
        // left: `${100 - (Math.abs(val) * 100)}%`
        left: '0%'
      }
    })

    const getImagePosition = computed((): StyleValue => {
      const val = state.startPos.x - state.rafValue
      return {
        left: `${50 - (Math.abs(val) * 50)}%`
      }
    })

    const getPercentageValue = computed((): number => {
      return state.startPos.x - state.rafValue
    })


    // ---------------------------------------------
    // TOUCH EVENTS
    // ---------------------------------------------

    const teaserItemsWrapper = ref<HTMLDivElement>()
    const teaserItems = ref<HTMLDivElement>()
    const touchStart = { x: 0, y: 0 }
    const touchEnd = { x: 0, y: 0 }
    const touchMove = { x: 0, y: 0 }

    const updateTeaserPosition = () => {
      state.rafValue = ((touchStart.x - touchMove.x) / state.windowProps.width)
      window.requestAnimationFrame(updateTeaserPosition)
    }

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
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      touchMove.x = e.touches[0].clientX
      touchMove.y = e.touches[0].clientY

      state.activeIndex = ((touchMove.x - touchStart.x) / state.windowProps.width)
      // console.log('move', `-${state.activeIndex * 100}%`)
    }

    onMounted(() => {
      // teaserItemsWrapper = ref<HTMLDivElement>()
      // teaserItems = ref<HTMLDivElement>()

      const el = teaserItemsWrapper.value
      state.windowProps = { width: (el) ? el.clientWidth : 0, height: (el) ? el.clientHeight : 0 }

      updateTeaserPosition()
    })

    return {
      ...toRefs(state),
      handleBulletClick,
      getCarouselPosition,
      getHeaderPosition,
      getImagePosition,
      getPercentageValue,
      handleTouchStart,
      handleTouchEnd,
      handleTouchMove,
      teaserItemsWrapper,
      teaserItems,
      iets
    }
  }
})
</script>

<style scoped>

</style>
