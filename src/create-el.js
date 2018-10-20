var createRange = require('./create-range')
var createSelect = require('./create-select')

module.exports = function(node, config){
  var el = document.createElement('div')
  el.setAttribute("class", "node-container " + config.className)

  var label = document.createElement("span")
  label.textContent = config.label
  label.setAttribute("class", "label node-label")
  el.appendChild(label)

  config.attributes.forEach(function (attributeConfig) {
    if (attributeConfig.type === 'range') {
      el.appendChild(createRange(attributeConfig))
    } else if (attributeConfig.type === 'select') {
      el.appendChild(createSelect(attributeConfig))
    } else {
      throw 'idk what to do with' + JSON.stringify(attributeConfig)
    }
  })
  return el
}