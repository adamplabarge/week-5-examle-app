import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middleware = [
  thunk
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

export const store = createStore(reducers, enhancer)