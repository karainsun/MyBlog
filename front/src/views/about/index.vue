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
import { defineComponent, onMounted, computed } from 'vue'
import Banner from '@/components/Banner.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'about',
  components: {
    Banner
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    const banner = computed(() => store.state.banners.order_6)

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
