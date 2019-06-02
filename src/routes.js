import React from 'react'
import { Switch, Route } from 'react-router'

import Application from 'components/Application'

import HomePage from 'pages/Home'
import ProjectPage from 'pages/Project'

export default (
  <Application>
    <Switch>
      <Route path="/"  component={HomePage} />
      <Route path="/project" component={ProjectPage} />
    </Switch>
  </Application>
)
