import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Container from 'pages/container';
import Login from 'pages/login';

const App: FC = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" key="container" component={Container} />
    </Switch>
  </Router>
);

export default App;
