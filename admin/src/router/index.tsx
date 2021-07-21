import React, { FC } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './style.css'
import { flatten } from 'utils'
import routes, { RouteProps } from './config'

import Home from 'pages/home';
import Notfound from 'pages/notfound';

import ArticleList from 'pages/article-list';
import ArticleCreate from 'pages/article-create';
import Filing from 'pages/filing';
import CategoryList from 'pages/category-list';
import Tags from 'pages/tags';

import MessageBoard from 'pages/message-board';
import CommentList from 'pages/comment-list';

import UserList from 'pages/user-list';
import UserCreate from 'pages/user-create';

import UserRole from 'pages/user-role';
import Setup from 'pages/setup';

const routeList: RouteProps[] = flatten(routes)
// console.log(routeList);

const Routebox: FC = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="page" timeout={500}>
        <Switch location={location}>
          <Redirect from="/" exact to="/home" />
          <Route exact path="/home" component={Home} />
          <Route exact path="/article/list" component={ArticleList} />
          <Route exact path="/article/create" component={ArticleCreate} />
          <Route exact path="/article/filing" component={Filing} />
          <Route exact path="/article/category" component={CategoryList} /> 
          <Route exact path="/article/tags" component={Tags} />
          <Route exact path="/messageboard" component={MessageBoard} />
          <Route exact path="/commentlist" component={CommentList} />
          <Route exact path="/user/list" component={UserList} />
          <Route exact path="/user/create" component={UserCreate} />
          <Route exact path="/user/role" component={UserRole} /> 
          <Route exact path="/setup" component={Setup} /> 
          {/* {
            routeList.map(({ path, exact = true, key, Component }) => {
              <Route exact={exact} path={path} component={Component} key={key} />
            })
          } */}
          <Route component={Notfound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routebox;
