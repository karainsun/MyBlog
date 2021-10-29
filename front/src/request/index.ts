import ajax from './config';

export interface MessageProps {
  touristId: number;
  avatar?: string;
  nickname: string;
  userId: number;
  content: string;
  at_name?: string;
  parent_message_id?: number;
}

export interface CommentProps {
  article_title: string;
  avatar?: string;
  nickname: string;
  userId: number;
  articleId: string;
  content: string;
  at_name?: string;
  parent_comment_id?: number;
}

// 获取前台用户
export const getClientUser = () => ajax({
  method: 'GET',
  url: '/user/info'
});
// 文章列表
export const articleList = (params: any) => ajax({
  method: 'GET',
  url: '/post/list',
  params
});
// 文章归档
export const articleArchives = (params?: { limit: number }) => ajax({
  method: 'GET',
  url: '/post/archives',
  params
});
// 文章详情
export const articleDetail = (params: { id: string }) => ajax({
  method: 'GET',
  url: '/post/detail',
  params
});
// 发表评论
export const makeComment = (params: CommentProps) => ajax({
  method: 'POST',
  url: '/make/comment',
  data: params
});
// 根据文章id获取评论列表
export const getCommentList = (params: { articleId: string }) => ajax({
  method: 'GET',
  url: '/get/comments',
  params
});
// 获取全部分类
export const getCategories = () => ajax({
  method: 'GET',
  url: '/post/category'
});
// 获取全部标签
export const getTags = () => ajax({
  method: 'GET',
  url: '/post/tags'
});
// 收藏列表
export const collectList = (params: any) => ajax({
  method: 'GET',
  url: '/front/collect',
  params
});
// 获取全部标签
export const collectCategoryAll = () => ajax({
  method: 'GET',
  url: '/front/collect_category'
});
// Banner列表
export const bannerList = () => ajax({
  method: 'GET',
  url: '/banner/list'
});
// 发表留言
export const publicMessage = (params: MessageProps) => ajax({
  method: 'POST',
  url: '/make/message',
  data: params
});
// 根据前台用户id获取留言列表
export const getMessageList = (params: { userId: string }) => ajax({
  method: 'GET',
  url: '/get/messages',
  params
});
