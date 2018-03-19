import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const config = {
  key: 'boilerplate',
  storage
}

const reducer = persistReducer(config, reducers)

const finalCreateStore = compose(applyMiddleware(thunk))(createStore)

export default function configureStore(initialState) {
  let store = finalCreateStore(reducer, initialState)
  let persistor = persistStore(store)

  return { persistor, store }
}
