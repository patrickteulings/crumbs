<template>
  <div ref="dropdown" class="dropdown colorDropdown" :class="isActive ? 'active' : ''">
    <div class="dropdown__trigger" @click="toggleDropdown">
      <span class="label" :style="getBackgroundColor"></span>
    </div>
    <div class="dropdown__content">
      <div v-for="item in data.items" :key="item.label" class="dropdown__item" @click="setActiveElement($event, item)">
        <span class="label" :style="getItemColor(item)"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, PropType, computed, ref } from 'vue'

import { useClickOutside } from '@/use/onclickoutside/useClickOutside'
import { CrumbTemplate } from '@/types/CrumbTemplate'

export default defineComponent({
  name: 'ColorDropDown',
  props: {
    dropdownData: {
      type: Object,
      required: true
    },
    templateData: {
      type: Object as PropType<CrumbTemplate>,
      required: true
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      label: { date: new Date().toString(), id: 'hoi', label: 'tabak', categoryID: '12', amount: 23, color: '444', max: 10 },
      isActive: false,
      data: props.dropdownData
    })

    const dropdown = ref<HTMLElement>()

    useClickOutside(dropdown, (el: HTMLElement, clickedEl: HTMLElement) => {
      closeDropdown()
    })

    const setActiveElement = (e: MouseEvent, itemData: CrumbTemplate) => {
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

    const getBackgroundColor = computed(() => {
      console.log(props.templateData)
      return { backgroundColor: `#${props.templateData.color}` }
    })

    const getItemColor = (el: any) => {
      return { backgroundColor: `#${el.color}` }
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
      getItemColor,
      dropdown
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
