<template>
  <div class="home">
    <banner :title="banner.title" :image="banner.banner" :desc="banner.desc" />
    <div class="list d-flex pt-20">
      <div class="articles box-sizing">
        <div v-for="item in list" :key="item.id" class="item mb-20 pb-15">
          <div v-if="item.top" class="top shake iconfont icon-tuding"></div>
          <h2 class="title fs-26 pb-15 pointer">
            <router-link :to="{ path: `/post/${item.id}` }">{{ item.title }}</router-link>
          </h2>
          <router-link :to="{ path: `/post/${item.id}` }">
            <div class="content mb-15">
              <!-- <div class="pic pos-rel">
                <img class="w-full h-full" :src="item.image[0].url" alt="" />
              </div> -->
              <p class="description text-hide pb-10 pointer fs-14 text-gray">
                {{ item.description }}
              </p>
            </div>
          </router-link>
          <div class="time-tags d-flex mb-10">
            <div class="tags">
              <span class="iconfont icon-tag" v-for="tag in item.tags" :key="tag.id">
                <router-link :to="{ path: '/tags', query: { name: `tag_${tag.name}` } }">{{
                  tag.name
                }}</router-link>
              </span>
            </div>
            <i class="createtime pl-10 fs-14 text-gray-a3"
              >Posted by Kay on {{ dayjs(item.created_at).format('YYYY-MM-DD') }}</i
            >
          </div>
        </div>
        <!--------->
        <div class="read-more" @click="loadMore">{{ loadTxt }}</div>
      </div>
      <div class="sidebar box-sizing">
        <!----个人信息---->
        <div class="info pb-15 mb-15">
          <div class="avatar shadow-all">
            <img class="w-full h-full" :src="user.avatar" alt="" />
          </div>
          <h3 class="sign fs-14 mt-15 mb-15">{{ user.sign }}</h3>
          <ul class="contact d-flex">
            <li class="iconfont icon-info-1"></li>
            <li class="iconfont icon-info-2"></li>
            <li class="iconfont icon-info-3"></li>
            <li class="iconfont icon-info-4"></li>
          </ul>
        </div>
        <!----文章标签---->
        <div class="info pb-15 mb-15">
          <h3 class="text-gray fs-14 mt-15 mb-15">FEATURED TAGS</h3>
          <ul class="tags">
            <li v-for="tag in tags" :key="tag.id">
              <router-link :to="{ path: '/tags', query: { name: `tag_${tag.name}` } }">{{
                tag.name
              }}</router-link>
            </li>
          </ul>
        </div>
        <!----最近文章---->
        <div class="info pb-15 mb-15">
          <h3 class="text-gray fs-14 mt-15 mb-15">RECENT POSTS</h3>
          <ul class="posts pos-rel">
            <li class="text-hide" v-for="post in newPosts" :key="post.id">
              <router-link :to="{ path: `/post/${post.id}` }">{{ post.title }}</router-link>
            </li>
          </ul>
        </div>
        <!----归档---->
        <div class="info pb-15 mb-15">
          <h3 class="text-gray fs-14 mt-15 mb-15">ARCHIVES</h3>
          <ul class="posts pos-rel">
            <li
              class="text-hide"
              v-for="post in archives(allPosts, 'created_at', 'month', 7)"
              :key="post.id"
            >
              <router-link to="/archives">
                {{
                  `${monthToEn(post.month)} ${new Date(post.month).getFullYear()} (${
                    post.posts.length
                  })`
                }}
              </router-link>
            </li>
          </ul>
        </div>
        <!----分类---->
        <div class="info pb-15 mb-15">
          <h3 class="text-gray fs-14 mt-15 mb-15">CATEGORIES</h3>
          <ul class="posts pos-rel">
            <li class="text-hide" v-for="cate in category" :key="cate.id">
              <router-link :to="{ path: '/category', query: { name: `cate_${cate.name}` } }">
                {{ `${cate.name} (${cate.count})` }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch, computed } from 'vue'
import Banner from '@/components/Banner.vue'
import { getClientUser, articleList, getCategories, getTags, articleArchives } from '@/request'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
import { GlobalDataProps, UserProps } from '@/store'
import { archives, monthToEn } from '@/utils'

interface ParamsType {
  pageNo: number
  pageSize: number
  title: string
  tag: string
}

type TagCategory = { id: number; name: string; count: string }

