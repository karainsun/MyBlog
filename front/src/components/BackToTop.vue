<template>
  <div v-show="visible" class="iconfont icon-md-rocket rocket" :class="move" @click="backToTop"></div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      visible: false,
      interval: null,
      move: ''
    }
  },
  //监听页面滚动
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  //销毁定时器
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.visible = scrollTop > 0
    },
    //点击回到顶部
    backToTop() {
      this.move = 'move'
      const that = this
      cancelAnimationFrame(that.interval)
      //获取当前毫秒数
      const startTime = +new Date()
      //获取当前页面的滚动高度
      const b = document.body.scrollTop || document.documentElement.scrollTop
      const d = 500
      const c = b
      that.interval = requestAnimationFrame(function func() {
        const t = d - Math.max(0, startTime - +new Date() + d)
        document.documentElement.scrollTop = document.body.scrollTop = (t * -c) / d + b
        that.interval = requestAnimationFrame(func)
        if (t == d) {
          cancelAnimationFrame(that.interval)
          that.move = ''
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rocket {
  position: fixed;
  cursor: pointer;
  transition: 1s;
  z-index: 20;
  bottom: 30px;
  right: 30px;
  color: gray;
  font-size: 36px;
  &.move {
    opacity: 0;
    -webkit-transform: translateY(-500px);
    -moz-transform: translateY(-500px);
    -ms-transform: translateY(-500px);
    transform: translateY(-500px);
    pointer-events: none;
  }
  &:hover {
    color: var(--main-color);
  }
}
</style>
