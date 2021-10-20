<template>
  <div class="tags">
    <banner
      :title="banner.title"
      :image="banner.banner"
      :desc="banner.desc"
    />
    <div class="content pt-20">
      <ul class="list">
        <li v-for="tag in tags" :key="tag.id" @click="anchorPoint(`tag_${tag.name}`)">{{ tag.name }}</li>
      </ul>
      <div v-for="a in posts" :key="a.tag.id" :id="`tag_${a.tag.name}`" class="posts box-sizing">
        <div class="cate fs-24 pt-10 pb-20">
          <i class="iconfont icon-tag"></i>
          <span>{{ a.tag.name }}</span>
        </div>
        <ul v-for="p in a.posts" :key="p.id">
          <li class="pl-20 pb-20 mb-20 border-b-f3">
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
import { basisTag, goPoint } from '@/utils'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'tags',
  components: {
    Banner
  },
  setup() {
    const route = useRoute()
    const tags = ref<Array<any>>([])
    const posts = ref<Array<any>>([])
    const store = useStore<GlobalDataProps>()
    const banner = computed(() => store.state.banners.order_4)

    onMounted(() => {
      const name: any = route.query.name

      store
        .dispatch('getAllPosts')
        .then((res) => {
          posts.value = basisTag(res)
          basisTag(res).forEach((e: any) => {
            tags.value.push(e.tag)
          })
        })
        .then(() => {
          if (name) {
            goPoint(name)
          }
        })
        .catch((error) => console.log(error))
    })

    const anchorPoint = (selector: string) => {
      goPoint(selector)
    }

    return {
      tags,
      posts,
      anchorPoint,
      banner
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  width: 700px;
  margin: auto;
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
