import axios from 'axios';
import store from '@/store/index'

const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '正式环境api' : '/api',
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
    }, 500)
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
