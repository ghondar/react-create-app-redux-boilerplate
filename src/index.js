import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import registerServiceWorker from './registerServiceWorker'

import App from './App'

if(module.hot) module.hot.accept()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Webpack Hot Module Replacement API
if(module.hot)
  module.hot.accept('./App', () => {
    render(App)
  })

registerServiceWorker()
