import { Ref, onMounted } from 'vue'

export const useClickOutside = (el: Ref<HTMLElement | undefined>, callback: (container: HTMLDivElement, clickedTarget: HTMLElement) => any): Record<string, unknown> => {
  let containerEl: HTMLDivElement

  const addEvents = () => {
    document.addEventListener('click', (e: any) => {
      handleClick(e)
    })
  }

  const handleClick = (e: {target: HTMLElement}): void => {
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

// ********************************* USAGE *************************************** //

// const htmlELementRef = ref<HTMLElement>()
// useClickOutside(htmlELementRef, (el: HTMLElement, clickedEl: HTMLElement) => {
//   console.log('Reference to container with useClickOutside', el)
//   console.log('Reference to the clicked eleemnt', clickedEl)
// })

// ********************************* USAGE *************************************** //
