import axios from 'axios';
import { createStore } from '@/store/index'

const { store } = createStore();

// export const baseHost = 'https://www.kayrain.cn/api'
export const baseHost = 'http://localhost:3000'

const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? `${baseHost}` : '/api',
  timeout: 3000
});

//添加拦截
ajax.interceptors.request.use(
  (config) => {
    store.commit('setLoading', true)
    return config;
  },
  (error) => {
    console.log(error);
  }
);

ajax.interceptors.response.use(
  (res: any) => {
    // 延长loading
    setTimeout(() => {
      store.commit('setLoading', false)
    }, 100)
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    store.commit('setLoading', false)
    const { response } = error;
    if (response) {
      return Promise.reject(response.data);
    } else {
      throw '网络连接异常,请稍后再试!';
    }
  }
);

export default ajax;
