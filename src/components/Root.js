import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'

import Application from 'components/Application'

import HomePage from 'pages/Home'
import ProjectPage from 'pages/Project'

export default ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" exact component={HomePage} />
      <Route path="/project" component={ProjectPage} />
    </Router>
  </Provider>
)
