<template>
  <div ref="dropdown" class="dropdown" :class="isActive ? 'active' : ''">
    <div class="dropdown__trigger" @click="toggleDropdown" :style="getBackgroundColor()">
      <span class="label">{{ dropdownData.triggerLabel }}</span>
      <span class="chevron"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
    </div>
    <div class="dropdown__content">
      <div v-for="item in data.items" :key="item.label" @click="setActiveElement($event)">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, PropType, computed, ref } from 'vue'

import { useClickOutside } from '@/use/onclickoutside/useClickOutside'

export default defineComponent({
  name: 'DropDown',
  props: {
    dropdownData: {
      type: Object,
      required: true
    },
    dropdownColor: {
      type: String,
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

    const setActiveElement = (e: MouseEvent & { target: HTMLDivElement }) => {
      console.log(e.target)
      const container = document.querySelector('.dropdown__content') as HTMLDivElement
      const iets = [...container.children].indexOf(e.target)
      console.log('IETSSSS', iets)
      emit('onItemSelected', 'ff7733')
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

    const getBackgroundColor = () => {
      return props.dropdownData.color
    }


    onMounted(() => {
      console.log('----------------- MOUTED DROPDOWN ------------------')
    })

    return {
      ...toRefs(state),
      openDropdown,
      toggleDropdown,
      setActiveElement,
      getBackgroundColor,
      dropdown
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
