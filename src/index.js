import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { loadComponents } from 'loadable-components'

import App from './App'

loadComponents().then(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
registerServiceWorker()
