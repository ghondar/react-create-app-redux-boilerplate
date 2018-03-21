import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import reducers from '../reducers'

export const history = createHistory()

const config = {
  key      : 'boilerplate',
  blacklist: [ 'routing' ],
  storage
}

const reducer = persistReducer(config, reducers)
const initialState = {}
const middleware = [ thunk, routerMiddleware(history) ]

const finalCreateStore = compose(applyMiddleware(...middleware))
const store = createStore(reducer, initialState, finalCreateStore)

export default store
