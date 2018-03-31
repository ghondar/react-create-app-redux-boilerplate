import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import { title } from './Dashboard.styl'

class Dashboard extends Component {
  render() {
    return <h1 className={title}>Hola Mundo</h1>
  }
}

export default hot(module)(Dashboard)
