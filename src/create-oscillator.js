module.exports = function(el, node){
  el.setAttribute("class", "node-container oscillator")

  var label = document.createElement("span")
  label.textContent = "Oscillator"
  label.setAttribute("class", "label node-label")
  el.appendChild(label)

  var freqContainer = document.createElement("div")
  freqContainer.setAttribute("class", "freq-container el-container")
  var freqRange = document.createElement("input")
  freqRange.setAttribute("type", "range")
  freqRange.setAttribute("class", "freq-range")
  freqRange.setAttribute("min", 1)
  freqRange.setAttribute("value", node.frequency.value)
  freqRange.setAttribute("max", 5000)
  var freqInfo = document.createElement("span")
  freqInfo.setAttribute("class", "freq-info")
  freqRange.addEventListener("change", function(e){
    node.frequency.value = e.target.valueAsNumber
    freqInfo.textContent = e.target.valueAsNumber
  })
  var freqLabel = document.createElement("span")
  freqLabel.textContent = "frequency"
  freqLabel.setAttribute("class", "label el-label")
  freqContainer.appendChild(freqLabel)
  freqContainer.appendChild(freqRange)
  freqContainer.appendChild(freqInfo)
  el.appendChild(freqContainer)

  var detuneContainer = document.createElement("div")
  detuneContainer.setAttribute("class", "detune-container el-container")
  var detuneRange = document.createElement("input")
  detuneRange.setAttribute("type", "range")
  detuneRange.setAttribute("class", "detune-range")
  detuneRange.setAttribute("min", -1200)
  detuneRange.setAttribute("value", node.detune.value)
  detuneRange.setAttribute("max", 1200)
  var detuneInfo = document.createElement("span")
  detuneInfo.setAttribute("class", "detune-info")
  detuneInfo.textContent = node.detune.value
  detuneRange.addEventListener("change", function(e){
    node.detune.value = e.target.valueAsNumber
    detuneInfo.textContent = e.target.valueAsNumber
  })
  var detuneLabel = document.createElement("span")
  detuneLabel.textContent = "detune"
  detuneLabel.setAttribute("class", "label el-label")
  detuneContainer.appendChild(detuneLabel)
  detuneContainer.appendChild(detuneRange)
  detuneContainer.appendChild(detuneInfo)
  el.appendChild(detuneContainer)

  var typeContainer = document.createElement("div")
  typeContainer.setAttribute("class", "type-container el-container")
  var typeSelect = document.createElement("select")
  typeSelect.setAttribute("type", "text")
  typeSelect.setAttribute("class", "type-select")
  var types = ['sine', 'square', 'sawtooth', 'triangle']
  types.forEach(function(type){
    var opt = document.createElement("option")
    opt.value = opt.textContent = type
    typeSelect.appendChild(opt)
  })
  typeSelect.addEventListener("change", function(e){
    node.type = e.target.value
  })
  var typeLabel = document.createElement("span")
  typeLabel.textContent = "type"
  typeLabel.setAttribute("class", "label el-label")
  typeContainer.appendChild(typeLabel)
  typeContainer.appendChild(typeSelect)
  el.appendChild(typeContainer)
}