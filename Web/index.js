import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppState from './src/store/appState';

import App from './src/app';
import Login from './src/login';

let appState = new AppState();

ReactDOM.render(
  <Provider appState={appState}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);