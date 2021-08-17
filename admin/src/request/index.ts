import ajax from './config';  

export interface WeatherParams {
  location: string;
  key: string;
}

export interface CityParams {
  number: number;
  range: string;
  key: string;
}

// 获取天气信息
export const getWeather = (params: WeatherParams) =>
  ajax({
    method: 'GET',
    url: 'https://devapi.qweather.com/v7/weather/now',
    params
  });
// 获取热门城市
export const getTopCity = (params: CityParams) => ajax({
  method: 'GET',
  url: 'https://geoapi.qweather.com/v2/city/top',
  params
});
// 上传
export const fileUpload = (params: any) => ajax({
  method: 'POST',
  url: '/upload', 
  data: params,
  ...params
});
/**********************************--分类 API--**********************************/
// 创建分类
export const categoryCreate = (params: FormData) => ajax({
  method: 'POST',
  url: '/category/create',
  data: params,
  ...params
});
// 分类列表
export const categoryList = (params: any) => ajax({
  method: 'GET',
  url: '/category/list',
  params,
  ...params
});
// 批量删除分类
export const categoriesDelete = (params: { ids: Array<number>}) => ajax({
  method: 'POST',
  url: '/category/delete',
  data: params,
  ...params
});
// 更新分类
export const categoryUpdate = (params: any) => ajax({
  method: 'PUT',
  url: '/category/update',
  data: params,
  ...params
});
/**********************************--标签 API--**********************************/
// 标签列表
export const tagList = (params: any) => ajax({
  method: 'GET',
  url: '/tag/list',
  params 
});
// 创建标签
export const tagCreate = (params: FormData) => ajax({
  method: 'POST',
  url: '/tag/create',
  data: params 
});
// 更新标签
export const tagUpdate = (params: { ids: number}) => ajax({
  method: 'PUT',
  url: '/tag/update',
  data: params 
});
// 批量删除标签
export const tagsDelete = (params: { ids: Array<number>}) => ajax({
  method: 'POST',
  url: '/tag/delete',
  data: params 
});
/**********************************--文章 API--**********************************/
// 创建文章
export const articleCreate = (params: FormData) => ajax({
  method: 'POST',
  url: '/article/create',
  data: params,
  ...params
});
// 文章列表
export const articleList = (params: any) => ajax({
  method: 'GET',
  url: '/article/list',
  params,
  ...params
});
// 批量删除文章
export const articlesDelete = (params: { ids: Array<number>}) => ajax({
  method: 'POST',
  url: '/article/delete',
  data: params,
  ...params
});
// 文章详情
export const articleDetail = ({ id }: { id: number }) => ajax({
  method: 'GET',
  url: '/article/detail',
  params: { id: id }
});
// 更新文章
export const articleUpdate = (params: any) => ajax({
  method: 'PUT',
  url: '/article/update',
  data: params 
});
// 全部分类
export const categoryAll = (params: any) => ajax({
  method: 'GET',
  url: '/category/all',
  params,
  ...params
});
// 全部标签
export const tagAll = (params: any) => ajax({
  method: 'GET',
  url: '/tag/all',
  params,
  ...params
}); 

/**********************************--用户 API--**********************************/
// 新用户注册
export const userCreate = (params: FormData) => ajax({
  method: 'POST',
  url: '/user/register',
  data: params 
});
// 用户登录
export const userLogin = (params: FormData) => ajax({
  method: 'POST',
  url: '/user/login',
  data: params 
});
// 用户列表
export const userList = (params: any) => ajax({
  method: 'GET',
  url: '/user/list',
  params 
});
// 批量删除用户
export const usersDelete = (params: { ids: Array<number>}) => ajax({
  method: 'POST',
  url: '/user/delete',
  data: params 
});
// 更新用户权限和状态
export const userStatus = (params: any) => ajax({
  method: 'PUT',
  url: '/user/status',
  data: params 
});
// 用户信息详情
export const userDetail = ({ id }: { id: number }) => ajax({
  method: 'GET',
  url: '/user/detail',
  params: { id: id }
});
// 更新用户信息
export const userUpdate = (params: any) => ajax({
  method: 'PUT',
  url: '/user/update',
  data: params 
});