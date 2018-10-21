module.exports = function createSelect(config) {
  var selectContainer = document.createElement("div")
  selectContainer.setAttribute("class", config.attribute + "-container el-container")

  var selectInput = document.createElement("select")
  selectInput.setAttribute("type", "text")
  selectInput.setAttribute("class", config.attribute + "-select")
  config.opts.forEach(function(optText){
    var opt = document.createElement("option")
    opt.value = opt.textContent = optText
    selectInput.appendChild(opt)
  })
  selectInput.setAttribute("value", config.value)
  selectInput.addEventListener("change", function(e){
    config.update(e.target.value)
  })

  var selectLabel = document.createElement("span")
  selectLabel.textContent = config.label
  selectLabel.setAttribute("class", config.attribute + "-label label el-label")

  selectContainer.appendChild(selectLabel)
  selectContainer.appendChild(selectInput)

  return selectContainer
}