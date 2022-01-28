<template>
  <div ref="dropdown" class="dropdown dropdown--default" :class="isActive ? 'active' : ''">
    <div class="dropdown__trigger" @click="toggleDropdown" :style="getTriggerBackground()">
      <span class="label">{{ data.triggerLabel }}</span>
      <span class="chevron"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
    </div>
    <div class="dropdown__content">
      <div v-for="item in data.items" :key="item.label" @click="setActiveElement($event, item)" class="dropdown__item" :class="(item.active) ? 'active' : ''" :style="getItemColors(20)">
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, PropType, computed, ref } from 'vue'

import { useClickOutside } from '@/use/onclickoutside/useClickOutside'

import { useColors } from '@/use/colors/useColors'

export default defineComponent({
  name: 'DropDown',
  props: {
    dropdownData: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      label: { date: new Date().toString(), id: 'hoi', label: 'tabak', categoryID: '12', amount: 23, color: '444', max: 10 },
      isActive: false,
      data: props.dropdownData
    })

    console.log(props.dropdownData)

    const dropdown = ref<HTMLElement>()

    useClickOutside(dropdown, (el: HTMLElement, clickedEl: HTMLElement) => {
      closeDropdown()
    })

    const setActiveElement = (e: MouseEvent, itemData: Record<string, unknown>) => {
      closeDropdown()
      const target = e.target as HTMLDivElement
      target.classList.add('active')
      setActiveItem(itemData)
      emit('onItemSelected', itemData)
    }

    const openDropdown = () => {
      state.isActive = true
    }

    const closeDropdown = () => {
      state.isActive = false
    }

    const toggleDropdown = () => {
      state.isActive = !state.isActive
    }

    const setActiveItem = (payload: Record<string, unknown>) => {
      console.log('setActiveItem', payload)
      state.data.items.forEach((item: any) => {
        item.active = (item.label === payload.label)
      })
      state.data.triggerLabel = payload.label
    }

    const getItemColors = (luminanceOffset = 0) => {
      const { hexToHSL } = useColors()
      const { h, s, l } = hexToHSL(props.dropdownData.color)
      const hsl = `hsl(${h}, ${s}%, ${l + luminanceOffset}%)`
      const textColor = `hsl(${h}, ${s}%, ${l - luminanceOffset}%)`
      return { backgroundColor: hsl, color: textColor }
    }

    const getTriggerBackground = () => {
      return { backgroundColor: `#${props.dropdownData.color}` }
    }

    onMounted(() => {
      console.log('----------------- MOUTED DROPDOWN ------------------')
    })

    return {
      ...toRefs(state),
      openDropdown,
      toggleDropdown,
      setActiveElement,
      getItemColors,
      getTriggerBackground,
      dropdown
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
