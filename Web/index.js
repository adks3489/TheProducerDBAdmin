import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './src/app';
import Login from './src/login';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);