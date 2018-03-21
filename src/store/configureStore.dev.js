import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import DevTools from '../containers/DevTools'

export const history = createHistory()

const config = {
  key      : 'boilerplate',
  blacklist: [ 'routing' ],
  storage
}

const reducer = persistReducer(config, reducers)
const initialState = {}
const middleware = [ thunk, routerMiddleware(history), createLogger() ]

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  DevTools.instrument()
)

const store = createStore(reducer, initialState, finalCreateStore)

export default store
