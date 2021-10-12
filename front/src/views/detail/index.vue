<template>
  <div class="detail">
    <banner
      :info="true"
      :title="post.title"
      :image="post.image"
      :date="dayjs(post.created_at).format('YYYY-MM-DD')"
      :tags="post.tags"
    />
    <div class="content pt-20 d-flex" ref="contentRef">
      <!----左边为内容区域---->
      <div class="content-left box-sizing">
        <div class="post">
          <v-md-preview
            v-if="post.content"
            :text="post.content.replace(/<xmp>|<\/xmp>/g, '')"
          ></v-md-preview>
          <!-- <wangEditor v-if="post.content" :mdContent="post.content" /> -->
        </div>
        <div class="turnpage pt-20 d-flex js-between">
          <div
            :class="adjacent.left.length > 0 ? '' : 'act'"
            class="btn"
            @click="getAdjacent(adjacent.left[0].id)"
          >
            <i class="iconfont icon-previous fs-12"></i>
            <span class="ml-10">PREVIOUS</span>
          </div>
          <div
            :class="adjacent.right.length > 0 ? '' : 'act'"
            class="btn"
            @click="getAdjacent(adjacent.right[0].id)"
          >
            <span class="mr-10">NEXT</span>
            <i class="iconfont icon-next fs-12"></i>
          </div>
        </div>
        <!---一段话---->
        <div class="comment-icon d-flex js-center ai-center">
          <div class="line"></div>
          <div class="iconfont icon-write"></div>
          <div class="line"></div>
        </div>
        <div class="comment-zone">
          <!----Comment---->
          <comment @show-login="showLogin" @send-emit="sendComment" />
          <!----Comment List---->
          <comment-list
            v-if="commentList"
            :commentList="commentList"
            @show-box="showLogin"
            @send-comment="sendComment"
          />
        </div>
      </div>
      <!----右边目录区域---->
      <div class="content-right">
        <div class="catalogue" :class="navFixed ? 'active' : ''">
          <h1 class="nav-title iconfont icon-nav-tag">目录</h1>
          <div id="nav-tree" class="nav-tree" v-html="navTreeRef"></div>
        </div>
      </div>
      <!----Login Modal---->
      <div ref="loginRef"><login-modal v-if="visible" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch, onUnmounted } from 'vue'
import Banner from '@/components/Banner.vue'
import { articleDetail } from '@/request'
import { useRoute, useRouter } from 'vue-router'
import { NewPostsProps } from '@/store'
import dayjs from 'dayjs'
import Comment from '@/components/Comment.vue'
import CommentList from '@/components/CommentList.vue'
import useClickOutside from '@/hooks/useClickOutside'
import { makeComment, getCommentList } from '@/request'
import createMessage from '@/components/createMessage'
import { formatList, navTree, getTagsClick } from '@/utils'
import WangEditor from '@/components/WangEditor.vue'
import mitt from 'mitt'
// 登录 bus 事件线程
export const emitter = mitt()
// 评论 bus 事件线程
export const commentEmitter = mitt()

