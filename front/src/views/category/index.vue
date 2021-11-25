<template>
  <div class="category">
    <banner
      :title="banner.title"
      :image="banner.banner"
      :desc="banner.desc"
    />
    <div class="content pt-20">
      <ul class="list">
        <li
          v-for="p in posts"
          :key="p.id"
          v-show="p.list && p.list.length !== 0"
          @click="anchorPoint(p.id)"
           >{{ p.name }}</li>
      </ul>
      <div
        v-for="a in posts"
        :key="a.id"
        :id="a.id"
        class="posts box-sizing"
        v-show="a.list && a.list.length !== 0"
      >
        <div class="cate fs-24 pt-10 pb-20">
          <i class="iconfont icon-tag"></i>
          <span>{{ a.name }}</span>
        </div>
        <ul>
          <li v-for="p in a.list" :key="p.id" class="pl-20 pb-20 mb-20">
            <router-link :to="{ path: `/post/${p.id}` }">
              <div class="fs-18 pb-15 text-ellipsis">{{ p.title }}</div>
              <div class="fs-14 text-ellipsis">{{ p.description }}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, reactive } from 'vue'
import Banner from '@/components/Banner.vue'
import { GlobalDataProps, key, BannerProps } from '@/store'
import { useStore } from 'vuex'
import { basisCate, goPoint } from '@/utils'
import { useRoute } from 'vue-router'
import { articleArchives } from '@/request'

export default defineComponent({
  name: 'category',
  components: {
    Banner
  },
  asyncData({ store, route }: AsyncDataParam) {
    return store.dispatch("setBanners");
  },
  setup() {
    const route = useRoute()
    const posts = ref<Array<any>>([])
    const store = useStore<GlobalDataProps>(key)
    const category = computed(() => store.state.category)

    const banner = reactive<BannerProps>({
      title: '',
      banner: '',
      desc:''
    })
    banner.title = computed(() => store.state.banners.order_3.title)
    banner.banner = computed(() => store.state.banners.order_3.banner)
    banner.desc = computed(() => store.state.banners.order_3.desc)

    onMounted(async () => {
      const id = route.query.id

      await store.dispatch('setCategory')
      const newList = category.value.map((c) => {
        articleArchives({ category: c.name, tags: "" }).then((posts) => {
          c.list = posts.data
        }).catch(error => console.log(error))
        return c
      })
      posts.value = newList
      if (id) {
        setTimeout(() => goPoint(id), 1000)
      }
    })

    const anchorPoint = (selector: string) => {
      goPoint(selector)
    }

    return {
      posts,
      anchorPoint,
      banner
    }
  }
})
</script>

<style lang="less" scoped>
// 小于768px
@media screen and (max-width: 767px) {
  .content {
    width: 100%;
    padding: 0 60px;
  }
}
// 大于768px
@media screen and (min-width: 768px) {
  .content {
    width: 700px;
  }
}
.content {
  margin: auto;
  box-sizing: border-box;
  .list {
    li {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      background-color: var(--tag-bg1);
      background-image: linear-gradient(to bottom, var(--tag-bg1)0, var(--tag-bg2));
      opacity: .9;
      &:hover {
        opacity: 1;
      }
    }
  }
  .posts {
    margin: 30px auto;
    .cate {
      color: var(--main-color);
      font-size: 22px !important;
      i {
        font-size: 22px !important;
        margin-right: 5px;
      }
    }
    ul {
      li {
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
</style>
