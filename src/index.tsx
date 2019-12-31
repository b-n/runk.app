import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import './index.css';

import {
  Home,
  Login,
  AuthCallback,
} from './pages'

import { GlobalProvider } from './stores'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <GlobalProvider>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/auth/callback">
          <AuthCallback />
        </Route>
      </Switch>
    </Router>
  </GlobalProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
