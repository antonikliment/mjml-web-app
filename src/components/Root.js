import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Router, Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import Application from 'components/Application'

import HomePage from 'pages/Home'
import ProjectPage from 'pages/Project'

// TODO change routing for project name selection
export default ({ store, history, location }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Application location={location}>
        <Switch>
          <Route path="/project/:projectName" component={ProjectPage} />
          <Route path="/"  component={HomePage} />
        </Switch>
      </Application>
    </ConnectedRouter>
  </Provider>
)
