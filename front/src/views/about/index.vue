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
.about {
  .content {
    width: 700px;
    margin: auto;
    color: var(--h1-color);
  }
}
</style>
