import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import Dashboard from '../containers/Dashboard'

export default (React, history) => (
  <ConnectedRouter history={history}>
    <Route component={Dashboard} exact path='/' />
  </ConnectedRouter>
)
