<template>
  <div class="footer text-c">
    <div class="ins d-flex js-center">
      <a href="https://github.com/karainsun" target="_blank" class="item iconfont icon-info-1"></a>
      <a href="#" class="item iconfont icon-info-2"></a>
      <a href="#" class="item iconfont icon-info-3"></a>
      <a href="#" class="item iconfont icon-info-4"></a>
    </div>
    <p class="copyright">
    Copyright © Mr.Kay 2021<br />
    Theme by <a target="_bank" href="https://v-vincen.life/">Vincen</a> |
    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">豫ICP备20011487号</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="less" scoped>
.footer {
  margin-bottom: 30px;
  .ins {
    margin-bottom: 30px;
    .item {
      display: inline-block;
      font-size: 40px;
      margin: auto 7px;
      color: var(--insicon-color);
      &:hover{
        color: var(--main-color);
      }
    }
  }
  .copyright {
    line-height: 25px;
    font-size: 14px;
    color: var(--h1-color);
    margin-bottom: 7px;
    a {
      color: var(--main-color);
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
