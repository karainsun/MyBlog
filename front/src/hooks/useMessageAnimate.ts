import { Ref, onMounted, onUnmounted } from 'vue'

const useMessageAnimate = (elementRef: Ref<null | HTMLElement>) => {
  const list = elementRef.value?.children as any

  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

    for (let i = 0; i < list.length; i++) {
      if(list[i].offsetTop - scrollTop < window.innerHeight) {
        if(list[i].className.indexOf('f-item-act') < 0) {
          list[i].className += ' f-item-act'
        }
      }
    }
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}
export default useMessageAnimate
