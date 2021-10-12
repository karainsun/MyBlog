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

export interface CommonParams {
  pageSize: number;
  pageNo: number;
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

/**********************************--评论 API--**********************************/
// 评论列表
export const commentList = (params: any) => ajax({
  method: 'GET',
  url: '/comment/list',
  params 
});
// 回复评论
export const commentReply = (params: any) => ajax({
  method: 'POST',
  url: '/reply/comment',
  data: params 
});
// 批量删除评论
export const commentsDelete = (params: { ids: Array<number>}) => ajax({
  method: 'POST',
  url: '/comment/delete',
  data: params 
});

/**********************************--收藏分类 API--**********************************/
// 创建收藏分类
export const collectCategoryCreate = (params: { name: string}) => ajax({
  method: 'POST',
  url: '/collect_category/create',
  data: params 
});
// 全部收藏分类
export const collectCategoryAll = (params: any) => ajax({
  method: 'GET',
  url: '/collect_category/all',
  params 
});
// 收藏分类列表
export const collectCategoryList = (params: any) => ajax({
  method: 'GET',
  url: '/collect_category/list',
  params 
});
// 更新收藏分类
export const collectCategoryUpdate = (params: any) => ajax({
  method: 'PUT',
  url: '/collect_category/update',
  data: params 
});
// 批量删除收藏分类
export const collectCategoryDelete = (params: { ids: Array<number>}) => ajax({
  method: 'POST',
  url: '/collect_category/delete',
  data: params 
});

/**********************************--收藏 API--**********************************/
// 创建收藏
export interface CollectParams {
  name: string;
  logo: string;
  url: string;
  description: string;
  category: string;
}
// 创建收藏
export const collectCreate = (params: CollectParams) => ajax({
  method: 'POST',
  url: '/collect/create',
  data: params 
});
// 收藏列表
export const collectList = (params: any) => ajax({
  method: 'GET',
  url: '/collect/list',
  params 
});
// 批量删除收藏
export const collectDelete = (params: { ids: Array<number>}) => ajax({
  method: 'POST',
  url: '/collect/delete',
  data: params 
});
// 更新收藏
export const collectUpdate = (params: any) => ajax({
  method: 'PUT',
  url: '/collect/update',
  data: params 
});

/**********************************--Banner API--**********************************/
// 创建 Banner
export interface BannerParams {
  title: string;
  desc: string;
  banner: string;
  order: number; 
}
// 创建 Banner
export const bannerCreate = (params: CollectParams) => ajax({
  method: 'POST',
  url: '/banner/create',
  data: params 
});
// Banner列表
export const bannerList = () => ajax({
  method: 'GET',
  url: '/banner/all' 
});
// 批量删除 Banner
export const bannerDelete = (params: { ids: Array<number>}) => ajax({
  method: 'POST',
  url: '/banner/delete',
  data: params 
});
// 更新 Banner
export const bannerUpdate = (params: any) => ajax({
  method: 'PUT',
  url: '/banner/update',
  data: params 
});