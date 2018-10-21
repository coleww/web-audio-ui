module.exports = function createRange(config) {
  var container = document.createElement("div")
  container.setAttribute("class", config.attribute + "-container el-container")

  var rangeInput = document.createElement("input")
  rangeInput.setAttribute("type", "range")
  rangeInput.setAttribute("class", config.attribute + "-range")
  rangeInput.setAttribute("min", config.min)
  rangeInput.setAttribute("max", config.max)
  rangeInput.setAttribute("step", config.step)
  rangeInput.setAttribute("value", config.value)

  var rangeLabel = document.createElement("span")
  rangeLabel.setAttribute("class", config.attribute + "-info")
  rangeLabel.textContent = config.value
  rangeInput.addEventListener("change", function(e){
    config.update(e.target.valueAsNumber)
    rangeLabel.textContent = e.target.valueAsNumber.toFixed(3);
  })

  var freqLabel = document.createElement("span")
  freqLabel.textContent = config.label
  freqLabel.setAttribute("class", config.attribute + "-label label el-label")

  container.appendChild(freqLabel)
  container.appendChild(rangeInput)
  container.appendChild(rangeLabel)
  
  return container
}