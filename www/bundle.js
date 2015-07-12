(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var typey = require('get-object-type')
var createOscillator = require('./src/create-oscillator')
var createDelay = require('./src/create-delay')
var createBiquadFilter = require('./src/create-biquad-filter')
var createGain = require('./src/create-gain')
var createAudioBufferSource = require('./src/create-audio-buffer-source')
var createWaveShaper = require('./src/create-wave-shaper')

var generate = function(node){
  var el = document.createElement('div')
  switch (typey(node)){
    case 'OscillatorNode':
      createOscillator(el, node)
      break
    case 'DelayNode':
      createDelay(el, node)
      break
    case 'GainNode':
      createGain(el, node)
      break
    case 'WaveShaperNode':
      createWaveShaper(el, node)
      break
    case 'AudioBufferSourceNode':
      createAudioBufferSource(el, node)
      break
    case 'BiquadFilterNode':
      createBiquadFilter(el, node)
      break
    default:
      console.log('bork')
  }
  return el
}

module.exports = {
  generate: generate,
  createOscillator: createOscillator,
  createDelay: createDelay,
  createBiquadFilter: createBiquadFilter,
  createGain: createGain,
  createAudioBufferSource: createAudioBufferSource
}


},{"./src/create-audio-buffer-source":4,"./src/create-biquad-filter":5,"./src/create-delay":6,"./src/create-gain":7,"./src/create-oscillator":8,"./src/create-wave-shaper":9,"get-object-type":2}],2:[function(require,module,exports){
'use strict';

module.exports = exports = function (obj) {
	return ({}).toString.call(obj).slice(8, -1);
};

},{}],3:[function(require,module,exports){
module.exports = function(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}

},{}],4:[function(require,module,exports){
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
  playBackRange.setAttribute("value", node.playbackRate.value)
  playBackRange.setAttribute("max", 10)
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
  loopStartRange.setAttribute("value", node.loopStart)
  loopStartRange.setAttribute("max", 100)
  loopStartRange.setAttribute("step", 0.05)
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
  loopEndRange.setAttribute("value", node.loopEnd)
  loopEndRange.setAttribute("max", 100)
  loopEndRange.setAttribute("step", 0.05)
  var loopEndInfo = document.createElement("span")
  loopEndInfo.setAttribute("class", "loop-end-info")
  loopEndInfo.textContent = node.loopEnd
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
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
  delayRange.setAttribute("value", node.delayTime.value)
  delayRange.setAttribute("max", 10)
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
},{}],7:[function(require,module,exports){
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
  gainRange.setAttribute("value", node.gain.value)
  gainRange.setAttribute("max", 1)
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')

module.exports = function(el, node){
  var amount = 100
  node.curve = makeDistortionCurve(100)
  el.setAttribute("class", "node-container gain")

  var label = document.createElement("span")
  label.textContent = "Gain"
  label.setAttribute("class", "label node-label")
  el.appendChild(label)

  var amountContainer = document.createElement("div")
  amountContainer.setAttribute("class", "amount-container el-container")
  var amountRange = document.createElement("input")
  amountRange.setAttribute("type", "range")
  amountRange.setAttribute("class", "amount-range")
  amountRange.setAttribute("min", 0)
  amountRange.setAttribute("value", amount)
  amountRange.setAttribute("max", 1000)
  var amountInfo = document.createElement("span")
  amountInfo.setAttribute("class", "amount-info")
  amountInfo.textContent = amount
  amountRange.addEventListener("change", function(e){
    node.curve = makeDistortionCurve(e.target.valueAsNumber)
    amountInfo.textContent = e.target.valueAsNumber
  })
  var amountLabel = document.createElement("span")
  amountLabel.textContent = "amount"
  amountLabel.setAttribute("class", "label el-label")
  amountContainer.appendChild(amountLabel)
  amountContainer.appendChild(amountRange)
  amountContainer.appendChild(amountInfo)
  el.appendChild(amountContainer)

  var overSampleContainer = document.createElement("div")
  overSampleContainer.setAttribute("class", "over-sample-container el-container")
  var overSampleSelect = document.createElement("select")
  overSampleSelect.setAttribute("overSample", "text")
  overSampleSelect.setAttribute("class", "over-sample-select")
  var overSamples = ['none', '2x', '4x']
  overSamples.forEach(function(overSample){
    var opt = document.createElement("option")
    opt.value = opt.textContent = overSample
    overSampleSelect.appendChild(opt)
  })
  overSampleSelect.addEventListener("change", function(e){
    node.oversample = e.target.value
  })
  var overSampleLabel = document.createElement("span")
  overSampleLabel.textContent = "overSample"
  overSampleLabel.setAttribute("class", "label el-label")
  overSampleContainer.appendChild(overSampleLabel)
  overSampleContainer.appendChild(overSampleSelect)
  el.appendChild(overSampleContainer)
}
},{"make-distortion-curve":3}],10:[function(require,module,exports){

var context = new (window.AudioContext || window.webkitAudioContext)()
var ui = require('../').generate

var osc = context.createOscillator()
var oscEl = ui(osc)

var filter = context.createBiquadFilter()
var filterEl = ui(filter)

var gain = context.createGain()
var gainEl = ui(gain)

document.body.appendChild(oscEl)
document.body.appendChild(filterEl)
document.body.appendChild(gainEl)

var delay = context.createDelay()
var delayEl = ui(delay)

document.body.appendChild(delayEl)

osc.connect(filter)
filter.connect(gain)
gain.connect(delay)
delay.connect(context.destination)
gain.gain.value = 0.1
osc.start()
},{"../":1}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nZXQtb2JqZWN0LXR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWFrZS1kaXN0b3J0aW9uLWN1cnZlL2luZGV4LmpzIiwic3JjL2NyZWF0ZS1hdWRpby1idWZmZXItc291cmNlLmpzIiwic3JjL2NyZWF0ZS1iaXF1YWQtZmlsdGVyLmpzIiwic3JjL2NyZWF0ZS1kZWxheS5qcyIsInNyYy9jcmVhdGUtZ2Fpbi5qcyIsInNyYy9jcmVhdGUtb3NjaWxsYXRvci5qcyIsInNyYy9jcmVhdGUtd2F2ZS1zaGFwZXIuanMiLCJ3d3cvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdHlwZXkgPSByZXF1aXJlKCdnZXQtb2JqZWN0LXR5cGUnKVxudmFyIGNyZWF0ZU9zY2lsbGF0b3IgPSByZXF1aXJlKCcuL3NyYy9jcmVhdGUtb3NjaWxsYXRvcicpXG52YXIgY3JlYXRlRGVsYXkgPSByZXF1aXJlKCcuL3NyYy9jcmVhdGUtZGVsYXknKVxudmFyIGNyZWF0ZUJpcXVhZEZpbHRlciA9IHJlcXVpcmUoJy4vc3JjL2NyZWF0ZS1iaXF1YWQtZmlsdGVyJylcbnZhciBjcmVhdGVHYWluID0gcmVxdWlyZSgnLi9zcmMvY3JlYXRlLWdhaW4nKVxudmFyIGNyZWF0ZUF1ZGlvQnVmZmVyU291cmNlID0gcmVxdWlyZSgnLi9zcmMvY3JlYXRlLWF1ZGlvLWJ1ZmZlci1zb3VyY2UnKVxudmFyIGNyZWF0ZVdhdmVTaGFwZXIgPSByZXF1aXJlKCcuL3NyYy9jcmVhdGUtd2F2ZS1zaGFwZXInKVxuXG52YXIgZ2VuZXJhdGUgPSBmdW5jdGlvbihub2RlKXtcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgc3dpdGNoICh0eXBleShub2RlKSl7XG4gICAgY2FzZSAnT3NjaWxsYXRvck5vZGUnOlxuICAgICAgY3JlYXRlT3NjaWxsYXRvcihlbCwgbm9kZSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnRGVsYXlOb2RlJzpcbiAgICAgIGNyZWF0ZURlbGF5KGVsLCBub2RlKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdHYWluTm9kZSc6XG4gICAgICBjcmVhdGVHYWluKGVsLCBub2RlKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdXYXZlU2hhcGVyTm9kZSc6XG4gICAgICBjcmVhdGVXYXZlU2hhcGVyKGVsLCBub2RlKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdBdWRpb0J1ZmZlclNvdXJjZU5vZGUnOlxuICAgICAgY3JlYXRlQXVkaW9CdWZmZXJTb3VyY2UoZWwsIG5vZGUpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0JpcXVhZEZpbHRlck5vZGUnOlxuICAgICAgY3JlYXRlQmlxdWFkRmlsdGVyKGVsLCBub2RlKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS5sb2coJ2JvcmsnKVxuICB9XG4gIHJldHVybiBlbFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2VuZXJhdGU6IGdlbmVyYXRlLFxuICBjcmVhdGVPc2NpbGxhdG9yOiBjcmVhdGVPc2NpbGxhdG9yLFxuICBjcmVhdGVEZWxheTogY3JlYXRlRGVsYXksXG4gIGNyZWF0ZUJpcXVhZEZpbHRlcjogY3JlYXRlQmlxdWFkRmlsdGVyLFxuICBjcmVhdGVHYWluOiBjcmVhdGVHYWluLFxuICBjcmVhdGVBdWRpb0J1ZmZlclNvdXJjZTogY3JlYXRlQXVkaW9CdWZmZXJTb3VyY2Vcbn1cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiAoe30pLnRvU3RyaW5nLmNhbGwob2JqKS5zbGljZSg4LCAtMSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgdmFyIGsgPSB0eXBlb2YgYW1vdW50ID09PSAnbnVtYmVyJyA/IGFtb3VudCA6IDUwLFxuICAgIG5fc2FtcGxlcyA9IDQ0MTAwLFxuICAgIGN1cnZlID0gbmV3IEZsb2F0MzJBcnJheShuX3NhbXBsZXMpLFxuICAgIGRlZyA9IE1hdGguUEkgLyAxODAsXG4gICAgaSA9IDAsXG4gICAgeDtcbiAgZm9yICggOyBpIDwgbl9zYW1wbGVzOyArK2kgKSB7XG4gICAgeCA9IGkgKiAyIC8gbl9zYW1wbGVzIC0gMTtcbiAgICBjdXJ2ZVtpXSA9ICggMyArIGsgKSAqIHggKiAyMCAqIGRlZyAvICggTWF0aC5QSSArIGsgKiBNYXRoLmFicyh4KSApO1xuICB9XG4gIHJldHVybiBjdXJ2ZTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwsIG5vZGUpe1xuICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm5vZGUtY29udGFpbmVyIGF1ZGlvLWJ1ZmZlci1zb3VyY2VcIilcblxuICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBsYWJlbC50ZXh0Q29udGVudCA9IFwiQXVkaW9CdWZmZXJTb3VyY2VcIlxuICBsYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxhYmVsIG5vZGUtbGFiZWxcIilcbiAgZWwuYXBwZW5kQ2hpbGQobGFiZWwpXG5cbiAgLy8gdmFyIGRldHVuZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgLy8gZGV0dW5lQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZGV0dW5lLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgLy8gdmFyIGRldHVuZVJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gIC8vIGRldHVuZVJhbmdlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYW5nZVwiKVxuICAvLyBkZXR1bmVSYW5nZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRldHVuZS1yYW5nZVwiKVxuICAvLyBkZXR1bmVSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgLTEyMDApXG4gIC8vIGRldHVuZVJhbmdlLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIG5vZGUuZGV0dW5lLnZhbHVlKVxuICAvLyBkZXR1bmVSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgMTIwMClcbiAgLy8gdmFyIGRldHVuZUluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAvLyBkZXR1bmVJbmZvLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZGV0dW5lLWluZm9cIilcbiAgLy8gZGV0dW5lSW5mby50ZXh0Q29udGVudCA9IG5vZGUuZGV0dW5lLnZhbHVlXG4gIC8vIGRldHVuZVJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gIC8vICAgbm9kZS5kZXR1bmUudmFsdWUgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gIC8vICAgZGV0dW5lSW5mby50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXJcbiAgLy8gfSlcbiAgLy8gdmFyIGRldHVuZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgLy8gZGV0dW5lTGFiZWwudGV4dENvbnRlbnQgPSBcImRldHVuZVwiXG4gIC8vIGRldHVuZUxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgZWwtbGFiZWxcIilcbiAgLy8gZGV0dW5lQ29udGFpbmVyLmFwcGVuZENoaWxkKGRldHVuZUxhYmVsKVxuICAvLyBkZXR1bmVDb250YWluZXIuYXBwZW5kQ2hpbGQoZGV0dW5lUmFuZ2UpXG4gIC8vIGRldHVuZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkZXR1bmVJbmZvKVxuICAvLyBlbC5hcHBlbmRDaGlsZChkZXR1bmVDb250YWluZXIpXG5cbiAgdmFyIHBsYXlCYWNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBwbGF5QmFja0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBsYXktYmFjay1jb250YWluZXIgZWwtY29udGFpbmVyXCIpXG4gIHZhciBwbGF5QmFja1JhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gIHBsYXlCYWNrUmFuZ2Uuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhbmdlXCIpXG4gIHBsYXlCYWNrUmFuZ2Uuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwbGF5LWJhY2stcmFuZ2VcIilcbiAgcGxheUJhY2tSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgMC4xKVxuICBwbGF5QmFja1JhbmdlLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIG5vZGUucGxheWJhY2tSYXRlLnZhbHVlKVxuICBwbGF5QmFja1JhbmdlLnNldEF0dHJpYnV0ZShcIm1heFwiLCAxMClcbiAgcGxheUJhY2tSYW5nZS5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIDAuMDUpXG4gIHZhciBwbGF5QmFja0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBwbGF5QmFja0luZm8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwbGF5LWJhY2staW5mb1wiKVxuICBwbGF5QmFja0luZm8udGV4dENvbnRlbnQgPSBub2RlLnBsYXliYWNrUmF0ZS52YWx1ZVxuICBwbGF5QmFja1JhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgbm9kZS5wbGF5YmFja1JhdGUudmFsdWUgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gICAgcGxheUJhY2tJbmZvLnRleHRDb250ZW50ID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICB9KVxuICB2YXIgcGxheUJhY2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIHBsYXlCYWNrTGFiZWwudGV4dENvbnRlbnQgPSBcInBsYXlCYWNrXCJcbiAgcGxheUJhY2tMYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxhYmVsIGVsLWxhYmVsXCIpXG4gIHBsYXlCYWNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXlCYWNrTGFiZWwpXG4gIHBsYXlCYWNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXlCYWNrUmFuZ2UpXG4gIHBsYXlCYWNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXlCYWNrSW5mbylcbiAgZWwuYXBwZW5kQ2hpbGQocGxheUJhY2tDb250YWluZXIpXG5cbiAgdmFyIGxvb3BDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIGxvb3BDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsb29wLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgdmFyIGxvb3BTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpXG4gIGxvb3BTZWxlY3Quc2V0QXR0cmlidXRlKFwibG9vcFwiLCBcInRleHRcIilcbiAgbG9vcFNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxvb3Atc2VsZWN0XCIpXG4gIHZhciBsb29wcyA9IFsnZmFsc2UnLCAndHJ1ZSddXG4gIGxvb3BzLmZvckVhY2goZnVuY3Rpb24obG9vcCl7XG4gICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbiAgICBvcHQudGV4dENvbnRlbnQgPSBsb29wXG4gICAgb3B0LnZhbHVlID0gKGxvb3AgPT0gJ3RydWUnKSA/IDEgOiAwXG4gICAgbG9vcFNlbGVjdC5hcHBlbmRDaGlsZChvcHQpXG4gIH0pXG4gIGxvb3BTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBub2RlLmxvb3AgPSBCb29sZWFuKGUudGFyZ2V0LnZhbHVlKVxuICB9KVxuICB2YXIgbG9vcExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgbG9vcExhYmVsLnRleHRDb250ZW50ID0gXCJsb29wXCJcbiAgbG9vcExhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgZWwtbGFiZWxcIilcbiAgbG9vcENvbnRhaW5lci5hcHBlbmRDaGlsZChsb29wTGFiZWwpXG4gIGxvb3BDb250YWluZXIuYXBwZW5kQ2hpbGQobG9vcFNlbGVjdClcbiAgZWwuYXBwZW5kQ2hpbGQobG9vcENvbnRhaW5lcilcblxuICB2YXIgbG9vcFN0YXJ0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBsb29wU3RhcnRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsb29wLXN0YXJ0LWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgdmFyIGxvb3BTdGFydFJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gIGxvb3BTdGFydFJhbmdlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYW5nZVwiKVxuICBsb29wU3RhcnRSYW5nZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxvb3Atc3RhcnQtcmFuZ2VcIilcbiAgbG9vcFN0YXJ0UmFuZ2Uuc2V0QXR0cmlidXRlKFwibWluXCIsIDApXG4gIGxvb3BTdGFydFJhbmdlLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIG5vZGUubG9vcFN0YXJ0KVxuICBsb29wU3RhcnRSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgMTAwKVxuICBsb29wU3RhcnRSYW5nZS5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIDAuMDUpXG4gIHZhciBsb29wU3RhcnRJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgbG9vcFN0YXJ0SW5mby5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxvb3Atc3RhcnQtaW5mb1wiKVxuICBsb29wU3RhcnRJbmZvLnRleHRDb250ZW50ID0gbm9kZS5sb29wU3RhcnRcbiAgbG9vcFN0YXJ0UmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBub2RlLmxvb3BTdGFydCA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXJcbiAgICBsb29wU3RhcnRJbmZvLnRleHRDb250ZW50ID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICB9KVxuICB2YXIgbG9vcFN0YXJ0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBsb29wU3RhcnRMYWJlbC50ZXh0Q29udGVudCA9IFwibG9vcFN0YXJ0XCJcbiAgbG9vcFN0YXJ0TGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsYWJlbCBlbC1sYWJlbFwiKVxuICBsb29wU3RhcnRDb250YWluZXIuYXBwZW5kQ2hpbGQobG9vcFN0YXJ0TGFiZWwpXG4gIGxvb3BTdGFydENvbnRhaW5lci5hcHBlbmRDaGlsZChsb29wU3RhcnRSYW5nZSlcbiAgbG9vcFN0YXJ0Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvb3BTdGFydEluZm8pXG4gIGVsLmFwcGVuZENoaWxkKGxvb3BTdGFydENvbnRhaW5lcilcblxuICB2YXIgbG9vcEVuZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgbG9vcEVuZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxvb3AtZW5kLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgdmFyIGxvb3BFbmRSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICBsb29wRW5kUmFuZ2Uuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhbmdlXCIpXG4gIGxvb3BFbmRSYW5nZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxvb3AtZW5kLXJhbmdlXCIpXG4gIGxvb3BFbmRSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgMClcbiAgbG9vcEVuZFJhbmdlLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIG5vZGUubG9vcEVuZClcbiAgbG9vcEVuZFJhbmdlLnNldEF0dHJpYnV0ZShcIm1heFwiLCAxMDApXG4gIGxvb3BFbmRSYW5nZS5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIDAuMDUpXG4gIHZhciBsb29wRW5kSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGxvb3BFbmRJbmZvLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibG9vcC1lbmQtaW5mb1wiKVxuICBsb29wRW5kSW5mby50ZXh0Q29udGVudCA9IG5vZGUubG9vcEVuZFxuICBsb29wRW5kUmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBub2RlLmxvb3BFbmQgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gICAgbG9vcEVuZEluZm8udGV4dENvbnRlbnQgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gIH0pXG4gIHZhciBsb29wRW5kTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBsb29wRW5kTGFiZWwudGV4dENvbnRlbnQgPSBcImxvb3BFbmRcIlxuICBsb29wRW5kTGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsYWJlbCBlbC1sYWJlbFwiKVxuICBsb29wRW5kQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvb3BFbmRMYWJlbClcbiAgbG9vcEVuZENvbnRhaW5lci5hcHBlbmRDaGlsZChsb29wRW5kUmFuZ2UpXG4gIGxvb3BFbmRDb250YWluZXIuYXBwZW5kQ2hpbGQobG9vcEVuZEluZm8pXG4gIGVsLmFwcGVuZENoaWxkKGxvb3BFbmRDb250YWluZXIpXG5cblxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwsIG5vZGUpe1xuICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm5vZGUtY29udGFpbmVyIGZpbHRlclwiKVxuXG4gIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGxhYmVsLnRleHRDb250ZW50ID0gXCJCaXF1YWRGaWx0ZXJcIlxuICBsYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxhYmVsIG5vZGUtbGFiZWxcIilcbiAgZWwuYXBwZW5kQ2hpbGQobGFiZWwpXG5cbiAgdmFyIGZyZXFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIGZyZXFDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmcmVxLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgdmFyIGZyZXFSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICBmcmVxUmFuZ2Uuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhbmdlXCIpXG4gIGZyZXFSYW5nZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZyZXEtcmFuZ2VcIilcbiAgZnJlcVJhbmdlLnNldEF0dHJpYnV0ZShcIm1pblwiLCAxKVxuICBmcmVxUmFuZ2Uuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgbm9kZS5mcmVxdWVuY3kudmFsdWUpXG4gIGZyZXFSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgNTAwMClcbiAgdmFyIGZyZXFJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgZnJlcUluZm8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmcmVxLWluZm9cIilcbiAgZnJlcVJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgbm9kZS5mcmVxdWVuY3kudmFsdWUgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gICAgZnJlcUluZm8udGV4dENvbnRlbnQgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gIH0pXG4gIHZhciBmcmVxTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBmcmVxTGFiZWwudGV4dENvbnRlbnQgPSBcImZyZXF1ZW5jeVwiXG4gIGZyZXFMYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxhYmVsIGVsLWxhYmVsXCIpXG4gIGZyZXFDb250YWluZXIuYXBwZW5kQ2hpbGQoZnJlcUxhYmVsKVxuICBmcmVxQ29udGFpbmVyLmFwcGVuZENoaWxkKGZyZXFSYW5nZSlcbiAgZnJlcUNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmVxSW5mbylcbiAgZWwuYXBwZW5kQ2hpbGQoZnJlcUNvbnRhaW5lcilcblxuICB2YXIgZGV0dW5lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBkZXR1bmVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkZXR1bmUtY29udGFpbmVyIGVsLWNvbnRhaW5lclwiKVxuICB2YXIgZGV0dW5lUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgZGV0dW5lUmFuZ2Uuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhbmdlXCIpXG4gIGRldHVuZVJhbmdlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZGV0dW5lLXJhbmdlXCIpXG4gIGRldHVuZVJhbmdlLnNldEF0dHJpYnV0ZShcIm1pblwiLCAtMTIwMClcbiAgZGV0dW5lUmFuZ2Uuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgbm9kZS5kZXR1bmUudmFsdWUpXG4gIGRldHVuZVJhbmdlLnNldEF0dHJpYnV0ZShcIm1heFwiLCAxMjAwKVxuICB2YXIgZGV0dW5lSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGRldHVuZUluZm8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkZXR1bmUtaW5mb1wiKVxuICBkZXR1bmVJbmZvLnRleHRDb250ZW50ID0gbm9kZS5kZXR1bmUudmFsdWVcbiAgZGV0dW5lUmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBub2RlLmRldHVuZS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXJcbiAgICBkZXR1bmVJbmZvLnRleHRDb250ZW50ID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICB9KVxuICB2YXIgZGV0dW5lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBkZXR1bmVMYWJlbC50ZXh0Q29udGVudCA9IFwiZGV0dW5lXCJcbiAgZGV0dW5lTGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsYWJlbCBlbC1sYWJlbFwiKVxuICBkZXR1bmVDb250YWluZXIuYXBwZW5kQ2hpbGQoZGV0dW5lTGFiZWwpXG4gIGRldHVuZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkZXR1bmVSYW5nZSlcbiAgZGV0dW5lQ29udGFpbmVyLmFwcGVuZENoaWxkKGRldHVuZUluZm8pXG4gIGVsLmFwcGVuZENoaWxkKGRldHVuZUNvbnRhaW5lcilcblxuICB2YXIgcUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgcUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInEtY29udGFpbmVyIGVsLWNvbnRhaW5lclwiKVxuICB2YXIgcVJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gIHFSYW5nZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFuZ2VcIilcbiAgcVJhbmdlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicS1yYW5nZVwiKVxuICBxUmFuZ2Uuc2V0QXR0cmlidXRlKFwibWluXCIsIDApXG4gIHFSYW5nZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBub2RlLlEudmFsdWUpXG4gIHFSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgMTAwMClcbiAgdmFyIHFJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgcUluZm8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJxLWluZm9cIilcbiAgcUluZm8udGV4dENvbnRlbnQgPSBub2RlLlEudmFsdWVcbiAgcVJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgbm9kZS5RLnZhbHVlID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICAgIHFJbmZvLnRleHRDb250ZW50ID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICB9KVxuICB2YXIgcUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgcUxhYmVsLnRleHRDb250ZW50ID0gXCJRXCJcbiAgcUxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgZWwtbGFiZWxcIilcbiAgcUNvbnRhaW5lci5hcHBlbmRDaGlsZChxTGFiZWwpXG4gIHFDb250YWluZXIuYXBwZW5kQ2hpbGQocVJhbmdlKVxuICBxQ29udGFpbmVyLmFwcGVuZENoaWxkKHFJbmZvKVxuICBlbC5hcHBlbmRDaGlsZChxQ29udGFpbmVyKVxuXG4gIHZhciBnYWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBnYWluQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ2Fpbi1jb250YWluZXIgZWwtY29udGFpbmVyXCIpXG4gIHZhciBnYWluUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgZ2FpblJhbmdlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYW5nZVwiKVxuICBnYWluUmFuZ2Uuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJnYWluLXJhbmdlXCIpXG4gIGdhaW5SYW5nZS5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgLTQwKVxuICBnYWluUmFuZ2Uuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgbm9kZS5nYWluLnZhbHVlKVxuICBnYWluUmFuZ2Uuc2V0QXR0cmlidXRlKFwibWF4XCIsIDQwKVxuICB2YXIgZ2FpbkluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBnYWluSW5mby5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImdhaW4taW5mb1wiKVxuICBnYWluSW5mby50ZXh0Q29udGVudCA9IG5vZGUuZ2Fpbi52YWx1ZVxuICBnYWluUmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBub2RlLmdhaW4udmFsdWUgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gICAgZ2FpbkluZm8udGV4dENvbnRlbnQgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gIH0pXG4gIHZhciBnYWluTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBnYWluTGFiZWwudGV4dENvbnRlbnQgPSBcImdhaW5cIlxuICBnYWluTGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsYWJlbCBlbC1sYWJlbFwiKVxuICBnYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhaW5MYWJlbClcbiAgZ2FpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYWluUmFuZ2UpXG4gIGdhaW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZ2FpbkluZm8pXG4gIGVsLmFwcGVuZENoaWxkKGdhaW5Db250YWluZXIpXG5cbiAgdmFyIHR5cGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIHR5cGVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0eXBlLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgdmFyIHR5cGVTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpXG4gIHR5cGVTZWxlY3Quc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIilcbiAgdHlwZVNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInR5cGUtc2VsZWN0XCIpXG4gIHZhciB0eXBlcyA9IFsnbG93cGFzcycsJ2hpZ2hwYXNzJywnYmFuZHBhc3MnLCdsb3dzaGVsZicsJ2hpZ2hzaGVsZicsJ3BlYWtpbmcnLCdub3RjaCcsJ2FsbHBhc3MnXVxuICB0eXBlcy5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpe1xuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgb3B0LnZhbHVlID0gb3B0LnRleHRDb250ZW50ID0gdHlwZVxuICAgIHR5cGVTZWxlY3QuYXBwZW5kQ2hpbGQob3B0KVxuICB9KVxuICB0eXBlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgbm9kZS50eXBlID0gZS50YXJnZXQudmFsdWVcbiAgfSlcbiAgdmFyIHR5cGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIHR5cGVMYWJlbC50ZXh0Q29udGVudCA9IFwidHlwZVwiXG4gIHR5cGVMYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxhYmVsIGVsLWxhYmVsXCIpXG4gIHR5cGVDb250YWluZXIuYXBwZW5kQ2hpbGQodHlwZUxhYmVsKVxuICB0eXBlQ29udGFpbmVyLmFwcGVuZENoaWxkKHR5cGVTZWxlY3QpXG4gIGVsLmFwcGVuZENoaWxkKHR5cGVDb250YWluZXIpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsLCBub2RlKXtcbiAgZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJub2RlLWNvbnRhaW5lciBkZWxheVwiKVxuXG4gIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGxhYmVsLnRleHRDb250ZW50ID0gXCJEZWxheVwiXG4gIGxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgbm9kZS1sYWJlbFwiKVxuICBlbC5hcHBlbmRDaGlsZChsYWJlbClcblxuICB2YXIgZGVsYXlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIGRlbGF5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZGVsYXktY29udGFpbmVyIGVsLWNvbnRhaW5lclwiKVxuICB2YXIgZGVsYXlSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICBkZWxheVJhbmdlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYW5nZVwiKVxuICBkZWxheVJhbmdlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZGVsYXktcmFuZ2VcIilcbiAgZGVsYXlSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgMClcbiAgZGVsYXlSYW5nZS5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIDAuMSlcbiAgZGVsYXlSYW5nZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBub2RlLmRlbGF5VGltZS52YWx1ZSlcbiAgZGVsYXlSYW5nZS5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgMTApXG4gIHZhciBkZWxheUluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBkZWxheUluZm8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkZWxheS1pbmZvXCIpXG4gIGRlbGF5SW5mby50ZXh0Q29udGVudCA9IG5vZGUuZGVsYXlUaW1lLnZhbHVlXG4gIGRlbGF5UmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBub2RlLmRlbGF5VGltZS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXJcbiAgICBkZWxheUluZm8udGV4dENvbnRlbnQgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gIH0pXG4gIHZhciBkZWxheUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgZGVsYXlMYWJlbC50ZXh0Q29udGVudCA9IFwiVGltZVwiXG4gIGRlbGF5TGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsYWJlbCBlbC1sYWJlbFwiKVxuICBkZWxheUNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxheUxhYmVsKVxuICBkZWxheUNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxheVJhbmdlKVxuICBkZWxheUNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxheUluZm8pXG4gIGVsLmFwcGVuZENoaWxkKGRlbGF5Q29udGFpbmVyKVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwsIG5vZGUpe1xuICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm5vZGUtY29udGFpbmVyIGdhaW5cIilcblxuICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBsYWJlbC50ZXh0Q29udGVudCA9IFwiR2FpblwiXG4gIGxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgbm9kZS1sYWJlbFwiKVxuICBlbC5hcHBlbmRDaGlsZChsYWJlbClcblxuICB2YXIgZ2FpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgZ2FpbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImdhaW4tY29udGFpbmVyIGVsLWNvbnRhaW5lclwiKVxuICB2YXIgZ2FpblJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gIGdhaW5SYW5nZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFuZ2VcIilcbiAgZ2FpblJhbmdlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ2Fpbi1yYW5nZVwiKVxuICBnYWluUmFuZ2Uuc2V0QXR0cmlidXRlKFwibWluXCIsIDApXG4gIGdhaW5SYW5nZS5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIDAuMDUpXG4gIGdhaW5SYW5nZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBub2RlLmdhaW4udmFsdWUpXG4gIGdhaW5SYW5nZS5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgMSlcbiAgdmFyIGdhaW5JbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgZ2FpbkluZm8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJnYWluLWluZm9cIilcbiAgZ2FpbkluZm8udGV4dENvbnRlbnQgPSBub2RlLmdhaW4udmFsdWVcbiAgZ2FpblJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgbm9kZS5nYWluLnZhbHVlID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICAgIGdhaW5JbmZvLnRleHRDb250ZW50ID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICB9KVxuICB2YXIgZ2FpbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgZ2FpbkxhYmVsLnRleHRDb250ZW50ID0gXCJnYWluXCJcbiAgZ2FpbkxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgZWwtbGFiZWxcIilcbiAgZ2FpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYWluTGFiZWwpXG4gIGdhaW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZ2FpblJhbmdlKVxuICBnYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhaW5JbmZvKVxuICBlbC5hcHBlbmRDaGlsZChnYWluQ29udGFpbmVyKVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwsIG5vZGUpe1xuICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm5vZGUtY29udGFpbmVyIG9zY2lsbGF0b3JcIilcblxuICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBsYWJlbC50ZXh0Q29udGVudCA9IFwiT3NjaWxsYXRvclwiXG4gIGxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgbm9kZS1sYWJlbFwiKVxuICBlbC5hcHBlbmRDaGlsZChsYWJlbClcblxuICB2YXIgZnJlcUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgZnJlcUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZyZXEtY29udGFpbmVyIGVsLWNvbnRhaW5lclwiKVxuICB2YXIgZnJlcVJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gIGZyZXFSYW5nZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFuZ2VcIilcbiAgZnJlcVJhbmdlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZnJlcS1yYW5nZVwiKVxuICBmcmVxUmFuZ2Uuc2V0QXR0cmlidXRlKFwibWluXCIsIDEpXG4gIGZyZXFSYW5nZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBub2RlLmZyZXF1ZW5jeS52YWx1ZSlcbiAgZnJlcVJhbmdlLnNldEF0dHJpYnV0ZShcIm1heFwiLCA1MDAwKVxuICB2YXIgZnJlcUluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBmcmVxSW5mby5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZyZXEtaW5mb1wiKVxuICBmcmVxUmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBub2RlLmZyZXF1ZW5jeS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXJcbiAgICBmcmVxSW5mby50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXJcbiAgfSlcbiAgdmFyIGZyZXFMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGZyZXFMYWJlbC50ZXh0Q29udGVudCA9IFwiZnJlcXVlbmN5XCJcbiAgZnJlcUxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgZWwtbGFiZWxcIilcbiAgZnJlcUNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmVxTGFiZWwpXG4gIGZyZXFDb250YWluZXIuYXBwZW5kQ2hpbGQoZnJlcVJhbmdlKVxuICBmcmVxQ29udGFpbmVyLmFwcGVuZENoaWxkKGZyZXFJbmZvKVxuICBlbC5hcHBlbmRDaGlsZChmcmVxQ29udGFpbmVyKVxuXG4gIHZhciBkZXR1bmVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIGRldHVuZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRldHVuZS1jb250YWluZXIgZWwtY29udGFpbmVyXCIpXG4gIHZhciBkZXR1bmVSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICBkZXR1bmVSYW5nZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFuZ2VcIilcbiAgZGV0dW5lUmFuZ2Uuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkZXR1bmUtcmFuZ2VcIilcbiAgZGV0dW5lUmFuZ2Uuc2V0QXR0cmlidXRlKFwibWluXCIsIC0xMjAwKVxuICBkZXR1bmVSYW5nZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBub2RlLmRldHVuZS52YWx1ZSlcbiAgZGV0dW5lUmFuZ2Uuc2V0QXR0cmlidXRlKFwibWF4XCIsIDEyMDApXG4gIHZhciBkZXR1bmVJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgZGV0dW5lSW5mby5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRldHVuZS1pbmZvXCIpXG4gIGRldHVuZUluZm8udGV4dENvbnRlbnQgPSBub2RlLmRldHVuZS52YWx1ZVxuICBkZXR1bmVSYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpe1xuICAgIG5vZGUuZGV0dW5lLnZhbHVlID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICAgIGRldHVuZUluZm8udGV4dENvbnRlbnQgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyXG4gIH0pXG4gIHZhciBkZXR1bmVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGRldHVuZUxhYmVsLnRleHRDb250ZW50ID0gXCJkZXR1bmVcIlxuICBkZXR1bmVMYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxhYmVsIGVsLWxhYmVsXCIpXG4gIGRldHVuZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkZXR1bmVMYWJlbClcbiAgZGV0dW5lQ29udGFpbmVyLmFwcGVuZENoaWxkKGRldHVuZVJhbmdlKVxuICBkZXR1bmVDb250YWluZXIuYXBwZW5kQ2hpbGQoZGV0dW5lSW5mbylcbiAgZWwuYXBwZW5kQ2hpbGQoZGV0dW5lQ29udGFpbmVyKVxuXG4gIHZhciB0eXBlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICB0eXBlQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidHlwZS1jb250YWluZXIgZWwtY29udGFpbmVyXCIpXG4gIHZhciB0eXBlU2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuICB0eXBlU2VsZWN0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpXG4gIHR5cGVTZWxlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0eXBlLXNlbGVjdFwiKVxuICB2YXIgdHlwZXMgPSBbJ3NpbmUnLCAnc3F1YXJlJywgJ3Nhd3Rvb3RoJywgJ3RyaWFuZ2xlJ11cbiAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgIG9wdC52YWx1ZSA9IG9wdC50ZXh0Q29udGVudCA9IHR5cGVcbiAgICB0eXBlU2VsZWN0LmFwcGVuZENoaWxkKG9wdClcbiAgfSlcbiAgdHlwZVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpe1xuICAgIG5vZGUudHlwZSA9IGUudGFyZ2V0LnZhbHVlXG4gIH0pXG4gIHZhciB0eXBlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICB0eXBlTGFiZWwudGV4dENvbnRlbnQgPSBcInR5cGVcIlxuICB0eXBlTGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsYWJlbCBlbC1sYWJlbFwiKVxuICB0eXBlQ29udGFpbmVyLmFwcGVuZENoaWxkKHR5cGVMYWJlbClcbiAgdHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0eXBlU2VsZWN0KVxuICBlbC5hcHBlbmRDaGlsZCh0eXBlQ29udGFpbmVyKVxufSIsInZhciBtYWtlRGlzdG9ydGlvbkN1cnZlID0gcmVxdWlyZSgnbWFrZS1kaXN0b3J0aW9uLWN1cnZlJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgbm9kZSl7XG4gIHZhciBhbW91bnQgPSAxMDBcbiAgbm9kZS5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoMTAwKVxuICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm5vZGUtY29udGFpbmVyIGdhaW5cIilcblxuICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBsYWJlbC50ZXh0Q29udGVudCA9IFwiR2FpblwiXG4gIGxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgbm9kZS1sYWJlbFwiKVxuICBlbC5hcHBlbmRDaGlsZChsYWJlbClcblxuICB2YXIgYW1vdW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBhbW91bnRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhbW91bnQtY29udGFpbmVyIGVsLWNvbnRhaW5lclwiKVxuICB2YXIgYW1vdW50UmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgYW1vdW50UmFuZ2Uuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJhbmdlXCIpXG4gIGFtb3VudFJhbmdlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYW1vdW50LXJhbmdlXCIpXG4gIGFtb3VudFJhbmdlLnNldEF0dHJpYnV0ZShcIm1pblwiLCAwKVxuICBhbW91bnRSYW5nZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBhbW91bnQpXG4gIGFtb3VudFJhbmdlLnNldEF0dHJpYnV0ZShcIm1heFwiLCAxMDAwKVxuICB2YXIgYW1vdW50SW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGFtb3VudEluZm8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhbW91bnQtaW5mb1wiKVxuICBhbW91bnRJbmZvLnRleHRDb250ZW50ID0gYW1vdW50XG4gIGFtb3VudFJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgbm9kZS5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoZS50YXJnZXQudmFsdWVBc051bWJlcilcbiAgICBhbW91bnRJbmZvLnRleHRDb250ZW50ID0gZS50YXJnZXQudmFsdWVBc051bWJlclxuICB9KVxuICB2YXIgYW1vdW50TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBhbW91bnRMYWJlbC50ZXh0Q29udGVudCA9IFwiYW1vdW50XCJcbiAgYW1vdW50TGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsYWJlbCBlbC1sYWJlbFwiKVxuICBhbW91bnRDb250YWluZXIuYXBwZW5kQ2hpbGQoYW1vdW50TGFiZWwpXG4gIGFtb3VudENvbnRhaW5lci5hcHBlbmRDaGlsZChhbW91bnRSYW5nZSlcbiAgYW1vdW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGFtb3VudEluZm8pXG4gIGVsLmFwcGVuZENoaWxkKGFtb3VudENvbnRhaW5lcilcblxuICB2YXIgb3ZlclNhbXBsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgb3ZlclNhbXBsZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm92ZXItc2FtcGxlLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgdmFyIG92ZXJTYW1wbGVTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpXG4gIG92ZXJTYW1wbGVTZWxlY3Quc2V0QXR0cmlidXRlKFwib3ZlclNhbXBsZVwiLCBcInRleHRcIilcbiAgb3ZlclNhbXBsZVNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm92ZXItc2FtcGxlLXNlbGVjdFwiKVxuICB2YXIgb3ZlclNhbXBsZXMgPSBbJ25vbmUnLCAnMngnLCAnNHgnXVxuICBvdmVyU2FtcGxlcy5mb3JFYWNoKGZ1bmN0aW9uKG92ZXJTYW1wbGUpe1xuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgb3B0LnZhbHVlID0gb3B0LnRleHRDb250ZW50ID0gb3ZlclNhbXBsZVxuICAgIG92ZXJTYW1wbGVTZWxlY3QuYXBwZW5kQ2hpbGQob3B0KVxuICB9KVxuICBvdmVyU2FtcGxlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgbm9kZS5vdmVyc2FtcGxlID0gZS50YXJnZXQudmFsdWVcbiAgfSlcbiAgdmFyIG92ZXJTYW1wbGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIG92ZXJTYW1wbGVMYWJlbC50ZXh0Q29udGVudCA9IFwib3ZlclNhbXBsZVwiXG4gIG92ZXJTYW1wbGVMYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxhYmVsIGVsLWxhYmVsXCIpXG4gIG92ZXJTYW1wbGVDb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlclNhbXBsZUxhYmVsKVxuICBvdmVyU2FtcGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKG92ZXJTYW1wbGVTZWxlY3QpXG4gIGVsLmFwcGVuZENoaWxkKG92ZXJTYW1wbGVDb250YWluZXIpXG59IiwiXG52YXIgY29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpXG52YXIgdWkgPSByZXF1aXJlKCcuLi8nKS5nZW5lcmF0ZVxuXG52YXIgb3NjID0gY29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcbnZhciBvc2NFbCA9IHVpKG9zYylcblxudmFyIGZpbHRlciA9IGNvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcbnZhciBmaWx0ZXJFbCA9IHVpKGZpbHRlcilcblxudmFyIGdhaW4gPSBjb250ZXh0LmNyZWF0ZUdhaW4oKVxudmFyIGdhaW5FbCA9IHVpKGdhaW4pXG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3NjRWwpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZpbHRlckVsKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYWluRWwpXG5cbnZhciBkZWxheSA9IGNvbnRleHQuY3JlYXRlRGVsYXkoKVxudmFyIGRlbGF5RWwgPSB1aShkZWxheSlcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkZWxheUVsKVxuXG5vc2MuY29ubmVjdChmaWx0ZXIpXG5maWx0ZXIuY29ubmVjdChnYWluKVxuZ2Fpbi5jb25uZWN0KGRlbGF5KVxuZGVsYXkuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKVxuZ2Fpbi5nYWluLnZhbHVlID0gMC4xXG5vc2Muc3RhcnQoKSJdfQ==
