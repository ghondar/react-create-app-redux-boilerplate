import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import Dashboard from '../containers/Dashboard'

export default (history) => (
  <ConnectedRouter history={history}>
    <Route component={Dashboard} exact path='/' />
  </ConnectedRouter>
)
