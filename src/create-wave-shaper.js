var makeDistortionCurve = require('make-distortion-curve')

module.exports = function(el, node){
  var amount = 100
  node.curve = makeDistortionCurve(100)
  el.setAttribute("class", "node-container gain")

  var label = document.createElement("span")
  label.textContent = "Gain"
  label.setAttribute("class", "label node-label")
  el.appendChild(label)

  var amountContainer = document.createElement("div")
  amountContainer.setAttribute("class", "amount-container el-container")
  var amountRange = document.createElement("input")
  amountRange.setAttribute("type", "range")
  amountRange.setAttribute("class", "amount-range")
  amountRange.setAttribute("min", 0)
  amountRange.setAttribute("value", amount)
  amountRange.setAttribute("max", 1000)
  var amountInfo = document.createElement("span")
  amountInfo.setAttribute("class", "amount-info")
  amountInfo.textContent = amount
  amountRange.addEventListener("change", function(e){
    node.curve = makeDistortionCurve(e.target.valueAsNumber)
    amountInfo.textContent = e.target.valueAsNumber
  })
  var amountLabel = document.createElement("span")
  amountLabel.textContent = "amount"
  amountLabel.setAttribute("class", "label el-label")
  amountContainer.appendChild(amountLabel)
  amountContainer.appendChild(amountRange)
  amountContainer.appendChild(amountInfo)
  el.appendChild(amountContainer)

  var overSampleContainer = document.createElement("div")
  overSampleContainer.setAttribute("class", "over-sample-container el-container")
  var overSampleSelect = document.createElement("select")
  overSampleSelect.setAttribute("overSample", "text")
  overSampleSelect.setAttribute("class", "over-sample-select")
  var overSamples = ['none', '2x', '4x']
  overSamples.forEach(function(overSample){
    var opt = document.createElement("option")
    opt.value = opt.textContent = overSample
    overSampleSelect.appendChild(opt)
  })
  overSampleSelect.addEventListener("change", function(e){
    node.oversample = e.target.value
  })
  var overSampleLabel = document.createElement("span")
  overSampleLabel.textContent = "overSample"
  overSampleLabel.setAttribute("class", "label el-label")
  overSampleContainer.appendChild(overSampleLabel)
  overSampleContainer.appendChild(overSampleSelect)
  el.appendChild(overSampleContainer)
}