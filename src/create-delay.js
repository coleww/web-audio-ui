module.exports = function(el, node){
  el.setAttribute("class", "delay")

  var delayRange = document.createElement("input")
  delayRange.setAttribute("type", "range")
  delayRange.setAttribute("class", "delay-range")
  delayRange.setAttribute("min", 0)
  delayRange.setAttribute("step", 0.1)
  delayRange.setAttribute("value", node.delayTime.value)
  delayRange.setAttribute("max", 10)
  var delayInfo = document.createElement("span")
  delayInfo.setAttribute("class", "delay-info")
  delayInfo.textContent = node.delayTime.value
  delayRange.addEventListener("change", function(e){
    node.delayTime.value = e.target.valueAsNumber
    delayInfo.textContent = e.target.valueAsNumber
  })
  el.appendChild(delayInfo)
  el.appendChild(delayRange)
}