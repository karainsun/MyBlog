<template>
  <div class="category">
    <banner
      :title="banner.title"
      :image="banner.banner"
      :desc="banner.desc"
    />
    <div class="content pt-20">
      <ul class="list">
        <li v-for="cate in category" :key="cate.category.id" @click="anchorPoint(`cate_${cate.category.name}`)">{{ cate.category.name }}</li>
      </ul>
      <div v-for="a in posts" :key="a.category.id" :id="`cate_${a.category.name}`" class="posts box-sizing">
        <div class="cate fs-24 pt-10 pb-20">
          <i class="iconfont icon-tag"></i>
          <span>{{ a.category.name }}</span>
        </div>
        <ul>
          <li v-for="p in a.posts" :key="p.id" class="pl-20 pb-20 mb-20">
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
import { defineComponent, onMounted, ref, computed } from 'vue'
import Banner from '@/components/Banner.vue'
import { GlobalDataProps } from '@/store'
import { useStore } from 'vuex'
import { basisCate, goPoint } from '@/utils'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'category',
  components: {
    Banner
  },
  setup() {
    const route = useRoute()
    const category = ref<Array<any>>([])
    const posts = ref<Array<any>>([])
    const store = useStore<GlobalDataProps>()
    const banner = computed(() => store.state.banners.order_3)

    onMounted(() => {
      const name = route.query.name

      store
        .dispatch('getAllPosts')
        .then((res) => {
          posts.value = basisCate(res)
          basisCate(res).forEach((e: any) => {
            category.value.push(e)
          })
        })
        .then(() => {
          if (name) {
            goPoint(name as any)
          }
        })
        .catch((error) => console.log(error))
    })

    const anchorPoint = (selector: string) => {
      goPoint(selector)
    }

    return {
      category,
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
