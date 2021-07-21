import React from 'react';
// import AsyncComponent from 'components/asyncComponent/index.js'

import {
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  MessageOutlined,
  CommentOutlined
} from '@ant-design/icons';

/**
 * path 跳转的路径
 * exact 匹配规则，true的时候则精确匹配。
 */

export interface RouteProps {
  path: string;
  name: string;
  key: string;
  type?: string;
  icon?: any;
  exact?: true;
  children?: RouteProps[];
  Component?: React.ComponentType;
}

const routes: RouteProps[] = [
  {
    path: '/',
    name: '首页',
    key: '/home',
    icon: HomeOutlined,
    // Component AsyncComponent(() => import('pages/home'))
  },
  {
    path: '/article',
    name: '文章',
    key: '/article',
    type: 'subMenu',
    icon: FileTextOutlined,
    children: [
      {
        path: '/article/list',
        name: '文章列表',
        type: 'menuItem',
        key: '/article/list',
        // Component AsyncComponent(() => import('pages/article-list'))
      },
      {
        path: '/article/create',
        name: '新建文章',
        type: 'menuItem',
        key: '/article/create',
        // Component AsyncComponent(() => import('pages/article-create'))
      },
      {
        path: '/article/filing',
        name: '归档',
        type: 'menuItem',
        key: '/article/filing',
        // Component AsyncComponent(() => import('pages/filing'))
      },
      {
        path: '/article/category',
        name: '分类',
        type: 'menuItem',
        key: '/article/category',
        // Component AsyncComponent(() => import('pages/category-list'))
      },
      {
        path: '/article/tags',
        name: '标签',
        type: 'menuItem',
        key: '/article/tags',
        // Component AsyncComponent(() => import('pages/tags'))
      }
    ]
  },
  {
    path: '/messageboard',
    name: '留言板',
    icon: MessageOutlined,
    key: '/messageboard',
    // Component AsyncComponent(() => import('pages/message-board'))
  },
  {
    path: '/commentlist',
    name: '评论',
    icon: CommentOutlined,
    key: '/commentlist',
    // Component AsyncComponent(() => import('pages/comment-list'))
  },
  {
    path: '/user',
    name: '用户',
    key: '/user',
    type: 'subMenu',
    icon: UserOutlined,
    children: [
      {
        path: '/user/list',
        name: '用户列表',
        type: 'menuItem',
        key: '/user/list',
        // Component AsyncComponent(() => import('pages/user-list'))
      },
      {
        path: '/user/create',
        name: '新建用户',
        type: 'menuItem',
        key: '/user/create',
        // Component AsyncComponent(() => import('pages/user-create'))
      },
      {
        path: '/user/role',
        name: '权限',
        type: 'menuItem',
        key: '/user/role',
        // Component AsyncComponent(() => import('pages/user-role'))
      }
    ]
  },
  {
    path: '/setup',
    name: '设置',
    icon: SettingOutlined,
    key: '/setup',
    // Component AsyncComponent(() => import('pages/setup'))
  }
];

export default routes;
