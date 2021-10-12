<template>
  <div class="message">
    <banner :title="banner.title" :image="banner.banner" :desc="banner.desc" />
    <div class="content p-20">
      <div class="f-list" ref="listRef">
        <div v-for="first in messageList" :key="first.id" class="f-item d-flex">
          <div class="f-avatar">
            <div>
              <img :src="first.avatar" alt="" />
            </div>
          </div>
          <div class="f-floor">
            <div class="clip iconfont icon-clip"></div>
            <div class="delta"></div>
            <div class="f-name">{{ first.nickname }}</div>
            <i class="f-content">{{ first.content }}</i>
            <div class="f-tool">
              <span class="time iconfont icon-time">{{
                dayjs(first.created_at).format('YYYY-MM-DD HH:mm')
              }}</span>
              <span
                class="iconfont icon-message f-reply"
                @click="openBoard('2', first.id, first.nickname)"
              ></span>
            </div>
            <!---二级留言---->
            <ul v-if="first.secondFloor.length > 0" class="s-list s-list-act">
              <li v-for="second in first.secondFloor" :key="second.id" class="d-flex">
                <div class="s-avatar">
                  <img :src="second.avatar" alt="" />
                </div>
                <div class="s-floor">
                  <div class="s-name">
                    <span>{{ second.nickname }}</span>
                    <span
                      class="iconfont icon-message s-reply-btn"
                      @click="openBoard('2', second.parent_message_id, second.nickname)"
                    ></span>
                  </div>
                  <div class="s-time">
                    {{ dayjs(second.created_at).format('YYYY-MM-DD HH:mm') }}
                  </div>
                  <div class="s-reply">
                    <span>@{{ second.at_name }}：</span>
                    <i class="s-content">{{ second.content }}</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!---留言笔---->
    <div @click="openBoard('1', 0, '')" class="iconfont icon-pen write-message" title="留言"></div>
    <!---留言框---->
    <div v-if="showBox" ref="messageRef" class="message-box d-flex js-between ai-center p-15">
      <div class="box-avatar">
        <img :src="tourist?.avatar || defaultAvatar" alt="" />
      </div>
      <div class="box-ipt">
        <input
          @keyup="handleWrite"
          v-model="message"
          type="text"
          :placeholder="atName ? `@${atName}:` : 'Write something..'"
        />
        <!-- <div contenteditable="true"></div> -->
      </div>
      <div class="box-btn d-flex js-between">
        <span class="iconfont icon-emoji" title="表情"></span>
        <span class="iconfont icon-send" title="发表" @click="publish"></span>
      </div>
    </div>
    <!----Login Modal---->
    <div ref="loginRef"><login-modal v-if="visible" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed, ref, watch } from 'vue'
import Banner from '@/components/Banner.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import useClickOutside from '@/hooks/useClickOutside'
import mitt from 'mitt'
import { publicMessage, MessageProps, getMessageList } from '@/request'
import createMessage from '@/components/createMessage'
import { formatList, throttle } from '@/utils'
import dayjs from 'dayjs'

export const messageMitt = mitt()

export default defineComponent({
  name: 'message',
  components: {
    Banner
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    const banner = computed(() => store.state.banners.order_7)
    const showBox = ref<boolean>(false)
    const visible = ref<boolean>(false)
    const messageRef = ref<null | HTMLElement>(null)
    const loginRef = ref<null | HTMLElement>(null)
    let touristInfo = JSON.parse(localStorage.getItem('tourist_info') as string)
    const tourist = ref(touristInfo)
    const defaultAvatar = 'http://qxawt89kx.hn-bkt.clouddn.com/defaultavatar.png'
    const floorNum = ref<string>('1') // 1：一级， 2：二级
    const message = ref<string>('')
    const parentMessageId = ref<number>(0)
    const atName = ref<string>('')
    const messageList = ref<Array<any>>([])
    const listRef = ref<null | HTMLElement>(null)

    const openBoard = (num: string, id: number, name: string) => {
      if (touristInfo) {
        showBox.value = !showBox.value
        floorNum.value = num
        parentMessageId.value = id
        atName.value = name
      } else {
        visible.value = !visible.value
      }
    }

    const loginFinish = (data: any) => {
      visible.value = false
      tourist.value = data
      localStorage.setItem('tourist_info', JSON.stringify(data))
      touristInfo = data
    }
    // 发表留言
    const publish = () => {
      if (message.value.trim() === '') return
      const { nickname, avatar, id: touristId } = touristInfo
      const { username: clientName, id: userId } = user.value
      const params: MessageProps = {
        nickname,
        avatar,
        content: message.value,
        userId: userId as number,
        touristId,
        parent_message_id: undefined,
        at_name: ''
      }
      if (floorNum.value === '1') {
        // 第一级留言
        params.parent_message_id = userId
        params.at_name = clientName
      } else {
        params.parent_message_id = parentMessageId.value
        params.at_name = atName.value
      }
      publicMessage(params)
        .then((res: any) => {
          createMessage(res.msg, res.status)
          parentMessageId.value = 0
          atName.value = ''
          message.value = ''
          showBox.value = false
          getMessages(userId as any)
        })
        .catch((error) => console.log('留言失败：', error))
    }
    // 留言写入事件
    const handleWrite = (e: Event) => {
      const target = e.target as HTMLInputElement
      message.value = target.value
    }
    // 获取留言列表
    let list: any
    const getMessages = (id: string) => {
      getMessageList({ userId: id })
        .then((res: any) => {
          if (res.code === 200) {
            messageList.value = formatList(res.data, 'parent_message_id', 'userId')
          }
        })
        .then(() => {
          list = listRef.value?.children as any
        })
        .catch((error) => console.log('留言列表：', error))
    }

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      for (let i = 0; i < list.length; i++) {
        if (list[i].offsetTop - scrollTop < window.innerHeight) {
          if (list[i].className.indexOf('f-item-act') < 0) {
            list[i].className += ' f-item-act'
          }
        }
      }
    }
    const handleKeydown = (e: any) => {
      if(e.keyCode === 27) {
        showBox.value = false
      } else if(e.keyCode === 13) {
        publish()
      }
    }
    // 登录完成，关闭登录框
    messageMitt.on('login-finish', loginFinish)

    const { num: num1, isClickOutside: messageOutSide } = useClickOutside(messageRef)
    const { num: num2, isClickOutside: loginOutSide } = useClickOutside(loginRef)

    watch(num1, () => {
      if (showBox.value && messageOutSide.value) {
        showBox.value = false
      }
    })

    watch(num2, () => {
      if (visible.value && loginOutSide.value) {
        visible.value = false
      }
    })

    onMounted(() => {
      getMessages(user.value.id as any as string)
      window.addEventListener('scroll', throttle(handleScroll, 200))
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeydown)
    })

    return {
      banner,
      showBox,
      openBoard,
      messageRef,
      visible,
      loginRef,
      defaultAvatar,
      tourist,
      publish,
      handleWrite,
      message,
      messageList,
      dayjs,
      atName,
      listRef
    }
  }
})
</script>

