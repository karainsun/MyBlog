<template>
  <div class="about">
    <banner
      :title="banner.title"
      :image="banner.banner"
      :desc="banner.desc"
    />
    <div class="content p-20">
      <v-md-preview
        v-if="user.introduction"
        :text="user.introduction.replace(/<xmp>|<\/xmp>/g, '')"
      ></v-md-preview>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, reactive } from 'vue'
import Banner from '@/components/Banner.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, UserProps, key, BannerProps } from '@/store'
import { getClientUser } from '@/request'

export default defineComponent({
  name: 'about',
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
    banner.title = computed(() => store.state.banners.order_6.title)
    banner.banner = computed(() => store.state.banners.order_6.banner)
    banner.desc = computed(() => store.state.banners.order_6.desc)

    return {
      user,
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
    padding: 0 30px;
  }
}
// 大于768px
@media screen and (min-width: 768px) {
  .content {
    width: 700px;
  }
}
.about {
  .content {
    margin: auto;
    box-sizing: border-box;
    color: var(--h1-color);
  }
}
</style>
