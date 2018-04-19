import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import loadable from 'loadable-components'

import Loading from '../components/Common/Loading'

const Dashboard = loadable(() => import('../containers/Dashboard'), {
  LoadingComponent: () => <Loading />
})

export default history => (
  <ConnectedRouter history={history}>
    <Route component={Dashboard} exact path='/' />
  </ConnectedRouter>
)
