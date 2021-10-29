<template>
  <div class="theme pos-fix">
    <div
      @click="onCheck"
      class="iconfont icon-moon"
      :class="check ? 'white icon-sun' : 'black icon-moon'"
      title="切换主题"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { checkTheme } from '@/utils'

export default defineComponent({
  setup() {
    const themeSwitch = localStorage.getItem('theme') === 'false' ? false : true;
    const check = ref<boolean>(themeSwitch)
    const onCheck = () => {
      check.value = !check.value
      checkTheme(check.value)
    }
    return {
      check,
      onCheck
    }
  }
})
</script>

<style lang="less" scoped>
.theme {
  width: 60px;
  height: 60px;
  left: 30px;
  bottom: 30px;
  z-index: 99999;
  border-radius: 50%;
  overflow: hidden;
  background-color: transparent;
  text-align: center;
  line-height: 60px;
  font-size: 50px;
  &:hover {
    background-color: var(--theme-switch);
  }
  .iconfont {
    font-size: 28px;
  }
  .white {
    color: #fff;
  }
  .black {
    color: #404040;
  }
}
</style>
