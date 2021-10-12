import { Commit, createStore } from 'vuex'
import { AxiosRequestConfig } from 'axios'
import ajax from '@/request/config'
// import persistStorage from './persistStorage'
// 请求返回的接口
export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
  status: string;
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
  id?: number;
  nickname?: string;
  avatart?: string;
  blog?: string;
  qq_email?: string;
  created_at?: string;
}

// Banner 列表
export interface BannerProps {
  id: number;
  title: string;
  order: string;
  desc: string;
  banner: string;
  createdAt: string;
  updatedAt: string;
}

// 最新文章接口
export interface NewPostsProps {
  image?: Array<{ name: string, url: string}> | string;
  tags: Array<string>;
  id: number;
  title: string;
  description: string;
  category: string;
  isComent: boolean;
  isReprint: boolean;
  content: string;
  created_at: string;
}
// 全局store的state
export interface GlobalDataProps {
  error: GlobalErrorProps;
  user: UserProps;
  tourist: TouristProps;
  newPosts: Array<NewPostsProps>;
  allPosts: Array<NewPostsProps>;
  loading: boolean;
  banners: {[key: string]: BannerProps};
}

// 封装通用的请求方法
const asyncAndCommit = async (
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig,
  extraData?: any
) => {
  const { data } = await ajax(config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

const state = {
  error: { status: false },
  user: {},
  tourist: {},
  newPosts: [],
  allPosts: [],
  loading: false,
  banners: {}
}

const store = createStore<GlobalDataProps>({
  state: state,
  mutations: {
    setUserInfo(state, data: UserProps) {
      state.user = data
    },
    getNewPosts(state, data: Array<NewPostsProps>) {
      state.newPosts = data
    },
    getAllPosts(state, data: Array<NewPostsProps>) {
      state.allPosts = data
    },
    getTourist(state, data: TouristProps) {
      state.tourist = data
    },
    setLoading(state, data){
      state.loading = data
    },
    setBanner(state, data){
      state.banners = data
    }
  },
  actions: {
    // 最新文章
    getNewPosts({ commit }, payload) {
      return asyncAndCommit('getNewPosts', commit, { url: '/new/posts',  method: 'get', params: payload })
    },
    // 全部文章
    getAllPosts({ commit }) {
      return asyncAndCommit('getAllPosts', commit, { url: '/post/archives',  method: 'get' })
    },
    // 游客登录
    getTourist({ commit }, payload) {
      return asyncAndCommit('getTourist', commit, { url: '/tourist/login',  method: 'post', data: payload })
    }
  },
  getters: {}
})

export default store
