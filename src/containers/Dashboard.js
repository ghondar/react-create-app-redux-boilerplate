import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import { title } from './Dashboard.styl'

class Dashboard extends Component {
  componentDidMount() {
    fetch('api')
      .then(response => response.json())
      .then(data => console.log(data))
  }

  render() {
    return <h1 className={title}>Hola Mundo</h1>
  }
}

export default hot(module)(Dashboard)
