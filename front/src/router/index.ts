import {
  createWebHistory,
  createRouter as _createRouter,
  createMemoryHistory,
  RouteRecordRaw
} from 'vue-router'

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
    meta: {
      scrollToTop: true,
      title: "首页",
      keepAlive: true
    }
  },
  {
    path: '/archives',
    name: 'archives',
    component: () => import(/* webpackChunkName: "archives" */ '@/views/archives/index.vue'),
    meta: {
      scrollToTop: true,
      title: "归档",
      keepAlive: false
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '@/views/category/index.vue'),
    meta: {
      scrollToTop: true,
      title: "分类",
      keepAlive: false
    }
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '@/views/tags/index.vue'),
    meta: {
      scrollToTop: true,
      title: "标签",
      keepAlive: false
    }
  },
  {
    path: '/post/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '@/views/detail/index.vue'),
    meta: {
      title: "详情",
      keepAlive: false
    }
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import(/* webpackChunkName: "collection" */ '@/views/collection/index.vue'),
    meta: {
      title: "收藏",
      keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue'),
    meta: {
      title: "关于",
      keepAlive: true
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "message" */ '@/views/message/index.vue'),
    meta: {
      title: "留言板",
      keepAlive: false
    }
  }
]

export function createRouter() {
  return _createRouter({
    // history: import.meta.env.SSR ? createMemoryHistory("/ssr") : createWebHistory("/ssr"),
    history: (import.meta as any).env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    // 根据元信息设置页面滚动
    scrollBehavior(to, from, savedPosition): any {
      if (to.matched.some(m => m.meta.scrollToTop)) {
        return savedPosition
      }
      return { top: 0, behavior: 'smooth' }
    }
  })
}