<style lang="less" scoped>
.message {
  .content {
    padding-top: 50px;
    .f-list {
      width: 660px;
      margin: auto;
      .f-item {
        margin-bottom: 30px;
        transform: translateY(30px);
        transition: 0.5s;
        &.f-item-act {
          transform: translateY(-30px);
          transition: 0.5s;
          &:hover {
            margin-left: -10px;
          }
        }
        .f-avatar {
          width: 64px;
          height: 64px;
          margin-top: 10px;
          border: 6px solid var(--message-avatar-border);
          border-radius: 50%;
          box-shadow: 10px 10px 10px 1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .f-floor {
          min-height: 96px;
          box-sizing: border-box;
          flex: 1;
          position: relative;
          margin-left: 20px;
          padding: 10px;
          background: var(--message-bg);
          border-radius: 4px;
          box-shadow: 10px 10px 10px 1px rgba(0, 0, 0, 0.1);
          .clip {
            position: absolute;
            font-size: 24px;
            top: -15px;
            right: 30px;
            color: var(--message-clip);
          }
          .delta {
            width: 0;
            height: 0;
            position: absolute;
            left: -20px;
            top: 38px;
            border-top: 10px solid transparent;
            border-right: 10px solid var(--message-bg);
            border-bottom: 10px solid transparent;
            border-left: 10px solid transparent;
          }
          .f-name {
            font-size: 18px;
            color: var(--h1-color);
          }
          .f-content {
            display: block;
            font-size: 16px;
            padding: 5px 0;
            color: var(--h1-color);
          }
          .f-tool {
            span {
              margin-right: 30px;
              color: gray;
              font-size: 14px;
            }
            .f-reply {
              cursor: pointer;
              &:hover {
                color: var(--h1-color);
              }
            }
          }
          .s-list {
            &.s-list-act {
              margin-top: 15px;
              border-top: 1px solid rgba(0, 0, 0, 0.05);
            }
            li {
              margin-top: 15px;
              .s-avatar {
                width: 44px;
                height: 44px;
                overflow: hidden;
                border-radius: 50%;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .s-floor {
                margin-left: 10px;
                .s-name {
                  font-size: 16px;
                  color: var(--h1-color);
                  .s-reply-btn {
                    color: gray;
                    margin-left: 20px;
                    cursor: pointer;
                    &:hover {
                      color: var(--h1-color);
                    }
                  }
                }
                .s-time {
                  font-size: 13px;
                  color: gray;
                  margin-top: 5px;
                }
                .s-reply {
                  margin-top: 5px;
                  font-size: 15px;
                  color: var(--h1-color);
                }
              }
            }
          }
        }
      }
    }
  }
  .write-message {
    position: fixed;
    cursor: pointer;
    transition: 1s;
    z-index: 999;
    bottom: 100px;
    right: 30px;
    color: gray;
    font-size: 36px;
    &:hover {
      color: var(--main-color);
    }
  }
  .message-box {
    width: 760px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    box-shadow: 9px 9px 15px 1px rgba(0, 0, 0, 0.2);
    background-color: var(--message-box-bg);
    border-radius: 5px;
    .box-avatar {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .box-ipt {
      width: 630px;
      height: 40px;
      padding: 5px;
      border-bottom: 1px solid #e3e3e3;
      input {
        width: 100%;
        border: none;
        height: 40px;
        outline: none;
        font-size: 16px;
        background-color: var(--message-box-bg);
        color: var(--h1-color);
      }
    }
    .box-btn {
      width: 52px;
      .iconfont {
        font-size: 22px;
        cursor: pointer;
        color: var(--h1-color);
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
}
</style>
