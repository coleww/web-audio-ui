module.exports = function(el, node){
  el.setAttribute("class", "node-container delay")

  var label = document.createElement("span")
  label.textContent = "Delay"
  label.setAttribute("class", "label node-label")
  el.appendChild(label)

  var delayContainer = document.createElement("div")
  delayContainer.setAttribute("class", "delay-container el-container")
  var delayRange = document.createElement("input")
  delayRange.setAttribute("type", "range")
  delayRange.setAttribute("class", "delay-range")
  delayRange.setAttribute("min", 0)
  delayRange.setAttribute("step", 0.1)
  delayRange.setAttribute("max", 10)
  delayRange.setAttribute("value", node.delayTime.value)
  var delayInfo = document.createElement("span")
  delayInfo.setAttribute("class", "delay-info")
  delayInfo.textContent = node.delayTime.value
  delayRange.addEventListener("change", function(e){
    node.delayTime.value = e.target.valueAsNumber
    delayInfo.textContent = e.target.valueAsNumber
  })
  var delayLabel = document.createElement("span")
  delayLabel.textContent = "Time"
  delayLabel.setAttribute("class", "label el-label")
  delayContainer.appendChild(delayLabel)
  delayContainer.appendChild(delayRange)
  delayContainer.appendChild(delayInfo)
  el.appendChild(delayContainer)
}