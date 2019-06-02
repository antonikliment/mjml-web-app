import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Router, Route } from 'react-router'

import Application from 'components/Application'

import HomePage from 'pages/Home'
import ProjectPage from 'pages/Project'

export default ({ store, history, location }) => (
  <Provider store={store}>
    <Router history={history}>
      <Application location={location}>
        <Switch>
          <Route path="/"  component={HomePage} />
          <Route path="/project" component={ProjectPage} />
        </Switch>
      </Application>
    </Router>
  </Provider>
)
