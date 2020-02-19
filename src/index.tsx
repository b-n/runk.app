import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom'

import './index.css';

import {
  Login,
  Discover,
  Leagues,
  CreateLeague,
  Profile,
  AuthCallback,
} from './pages'

import { Navigation } from './pages/common/Navigation'

import { GlobalProvider, useAuth } from './stores'

import * as serviceWorker from './serviceWorker';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthing, isAuthed } = useAuth()
  return (
    <Route {...rest} render={(props) => (
      !isAuthing && !isAuthed
        ? <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
        : <>{ children }</>
    )} />
  )
}

ReactDOM.render(
  <GlobalProvider>
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Leagues />
        </PrivateRoute>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/auth/callback">
          <AuthCallback />
        </Route>
        <PrivateRoute exact path="/discover">
          <Discover />
        </PrivateRoute>
        <PrivateRoute exact path="/leagues">
          <Leagues />
        </PrivateRoute>
        <PrivateRoute exact path="/leagues/create">
          <CreateLeague />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
      </Switch>
      <Navigation />
    </Router>
  </GlobalProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
