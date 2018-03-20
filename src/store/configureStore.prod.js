import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import reducers from '../reducers'

export const history = createHistory()

const initialState = {}
const middleware = [ thunk, routerMiddleware(history) ]

const finalCreateStore = compose(applyMiddleware(...middleware))
const store = createStore(reducers, initialState, finalCreateStore)

export default store
