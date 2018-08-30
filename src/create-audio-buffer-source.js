module.exports = function(el, node){
  el.setAttribute("class", "node-container audio-buffer-source")

  var label = document.createElement("span")
  label.textContent = "AudioBufferSource"
  label.setAttribute("class", "label node-label")
  el.appendChild(label)

  // var detuneContainer = document.createElement("div")
  // detuneContainer.setAttribute("class", "detune-container el-container")
  // var detuneRange = document.createElement("input")
  // detuneRange.setAttribute("type", "range")
  // detuneRange.setAttribute("class", "detune-range")
  // detuneRange.setAttribute("min", -1200)
  // detuneRange.setAttribute("value", node.detune.value)
  // detuneRange.setAttribute("max", 1200)
  // var detuneInfo = document.createElement("span")
  // detuneInfo.setAttribute("class", "detune-info")
  // detuneInfo.textContent = node.detune.value
  // detuneRange.addEventListener("change", function(e){
  //   node.detune.value = e.target.valueAsNumber
  //   detuneInfo.textContent = e.target.valueAsNumber
  // })
  // var detuneLabel = document.createElement("span")
  // detuneLabel.textContent = "detune"
  // detuneLabel.setAttribute("class", "label el-label")
  // detuneContainer.appendChild(detuneLabel)
  // detuneContainer.appendChild(detuneRange)
  // detuneContainer.appendChild(detuneInfo)
  // el.appendChild(detuneContainer)

  var playBackContainer = document.createElement("div")
  playBackContainer.setAttribute("class", "play-back-container el-container")
  var playBackRange = document.createElement("input")
  playBackRange.setAttribute("type", "range")
  playBackRange.setAttribute("class", "play-back-range")
  playBackRange.setAttribute("min", 0.1)
  playBackRange.setAttribute("max", 4)
  playBackRange.setAttribute("value", node.playbackRate.value)
  playBackRange.setAttribute("step", 0.05)
  var playBackInfo = document.createElement("span")
  playBackInfo.setAttribute("class", "play-back-info")
  playBackInfo.textContent = node.playbackRate.value
  playBackRange.addEventListener("change", function(e){
    node.playbackRate.value = e.target.valueAsNumber
    playBackInfo.textContent = e.target.valueAsNumber
  })
  var playBackLabel = document.createElement("span")
  playBackLabel.textContent = "playBack"
  playBackLabel.setAttribute("class", "label el-label")
  playBackContainer.appendChild(playBackLabel)
  playBackContainer.appendChild(playBackRange)
  playBackContainer.appendChild(playBackInfo)
  el.appendChild(playBackContainer)

  var loopContainer = document.createElement("div")
  loopContainer.setAttribute("class", "loop-container el-container")
  var loopSelect = document.createElement("select")
  loopSelect.setAttribute("loop", "text")
  loopSelect.setAttribute("class", "loop-select")
  var loops = ['false', 'true']
  loops.forEach(function(loop){
    var opt = document.createElement("option")
    opt.textContent = loop
    opt.value = (loop == 'true') ? 1 : 0
    loopSelect.appendChild(opt)
  })
  loopSelect.addEventListener("change", function(e){
    node.loop = Boolean(e.target.value)
  })
  var loopLabel = document.createElement("span")
  loopLabel.textContent = "loop"
  loopLabel.setAttribute("class", "label el-label")
  loopContainer.appendChild(loopLabel)
  loopContainer.appendChild(loopSelect)
  el.appendChild(loopContainer)

  var loopStartContainer = document.createElement("div")
  loopStartContainer.setAttribute("class", "loop-start-container el-container")
  var loopStartRange = document.createElement("input")
  loopStartRange.setAttribute("type", "range")
  loopStartRange.setAttribute("class", "loop-start-range")
  loopStartRange.setAttribute("min", 0)
  loopStartRange.setAttribute("max", 100)
  loopStartRange.setAttribute("step", 0.05)
  loopStartRange.setAttribute("value", node.loopStart)
  var loopStartInfo = document.createElement("span")
  loopStartInfo.setAttribute("class", "loop-start-info")
  loopStartInfo.textContent = node.loopStart
  loopStartRange.addEventListener("change", function(e){
    node.loopStart = e.target.valueAsNumber
    loopStartInfo.textContent = e.target.valueAsNumber
  })
  var loopStartLabel = document.createElement("span")
  loopStartLabel.textContent = "loopStart"
  loopStartLabel.setAttribute("class", "label el-label")
  loopStartContainer.appendChild(loopStartLabel)
  loopStartContainer.appendChild(loopStartRange)
  loopStartContainer.appendChild(loopStartInfo)
  el.appendChild(loopStartContainer)

  var loopEndContainer = document.createElement("div")
  loopEndContainer.setAttribute("class", "loop-end-container el-container")
  var loopEndRange = document.createElement("input")
  loopEndRange.setAttribute("type", "range")
  loopEndRange.setAttribute("class", "loop-end-range")
  loopEndRange.setAttribute("min", 0)
  loopEndRange.setAttribute("max", node.buffer.duration)
  loopEndRange.setAttribute("value", node.buffer.duration)
  loopEndRange.setAttribute("step", 0.05)
  var loopEndInfo = document.createElement("span")
  loopEndInfo.setAttribute("class", "loop-end-info")
  loopEndInfo.textContent = node.buffer.duration
  loopEndRange.addEventListener("change", function(e){
    node.loopEnd = e.target.valueAsNumber
    loopEndInfo.textContent = e.target.valueAsNumber
  })
  var loopEndLabel = document.createElement("span")
  loopEndLabel.textContent = "loopEnd"
  loopEndLabel.setAttribute("class", "label el-label")
  loopEndContainer.appendChild(loopEndLabel)
  loopEndContainer.appendChild(loopEndRange)
  loopEndContainer.appendChild(loopEndInfo)
  el.appendChild(loopEndContainer)


}