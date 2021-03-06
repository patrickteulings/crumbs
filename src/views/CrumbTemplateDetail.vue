<template>
  <div class="wrapper page-crumbTemplateDetail">
    <div class="wrapper__inner" style="height: 300vh">
      <div class="hero crumbdetail-calendar" :style="getCalendarBackgroundColor()">
        <div class="crumbdetail-calendar__inner">
          <Calendar v-model="date" :attributes="attributes()" color="red" is-dark is-range is-expanded title-position="right" availableDates="range" @dayclick="handleDayClick"/>
        </div>
      </div>
      <div class="crumbsList">
        <h2 class="crumbsList__title">{{ (selectedDate !== '') ? format(new Date(selectedDate), 'eeee do MMMM') : 'THIS MONTH'}}</h2>
        <div v-if="!validCrumbs.length">Nothing here</div>
        <transition-group @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
          <CrumbCard v-for="(crumb, i) in validCrumbs" :cardData="crumb" :key="crumb.id" :data-index="i" class="crumbCardWrapper" @click="handleCrumbItemClick(crumb.id)"></CrumbCard>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, computed, StyleValue } from 'vue'
import store from '@/store'

import CrumbCard from '@/components/crumb/CrumbCard.vue'

import { CrumbTemplate } from '@/types/CrumbTemplate'
import { Crumb } from '@/types/Crumb'
import { Calendar } from 'v-calendar'

import { useRoute } from 'vue-router'
import { useColors } from '@/use/colors/useColors'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import gsap from 'gsap'
import { Expo } from 'gsap/all'


export default defineComponent({
  name: 'CrumbTemplateDetail',
  components: {
    Calendar,
    CrumbCard
  },
  setup () {
    const state = reactive({
      route: useRoute(),
      crumbTemplates: computed(() => store.getters['crumbStore/getCrumbTemplates']),
      currentTemplate: computed(() => getSelectedCrumb()),
      validCrumbs: [] as Array<Crumb>,
      crumbs: computed(() => store.getters['crumbStore/getAllCrumbs'].filter((item: Crumb) => item.categoryID === route.params.categoryID)),
      date: new Date(),
      range: {
        start: new Date(2022, 1, 1),
        end: new Date(2022, 1, 5)
      },
      selectedDate: ''
    })

    const route = useRoute()

    const getSelectedCrumb = (): CrumbTemplate => {
      return state.crumbTemplates.find((item:any) => item.id === route.params.categoryID)
    }

    const attributes = () => {
      const dates = state.crumbs.map((crumb: Crumb) => crumb.date)
      return dates.map((date: string) => ({
        highlight: true,
        dates: date
      }))
    }

    const handleDayClick = (e: {id: string}): void => {
      const day = new Date(e.id)

      if (state.selectedDate === e.id) {
        state.validCrumbs = state.crumbs
        state.selectedDate = ''
        return
      } else {
        state.selectedDate = e.id
      }

      state.validCrumbs = []
      state.validCrumbs = state.crumbs.filter((crumb: Crumb) => isSameDay(crumb.date, day)).sort((a: Crumb, b: Crumb) => b.date - b.date)
    }

    const isSameDay = (dateOne: Date, dateTwo: Date): boolean => {
      return (
        dateOne.getMonth() === dateTwo.getMonth() &&
        dateOne.getFullYear() === dateTwo.getFullYear() &&
        dateOne.getDate() === dateTwo.getDate()
      )
    }

    const handleCrumbItemClick = (id: string) => {
      console.log('id', id)
    }

    // -------------------------------------------------------------------------- //
    // COLOR FUNCTIONS
    // -------------------------------------------------------------------------- //

    const getCalendarBackgroundColor = () => {
      const { hexToHSL } = useColors()
      const { h, s, l } = hexToHSL(state.currentTemplate.color)
      const hslLight = 'hsl(' + h + ',' + (s) + '%,' + (100) + '%)'
      const hslDark = 'hsl(' + h + ',' + (s) + '%,' + 80 + '%)'

      return { background: `linear-gradient(138.49deg, ${hslLight} 2.6%, ${hslDark} 99.01%)` }
    }

    const getCrumbBackgroundColor = () => {
      const { hexToHSL } = useColors()
      const { h, s, l } = hexToHSL(state.currentTemplate.color)
      const hslLight = 'hsl(' + h + ',' + (s) + '%,' + 80 + '%)'
      const hslDark = 'hsl(' + h + ',' + (s) + '%,' + 80 + '%)'

      return { background: hslLight }
    }

    const getStyle = (i: string): Record<string, unknown> => {
      return { '--i': i }
    }


    const onBeforeEnter = (el: any) => {
      el.style.opacity = 0.5
      el.style.transform = 'translate(-0.2rem, 1rem)'
    }

    const onEnter = (el: any) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.4,
        ease: Expo.easeOut,
        delay: 0.002 * el.dataset.index
      })
    }

    // -------------------------------------------------------------------------- //
    // ANIMATION FUNCTIONS
    // -------------------------------------------------------------------------- //

    const onBeforeLeave = (el: any) => {
      el.style.opacity = 0.2
    }

    const onLeave = (el: any, done: any) => {
      gsap.to(el, {
        opacity: 0,
        x: 0,
        y: 16,
        duration: 0.6,
        ease: Expo.easeOut,
        onComplete: done,
        delay: 0.05 * el.dataset.index
      })
    }

    onMounted(() => {
      state.validCrumbs = state.crumbs
      getSelectedCrumb()
    })

    return {
      ...toRefs(state),
      getCrumbBackgroundColor,
      getCalendarBackgroundColor,
      attributes,
      handleDayClick,
      handleCrumbItemClick,
      onBeforeEnter,
      onBeforeLeave,
      onEnter,
      onLeave,
      format
    }
  }
})
</script>

<!-- STYLES -->

<style scoped lang="scss"></style>
