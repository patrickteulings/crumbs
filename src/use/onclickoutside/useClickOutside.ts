import { Ref, onMounted } from 'vue'

export const useClickOutside = (el: Ref<HTMLElement | undefined>, callback: any): any => {
  let containerEl: HTMLDivElement

  const addEvents = () => {
    document.addEventListener('click', (e: any) => {
      handleClick(e)
    })
  }

  const handleClick = (e: {target: HTMLElement}): void => {
    console.log('adbakb', containerEl.contains(containerEl))
    if (!containerEl.contains(e.target)) callback(containerEl, e.target)
  }

  onMounted(() => {
    containerEl = el.value as HTMLDivElement
    setTimeout(() => addEvents(), 200)
  })

  return {
    handleClick
  }
}
