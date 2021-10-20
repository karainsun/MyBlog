import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

interface ResData extends AxiosResponse {
  code: number;
  status: number;
  msg: string;
}

const ajax = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? 'http://www.kayrain.cn/api' : '/api',
  timeout: 3000
});

ajax.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

//添加拦截
ajax.interceptors.request.use(
  (config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    if (config.headers) {
      const token = localStorage.getItem('k_token');
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

ajax.interceptors.response.use(
  (res: ResData) => {
    if (res.headers.authorization) {
      localStorage.setItem('k_token', res.headers.authorization);
    } else {
      if (res.data.data && res.data.data.token) {
        localStorage.setItem('k_token', res.data.data.token);
      }
    }
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      if (response.status === 401) {
        message.success('请重新登陆', 1);
        return (window.location.hash = '/login');
      } else {
        return Promise.reject(response.data);
      }
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      message.warning('网络连接异常,请稍后再试!');
      throw '网络连接异常,请稍后再试!';
    }
  }
);

export default ajax;
