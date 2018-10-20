var typey = require('get-object-type')

var createEl = require('./src/create-el')
var defaultConfigs = require('./src/config')

module.exports = function(node, cfg){
  var config = cfg || {}
  var type = config.type || typey(node)
  console.log(defaultConfigs, type)
  var defaultConfig = defaultConfigs[type](node)

  // my brain tells me i should add nullchecks here, 
  // but my heart says that this works and is more elegant
  // bite me
  var mergedConfig = Object.assign({}, defaultConfig, config)

  return createEl(node, mergedConfig)
}
