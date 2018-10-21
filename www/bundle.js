(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var typey = require('get-object-type')

var createEl = require('./src/create-el')
var defaultConfigs = require('./src/config')

module.exports = function(node, cfg){
  var config = cfg || {}
  var type = config.type || typey(node)
  var defaultConfig = defaultConfigs[type] && defaultConfigs[type](node)
  var mergedConfig = Object.assign({}, defaultConfig, config)
  return createEl(node, mergedConfig)
}

},{"./src/config":9,"./src/create-el":13,"get-object-type":2}],2:[function(require,module,exports){
'use strict';

module.exports = exports = function (obj) {
	return ({}).toString.call(obj).slice(8, -1);
};

},{}],3:[function(require,module,exports){
module.exports = function(ac, path, cb){

  var request = new XMLHttpRequest();
  request.open('GET', path, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    ac.decodeAudioData(request.response, cb, onBufferLoadError);
  };

  request.send();

  function onBufferLoadError(err) {
    console.error(err);
  }

}
},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "audio-buffer-source",
    label: "Audio Buffer Source",
    type: "AudioBufferSourceNode",
    attributes: [
      {
        attribute: "detune",
        type: "range",
        label: "Detune",
        min: -3600,
        max: 3600,
        step: "any",
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        }
      },
      {
        attribute: "playbackRate",
        type: "range",
        label: "Playback Rate",
        min: 0.1,
        max: 4,
        step: "any",
        value: node.playbackRate.value,
        update: function (val) {
          node.playbackRate.value = val
        }
      },
      {
        attribute: "loopStart",
        type: "range",
        label: "Loop Start",
        min: 0,
        max: node.buffer.duration,
        step: "any",
        value: node.loopStart,
        update: function (val) {
          node.loopStart = val
        }
      },
      {
        attribute: "loopEnd",
        type: "range",
        label: "Loop End",
        min: 0,
        max: node.buffer.duration,
        step: "any",
        value: node.loopEnd,
        update: function (val) {
          node.loopEnd = val
        }
      },
      {
        attribute: "loop",
        type: "select",
        label: "Loop",
        value: node.loop.toString(),
        update: function (val) {
          node.loop = (val === "true")
        },
        opts: ["false", "true"]
      }
    ]
  }
}
},{}],6:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "filter",
    label: "Filter",
    type: "BiquadFilterNode",
    attributes: [
      {
        attribute: "frequency",
        type: "range",
        label: "Frequency",
        min: 10,
        max: node.context.sampleRate / 2,
        step: "any",
        value: node.frequency.value,
        update: function (val) {
          node.frequency.value = val
        }
      },
      {
        attribute: "detune",
        type: "range",
        label: "Detune",
        min: -3600,
        max: 3600,
        step: 1,
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        }
      },
      {
        attribute: "Q",
        type: "range",
        label: "Q",
        min: 0.0001,
        max: 1000,
        step: "any",
        value: node.Q.value,
        update: function (val) {
          node.Q.value = val
        }
      },
      {
        attribute: "gain",
        type: "range",
        label: "Gain",
        min: 0,
        max: 1,
        step: "any",
        value: node.gain.value,
        update: function (val) {
          node.gain.value = val
        }
      },
      {
        attribute: "type",
        type: "select",
        label: "Type",
        opts: ["lowpass","highpass","bandpass","lowshelf","highshelf","peaking","notch","allpass"],
        value: node.type,
        update: function (val) {
          node.type = val
        }
      }
    ]
  }
}
},{}],7:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "delay",
    label: "Delay",
    type: "DelayNode",
    attributes: [
      {
        attribute: "delayTime",
        type: "range",
        label: "Delay Time",
        min: 0,
        max: 30,
        step: "any",
        value: node.delayTime.value,
        update: function (val) {
          node.delayTime.value = val
        }
      }
    ]
  }
}


},{}],8:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "gain",
    label: "Gain",
    type: "GainNode",
    attributes: [
      {
        attribute: "gain",
        type: "range",
        label: "Gain",
        min: 0,
        max: 1,
        step: "any",
        value: node.gain.value,
        update: function (val) {
          node.gain.value = val
        }
      }
    ]
  }
}
},{}],9:[function(require,module,exports){
module.exports = {
  OscillatorNode: require('./oscillator'),
  AudioBufferSourceNode: require('./audio-buffer-source'),
  BiquadFilterNode: require('./biquad-filter'),
  GainNode: require('./gain'),
  DelayNode: require('./delay'),
  WaveShaperNode: require('./wave-shaper'),
  StereoPannerNode: require('./stereo-panner'),
}
},{"./audio-buffer-source":5,"./biquad-filter":6,"./delay":7,"./gain":8,"./oscillator":10,"./stereo-panner":11,"./wave-shaper":12}],10:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "oscillator",
    label: "Oscillator",
    type: "OscillatorNode",
    attributes: [
      {
        attribute: "frequency",
        type: "range",
        label: "Frequency",
        min: 10,
        max: node.context.sampleRate / 2,
        step: "any",
        value: node.frequency.value,
        update: function (val) {
          node.frequency.value = val
        }
      },
      {
        attribute: "detune",
        type: "range",
        label: "Detune",
        min: -3600,
        max: 3600,
        step: 1,
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        }
      },
      {
        attribute: "type",
        type: "select",
        label: "Type",
        opts: ["sine", "square", "sawtooth", "triangle"],
        value: node.type,
        update: function (val) {
          node.type = val
        }
      }
    ]
  }
}
},{}],11:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "stereo-panner",
    label: "Stereo Panner",
    type: "StereoPannerNode",
    attributes: [
      {
        attribute: "pan",
        type: "range",
        label: "Pan",
        min: -1,
        max: 1,
        step: "any",
        value: node.pan.value,
        update: function (val) {
          node.pan.value = val
        }
      }
    ]
  }
}
},{}],12:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')

