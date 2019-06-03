import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from 'reducers'
import catchErrorsMiddleware from 'middlewares/catch-errors'



export default function configureStore(initialState, history) {
  const router = routerMiddleware(history)

  const middlewares = [catchErrorsMiddleware, thunk, router]

  const enhancer = applyMiddleware(...middlewares)
  return createStore(rootReducer(history), initialState, enhancer) // eslint-disable-line
}
