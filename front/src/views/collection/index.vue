<template>
  <div class="collection">
    <banner :title="banner.title" :image="banner.banner" :desc="banner.desc" />
    <div class="collection-content d-flex">
      <div class="list" ref="listRef">
        <a v-for="item in list" :key="item.id" class="item" :href="item.url" target="_bank">
          <img :src="item.logo" alt="" />
          <div class="title mt-10 mb-10">{{ item.name }}</div>
          <div class="description">{{ item.description }}</div>
        </a>
      </div>
      <div class="nav">
        <div class="catalogue ml-20 pl-20" :class="navFixed ? 'active' : ''">
          <h1 class="nav-title iconfont icon-nav-tag">分类目录</h1>
          <ul class="nav-list pl-20">
            <li
              :class="classIndex === 'all' ? 'active' : ''"
              @click="catalogueTap('', 'all')">全部</li>
            <li
              :class="classIndex === i.toString() ? 'active' : ''"
              v-for="(cate, i) in cates" :key="cate.name"
              @click="catalogueTap(cate.name, i.toString())"
            >
              {{ cate.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="alldone" v-if="alldone">已经到底了~</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted, reactive, computed } from 'vue'
import Banner from '@/components/Banner.vue'
import { collectCategoryAll, collectList } from '@/request'
import { throttle } from '@/utils'
import { useStore } from 'vuex'
import { GlobalDataProps, key, BannerProps } from '@/store'

interface CollectProps {
  id: number
  img: string
  name: string
  description: string
  url: string
  logo: any
}

type CateType = { name: string; id: number }

interface ParamsProps {
  pageSize: number
  pageNo: number
  category: string
  name: string
}

export default defineComponent({
  name: 'collection',
  components: {
    Banner
  },
  asyncData({ store, route }: AsyncDataParam) {
    return store.dispatch("setBanners");
  },
  setup() {
    const store = useStore<GlobalDataProps>(key)
    const banner = reactive<BannerProps>({
      title: '',
      banner: '',
      desc:''
    })
    banner.title = computed(() => store.state.banners.order_5.title)
    banner.banner = computed(() => store.state.banners.order_5.banner)
    banner.desc = computed(() => store.state.banners.order_5.desc)
    const navFixed = ref<boolean>(false)
    const alldone = ref<boolean>(false)
    const listRef = ref<any>(null)
    const list = ref<CollectProps[]>()
    const classIndex = ref<string>('all')
    const cates = ref<CateType[]>([])
    const params = reactive<ParamsProps>({
      pageSize: 10,
      pageNo: 1,
      category: '',
      name: ''
    })
    let total = 0

    // 页面滚动事件
    const scrollHandel = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      navFixed.value = listRef.value.offsetTop - scrollTop <= 60

      const scrollLoad = () => {
        const boxClientHeight = document.documentElement.clientHeight //获取可见区域高度
        const boxScrollHight = document.body.scrollHeight //获取全文高度

        if (boxClientHeight + scrollTop + 3 >= boxScrollHight) {
          if (params.pageNo >= total) return
          params.pageNo++
          getCollects(params)
        }
      }
      throttle(scrollLoad(), 1000)
    }

    const getCollects = (param: ParamsProps) => {
      collectList(param)
        .then((res: any) => {
          if (res.code === 200) {
            if (params.pageNo === 1) {
              list.value = res.data.list
            } else if (params.pageNo > 1) {
              res.data.list.forEach((e: any) => {
                ;(list.value as any).push(e)
              })
            }
            total = res.data.meta.total_pages
            if (params.pageNo >= total) {
              alldone.value = true
            } else {
              alldone.value = false
            }
          }
        })
        .catch((error) => console.log('error:', error))
    }

    const catalogueTap = (cate: string, index: string) => {
      params.category = cate
      params.pageNo = 1
      list.value = []
      classIndex.value = index
      // 列表距离顶部复位
      document.documentElement.scrollTop = listRef.value.offsetTop
      getCollects(params)
    }

    onUnmounted(() => {
      window.removeEventListener('scroll', scrollHandel)
    })

    onMounted(() => {
      window.addEventListener('scroll', scrollHandel)
      collectCategoryAll().then((res: any) => {
        if (res.code === 200) {
          cates.value = res.data
        }
      }).catch(error => console.log(error))

      getCollects(params)
    })

    return {
      list,
      navFixed,
      listRef,
      cates,
      catalogueTap,
      alldone,
      banner,
      classIndex
    }
  }
})
</script>

<style lang="less" scoped>
// 大于1024px
@media screen and (min-width: 1024px) {
  .collection-content {
    width: 1000px;
    .list {
      width: 800px;
      -moz-column-count: 4;
      -webkit-column-count: 4;
      column-count: 4;
      .item {
        width: 180px;
        img {
          width: 80px;
        }
      }
    }
    .nav {
      width: 200px;
      .catalogue {
        width: 150px;
        &.active {
          width: 150px;
        }
      }
    }
  }
}
// 小于1024px
@media screen and (max-width: 1023px) and (min-width: 768px) {
  .collection-content {
    width: 100%;
    padding: 0 30px;
    .list {
      width: 75%;
      -moz-column-count: 4;
      -webkit-column-count: 4;
      column-count: 4;
      .item {
        width: 100%;
        img {
          width: 90%;
        }
      }
    }
    .nav {
      width: 25%;
      .catalogue {
        width: 100%;
        &.active {
          width: 100%;
        }
      }
    }
  }
}
// 小于768px
@media screen and (max-width: 767px) {
  .collection-content {
    width: 100%;
    padding: 0 30px;
    .list {
      width: 70%;
      -moz-column-count: 2;
      -webkit-column-count: 2;
      column-count: 2;
      .item {
        width: 100%;
        img {
          width: 90%;
        }
      }
    }
    .nav {
      width: 25%;
      .catalogue {
        width: 100%;
        &.active {
          width: 100%;
        }
      }
    }
  }
}
.collection-content {
  margin: auto;
  box-sizing: border-box;
  .list {
    padding-bottom: 30px;
    -moz-column-gap: 20px;
    -webkit-column-gap: 20px;
    column-gap: 20px;
    display: inline-block;
    .item {
      display: inline-block;
      margin-top: 20px;
      box-sizing: border-box;
      padding: 15px;
      break-inside: avoid;
      border: 1px solid var(--collect-border);
      &:hover {
        box-shadow: 0 0 15px 1px var(--bd-shadow);
      }
      img {
        margin: auto;
        display: block;
      }
      .title {
        color: var(--h1-color);
        font-weight: bold;
        text-align: center;
      }
      .description {
        font-size: 14px;
        color: var(--h1-color);
        text-indent: 2rem;
      }
    }
  }
  .nav {
    .catalogue {
      border-left: 1px solid var(--collect-border);
      &.active {
        position: -webkit-sticky;
        position: sticky;
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
      .nav-list {
        color: var(--h1-color);
        height: calc(100vh - 120px);
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 3px;
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
          margin-bottom: 10px;
          cursor: pointer;
          opacity: 0.8;
          &.active {
            color: var(--main-color);
          }
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
.alldone {
  padding: 10px 0;
  color: var(--h1-color);
  text-align: center;
  font-size: 14px;
}
</style>