module.exports = function (node) {
  var amount = 50
  node.curve = makeDistortionCurve(amount)
  return {
    className: "wave-shaper",
    label: "Wave Shaper",
    type: "WaveShaperNode",
    attributes: [
      {
        attribute: "amount",
        type: "range",
        label: "Amount",
        min: 1,
        max: 5000,
        step: "any",
        value: amount,
        update: function (val) {
          node.curve = makeDistortionCurve(val)
        }
      },
      {
        attribute: "oversample",
        type: "select",
        label: "Oversample",
        opts: ["none", "2x", "4x"],
        value: node.oversample,
        update: function (val) {
          node.oversample = val
        },
      }
    ]
  }
}
},{"make-distortion-curve":4}],13:[function(require,module,exports){
var createRange = require('./create-range')
var createSelect = require('./create-select')

module.exports = function(node, config){
  var el = document.createElement('div')
  el.setAttribute("class", "node-container " + config.className)

  var label = document.createElement("span")
  label.textContent = config.label
  label.setAttribute("class", "label node-label")
  el.appendChild(label)

  config.attributes.forEach(function (attributeConfig) {
    if (attributeConfig.type === 'range') {
      el.appendChild(createRange(attributeConfig))
    } else if (attributeConfig.type === 'select') {
      el.appendChild(createSelect(attributeConfig))
    } else {
      throw 'idk what to do with' + JSON.stringify(attributeConfig)
    }
  })
  return el
}
},{"./create-range":14,"./create-select":15}],14:[function(require,module,exports){
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
  rangeInput.addEventListener("change", function(e){
    config.update(e.target.valueAsNumber)
    rangeLabel.textContent = e.target.valueAsNumber
  })
  var freqLabel = document.createElement("span")
  freqLabel.textContent = config.label
  freqLabel.setAttribute("class", config.attribute + "-label label el-label")
  container.appendChild(freqLabel)
  container.appendChild(rangeInput)
  container.appendChild(rangeLabel)
  
  return container
}
},{}],15:[function(require,module,exports){
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
  selectLabel.textContent = "type"
  selectLabel.setAttribute("class", config.attribute + "-label label el-label")
  selectContainer.appendChild(selectLabel)
  selectContainer.appendChild(selectInput)
  return selectContainer
}
},{}],16:[function(require,module,exports){
var loadSample2Buff = require('load-sample-2-buff')
var context = new (window.AudioContext || window.webkitAudioContext)()
var ui = require('../')

var osc = context.createOscillator()
osc.frequency.value = 440
var oscEl = ui(osc)

var filter = context.createBiquadFilter()
var filterEl = ui(filter)


var pan = context.createStereoPanner()
var panEl = ui(pan)

var gain = context.createGain()
var gainEl = ui(gain)


var delay = context.createDelay()
var delayEl = ui(delay)

document.body.appendChild(oscEl)
document.body.appendChild(filterEl)
document.body.appendChild(gainEl)
document.body.appendChild(delayEl)
document.body.appendChild(panEl)

osc.connect(filter)
filter.connect(gain)
gain.connect(delay)
delay.connect(pan)
pan.connect(context.destination)
gain.gain.value = 0.1
osc.start()


var player = context.createBufferSource()

loadSample2Buff(context, 'www/amen.wav', function(buffer){

  var playerFilter = context.createBiquadFilter()
  var playerGain = context.createGain()
  player.connect(playerFilter)
  playerFilter.connect(playerGain)
  playerGain.connect(context.destination)
  player.buffer = buffer
  player.loop = true
  playerGain.gain.value = 0.3

  var playerEl = ui(player)
  var playerFilterEl = ui(playerFilter)
  var playerGainEl = ui(playerGain)
  document.body.appendChild(playerEl)
  document.body.appendChild(playerFilterEl)
  document.body.appendChild(playerGainEl)

  player.start()
})
},{"../":1,"load-sample-2-buff":3}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nZXQtb2JqZWN0LXR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9hZC1zYW1wbGUtMi1idWZmL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21ha2UtZGlzdG9ydGlvbi1jdXJ2ZS9pbmRleC5qcyIsInNyYy9jb25maWcvYXVkaW8tYnVmZmVyLXNvdXJjZS5qcyIsInNyYy9jb25maWcvYmlxdWFkLWZpbHRlci5qcyIsInNyYy9jb25maWcvZGVsYXkuanMiLCJzcmMvY29uZmlnL2dhaW4uanMiLCJzcmMvY29uZmlnL2luZGV4LmpzIiwic3JjL2NvbmZpZy9vc2NpbGxhdG9yLmpzIiwic3JjL2NvbmZpZy9zdGVyZW8tcGFubmVyLmpzIiwic3JjL2NvbmZpZy93YXZlLXNoYXBlci5qcyIsInNyYy9jcmVhdGUtZWwuanMiLCJzcmMvY3JlYXRlLXJhbmdlLmpzIiwic3JjL2NyZWF0ZS1zZWxlY3QuanMiLCJ3d3cvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIHR5cGV5ID0gcmVxdWlyZSgnZ2V0LW9iamVjdC10eXBlJylcblxudmFyIGNyZWF0ZUVsID0gcmVxdWlyZSgnLi9zcmMvY3JlYXRlLWVsJylcbnZhciBkZWZhdWx0Q29uZmlncyA9IHJlcXVpcmUoJy4vc3JjL2NvbmZpZycpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obm9kZSwgY2ZnKXtcbiAgdmFyIGNvbmZpZyA9IGNmZyB8fCB7fVxuICB2YXIgdHlwZSA9IGNvbmZpZy50eXBlIHx8IHR5cGV5KG5vZGUpXG4gIHZhciBkZWZhdWx0Q29uZmlnID0gZGVmYXVsdENvbmZpZ3NbdHlwZV0gJiYgZGVmYXVsdENvbmZpZ3NbdHlwZV0obm9kZSlcbiAgdmFyIG1lcmdlZENvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDb25maWcsIGNvbmZpZylcbiAgcmV0dXJuIGNyZWF0ZUVsKG5vZGUsIG1lcmdlZENvbmZpZylcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuXHRyZXR1cm4gKHt9KS50b1N0cmluZy5jYWxsKG9iaikuc2xpY2UoOCwgLTEpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYWMsIHBhdGgsIGNiKXtcblxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhdGgsIHRydWUpO1xuICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cbiAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBhYy5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSwgY2IsIG9uQnVmZmVyTG9hZEVycm9yKTtcbiAgfTtcblxuICByZXF1ZXN0LnNlbmQoKTtcblxuICBmdW5jdGlvbiBvbkJ1ZmZlckxvYWRFcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH1cblxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYW1vdW50KSB7XG4gIHZhciBrID0gdHlwZW9mIGFtb3VudCA9PT0gJ251bWJlcicgPyBhbW91bnQgOiA1MCxcbiAgICBuX3NhbXBsZXMgPSA0NDEwMCxcbiAgICBjdXJ2ZSA9IG5ldyBGbG9hdDMyQXJyYXkobl9zYW1wbGVzKSxcbiAgICBkZWcgPSBNYXRoLlBJIC8gMTgwLFxuICAgIGkgPSAwLFxuICAgIHg7XG4gIGZvciAoIDsgaSA8IG5fc2FtcGxlczsgKytpICkge1xuICAgIHggPSBpICogMiAvIG5fc2FtcGxlcyAtIDE7XG4gICAgY3VydmVbaV0gPSAoIDMgKyBrICkgKiB4ICogMjAgKiBkZWcgLyAoIE1hdGguUEkgKyBrICogTWF0aC5hYnMoeCkgKTtcbiAgfVxuICByZXR1cm4gY3VydmU7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiB7XG4gICAgY2xhc3NOYW1lOiBcImF1ZGlvLWJ1ZmZlci1zb3VyY2VcIixcbiAgICBsYWJlbDogXCJBdWRpbyBCdWZmZXIgU291cmNlXCIsXG4gICAgdHlwZTogXCJBdWRpb0J1ZmZlclNvdXJjZU5vZGVcIixcbiAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJkZXR1bmVcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJEZXR1bmVcIixcbiAgICAgICAgbWluOiAtMzYwMCxcbiAgICAgICAgbWF4OiAzNjAwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5kZXR1bmUudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZGV0dW5lLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJwbGF5YmFja1JhdGVcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJQbGF5YmFjayBSYXRlXCIsXG4gICAgICAgIG1pbjogMC4xLFxuICAgICAgICBtYXg6IDQsXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLnBsYXliYWNrUmF0ZS52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5wbGF5YmFja1JhdGUudmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImxvb3BTdGFydFwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkxvb3AgU3RhcnRcIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IG5vZGUuYnVmZmVyLmR1cmF0aW9uLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5sb29wU3RhcnQsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUubG9vcFN0YXJ0ID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJsb29wRW5kXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiTG9vcCBFbmRcIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IG5vZGUuYnVmZmVyLmR1cmF0aW9uLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5sb29wRW5kLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmxvb3BFbmQgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImxvb3BcIixcbiAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgbGFiZWw6IFwiTG9vcFwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5sb29wLnRvU3RyaW5nKCksXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUubG9vcCA9ICh2YWwgPT09IFwidHJ1ZVwiKVxuICAgICAgICB9LFxuICAgICAgICBvcHRzOiBbXCJmYWxzZVwiLCBcInRydWVcIl1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiB7XG4gICAgY2xhc3NOYW1lOiBcImZpbHRlclwiLFxuICAgIGxhYmVsOiBcIkZpbHRlclwiLFxuICAgIHR5cGU6IFwiQmlxdWFkRmlsdGVyTm9kZVwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImZyZXF1ZW5jeVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkZyZXF1ZW5jeVwiLFxuICAgICAgICBtaW46IDEwLFxuICAgICAgICBtYXg6IG5vZGUuY29udGV4dC5zYW1wbGVSYXRlIC8gMixcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUuZnJlcXVlbmN5LnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmZyZXF1ZW5jeS52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZGV0dW5lXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiRGV0dW5lXCIsXG4gICAgICAgIG1pbjogLTM2MDAsXG4gICAgICAgIG1heDogMzYwMCxcbiAgICAgICAgc3RlcDogMSxcbiAgICAgICAgdmFsdWU6IG5vZGUuZGV0dW5lLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmRldHVuZS52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiUVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIlFcIixcbiAgICAgICAgbWluOiAwLjAwMDEsXG4gICAgICAgIG1heDogMTAwMCxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUuUS52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5RLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJnYWluXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiR2FpblwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUuZ2Fpbi52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5nYWluLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJ0eXBlXCIsXG4gICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgIGxhYmVsOiBcIlR5cGVcIixcbiAgICAgICAgb3B0czogW1wibG93cGFzc1wiLFwiaGlnaHBhc3NcIixcImJhbmRwYXNzXCIsXCJsb3dzaGVsZlwiLFwiaGlnaHNoZWxmXCIsXCJwZWFraW5nXCIsXCJub3RjaFwiLFwiYWxscGFzc1wiXSxcbiAgICAgICAgdmFsdWU6IG5vZGUudHlwZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS50eXBlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiB7XG4gICAgY2xhc3NOYW1lOiBcImRlbGF5XCIsXG4gICAgbGFiZWw6IFwiRGVsYXlcIixcbiAgICB0eXBlOiBcIkRlbGF5Tm9kZVwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImRlbGF5VGltZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkRlbGF5IFRpbWVcIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDMwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5kZWxheVRpbWUudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZGVsYXlUaW1lLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJnYWluXCIsXG4gICAgbGFiZWw6IFwiR2FpblwiLFxuICAgIHR5cGU6IFwiR2Fpbk5vZGVcIixcbiAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJnYWluXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiR2FpblwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUuZ2Fpbi52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5nYWluLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgT3NjaWxsYXRvck5vZGU6IHJlcXVpcmUoJy4vb3NjaWxsYXRvcicpLFxuICBBdWRpb0J1ZmZlclNvdXJjZU5vZGU6IHJlcXVpcmUoJy4vYXVkaW8tYnVmZmVyLXNvdXJjZScpLFxuICBCaXF1YWRGaWx0ZXJOb2RlOiByZXF1aXJlKCcuL2JpcXVhZC1maWx0ZXInKSxcbiAgR2Fpbk5vZGU6IHJlcXVpcmUoJy4vZ2FpbicpLFxuICBEZWxheU5vZGU6IHJlcXVpcmUoJy4vZGVsYXknKSxcbiAgV2F2ZVNoYXBlck5vZGU6IHJlcXVpcmUoJy4vd2F2ZS1zaGFwZXInKSxcbiAgU3RlcmVvUGFubmVyTm9kZTogcmVxdWlyZSgnLi9zdGVyZW8tcGFubmVyJyksXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJvc2NpbGxhdG9yXCIsXG4gICAgbGFiZWw6IFwiT3NjaWxsYXRvclwiLFxuICAgIHR5cGU6IFwiT3NjaWxsYXRvck5vZGVcIixcbiAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJmcmVxdWVuY3lcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJGcmVxdWVuY3lcIixcbiAgICAgICAgbWluOiAxMCxcbiAgICAgICAgbWF4OiBub2RlLmNvbnRleHQuc2FtcGxlUmF0ZSAvIDIsXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmZyZXF1ZW5jeS52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5mcmVxdWVuY3kudmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImRldHVuZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkRldHVuZVwiLFxuICAgICAgICBtaW46IC0zNjAwLFxuICAgICAgICBtYXg6IDM2MDAsXG4gICAgICAgIHN0ZXA6IDEsXG4gICAgICAgIHZhbHVlOiBub2RlLmRldHVuZS52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5kZXR1bmUudmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInR5cGVcIixcbiAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgbGFiZWw6IFwiVHlwZVwiLFxuICAgICAgICBvcHRzOiBbXCJzaW5lXCIsIFwic3F1YXJlXCIsIFwic2F3dG9vdGhcIiwgXCJ0cmlhbmdsZVwiXSxcbiAgICAgICAgdmFsdWU6IG5vZGUudHlwZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS50eXBlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiB7XG4gICAgY2xhc3NOYW1lOiBcInN0ZXJlby1wYW5uZXJcIixcbiAgICBsYWJlbDogXCJTdGVyZW8gUGFubmVyXCIsXG4gICAgdHlwZTogXCJTdGVyZW9QYW5uZXJOb2RlXCIsXG4gICAgYXR0cmlidXRlczogW1xuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwicGFuXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiUGFuXCIsXG4gICAgICAgIG1pbjogLTEsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUucGFuLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLnBhbi52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9XG59IiwidmFyIG1ha2VEaXN0b3J0aW9uQ3VydmUgPSByZXF1aXJlKCdtYWtlLWRpc3RvcnRpb24tY3VydmUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHZhciBhbW91bnQgPSA1MFxuICBub2RlLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZShhbW91bnQpXG4gIHJldHVybiB7XG4gICAgY2xhc3NOYW1lOiBcIndhdmUtc2hhcGVyXCIsXG4gICAgbGFiZWw6IFwiV2F2ZSBTaGFwZXJcIixcbiAgICB0eXBlOiBcIldhdmVTaGFwZXJOb2RlXCIsXG4gICAgYXR0cmlidXRlczogW1xuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiYW1vdW50XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiQW1vdW50XCIsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiA1MDAwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogYW1vdW50LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSh2YWwpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJvdmVyc2FtcGxlXCIsXG4gICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgIGxhYmVsOiBcIk92ZXJzYW1wbGVcIixcbiAgICAgICAgb3B0czogW1wibm9uZVwiLCBcIjJ4XCIsIFwiNHhcIl0sXG4gICAgICAgIHZhbHVlOiBub2RlLm92ZXJzYW1wbGUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUub3ZlcnNhbXBsZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsInZhciBjcmVhdGVSYW5nZSA9IHJlcXVpcmUoJy4vY3JlYXRlLXJhbmdlJylcbnZhciBjcmVhdGVTZWxlY3QgPSByZXF1aXJlKCcuL2NyZWF0ZS1zZWxlY3QnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5vZGUsIGNvbmZpZyl7XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibm9kZS1jb250YWluZXIgXCIgKyBjb25maWcuY2xhc3NOYW1lKVxuXG4gIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGxhYmVsLnRleHRDb250ZW50ID0gY29uZmlnLmxhYmVsXG4gIGxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgbm9kZS1sYWJlbFwiKVxuICBlbC5hcHBlbmRDaGlsZChsYWJlbClcblxuICBjb25maWcuYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVDb25maWcpIHtcbiAgICBpZiAoYXR0cmlidXRlQ29uZmlnLnR5cGUgPT09ICdyYW5nZScpIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNyZWF0ZVJhbmdlKGF0dHJpYnV0ZUNvbmZpZykpXG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVDb25maWcudHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNyZWF0ZVNlbGVjdChhdHRyaWJ1dGVDb25maWcpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyAnaWRrIHdoYXQgdG8gZG8gd2l0aCcgKyBKU09OLnN0cmluZ2lmeShhdHRyaWJ1dGVDb25maWcpXG4gICAgfVxuICB9KVxuICByZXR1cm4gZWxcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVJhbmdlKGNvbmZpZykge1xuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgdmFyIHJhbmdlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFuZ2VcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjb25maWcuYXR0cmlidXRlICsgXCItcmFuZ2VcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgY29uZmlnLm1pbilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgY29uZmlnLm1heClcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIGNvbmZpZy5zdGVwKVxuICByYW5nZUlucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGNvbmZpZy52YWx1ZSlcbiAgdmFyIHJhbmdlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICByYW5nZUxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbmZpZy5hdHRyaWJ1dGUgKyBcIi1pbmZvXCIpXG4gIHJhbmdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBjb25maWcudXBkYXRlKGUudGFyZ2V0LnZhbHVlQXNOdW1iZXIpXG4gICAgcmFuZ2VMYWJlbC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXJcbiAgfSlcbiAgdmFyIGZyZXFMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGZyZXFMYWJlbC50ZXh0Q29udGVudCA9IGNvbmZpZy5sYWJlbFxuICBmcmVxTGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWxhYmVsIGxhYmVsIGVsLWxhYmVsXCIpXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmVxTGFiZWwpXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyYW5nZUlucHV0KVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmFuZ2VMYWJlbClcbiAgXG4gIHJldHVybiBjb250YWluZXJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdChjb25maWcpIHtcbiAgdmFyIHNlbGVjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgc2VsZWN0Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbmZpZy5hdHRyaWJ1dGUgKyBcIi1jb250YWluZXIgZWwtY29udGFpbmVyXCIpXG4gIHZhciBzZWxlY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIilcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLXNlbGVjdFwiKVxuICBjb25maWcub3B0cy5mb3JFYWNoKGZ1bmN0aW9uKG9wdFRleHQpe1xuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgb3B0LnZhbHVlID0gb3B0LnRleHRDb250ZW50ID0gb3B0VGV4dFxuICAgIHNlbGVjdElucHV0LmFwcGVuZENoaWxkKG9wdClcbiAgfSlcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgY29uZmlnLnZhbHVlKVxuICBzZWxlY3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpe1xuICAgIGNvbmZpZy51cGRhdGUoZS50YXJnZXQudmFsdWUpXG4gIH0pXG4gIHZhciBzZWxlY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIHNlbGVjdExhYmVsLnRleHRDb250ZW50ID0gXCJ0eXBlXCJcbiAgc2VsZWN0TGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWxhYmVsIGxhYmVsIGVsLWxhYmVsXCIpXG4gIHNlbGVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RMYWJlbClcbiAgc2VsZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdElucHV0KVxuICByZXR1cm4gc2VsZWN0Q29udGFpbmVyXG59IiwidmFyIGxvYWRTYW1wbGUyQnVmZiA9IHJlcXVpcmUoJ2xvYWQtc2FtcGxlLTItYnVmZicpXG52YXIgY29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpXG52YXIgdWkgPSByZXF1aXJlKCcuLi8nKVxuXG52YXIgb3NjID0gY29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcbm9zYy5mcmVxdWVuY3kudmFsdWUgPSA0NDBcbnZhciBvc2NFbCA9IHVpKG9zYylcblxudmFyIGZpbHRlciA9IGNvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcbnZhciBmaWx0ZXJFbCA9IHVpKGZpbHRlcilcblxuXG52YXIgcGFuID0gY29udGV4dC5jcmVhdGVTdGVyZW9QYW5uZXIoKVxudmFyIHBhbkVsID0gdWkocGFuKVxuXG52YXIgZ2FpbiA9IGNvbnRleHQuY3JlYXRlR2FpbigpXG52YXIgZ2FpbkVsID0gdWkoZ2FpbilcblxuXG52YXIgZGVsYXkgPSBjb250ZXh0LmNyZWF0ZURlbGF5KClcbnZhciBkZWxheUVsID0gdWkoZGVsYXkpXG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3NjRWwpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZpbHRlckVsKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYWluRWwpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRlbGF5RWwpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhbkVsKVxuXG5vc2MuY29ubmVjdChmaWx0ZXIpXG5maWx0ZXIuY29ubmVjdChnYWluKVxuZ2Fpbi5jb25uZWN0KGRlbGF5KVxuZGVsYXkuY29ubmVjdChwYW4pXG5wYW4uY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKVxuZ2Fpbi5nYWluLnZhbHVlID0gMC4xXG5vc2Muc3RhcnQoKVxuXG5cbnZhciBwbGF5ZXIgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG5cbmxvYWRTYW1wbGUyQnVmZihjb250ZXh0LCAnd3d3L2FtZW4ud2F2JywgZnVuY3Rpb24oYnVmZmVyKXtcblxuICB2YXIgcGxheWVyRmlsdGVyID0gY29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICB2YXIgcGxheWVyR2FpbiA9IGNvbnRleHQuY3JlYXRlR2FpbigpXG4gIHBsYXllci5jb25uZWN0KHBsYXllckZpbHRlcilcbiAgcGxheWVyRmlsdGVyLmNvbm5lY3QocGxheWVyR2FpbilcbiAgcGxheWVyR2Fpbi5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pXG4gIHBsYXllci5idWZmZXIgPSBidWZmZXJcbiAgcGxheWVyLmxvb3AgPSB0cnVlXG4gIHBsYXllckdhaW4uZ2Fpbi52YWx1ZSA9IDAuM1xuXG4gIHZhciBwbGF5ZXJFbCA9IHVpKHBsYXllcilcbiAgdmFyIHBsYXllckZpbHRlckVsID0gdWkocGxheWVyRmlsdGVyKVxuICB2YXIgcGxheWVyR2FpbkVsID0gdWkocGxheWVyR2FpbilcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5ZXJFbClcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5ZXJGaWx0ZXJFbClcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5ZXJHYWluRWwpXG5cbiAgcGxheWVyLnN0YXJ0KClcbn0pIl19
