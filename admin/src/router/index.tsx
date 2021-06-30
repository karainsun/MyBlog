import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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

const route: FC = () => {
  return (
    <Switch>
      <Redirect from="/" exact to="/home" />
      <Route path="/home" component={Home} />
      <Route exact path="/article/list" component={ArticleList} />
      <Route exact path="/article/edit" component={ArticleEdit} />
      <Route exact path="/user/list" component={UserList} />
      <Route exact path="/user/edit" component={UserEdit} />
      <Route exact path="/category/list" component={CategoryList} />
      <Route exact path="/category/edit" component={CategoryEdit} />
      <Route exact path="/role/list" component={RoleList} />
      <Route path="/error" component={ErrorPage} />
      <Route component={Notfound} />
    </Switch>
  );
};

export default route;
