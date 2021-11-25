<template>
  <div>
    <Header />
    <!-- <keep-alive v-if="route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view> -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="['home', 'about', 'collection']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <theme-switch />
    <post-modal />
    <post-search />
    <BackToTop transitionName="fade" :visibilityHeight="300" :backPosition="0" />
    <loading v-show="isLoading" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
import Loading from '@/components/Loading.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import PostSearch from '@/components/PostSearch.vue'
import PostModal from '@/components/PostModal.vue'
import { checkTheme, arrToObj } from '@/utils'
import { setCookie, getCookie } from '@/utils/cookie'
import { GlobalDataProps, key } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    BackToTop,
    Loading,
    ThemeSwitch,
    PostSearch,
    PostModal
  },
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>(key)
    const isLoading = computed(() => store.state.loading)

    onMounted(() => {
      const themeSwitch = localStorage.getItem('theme') === 'false' ? false : true
      checkTheme(themeSwitch)
      const footerBox = document.querySelectorAll('.footer')
      footerBox[1].style.display = 'none'
    })

    return {
      isLoading,
      route
    }
  }
})
</script>
