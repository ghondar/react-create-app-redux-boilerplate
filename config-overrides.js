const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = function override(config, env) {
  config.plugins = [ ...config.plugins, new DashboardPlugin() ]

  return config
}
