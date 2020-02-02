import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import './index.css';

import {
  Home,
  Login,
  AuthCallback,
} from './pages'

import { GlobalProvider } from './stores'

import * as serviceWorker from './serviceWorker';
import { Discover } from './pages/Discover';
import { Leagues } from './pages/Leagues';
import { Profile } from './pages/Profile';

ReactDOM.render(
  <GlobalProvider>
    <Router>
      <Switch>
        <Route exact path="/">
          <Leagues />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/auth/callback">
          <AuthCallback />
        </Route>
        <Route exact path="/discover">
          <Discover />
        </Route>
        <Route exact path="/leagues">
          <Redirect to={'/'} />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
      <Home />
    </Router>
  </GlobalProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
