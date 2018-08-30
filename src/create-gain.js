module.exports = function(el, node){
  el.setAttribute("class", "node-container gain")

  var label = document.createElement("span")
  label.textContent = "Gain"
  label.setAttribute("class", "label node-label")
  el.appendChild(label)

  var gainContainer = document.createElement("div")
  gainContainer.setAttribute("class", "gain-container el-container")
  var gainRange = document.createElement("input")
  gainRange.setAttribute("type", "range")
  gainRange.setAttribute("class", "gain-range")
  gainRange.setAttribute("min", 0)
  gainRange.setAttribute("step", 0.05)
  gainRange.setAttribute("max", 1)
  gainRange.setAttribute("value", node.gain.value)
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
}