<template>
  <div class="archives">
    <banner
      :title="banner.title"
      :image="banner.banner"
      :desc="banner.desc"
    />
    <div class="content pt-20">
      <div v-for="item in list" :key="item.year" class="item box-sizing">
        <h2 class="year fs-26 pt-10 pb-10">
          <i class="iconfont icon-calendar"></i>
          <span>{{item.year}}</span>
        </h2>
        <ul class="pos-rel">
          <li v-for="post in item.posts" :key="post.id">
            <span>{{dayjs(post.created_at).format('MM-DD')}}</span>
            <i class="iconfont icon-right"></i>
            <router-link :to="{ path: `/post/${post.id}` }">{{ post.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import Banner from '@/components/Banner.vue'
import { articleArchives } from '@/request'
import { archives } from '@/utils'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'archives',
  components: {
    Banner
  },
  setup(){
    const list = ref<Array<any>>([]);
    const store = useStore<GlobalDataProps>()
    const banner = computed(() => store.state.banners.order_2)

    onMounted(() => {
      articleArchives().then((res: any) => {
        if (res.code === 200) {
          list.value = archives(res.data, 'created_at', 'year', 4)
        }
      }).catch(error => {
        console.log(error)
      })
    })

    return {
      list,
      dayjs,
      banner
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  width: 750px;
  margin: auto;
  .item {
    margin-bottom: 40px;
    .year {
      color: var(--main-color);
      font-size: 22px !important;
      i {
        font-size: 22px !important;
        margin-right: 5px;
      }
    }
    ul {
      li {
        font-size: 14px;
        margin: auto auto 10px 50px;
        align-items: center;
        display: flex;
        color: var(--h1-color);
        &::before {
          content: '●';
          font-size: 10px;
          display: block;
          position: absolute;
          left: 35px;
        }
        i {
          font-size: 12px;
          margin: auto 5px;
          display: inline-block;
        }
        a {
          width: 600px;
          display: inline-block;
          color: var(--main-color);
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
