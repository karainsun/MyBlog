import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/archives',
    name: 'archives',
    component: () => import(/* webpackChunkName: "archives" */ '@/views/archives/index.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '@/views/category/index.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '@/views/tags/index.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/post/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '@/views/detail/index.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import(/* webpackChunkName: "collection" */ '@/views/collection/index.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "message" */ '@/views/message/index.vue'),
    meta: { scrollToTop: true }
  }
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory('/'),
  routes,
  // 根据元信息设置页面滚动
  scrollBehavior(to, from, savedPosition): any {
    if (to.matched.some(m => m.meta.scrollToTop)) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
