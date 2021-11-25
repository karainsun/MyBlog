<template>
  <div class="search-content">
    <i class="search search-btn iconfont icon-search" title="搜索" @click="searchBtn"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { searchMitt } from '@/components/PostModal.vue'

export default defineComponent({
  setup(){
    const searchBtn = () => {
      searchMitt.emit('set-search')
    }

    return {
      searchBtn
    }
  }
})
</script>

<style lang="less" scoped>
.search {
  position: fixed;
  cursor: pointer;
  transition: 1s;
  z-index: 999;
  bottom: 80px;
  right: 33px;
  color: gray;
  font-size: 30px;
  &:hover {
    color: var(--main-color);
  }
}
</style>
