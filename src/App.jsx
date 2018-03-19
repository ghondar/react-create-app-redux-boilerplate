import React from 'react'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import createRoutes from './routes'
import Root from './containers/Root'

const { persistor, store } = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(React, history, store)

export default () => (
  <Root persistor={persistor} store={store}>
    {routes}
  </Root>
)
