import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import settings from './settings'
import preview from './preview'
import modals from './modals'
import projects from './projects'
import alerts from './alerts'
import notifs from './notifs'
import error from './error'
import selectedProjects from './selectedProjects'
import externalFileOverlay from './externalFileOverlay'
import search from './search'
import snippets from './snippets'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings,
  preview,
  modals,
  alerts,
  notifs,
  projects,
  error,
  selectedProjects,
  externalFileOverlay,
  search,
  snippets,
})

export default rootReducer
