import React, { FC } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './style.css'

import Home from 'pages/home';
import Notfound from 'pages/notfound';
import ArticleList from 'pages/article-list';
import ArticleCreate from 'pages/article-create';
import CategoryList from 'pages/category-list';
import Tags from 'pages/tags';
import MessageBoard from 'pages/message-board';
import CommentList from 'pages/comment-list';
import UserList from 'pages/user-list';
import Setup from 'pages/setup';
import Collect from 'pages/collect';
import CollectCategory from 'pages/collect-category';
import Banner from 'pages/banner-list';

const routeList = [
  { path: "/home", name: "首页", Component: Home, auth: true },
  { path: "/article/list", name: "文章列表", Component: ArticleList, auth: true },
  { path: "/article/create", name: "创建文章", Component: ArticleCreate, auth: true },
  { path: "/article/category", name: "分类列表", Component: CategoryList, auth: true },
  { path: "/article/tags", name: "标签列表", Component: Tags, auth: true },
  { path: "/messageboard", name: "留言板", Component: MessageBoard, auth: true },
  { path: "/commentlist", name: "评论列表", Component: CommentList, auth: true },
  { path: "/user/list", name: "用户列表", Component: UserList, auth: true },
  { path: "/setup", name: "个人设置", Component: Setup, auth: true },
  { path: "/collect/list", name: "收藏列表", Component: Collect, auth: true },
  { path: "/collect/category", name: "收藏分类", Component: CollectCategory, auth: true },
  { path: "/banner", name: "Banner管理", Component: Banner, auth: true }
]

const Routebox: FC = () => {
  const location = useLocation();
  const token = localStorage.getItem('k_token')
  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="page" timeout={500}>
        <Switch location={location}>
          <Redirect from="/" exact to="/home" />
          {routeList.map((item, index) => {
            return <Route key={index} path={item.path} exact render={(props: any) =>
            (!item.auth ? (<item.Component {...props} />) : (token ? <item.Component {...props} /> : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />)
            )} />
          })}
          <Route component={Notfound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routebox;
