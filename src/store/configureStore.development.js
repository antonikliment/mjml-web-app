import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, push } from 'react-router-redux'
import { createLogger } from 'redux-logger'

import rootReducer from 'reducers'
import catchErrorsMiddleware from 'middlewares/catch-errors'

const actionCreators = {
  push,
}

const logger = createLogger({
  level: 'info',
  collapsed: true,
})


// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
  : compose
/* eslint-enable no-underscore-dangle */



export default function configureStore(initialState, browserHistory) {
  const router = routerMiddleware(browserHistory)
  const middlewares = [catchErrorsMiddleware, thunk, router, logger]

  const enhancer = composeEnhancers(applyMiddleware(...middlewares))
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')), // eslint-disable-line global-require
    )
  }

  return store
}
