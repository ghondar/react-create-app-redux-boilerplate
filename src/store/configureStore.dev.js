import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import DevTools from '../containers/DevTools'

const config = {
  key      : 'boilerplate',
  blacklist: [ 'routing' ],
  storage
}

const reducer = persistReducer(config, reducers)

const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore)

export default function configureStore(initialState) {
  let store = finalCreateStore(reducer, initialState)
  let persistor = persistStore(store)

  return { persistor, store }
}
