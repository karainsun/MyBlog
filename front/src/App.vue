<template>
  <div>
    <Header />
    <router-view v-slot="{ Component }">
      <!--- exclude里的name要对应组件内的name---->
      <keep-alive :include="['home']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <BackToTop transitionName="fade" :visibilityHeight="300" :backPosition="0" />
    <loading v-if="isLoading" />
    <theme-switch />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Header from '@/layouts/Header.vue'
import BackToTop from '@/components/BackToTop.vue'
import Loading from '@/components/Loading.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import { checkTheme, arrToObj } from '@/utils'
import { getClientUser, bannerList } from '@/request'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    BackToTop,
    Loading,
    ThemeSwitch
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const isLoading = computed(() => store.state.loading)

    onMounted(async () => {
      try {
        const themeSwitch = localStorage.getItem('theme') === 'false' ? false : true
        checkTheme(themeSwitch)

        const bannerStore = localStorage.getItem('banner')
        const userStore = localStorage.getItem('client_user')

        if (!bannerStore || bannerStore === undefined || null) {
          const { data } = await bannerList()
          localStorage.setItem('banner', data.length === 0 ? '{}' : JSON.stringify(arrToObj(data, 'order')))
          store.commit('setBanner', arrToObj(data, 'order'))
        } else {
          store.commit('setBanner', JSON.parse(bannerStore))
        }

        if (!userStore || userStore === undefined || null) {
          const { data } = await getClientUser()
          localStorage.setItem('client_user', JSON.stringify(data))
          store.commit('setUserInfo', data)
        } else {
          store.commit('setUserInfo', JSON.parse(userStore))
        }
      } catch (error) {
        console.log('error：', error)
      }
    })

    return {
      isLoading
    }
  }
})
</script>

<style></style>
