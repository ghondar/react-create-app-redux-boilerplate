import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import { H1 } from './Dashboard.style'

class Dashboard extends Component {
  componentDidMount() {
    fetch('api')
      .then(response => response.json())
      .then(data => console.log(data))
  }

  render() {
    return <H1>Hola Mundo</H1>
  }
}

export default hot(module)(Dashboard)
