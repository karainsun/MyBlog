import { InjectionKey } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import { createStore as _createStore, Store } from 'vuex'
import {
  articleArchives,
  bannerList,
  getClientUser,
  articleDetail,
  getCategories,
  getTags
} from '@/request'
import { arrToObj } from '@/utils'
// import persistStorage from './persistStorage'

export interface AsyncDataParam {
  store: Store<GlobalDataProps>
  route: RouteLocationNormalized
}
// 请求返回的接口
export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
  status: string
}
// 全局报错接口
export interface GlobalErrorProps {
  status: boolean
  message?: string
}
// 用户信息接口
export interface UserProps {
  username?: string
  id?: number
  email?: string
  avatar?: string
  introduction?: string
  description?: string
  created_at?: string
  sign?: string
}
// 游客信息
export interface TouristProps {
  id?: number
  nickname?: string
  avatart?: string
  blog?: string
  qq_email?: string
  created_at?: string
}

// Banner 列表
export interface BannerProps {
  id: number
  title: string
  order: string
  desc: string
  banner: string
  createdAt: string
  updatedAt: string
}

// 最新文章接口
export interface NewPostsProps {
  image?: Array<{ name: string; url: string }> | string
  tags: Array<{ id: number; name: string; count: string }>
  id: string
  title: string
  description: string
  category: string
  isComent: boolean
  isReprint: boolean
  content: string
  created_at: string
  top: number
}

type SingleItem = { id: number, name: string }
// 全局store的state
export interface GlobalDataProps {
  error: GlobalErrorProps
  user: UserProps
  tourist: TouristProps
  newPosts: Array<NewPostsProps>
  allPosts: Array<NewPostsProps>
  loading: boolean
  banners: { [key: string]: BannerProps }
  postDetail: NewPostsProps
  tags: Array<SingleItem>
  category: Array<SingleItem>
}

// // 定义 injection key
export const key: InjectionKey<Store<GlobalDataProps>> = Symbol()

export function createStore() {
  const store = _createStore<GlobalDataProps>({
    state: {
      error: { status: false },
      user: {},
      tourist: {},
      newPosts: [],
      allPosts: [],
      loading: false,
      banners: {},
      postDetail: {
        image: '',
        tags: [],
        id: '',
        title: '',
        description: '',
        category: '',
        isComent: true,
        isReprint: true,
        content: '',
        created_at: '',
        top: 1
      },
      tags: [],
      category: []
    },
    mutations: {
      getAllPosts(state, data: Array<NewPostsProps>) {
        state.allPosts = data
      },
      setBanners(state, data: { [key: string]: BannerProps }) {
        state.banners = data
      },
      setLoading(state, data: boolean) {
        state.loading = data
      },
      setUser(state, data: UserProps) {
        state.user = data
      },
      getDetail(state, res: any) {
        state.postDetail = res.data
      },
      setTags(state, data) {
        state.tags = data;
      },
      setCategory(state, data) {
        state.category = data;
      }
    },
    actions: {
      // 全部文章
      getAllPosts({ commit }) {
        return articleArchives().then((res) => {
          commit('getAllPosts', res.data)
        })
      },
      // 全部标签
      setTags({ commit }) {
        return getTags().then((res) => { 
          commit('setTags', res.data)
        })
      },
      // 全部分类
      setCategory({ commit }) {
        return getCategories().then((res) => { 
          commit('setCategory', res.data)
        })
      },
      // 获取banner
      setBanners({ commit }) {
        return bannerList().then((res) => {
          commit('setBanners', arrToObj(res.data, 'order'))
        })
      },
      // 个人信息
      setUser({ commit }) {
        return getClientUser().then((res) => {
          commit('setUser', res.data)
        })
      },
      // 详情
      getDetail({ commit }, payload: string) {
        return articleDetail({ id: payload }).then((res) => {
          commit('getDetail', res)
          return res
        })
      }
    }
  })
  // 替换state
  // @ts-ignore
  if (!import.meta.env.SSR && window && window.__INITIAL_STATE__) {
    // @ts-ignore
    store.replaceState(window.__INITIAL_STATE__)
  }

  return { store }
}
