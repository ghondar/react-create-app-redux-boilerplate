import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AppContainer extends Component {
  render() {
    const { children } = this.props
    const { server } = this.context

    return <div>{React.cloneElement(children, server)}</div>
  }
}

AppContainer.contextTypes = {
  server: PropTypes.object
}
