import { reactive, toRefs, Ref } from 'vue'

interface State {
  x: number,
  y: number
}

export const useScroll = (): Record<string, Ref<number>> => {
  const state: State = reactive({
    x: 0,
    y: 0
  })

  const handleScroll = (e:Event) => {
    // const window = e.currentTarget as Window
    state.y = window.scrollY
  }

  window.addEventListener('scroll', (e: Event) => {
    const event = e
    window.requestAnimationFrame((n) => {
      handleScroll(e)
    })
  })

  return {
    ...toRefs(state)
  }
}