export default defineComponent({
  name: 'detail',
  components: {
    Banner,
    Comment,
    CommentList,
    WangEditor
  },
  setup() {
    let navTreeRef = ''
    const contentRef = ref<any>(null)
    const visible = ref<boolean>(false)
    const navFixed = ref<boolean>(false)
    const loginRef = ref<null | HTMLElement>(null)
    const route = useRoute()
    const router = useRouter()
    const post = reactive<NewPostsProps | any>({
      title: '',
      tags: [],
      description: '',
      category: '',
      isComent: true,
      image: '',
      id: 0,
      isReprint: true,
      content: '',
      created_at: ''
    })
    const commentList = ref([])
    const atName = ref('')
    const parentCommentId = ref()
    const adjacent = reactive({
      left: [],
      right: []
    })

    // 显示登录框
    const showLogin = () => {
      visible.value = !visible.value
    }
    // 设置二级评论参数
    const setCommentQuery = (data: any) => {
      atName.value = data.name
      parentCommentId.value = data.id
    }
    // 发表评论
    const sendComment = (c: string) => {
      const { avatar, nickname, id } = JSON.parse(localStorage.getItem('tourist_info') as string)
      const articleId = route.params.id as string
      makeComment({
        article_title: post.title,
        avatar: avatar,
        nickname: nickname,
        userId: id,
        articleId,
        content: c,
        at_name: atName.value,
        parent_comment_id: parentCommentId.value
      })
        .then((res: any) => {
          getComments(articleId)
          createMessage(res.msg, res.status)
          atName.value = ''
          parentCommentId.value = articleId
        })
        .catch((error) => console.log(error))
    }

    // 详情
    const getDetail = (postId: string) => {
      articleDetail({ id: postId })
        .then(({ code, data, status }: any) => {
          if (code === 200 && (status as unknown as string) === 'success') {
            ;(document.getElementById('nav-tree') as any).innerHTML = navTree(data.content)
            getTagsClick('nav-tree')
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                post[key] = data[key]
              }
            }
            const { left, right } = data.adjacent
            adjacent.left = left
            adjacent.right = right
          }
        })
        .catch((error) => console.log(error))
    }

    const getComments = (postId: string) => {
      // 评论列表
      getCommentList({ articleId: postId })
        .then((res: any) => {
          if (res.code === 200) {
            commentList.value = formatList(res.data, 'parent_comment_id', 'articleId')
          }
        })
        .catch((error) => console.log(error))
    }
    // 监听地址栏
    watch(route, () => {
      if(route.path.split('/')[1] !== 'post') {
        return
      }
      let postId = route.params.id as string
      getDetail(postId)
      // 评论列表
      getComments(postId)
    })
    // 获取相邻文章
    const getAdjacent = (postId: string) => {
      router.push({ path: `/post/${postId}` })
      // 详情
      getDetail(postId)
      // 评论列表
      getComments(postId)
    }
    // 页面滚动事件
    const scrollHandel = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      navFixed.value = contentRef.value.offsetTop - scrollTop <= 60
    }
    // 登录完成，关闭登录框
    emitter.on('login-finish', showLogin)
    // 设置二级评论的参数
    commentEmitter.on('set-query', setCommentQuery)

    onUnmounted(() => {
      emitter.off('login-finish', showLogin)
      commentEmitter.off('set-query', setCommentQuery)
      window.removeEventListener('scroll', scrollHandel)
    })

    onMounted(() => {
      const postId = route.params.id as string
      parentCommentId.value = postId
      // 详情
      getDetail(postId)
      // 评论列表
      getComments(postId)
      window.addEventListener('scroll', scrollHandel)
    })

    const { num, isClickOutside } = useClickOutside(loginRef)
    // 监听 num 的变化来触发 visible 和 isClickOutside 的监听
    watch(num, () => {
      if (visible.value && isClickOutside.value) {
        visible.value = false
      }
    })

    return {
      post,
      dayjs,
      showLogin,
      visible,
      loginRef,
      sendComment,
      commentList,
      adjacent,
      getAdjacent,
      navTreeRef,
      navFixed,
      contentRef
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  width: 1000px;
  margin: auto;
  .content-left {
    width: 780px;
    .post {
      color: var(--h1-color);
    }
    .turnpage {
      margin-bottom: 30px;
      border-top: 1px solid #e3e3e3;
      color: var(--h1-color);
      .btn {
        font-size: 14px;
        width: 120px;
        text-align: center;
        padding: 10px 0;
        border: 1px solid #e3e3e3;
        font-weight: bold;
        &:hover {
          border: 1px solid var(--main-color);
          background-color: var(--main-color);
          color: #fff;
          cursor: pointer;
        }
        &.act {
          visibility: hidden;
        }
      }
    }
    .comment-icon {
      width: 600px;
      margin: auto;
      margin-bottom: 30px;
      text-indent: 2rem;
      .iconfont {
        margin: auto;
        font-size: 40px;
        color: #e0e0e0;
        text-align: center;
        &::before {
          margin-left: -26px;
        }
      }
      .line {
        height: 1px;
        width: 200px;
        background-color: #e0e0e0;
      }
    }
    .comment-zone {
      width: 600px;
      margin: auto;
    }
  }
  .content-right {
    width: 220px;
    .catalogue {
      border-left: rgba(88, 88, 88, 0.1) 1px solid;
      padding: 0 1em 0 1em;
      margin-left: 1em;
      &.active {
        width: inherit;
        position: fixed;
        top: 60px;
      }
      .nav-title {
        font-size: 20px;
        margin-bottom: 20px;
        color: var(--h1-color);
        &::before {
          margin-right: 5px;
        }
      }
      .nav-tree {
        line-height: 25px;
        color: #787878;
        .title1 {
          font-size: 16px;
        }
        .title2 {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
