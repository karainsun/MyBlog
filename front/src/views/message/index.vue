<template>
  <div class="message">
    <banner
      :title="banner && banner.title ? banner.title : ''"
      :image="banner && banner.banner ? banner.banner : ''"
      :desc="banner && banner.desc ? banner.desc : ''"
    />
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
            <i class="f-content" v-html="first.content"></i>
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
                    <i class="s-content" v-html="second.content"></i>
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
    <div v-show="showBox" ref="messageRef" class="message-box p-15">
      <div class="d-flex js-between ai-center message-box-div">
        <div class="box-avatar">
          <img :src="(tourist && tourist.avatar) ? tourist.avatar : defaultAvatar" alt="" />
        </div>
        <div class="box-ipt">
          <!-- <input
            @keyup="handleWrite"
            v-model="message"
            type="text"
            :placeholder="atName ? `@${atName}:` : 'Write something..'"
          /> -->
          <div id="msgId" class="box-ipt-div" contenteditable="true" @keyup="handleWrite" :placeholder="atName ? `@${atName}:` : 'Write something..'"></div>
        </div>
        <div class="box-btn d-flex js-between">
          <span class="check-emoji iconfont icon-emoji" title="表情" @click="showEmoji"></span>
          <span class="iconfont icon-send" title="发表" @click="publish"></span>
        </div>
        <div class="emoji-box" v-show="emojiShow" id="emoji-box">
          <img v-for="e in emojiList" :key="e.id" :src="e.img" @click="addEmoji(e.id)">
        </div>
      </div>
    </div>
    <!----Login Modal---->
    <div ref="loginRef"><login-modal v-if="visible" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed, ref, watch, reactive } from 'vue'
import Banner from '@/components/Banner.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, key, BannerProps } from '@/store'
import useClickOutside from '@/hooks/useClickOutside'
import mitt from 'mitt'
import { publicMessage, MessageProps, getMessageList } from '@/request'
import createMessage from '@/components/createMessage'
import { formatList, throttle } from '@/utils'
import dayjs from 'dayjs'
import { emojiArr } from '@/utils'

const emojiList = emojiArr()

export const messageMitt = mitt()

export default defineComponent({
  name: 'message',
  components: {
    Banner
  },
  asyncData({ store, route }: AsyncDataParam) {
    return store.dispatch("setBanners") && store.dispatch("setUser");
  },
  setup() {
    const store = useStore<GlobalDataProps>(key)
    const user = computed(() => store.state.user)
    const banner = reactive<BannerProps>({
      title: '',
      banner: '',
      desc:''
    })
    banner.title = computed(() => store.state.banners.order_7.title)
    banner.banner = computed(() => store.state.banners.order_7.banner)
    banner.desc = computed(() => store.state.banners.order_7.desc)
    const showBox = ref()
    const visible = ref<boolean>(false)
    const messageRef = ref<null | HTMLElement>(null)
    const loginRef = ref<null | HTMLElement>(null)
    let touristInfo = JSON.parse(localStorage.getItem('tourist_info') as string)
    const tourist = ref(touristInfo)
    const defaultAvatar = 'https://cdn.kayrain.cn/defaultavatar.jpeg'
    const floorNum = ref<string>('1') // 1：一级， 2：二级
    const message = ref<string>('')
    const parentMessageId = ref<number>(0)
    const atName = ref<string>('')
    const messageList = ref<Array<any>>([])
    const listRef = ref<null | HTMLElement>(null)
    const emojiShow = ref(false)

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
      const { nickname, avatar, id: touristId, qq_email } = touristInfo
      const { username: clientName, id: userId } = user.value
      const params: MessageProps = {
        qq_email,
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
          showBox.value = false;
          ;(document.getElementById('msgId') as any).innerHTML = ''
          getMessages(userId as any)
        })
        .catch((error) => console.log('留言失败：', error))
    }
    // 留言写入事件
    const handleWrite = (e: Event) => {
      const target = e.target as HTMLInputElement
      message.value = target.innerHTML
    }
    // 表情框
    const showEmoji = () => {
      emojiShow.value = !emojiShow.value
    }
    // 添加表情
    const addEmoji = (i: number) => {
      const txtBox = document.getElementById('msgId')
      const img = document.createElement('img')
      img.src = `https://cdn.kayrain.cn/${i}.gif`;
      ;(txtBox as any).appendChild(img)
      message.value = (txtBox as any).innerHTML
    }
    // 获取留言列表
    let list: any[] = [];
    const getMessages = (id: string) => {
      getMessageList({ userId: id })
        .then((res: any) => {
          if (res.code === 200) {
            messageList.value = formatList(res.data, 'parent_message_id', 'userId')
          }
        })
        .then(() => {
          list = (listRef.value as any).children
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
      if (e.keyCode === 27) {
        showBox.value = false
      } else if (e.keyCode === 13) {
        publish()
      }
    }
    // 登录完成，关闭登录框
    messageMitt.on('login-finish', loginFinish)

    const { num: num1, isClickOutside: messageOutSide } = useClickOutside(messageRef)
    const { num: num2, isClickOutside: loginOutSide } = useClickOutside(loginRef)
    // 隐藏留言框
    watch(num1, () => {
      if (showBox.value && messageOutSide.value) {
        showBox.value = false
      }
    })
    // 隐藏登录框
    watch(num2, () => {
      if (visible.value && loginOutSide.value) {
        visible.value = false
      }
    })
    // 点击空白处隐藏表情框
    const handler = (e: MouseEvent) => {
      const txtBox = document.getElementById('emoji-box')
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
      getMessages(user.value.id as any as string)
      window.addEventListener('scroll', throttle(handleScroll, 200))
      document.addEventListener('keydown', handleKeydown)
      document.addEventListener('click', handler);
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('click', handler);
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
      listRef,
      emojiList,
      emojiShow,
      addEmoji,
      showEmoji
    }
  }
})
</script>

<style lang="less" scoped>
// 小于768px
@media screen and (max-width: 767px) {
  .message {
    .content {
      .f-list {
        width: 100%;
      }
    }
    .message-box {
      width: 90%;
      .box-ipt {
        width: 100%;
      }
    }
  }
}
// 大于768px
@media screen and (min-width: 768px) {
  .message {
    .content {
      .f-list {
        width: 660px;
      }
    }
  }
}
// 大于768px 小于1024px
@media screen and (max-width: 1023px) and (min-width: 768px) {
  .message {
    .message-box {
      width: 660px;
      .box-ipt {
        width: 530px;
      }
    }
  }
}
// 大于1024px
@media screen and (min-width: 1024px) {
  .message {
    .message-box {
      width: 760px;
      .box-ipt {
        width: 630px;
      }
    }
  }
}
.message {
  .content {
    padding-top: 50px;
    box-sizing: border-box;
    .f-list {
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
    bottom: 120px;
    right: 30px;
    color: gray;
    font-size: 36px;
    &:hover {
      color: var(--main-color);
    }
  }
  .message-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    box-shadow: 9px 9px 15px 1px rgba(0, 0, 0, 0.2);
    background-color: var(--message-box-bg);
    border-radius: 5px;
    .message-box-div{
      position: relative;
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
        height: 40px;
        padding: 5px;
        border-bottom: 1px solid #e3e3e3;
        .box-ipt-div {
          width: 100%;
          border: none;
          height: 40px;
          line-height: 40px;
          outline: none;
          font-size: 16px;
          background-color: var(--message-box-bg);
          color: var(--h1-color);
          &:empty:before{
            content: attr(placeholder);
            color:#bbb;
          }
          &:focus:before{
            content:none;
          }
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
        top: 40px;
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
}
</style>
