module.exports = function(el, node){
  el.setAttribute("class", "node-container gain")

  var label = document.createElement("span")
  label.textContent = "Gain"
  label.setAttribute("class", "label node-label")
  el.appendChild(label)


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