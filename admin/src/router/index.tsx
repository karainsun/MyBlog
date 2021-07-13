import React, { FC } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from 'pages/home';
import ErrorPage from 'pages/error-page';
import Notfound from 'pages/notfound';

import ArticleList from 'pages/article-list';
import ArticleEdit from 'pages/article-edit';

import UserList from 'pages/user-list';
import UserEdit from 'pages/user-edit';

import CategoryList from 'pages/category-list';
import CategoryEdit from 'pages/category-edit';

import RoleList from 'pages/role-list';
import Setup from 'pages/setup';
import './style.css'

const Routebox: FC = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="page" timeout={500}>
        <Switch location={location}>
          <Redirect from="/" exact to="/home" />
          <Route path="/home" component={Home} />
          <Route exact path="/article/list" component={ArticleList} />
          <Route exact path="/article/edit" component={ArticleEdit} />
          <Route exact path="/user/list" component={UserList} />
          <Route exact path="/user/edit" component={UserEdit} />
          <Route exact path="/category/list" component={CategoryList} />
          <Route exact path="/category/edit" component={CategoryEdit} />
          <Route exact path="/role/list" component={RoleList} />
          <Route exact path="/setup" component={Setup} />
          <Route path="/error" component={ErrorPage} />
          <Route component={Notfound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routebox;
