<template>
  <div>
    <div class="comment w-full d-flex">
      <div class="avatar shadow-all">
        <img class="w-full h-full" :src="tourist?.avatar || defaultAvatar" alt="" />
      </div>
      <div class="context w-full box-sizing pl-20">
        <div class="text">
          <div :id="txtId" contenteditable="true"
            class="txt-box w-full box-sizing p-5 fs-16"
            :placeholder="atName ? `@${atName}：` : 'say something..'"
            @keyup="handleWrite"
            @focus="checkCommentBox"
          ></div>
          <div class="valid-txt">
            <span v-if="isShow" class="fs-14 text-red">请输入评论</span>
          </div>
        </div>
        <div class="tool d-flex js-between">
          <i class="name fs-14 text-gray">{{ tourist?.nickname }}</i>
          <div class="bar">
            <span class="check-emoji iconfont icon-emoji" title="表情" @click="showEmoji"></span>
            <span class="iconfont icon-send" title="发表" @click="send"></span>
          </div>
        </div>
        <div class="emoji-box" v-show="emojiShow"  :id="'m' + txtId">
          <img v-for="e in emojiList" :key="e.id" :src="e.img" @click="addEmoji(e.id)">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onMounted, ref, watch } from 'vue'
import mitt from 'mitt'
import { emojiArr } from '@/utils'

const emojiList = emojiArr()
export const touristMitt = mitt()

export default defineComponent({
  emits: ['show-login','send-emit', 'check-query', 'hide-box'],
  props: {
    atName: {
      type: String,
      default: null
    },
    txtId: {
      type: String,
      default: 'txtBox'
    }
  },
  setup(props, { emit }) {
    const comment = ref('')
    const isShow = ref(false)
    const emojiShow = ref(false)
    let touristInfo = JSON.parse(localStorage.getItem('tourist_info') as string)
    const tourist = ref(touristInfo)
    const defaultAvatar = 'http://cdn.kayrain.cn/defaultavatar.jpeg'
    // 发送bus组件线程事件
    const send = () => {
      if(touristInfo){
        isShow.value = !(comment.value.trim() !== '')
        if(comment.value.trim() !== '') {
          emit('send-emit', comment.value);
          ;(document.getElementById(props.txtId) as any).innerHTML = ''
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
      const target = e.target
      comment.value = (target as any).innerHTML
      // isShow.value = !(target.innerHTML.trim() !== '')
    }
    // 判断是否是主评论框（是主评论框就将评论参数修改为主评论参数）
    const checkCommentBox = () => {
      if(props.txtId === 'txtBox') {
        emit('check-query', { id: null, name: '' });
        emit('hide-box');
      }
    }
    // 表情框
    const showEmoji = () => {
      // 点击表情图标判断是否为主评论框
      checkCommentBox()
      emojiShow.value = !emojiShow.value
    }
    // 添加表情
    const addEmoji = (i: number) => {
      const txtBox = document.getElementById(props.txtId)
      const img = document.createElement('img')
      img.src = `http://cdn.kayrain.cn/${i}.gif`;
      ;(txtBox as any).appendChild(img)
      comment.value = (txtBox as any).innerHTML
    }

    touristMitt.on('set-tourist', setTourist)

    const handler = (e: MouseEvent) => {
      const txtBox = document.getElementById('m' + props.txtId)
      const attrValue = (e as any).target.attributes[0]
      if (!attrValue) return
      const eleClass = attrValue.value.split(' ')[0]

      if (eleClass === 'check-emoji') {
        return
      }
      if ((txtBox as any).contains(e.target as HTMLElement)) {
        emojiShow.value = true
      } else {
        emojiShow.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handler);
    });
    onUnmounted(() => {
      touristMitt.off('set-tourist', setTourist);
      document.removeEventListener('click', handler);
    });

    return {
      send,
      tourist,
      defaultAvatar,
      handleWrite,
      isShow,
      comment,
      addEmoji,
      emojiList,
      emojiShow,
      showEmoji,
      checkCommentBox
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
    position: relative;
    .text {
      .txt-box {
        height: 80px;
        margin-bottom: 5px;
        resize: vertical;
        border: 2px solid #e3e3e3;
        line-height: 20px;
        outline-color: var(--main-color);
        resize:none;
        background-color: var(--textarea-bg);
        &:empty:before{
          content: attr(placeholder);
          color:#bbb;
        }
        &:focus:before{
          content:none;
        }
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
    .emoji-box {
      width: 200px;
      height: 160px;
      border: 1px solid #e3e3e3;
      padding: 10px;
      box-sizing: border-box;
      overflow-y: scroll;
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      right: 0;
      background-color: #fff;
      img {
        width: 24px;
        height: 24px;
        margin: 1px;
        cursor: pointer;
      }
    }
  }
}
</style>
