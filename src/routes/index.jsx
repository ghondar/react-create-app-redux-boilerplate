import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import loadable from 'loadable-components'

import Loading from '../components/Common/Loading'
import AppContainer from '../containers/AppContainer'

const Dashboard = loadable(() => import('../containers/Dashboard'), {
  LoadingComponent: () => <Loading />
})

export default (React, browserHistory, store) => (
  <Router history={browserHistory}>
    <Route component={AppContainer} path='/'>
      <IndexRoute component={Dashboard} />
    </Route>
  </Router>
)
