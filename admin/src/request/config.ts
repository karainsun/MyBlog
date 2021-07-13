import axios from 'axios';


const ajax = axios.create({
  baseURL: '',
  timeout: 10000
});

//添加拦截
// ajax.interceptors.request.use(
//   (config) => {
//     console.log('请求被拦截');
//     return config;
//   },
//   (error) => {}
// );

// ajax.interceptors.response.use(
//   (res) => {
//     return res.data;
//   },
//   (error) => {
//     return error;
//   }
// );

export default ajax;
