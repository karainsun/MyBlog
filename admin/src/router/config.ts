import { HomeOutlined, FileTextOutlined, UserOutlined, AppstoreOutlined, TeamOutlined } from '@ant-design/icons';

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
  children?: RouteProps[];
}

const routes: RouteProps[] = [
  {
    path: '/',
    name: '首页',
    key: '/home',
    icon: HomeOutlined
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
        key: '/article/list'
      },
      {
        path: '/article/edit',
        name: '编辑文章',
        type: 'menuItem',
        key: '/article/edit'
      }
    ]
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
        key: '/user/list'
      },
      {
        path: '/user/edit',
        name: '编辑用户',
        type: 'menuItem',
        key: '/user/edit'
      }
    ]
  },
  {
    path: '/category',
    name: '分类',
    key: '/category',
    type: 'subMenu',
    icon: AppstoreOutlined,
    children: [
      {
        path: '/category/list',
        name: '分类列表',
        type: 'menuItem',
        key: '/category/list'
      },
      {
        path: '/category/edit',
        name: '编辑分类',
        type: 'menuItem',
        key: '/category/edit'
      }
    ]
  },
  {
    path: '/role',
    name: '角色',
    key: '/role',
    type: 'subMenu',
    icon: TeamOutlined,
    children: [
      {
        path: '/role/list',
        name: '角色列表',
        type: 'menuItem',
        key: '/role/list'
      }
    ]
  }
  // {
  //   path: '/403',
  //   name: '暂无权限',
  //   icon: BankOutlined,
  //   key: '/403'
  // },
  // {
  //   path: '/404',
  //   name: 'NotFound',
  //   icon: BankOutlined,
  //   key: '/404'
  // }
];

export default routes;
