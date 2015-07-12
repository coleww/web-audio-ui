module.exports = function(el, node){
  el.setAttribute("class", "oscillator")

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
  el.appendChild(typeSelect)
}