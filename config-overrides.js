const DashboardPlugin = require('webpack-dashboard/plugin')
const { _moduleAliases } = require('./package.json')
const rewireVendorSplitting = require('react-app-rewire-vendor-splitting')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const paths = require('react-app-rewired/scripts/utils/paths')
const { injectBabelPlugin } = require('react-app-rewired')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

const aliases = {}

Object.keys(_moduleAliases).forEach(key => {
  aliases[key] = _moduleAliases[key].replace('.', __dirname)
})

function deepClone(object) {
  return JSON.parse(JSON.stringify(object))
}

function getLoader(rules, matcher) {
  let match

  rules.some(rule => {
    return (match = matcher(rule) ? { rules, rule } : getLoader(rule.use || rule.oneOf || [], matcher))
  })

  return match
}

function rewireStylus(config, env) {
  const { rule: cssRule, rules } = getLoader(config.module.rules, rule => String(rule.test) === String(/\.css$/))

  const stylusRule = deepClone(cssRule)

  stylusRule.test = /\.s(a|c)ss$/
  if(env === 'production') {
    stylusRule.loader.splice(3, 0, require.resolve('sass-loader'))
    stylusRule.loader[2].options = {
      ...stylusRule.loader[2].options,
      minimize : true,
      sourceMap: shouldUseSourceMap
    }
    stylusRule.loader.pop()
  } else {
    stylusRule.use.splice(2, 0, require.resolve('sass-loader'))
    stylusRule.use[1].options = {
      ...stylusRule.use[1].options
    }
    //
    // stylusRule.use.
    stylusRule.use.pop()
  }

  rules.splice(rules.indexOf(cssRule), 0, stylusRule)

  return config
}

module.exports = function override(config, env) {
  config = rewireStylus(config, env)
  config.plugins = [ ...config.plugins, new DashboardPlugin() ]

  config = injectBabelPlugin('loadable-components/babel', config)
  config = injectBabelPlugin(
    [
      'transform-imports',
      {
        lodash: {
          transform        : 'lodash/${member}',
          preventFullImport: true
        },
        'react-router-dom': {
          transform        : 'react-router-dom/${member}',
          preventFullImport: true
        }
      }
    ],
    config
  )

  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases,
    'lodash-es': 'lodash'
  }

  if(env === 'production') {
    console.log('⚡ Production')
    config = injectBabelPlugin('transform-react-remove-prop-types', config)
    config = rewireVendorSplitting(config, env)
    config.entry = { main: paths.appIndexJs }
    config.plugins[3] = new UglifyJsPlugin({
      exclude: /node_modules\/liquidjs\//
    })
    config.plugins = [
      ...config.plugins,
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      })
    ]

    config.resolve.alias = {
      ...config.resolve.alias,
      react      : 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }

  return config
}
