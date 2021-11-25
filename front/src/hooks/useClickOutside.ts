import { Ref, ref, onMounted, onUnmounted } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const num = ref(0) // 用来触发监听事件，应为isClickOutside不一定发生变化
  const handler = (e: MouseEvent) => {

    const attrValue = (e as any).target.attributes[0]
    if (!attrValue) return

    const eleClass = attrValue.value.split(' ')[1]
    const classArr = [
      'icon-send',
      'reply-btn',
      'icon-pen',
      'icon-message',
      'search-btn'
    ]

    if (classArr.includes(eleClass)) {
      return
    }

    if (elementRef.value) {
      num.value ++
      // contains：是否包含某节点，e.target不一定每次都是HTMLElement类型的，所以要类型断言一下
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return {
    num,
    isClickOutside
  }
}
export default useClickOutside
