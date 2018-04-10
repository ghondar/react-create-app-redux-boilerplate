import path from 'path'
import fs from 'fs'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { getLoadableState } from 'loadable-components/server'
import Helmet from 'react-helmet'

import { Provider } from 'react-redux'
import createServerStore from './store'

import Root from '../src/containers/Root'
import createRoutes from '../src/routes'

// A simple helper function to prepare the HTML markup
const prepHTML = (data, { html, head, body, loadableState }) => {
  data = data.replace('<html lang="en">', `<html ${html}`)
  data = data.replace('</head>', `${head}</head>`)
  data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  data = data + loadableState

  return data
}

const universalLoader = (req, res) => {
  // Load in our HTML file from our build
  const filePath = path.resolve(__dirname, '../build/index.html')

  fs.readFile(filePath, 'utf8', async (err, htmlData) => {
    // If there's an error... serve up something nasty
    if(err) {
      console.error('Read error', err)

      return res.status(404).end()
    }

    // Create a store and sense of history based on the current path
    const { store, history } = createServerStore(req.path)

    const routes = createRoutes(history)

    const app = <Root store={store}>{routes}</Root>

    const loadableState = await getLoadableState(app)

    // Render App in React
    const routeMarkup = renderToString(app)

    // Let Helmet know to insert the right tags
    const helmet = Helmet.renderStatic()

    // Form the final HTML response
    const html = prepHTML(htmlData, {
      html: helmet.htmlAttributes.toString(),
      head:
        helmet.title.toString() +
        helmet.meta.toString() +
        helmet.link.toString(),
      body         : routeMarkup,
      loadableState: loadableState.getScriptTag()
    })

    // Up, up, and away...
    res.send(html)
  })
}

export default universalLoader
