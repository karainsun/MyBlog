<template>
  <div>
    <div class="post-modal shadow-all" ref="searchRef" v-if="visible">
    <div class="post-box">
      <div class="close" title="关闭" @click="handleShow">X</div>
      <div class="title-ipt">
        <input type="text" placeholder="请输入搜索内容" @input="handleInput">
      </div>
      <ul class="list">
        <li v-for="p in list" :key="p.id">
          <router-link :to="{ path: `/post/${p.id}` }" @click="handleShow">
            <h4 class="fs-18 pb-15 text-ellipsis">{{p.title}}</h4>
            <div class="fs-14 text-ellipsis">{{p.description}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { searchPost } from '@/request'
import mitt from 'mitt'
import { throttle } from '@/utils'
import useClickOutside from '@/hooks/useClickOutside'

export const searchMitt = mitt()

export default defineComponent({
  setup(){
    const list = ref([]);
    const visible = ref(false)
    const searchRef = ref(null)

    const handleShow = () => {
      visible.value = !visible.value
      list.value = []
    }

    searchMitt.on('set-search', handleShow)

    const handleInput = (e: any) => {
      if(e.target.value !== ''){
        searchPost({ title: e.target.value }).then((res: any) => {
          if (res.code === 200) {
              list.value = res.data
            }
        })
      } else {
        list.value = []
      }
    }

    const { num, isClickOutside } = useClickOutside(searchRef)

    watch(num, () => {
      if (visible.value && isClickOutside.value) {
        visible.value = false
        list.value = []
      }
    })

    return {
      list,
      handleInput,
      visible,
      handleShow,
      searchRef
    }
  }
})
</script>

<style lang="less" scoped>
.post-modal {
  height: calc(100vh - 40px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: var(--post-modal-bg);
  .post-box {
    position: relative;
    padding: 20px 35px;
    box-sizing: border-box;
    .close {
      position: absolute;
      font-size: 24px;
      cursor: pointer;
      right: 10px;
      top: 2px;
      color: var(--h1-color);
      &:hover {
        color: var(--main-color);
      }
    }
    .title-ipt {
      border-bottom: 1px solid var(--h1-color);
      input {
        width: 100%;
        border: none;
        padding: 5px 0;
        color: var(--h1-color);
        font-size: 18px;
        background-color: var(--post-modal-bg);
        &:focus-visible {
          border: none;
          outline: none;
        }
      }
    }
    .list {
      height: calc(100vh - 120px);
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #bbb;
      }

      &::-webkit-scrollbar-track {
        border-radius: 0px;
        background: transparent;
      }
      li {
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 1px solid var(--home-border);
        a {
          color: var(--h1-color);
        }
        &:hover a {
          color: var(--main-color);
        }
      }
    }
  }
}
// 大于1024px
@media screen and (min-width: 1024px) {
  .post-modal {
    width: 800px;
  }
}
// 小于1024px
@media screen and (max-width: 1023px) {
  .post-modal {
    width: calc(100vw - 40px);
  }
}
</style>
