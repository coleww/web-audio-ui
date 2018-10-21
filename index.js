var typey = require('get-object-type')

var createEl = require('./src/create-el')
var defaultConfigs = require('./src/config')

module.exports = function(node, cfg){
  var config = cfg || {}
  var type = typey(node)
  var defaultConfig = defaultConfigs[type] && defaultConfigs[type](node)
  var mergedConfig = Object.assign({}, defaultConfig, config)
  return createEl(node, mergedConfig)
}
