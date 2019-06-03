import React from 'react'
import { render } from 'react-dom'
// import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'

import { createBrowserHistory } from 'history';

import configureStore from 'store/configureStore'
import { loadSettings } from 'actions/settings'
import { loadProjects } from 'actions/projects' // , addProject, openExternalFile

import Root from 'components/Root'

import { openModal } from 'reducers/modals'

import 'styles/global.scss'
import 'styles/utils.scss'

const browserHistory = createBrowserHistory();
const store = configureStore(undefined, browserHistory)
const { dispatch } = store
const rootNode = document.getElementById('app')

function r(Comp) {
  render(
    <AppContainer>
      <Comp store={store} history={browserHistory} location={browserHistory.location} />
    </AppContainer>,
    rootNode,
  )
}

r(Root)

async function boot() {
  await dispatch(loadSettings())
  await dispatch(loadProjects())
}

boot()

if (module.hot) {
  module.hot.accept('../components/Root.js', () => {
    const NewRoot = require('../components/Root').default
    r(NewRoot)
  })
}
