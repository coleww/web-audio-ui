module.exports = function(el, node){
  el.setAttribute("class", "filter")

  var freqRange = document.createElement("input")
  freqRange.setAttribute("type", "range")
  freqRange.setAttribute("class", "freq-range")
  freqRange.setAttribute("min", 1)
  freqRange.setAttribute("value", node.frequency.value)
  freqRange.setAttribute("max", 20000)
  var freqInfo = document.createElement("span")
  freqInfo.setAttribute("class", "freq-info")
  freqRange.addEventListener("change", function(e){
    node.frequency.value = e.target.valueAsNumber
    freqInfo.textContent = e.target.valueAsNumber
  })
  el.appendChild(freqInfo)
  el.appendChild(freqRange)

  var detuneRange = document.createElement("input")
  detuneRange.setAttribute("type", "range")
  detuneRange.setAttribute("class", "detune-range")
  detuneRange.setAttribute("min", -2000)
  detuneRange.setAttribute("value", node.detune.value)
  detuneRange.setAttribute("max", 2000)
  var detuneInfo = document.createElement("span")
  detuneInfo.setAttribute("class", "detune-info")
  detuneInfo.textContent = node.detune.value
  detuneRange.addEventListener("change", function(e){
    node.detune.value = e.target.valueAsNumber
    detuneInfo.textContent = e.target.valueAsNumber
  })
  el.appendChild(detuneInfo)
  el.appendChild(detuneRange)

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
  el.appendChild(qInfo)
  el.appendChild(qRange)

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
  el.appendChild(gainInfo)
  el.appendChild(gainRange)

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
  el.appendChild(typeSelect)
}
