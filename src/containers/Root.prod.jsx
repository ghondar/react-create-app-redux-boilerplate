import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import Loading from '../components/Common/Loading.jsx'

export default class Root extends Component {
  render() {
    const { store, children } = this.props
    const persistor = persistStore(store)

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
