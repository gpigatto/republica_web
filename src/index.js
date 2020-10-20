import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import routerHistory from './core/routerHistory';

import Home from './home/home';
import Login from './login/login';

ReactDOM.render(
  <Router history={routerHistory}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>,

  document.getElementById('root'),
);
