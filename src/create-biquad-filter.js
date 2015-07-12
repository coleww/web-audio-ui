module.exports = function(el, node){
  el.setAttribute("class", "node-container filter")

  var label = document.createElement("span")
  label.textContent = "BiquadFilter"
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

  var qContainer = document.createElement("div")
  qContainer.setAttribute("class", "q-container el-container")
  var qRange = document.createElement("input")
  qRange.setAttribute("type", "range")
  qRange.setAttribute("class", "q-range")
  qRange.setAttribute("min", 0)
  qRange.setAttribute("value", node.Q.value)
  qRange.setAttribute("max", 1000)
  var qInfo = document.createElement("span")
  qInfo.setAttribute("class", "q-info")
  qInfo.textContent = node.Q.value
  qRange.addEventListener("change", function(e){
    node.Q.value = e.target.valueAsNumber
    qInfo.textContent = e.target.valueAsNumber
  })
  var qLabel = document.createElement("span")
  qLabel.textContent = "Q"
  qLabel.setAttribute("class", "label el-label")
  qContainer.appendChild(qLabel)
  qContainer.appendChild(qRange)
  qContainer.appendChild(qInfo)
  el.appendChild(qContainer)

  var gainContainer = document.createElement("div")
  gainContainer.setAttribute("class", "gain-container el-container")
  var gainRange = document.createElement("input")
  gainRange.setAttribute("type", "range")
  gainRange.setAttribute("class", "gain-range")
  gainRange.setAttribute("min", -40)
  gainRange.setAttribute("value", node.gain.value)
  gainRange.setAttribute("max", 40)
  var gainInfo = document.createElement("span")
  gainInfo.setAttribute("class", "gain-info")
  gainInfo.textContent = node.gain.value
  gainRange.addEventListener("change", function(e){
    node.gain.value = e.target.valueAsNumber
    gainInfo.textContent = e.target.valueAsNumber
  })
  var gainLabel = document.createElement("span")
  gainLabel.textContent = "gain"
  gainLabel.setAttribute("class", "label el-label")
  gainContainer.appendChild(gainLabel)
  gainContainer.appendChild(gainRange)
  gainContainer.appendChild(gainInfo)
  el.appendChild(gainContainer)

  var typeContainer = document.createElement("div")
  typeContainer.setAttribute("class", "type-container el-container")
  var typeSelect = document.createElement("select")
  typeSelect.setAttribute("type", "text")
  typeSelect.setAttribute("class", "type-select")
  var types = ['lowpass','highpass','bandpass','lowshelf','highshelf','peaking','notch','allpass']
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
