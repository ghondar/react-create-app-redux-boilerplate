import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Loading from '../components/Common/Loading'

export default class Root extends Component {
  render() {
    const { store, persistor, children } = this.props

    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
