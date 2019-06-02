import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from 'reducers'
import catchErrorsMiddleware from 'middlewares/catch-errors'



export default function configureStore(initialState, browserHistory) {
  const router = routerMiddleware(browserHistory)

  const middlewares = [catchErrorsMiddleware, thunk, router]

  const enhancer = applyMiddleware(...middlewares)
  return createStore(rootReducer, initialState, enhancer) // eslint-disable-line
}
