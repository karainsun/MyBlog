<template>
  <div class="first-list">
    <!----一级评论---->
    <div v-for="item in commentList" :key="item.id" class="first-item w-full d-flex">
      <div class="avatar shadow-all">
        <img class="w-full h-full" :src="item.avatar" alt="" />
      </div>
      <div class="context w-full box-sizing pl-20">
        <div class="first-reply">
          <span class="first-reply-name">{{ item.nickname }}</span>
          <span class="first-reply-btn reply-btn" @click="reply(item.id, item.nickname, '1', 0)"
            >回复</span
          >
          <span class="first-reply-time">{{
            dayjs(item.created_at).format('YYYY-MM-DD HH:mm')
          }}</span>
        </div>
        <div class="first-reply-txt pb-10 text-gray" v-html="item.content"></div>
        <!----一级评论回复框---->
        <comment
          :txtId="'c' + item.id"
          :atName="item.nickname"
          v-if="isShowId === item.id"
          @send-emit="sendComment" />
        <!----二级评论列表---->
        <ul class="second-list">
          <li v-for="second in item.secondFloor" :key="second.id" class="pt-10 d-flex">
            <div class="second-avatar shadow-all">
              <img class="w-full h-full" :src="second.avatar" alt="" />
            </div>
            <div class="second-context w-full box-sizing pl-20">
              <div class="second-reply">
                <span class="second-reply-name">{{ second.nickname }}</span>
                <span
                  class="second-reply-btn reply-btn"
                  @click="reply(second.parent_comment_id, second.nickname, '2', second.id)"
                  >回复</span
                >
                <span class="second-reply-time">{{
                  dayjs(second.created_at).format('YYYY-MM-DD HH:mm')
                }}</span>
              </div>
              <div class="second-reply-txt pb-10">
                <span class="reply-at">@{{ second.at_name }}：</span>
                <i class="fs-14" v-html="second.content"></i>
              </div>
              <!----二级评论回复框---->
              <div class="pr-10 pb-10">
                <comment :txtId="'c' + second.id" :atName="second.nickname" v-if="isShowId === second.id" @send-emit="sendComment" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, onUnmounted  } from 'vue'
import dayjs from 'dayjs'
import Comment from '@/components/Comment.vue'
import { commentEmitter } from '@/views/detail/index.vue'
import mitt from 'mitt'

export const blurHideMitt = mitt()

interface CommentProps {
  id: number;
  avatar: string;
  nickname: string;
  created_at: string;
  content: string;
  secondFloor?: Array<any>
}

export default defineComponent({
  emits: ['show-box', 'send-comment'],
  components: {
    Comment
  },
  props: {
    avatar: {
      type: String,
      default: 'http://qxawt89kx.hn-bkt.clouddn.com/defaultavatar.png'
    },
    commentList: {
      type: Array as PropType<CommentProps[]>,
      default: []
    },
    showNum: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const isShowId = ref(-1)
    // 回复
    const reply = (id: number, name: string, f: string, secId: number) => {
      const tourist = JSON.parse(localStorage.getItem('tourist_info') as string)
      if (tourist) {
        isShowId.value = f === '1' ? id : secId
        commentEmitter.emit('set-query', { id: id, name: name })
      } else {
        emit('show-box')
      }
    }
    // 发送评论内容并隐藏掉一二级评论框
    const sendComment = (val: string) => {
      emit('send-comment', val)
      isShowId.value = -1
    }
    // 主评论框聚焦隐藏一二级评论
    const hideCommentBox = () => isShowId.value = -1

    blurHideMitt.on('blur-hide', hideCommentBox);

    onUnmounted(() => {
      blurHideMitt.off('blur-hide', hideCommentBox);
    });

    watch(props, () => {
      // 隐藏掉一二级评论框
      isShowId.value = props.showNum as any
    })

    return {
      dayjs,
      isShowId,
      reply,
      sendComment
    }
  }
})
</script>

<style lang="less" scoped>
.first-list {
  margin-top: 30px;
  .first-item {
    margin-bottom: 40px;
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
      .first-reply {
        span {
          margin-right: 15px;
        }
        .first-reply-name {
          font-size: 16px;
          font-weight: bold;
          color: var(--h1-color);
        }
        .first-reply-time {
          font-size: 12px;
          color: #999;
          float: right;
        }
        .first-reply-btn {
          font-size: 14px;
          color: #666;
          cursor: pointer;
          &:hover {
            color: var(--main-color);
          }
        }
      }
      .first-reply-txt {
        padding-top: 5px;
      }
      .second-list {
        background-color: var(--reply-bg);
        padding-left: 10px;
        li {
          .second-avatar {
            width: 40px;
            height: 40px;
            border-radius: 3px;
            overflow: hidden;
            img {
              object-fit: cover;
            }
          }
          .second-context {
            .second-reply {
              span {
                margin-right: 15px;
              }
              .second-reply-name {
                font-size: 14px;
                font-weight: bold;
                color: var(--h1-color);
              }
              .second-reply-time {
                font-size: 12px;
                color: #999;
                float: right;
              }
              .second-reply-btn {
                font-size: 14px;
                color: #666;
                cursor: pointer;
                &:hover {
                  color: var(--main-color);;
                }
              }
            }
            .second-reply-txt {
              color: gray;
              .reply-at {
                color: gray;
              }
            }
          }
        }
      }
    }
  }
}
</style>
