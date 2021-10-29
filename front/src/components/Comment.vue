<template>
  <div>
    <div class="comment w-full d-flex">
      <div class="avatar shadow-all">
        <img class="w-full h-full" :src="tourist?.avatar || defaultAvatar" alt="" />
      </div>
      <div class="context w-full box-sizing pl-20">
        <div class="text">
          <textarea
            class="w-full box-sizing p-5 fs-16"
            :placeholder="atName ? `@${atName}：` : 'say something..'"
            rows="3"
            @keyup="handleWrite"
            v-model="comment"
          ></textarea>
          <div class="valid-txt">
            <span v-if="isShow" class="fs-14 text-red">请输入评论</span>
          </div>
        </div>
        <div class="tool d-flex js-between">
          <i class="name fs-14 text-gray">{{ tourist?.nickname }}</i>
          <div class="bar">
            <span class="iconfont icon-emoji" title="表情"></span>
            <span class="iconfont icon-send" title="发表" @click="send"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue'
import mitt from 'mitt'

export const touristMitt = mitt()

export default defineComponent({
  emits: ['show-login','send-emit'],
  props: {
    atName: {
      type: String,
      default: null
    }
  },
  setup(props, { emit }) {
    const comment = ref('')
    const isShow = ref(false)
    let touristInfo = JSON.parse(localStorage.getItem('tourist_info') as string)
    const tourist = ref(touristInfo)
    const defaultAvatar = 'http://qxawt89kx.hn-bkt.clouddn.com/defaultavatar.png'
    // 发送bus组件线程事件
    const send = () => {
      if(touristInfo){
        isShow.value = !(comment.value.trim() !== '')
        if(comment.value.trim() !== '') {
          emit('send-emit', comment.value)
          comment.value = ''
        }
      } else {
        emit('show-login')
      }
    }
    // 设置游客信息
    const setTourist = (data: any) => {
      tourist.value = data
      localStorage.setItem('tourist_info', JSON.stringify(data))
      touristInfo = data
    }
    // 评论写入事件
    const handleWrite = (e: Event) => {
      const target = e.target as HTMLInputElement
      comment.value = target.value
      isShow.value = !(target.value.trim() !== '')
    }

    touristMitt.on('set-tourist', setTourist)

    onUnmounted(() => {
      touristMitt.off('set-tourist', setTourist)
    })

    return {
      send,
      tourist,
      defaultAvatar,
      handleWrite,
      isShow,
      comment
    }
  }
})
</script>

<style lang="less" scoped>
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }
  .context {
    .text {
      textarea {
        resize: vertical;
        border: 2px solid #e3e3e3;
        line-height: 20px;
        outline-color: var(--main-color);
        resize:none;
        background-color: var(--textarea-bg);
      }
    }
    .tool {
      .bar {
        span {
          margin-left: 20px;
          font-size: 22px;
          color: gray;
          cursor: pointer;
          &:hover {
            color: var(--main-color);
          }
        }
      }
    }
  }
}
</style>