export default defineComponent({
  name: 'home',
  components: {
    Banner
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const banner = computed(() => store.state.banners.order_1)
    const user = ref<UserProps>({
      username: '',
      id: 0,
      email: '',
      avatar: '',
      introduction: '',
      description: '',
      created_at: '',
      sign: '',
    })
    const tags = ref<Array<TagCategory>>([])
    const newPosts = computed(() => store.state.newPosts)
    const allPosts = ref<Array<any>>([])
    const category = ref<Array<TagCategory>>([])
    const list = ref<Array<any>>([])
    const loadTxt = ref('加载更多')
    const params = reactive<ParamsType>({
      pageNo: 1,
      pageSize: 10,
      title: '',
      tag: ''
    })
    const request = (p: ParamsType) => {
      if (loadTxt.value === '已经到底了~' || loadTxt.value === '加载中...') return
      loadTxt.value = '加载中...'
      return articleList(p)
        .then((res: any) => {
          if (res.code === 200) {
            loadTxt.value = res.data.list.length >= 1 ? '加载更多' : '已经到底了~'
            if (params.pageNo === 1) {
              list.value = res.data.list
            } else if (params.pageNo > 1) {
              res.data.list.forEach((e: any) => {
                list.value.push(e)
              })
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const loadMore = () => {
      params.pageNo += 1
    }

    onMounted(async () => {
      try {
        request(params)
        await store.dispatch('getNewPosts', { limit: 5 })
        const archives = await articleArchives()
        allPosts.value = archives.data
        await getCategories().then((res) => (category.value = res.data))
        await getTags().then((res) => (tags.value = res.data))

        const userStore = localStorage.getItem('client_user')
        const { data: userData } = await getClientUser()
        user.value = userData
        if (!userStore || userStore === undefined || null) {
          localStorage.setItem('client_user', JSON.stringify(userData))
          store.commit('setUserInfo', userData)
        } else {
          store.commit('setUserInfo', JSON.parse(userStore))
        }
      } catch (error) {
        console.log('Error：', error)
      }
    })

    watch(
      () => params.pageNo,
      () => {
        request(params)
      }
    )
    return {
      list,
      dayjs,
      loadMore,
      loadTxt,
      user,
      tags,
      newPosts,
      allPosts,
      archives,
      monthToEn,
      category,
      banner
    }
  }
})
</script>

<style lang="less" scoped>
// 小于768px
@media screen and (max-width: 767px) {
  .articles {
    width: 100%;
    padding: 0 30px;
  }
}
// 小于1024px
@media screen and (max-width: 1023px) {
  .sidebar {
    display: none;
  }
}
// 小于1024px 大于768px
@media screen and (max-width: 1023px) and (min-width: 768px) {
  .articles {
    width: 750px;
    margin: 0 auto;
  }
}
// 大于1024px
@media screen and (min-width: 1024px) {
  .list {
    width: 1024px;
  }
  .articles {
    width: 800px;
    padding-right: 50px;
    margin-left: 90px;
  }
  .sidebar {
    width: 224px;
  }
}
.list {
  min-height: 1200px;
  margin: auto;
  .articles {
    box-sizing: border-box;
    .item {
      border-bottom: 1px solid var(--home-border);
      position: relative;
      &:hover div.pic {
        opacity: 1;
        transition: 0.7s;
      }
      .top {
        position: absolute;
        font-size: 40px;
        top: -20px;
        left: -23px;
        z-index: 9;
        font-weight: bold;
        color: var(--top-color)
      }
      .title {
        a {
          color: var(--h1-color);
        }
        &:hover a {
          color: var(--main-color);
        }
      }
      .content {
        .pic {
          width: 250px;
          height: 130px;
          overflow: hidden;
          border-radius: 5px;
          opacity: 0.7;
          transition: 0.7s;
          .triangle {
            width: 50px;
            height: 200px;
            right: -24px;
            top: -70px;
            transform: rotate(-15deg);
          }
          img {
            object-fit: cover;
            right: 0;
          }
        }
        .description {
          max-height: 62px;
          line-height: 26px;
          -webkit-line-clamp: 3;
          color: var(--h1-color);
          &:hover {
            color: var(--main-color);
          }
        }
      }
      .time-tags {
        .tags {
          width: 380px;
          span {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 15px;
            border: 1px solid gray;
            margin-right: 10px;
            font-size: 12px;
            color: gray;
            cursor: pointer;
            a {
              color: gray;
            }
            &:hover {
              border: 1px solid var(--main-color);
              color: var(--main-color);
            }
            &:hover a {
              color: var(--main-color);
            }
          }
        }
      }
    }
    .read-more {
      width: 100px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      margin: 20px auto;
      border: 1px solid #d5d5d5;
      font-size: 14px;
      color: gray;
      cursor: pointer;
      &:hover {
        color: var(--main-color);
        border: 1px solid var(--main-color);
      }
    }
  }
  .sidebar {
    padding-right: 40px;
    .info {
      border-bottom: 1px solid var(--home-border);
      .avatar {
        width: 110px;
        height: 110px;
        overflow: hidden;
        border-radius: 5px;
        img {
          object-fit: cover;
        }
      }
      .sign {
        color: var(--h1-color);
      }
      .contact {
        li {
          margin-right: 10px;
          font-size: 30px;
          color: gray;
          cursor: pointer;
          &:hover {
            color: var(--main-color);
          }
        }
      }
      .tags {
        li {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 15px;
          border: 1px solid #d5d5d5;
          margin-right: 10px;
          margin-bottom: 10px;
          font-size: 12px;
          cursor: pointer;
          &:hover {
            color: var(--main-color);
            border: 1px solid var(--main-color);
          }
          a {
            color: gray;
          }
          &:hover a {
            color: var(--main-color);
          }
        }
      }
      .posts {
        li {
          padding: 0 0 5px 30px;
          font-size: 12px;
          cursor: pointer;
          line-height: 20px;
          -webkit-line-clamp: 2;
          &::before {
            content: '•';
            margin-right: 10px;
            position: absolute;
            left: 15px;
            color: gray;
          }
          &:hover {
            color: var(--main-color);
          }
          a {
            color: gray;
          }
          &:hover a {
            color: var(--main-color);
          }
        }
      }
    }
  }
}
</style>
