import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import PropTypes from 'prop-types'
import DevTools from './DevTools.jsx'

import Loading from '../components/Common/Loading'

export default class Root extends Component {
  render() {
    const { store, persistor, children } = this.props

    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {children}
          <DevTools />
        </PersistGate>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
