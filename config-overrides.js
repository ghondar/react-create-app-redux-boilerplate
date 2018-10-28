const { override, disableEsLint, addWebpackAlias, addBundleVisualizer, addBabelPlugin } = require('customize-cra')
const { _moduleAliases } = require('./package.json')
// const rewireVendorSplitting = require('react-app-rewire-vendor-splitting')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const paths = require('react-app-rewired/scripts/utils/paths')
// const { injectBabelPlugin } = require('react-app-rewired')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const path = require('path')

const aliases = {}

Object.keys(_moduleAliases).forEach(key => {
  aliases[key] = _moduleAliases[key].replace('.', __dirname)
})

module.exports = override(
  disableEsLint(),
  addBabelPlugin('transform-imports'),
  addBabelPlugin('loadable-components/babel'),
  addBabelPlugin('transform-react-remove-prop-types'),
  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
  addWebpackAlias({ ...aliases, 'lodash-es': 'lodash' })
)
