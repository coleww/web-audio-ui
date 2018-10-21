(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var typey = require('get-object-type')

var createEl = require('./src/create-el')
var defaultConfigs = require('./src/config')

module.exports = function(node, cfg){
  var config = cfg || {}
  var type = typey(node)
  var defaultConfig = defaultConfigs[type] && defaultConfigs[type](node)
  var mergedConfig = Object.assign({}, defaultConfig, config)
  return createEl(node, mergedConfig)
}

},{"./src/config":10,"./src/create-el":14,"get-object-type":2}],2:[function(require,module,exports){
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
    className: "compressor",
    label: "Dynamics Compressor",
    attributes: [
      {
        attribute: "threshold",
        type: "range",
        label: "Threshold",
        min: -100,
        max: 0,
        step: "any",
        value: node.threshold.value,
        update: function (val) {
          node.threshold.value = val
        }
      },
      {
        attribute: "knee",
        type: "range",
        label: "Knee",
        min: 0,
        max: 40,
        step: "any",
        value: node.knee.value,
        update: function (val) {
          node.knee.value = val
        }
      },
      {
        attribute: "ratio",
        type: "range",
        label: "Ratio",
        min: 1,
        max: 20,
        step: "any",
        value: node.ratio.value,
        update: function (val) {
          node.ratio.value = val
        }
      },
      {
        attribute: "attack",
        type: "range",
        label: "Attack",
        min: 0,
        max: 1,
        step: "any",
        value: node.attack.value,
        update: function (val) {
          node.attack.value = val
        }
      },
      {
        attribute: "release",
        type: "range",
        label: "Release",
        min: 0,
        max: 1,
        step: "any",
        value: node.release.value,
        update: function (val) {
          node.release.value = val
        }
      },
    ]
  }
}
},{}],9:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "gain",
    label: "Gain",
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
},{}],10:[function(require,module,exports){
module.exports = {
  OscillatorNode: require('./oscillator'),
  AudioBufferSourceNode: require('./audio-buffer-source'),
  BiquadFilterNode: require('./biquad-filter'),
  GainNode: require('./gain'),
  DelayNode: require('./delay'),
  WaveShaperNode: require('./wave-shaper'),
  StereoPannerNode: require('./stereo-panner'),
  DynamicsCompressorNode: require('./dynamics-compressor'),
}
},{"./audio-buffer-source":5,"./biquad-filter":6,"./delay":7,"./dynamics-compressor":8,"./gain":9,"./oscillator":11,"./stereo-panner":12,"./wave-shaper":13}],11:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "oscillator",
    label: "Oscillator",
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
},{}],12:[function(require,module,exports){
module.exports = function (node) {
  return {
    className: "stereo-panner",
    label: "Stereo Panner",
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
},{}],13:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')

module.exports = function (node) {
  var amount = 50
  node.curve = makeDistortionCurve(amount)
  return {
    className: "wave-shaper",
    label: "Wave Shaper",
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
},{"make-distortion-curve":4}],14:[function(require,module,exports){
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
},{"./create-range":15,"./create-select":16}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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

var compressor = context.createDynamicsCompressor()
var compressorEl = ui(compressor)


var delay = context.createDelay()
var delayEl = ui(delay)

document.body.appendChild(oscEl)
document.body.appendChild(filterEl)
document.body.appendChild(gainEl)
document.body.appendChild(delayEl)
document.body.appendChild(compressorEl)
document.body.appendChild(panEl)

osc.connect(filter)
filter.connect(gain)
gain.connect(delay)
delay.connect(compressor)
compressor.connect(pan)
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
},{"../":1,"load-sample-2-buff":3}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nZXQtb2JqZWN0LXR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9hZC1zYW1wbGUtMi1idWZmL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21ha2UtZGlzdG9ydGlvbi1jdXJ2ZS9pbmRleC5qcyIsInNyYy9jb25maWcvYXVkaW8tYnVmZmVyLXNvdXJjZS5qcyIsInNyYy9jb25maWcvYmlxdWFkLWZpbHRlci5qcyIsInNyYy9jb25maWcvZGVsYXkuanMiLCJzcmMvY29uZmlnL2R5bmFtaWNzLWNvbXByZXNzb3IuanMiLCJzcmMvY29uZmlnL2dhaW4uanMiLCJzcmMvY29uZmlnL2luZGV4LmpzIiwic3JjL2NvbmZpZy9vc2NpbGxhdG9yLmpzIiwic3JjL2NvbmZpZy9zdGVyZW8tcGFubmVyLmpzIiwic3JjL2NvbmZpZy93YXZlLXNoYXBlci5qcyIsInNyYy9jcmVhdGUtZWwuanMiLCJzcmMvY3JlYXRlLXJhbmdlLmpzIiwic3JjL2NyZWF0ZS1zZWxlY3QuanMiLCJ3d3cvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciB0eXBleSA9IHJlcXVpcmUoJ2dldC1vYmplY3QtdHlwZScpXG5cbnZhciBjcmVhdGVFbCA9IHJlcXVpcmUoJy4vc3JjL2NyZWF0ZS1lbCcpXG52YXIgZGVmYXVsdENvbmZpZ3MgPSByZXF1aXJlKCcuL3NyYy9jb25maWcnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5vZGUsIGNmZyl7XG4gIHZhciBjb25maWcgPSBjZmcgfHwge31cbiAgdmFyIHR5cGUgPSB0eXBleShub2RlKVxuICB2YXIgZGVmYXVsdENvbmZpZyA9IGRlZmF1bHRDb25maWdzW3R5cGVdICYmIGRlZmF1bHRDb25maWdzW3R5cGVdKG5vZGUpXG4gIHZhciBtZXJnZWRDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q29uZmlnLCBjb25maWcpXG4gIHJldHVybiBjcmVhdGVFbChub2RlLCBtZXJnZWRDb25maWcpXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChvYmopLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFjLCBwYXRoLCBjYil7XG5cbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgcmVxdWVzdC5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuXG4gIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgYWMuZGVjb2RlQXVkaW9EYXRhKHJlcXVlc3QucmVzcG9uc2UsIGNiLCBvbkJ1ZmZlckxvYWRFcnJvcik7XG4gIH07XG5cbiAgcmVxdWVzdC5zZW5kKCk7XG5cbiAgZnVuY3Rpb24gb25CdWZmZXJMb2FkRXJyb3IoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9XG5cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFtb3VudCkge1xuICB2YXIgayA9IHR5cGVvZiBhbW91bnQgPT09ICdudW1iZXInID8gYW1vdW50IDogNTAsXG4gICAgbl9zYW1wbGVzID0gNDQxMDAsXG4gICAgY3VydmUgPSBuZXcgRmxvYXQzMkFycmF5KG5fc2FtcGxlcyksXG4gICAgZGVnID0gTWF0aC5QSSAvIDE4MCxcbiAgICBpID0gMCxcbiAgICB4O1xuICBmb3IgKCA7IGkgPCBuX3NhbXBsZXM7ICsraSApIHtcbiAgICB4ID0gaSAqIDIgLyBuX3NhbXBsZXMgLSAxO1xuICAgIGN1cnZlW2ldID0gKCAzICsgayApICogeCAqIDIwICogZGVnIC8gKCBNYXRoLlBJICsgayAqIE1hdGguYWJzKHgpICk7XG4gIH1cbiAgcmV0dXJuIGN1cnZlO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJhdWRpby1idWZmZXItc291cmNlXCIsXG4gICAgbGFiZWw6IFwiQXVkaW8gQnVmZmVyIFNvdXJjZVwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImRldHVuZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkRldHVuZVwiLFxuICAgICAgICBtaW46IC0zNjAwLFxuICAgICAgICBtYXg6IDM2MDAsXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmRldHVuZS52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5kZXR1bmUudmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInBsYXliYWNrUmF0ZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIlBsYXliYWNrIFJhdGVcIixcbiAgICAgICAgbWluOiAwLjEsXG4gICAgICAgIG1heDogNCxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUucGxheWJhY2tSYXRlLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwibG9vcFN0YXJ0XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiTG9vcCBTdGFydFwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogbm9kZS5idWZmZXIuZHVyYXRpb24sXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3BTdGFydCxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5sb29wU3RhcnQgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImxvb3BFbmRcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJMb29wIEVuZFwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogbm9kZS5idWZmZXIuZHVyYXRpb24sXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3BFbmQsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUubG9vcEVuZCA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwibG9vcFwiLFxuICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICBsYWJlbDogXCJMb29wXCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3AudG9TdHJpbmcoKSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5sb29wID0gKHZhbCA9PT0gXCJ0cnVlXCIpXG4gICAgICAgIH0sXG4gICAgICAgIG9wdHM6IFtcImZhbHNlXCIsIFwidHJ1ZVwiXVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwiZmlsdGVyXCIsXG4gICAgbGFiZWw6IFwiRmlsdGVyXCIsXG4gICAgYXR0cmlidXRlczogW1xuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZnJlcXVlbmN5XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiRnJlcXVlbmN5XCIsXG4gICAgICAgIG1pbjogMTAsXG4gICAgICAgIG1heDogbm9kZS5jb250ZXh0LnNhbXBsZVJhdGUgLyAyLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5mcmVxdWVuY3kudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZnJlcXVlbmN5LnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJkZXR1bmVcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJEZXR1bmVcIixcbiAgICAgICAgbWluOiAtMzYwMCxcbiAgICAgICAgbWF4OiAzNjAwLFxuICAgICAgICBzdGVwOiAxLFxuICAgICAgICB2YWx1ZTogbm9kZS5kZXR1bmUudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZGV0dW5lLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJRXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiUVwiLFxuICAgICAgICBtaW46IDAuMDAwMSxcbiAgICAgICAgbWF4OiAxMDAwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5RLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLlEudmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImdhaW5cIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJHYWluXCIsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5nYWluLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmdhaW4udmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInR5cGVcIixcbiAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgbGFiZWw6IFwiVHlwZVwiLFxuICAgICAgICBvcHRzOiBbXCJsb3dwYXNzXCIsXCJoaWdocGFzc1wiLFwiYmFuZHBhc3NcIixcImxvd3NoZWxmXCIsXCJoaWdoc2hlbGZcIixcInBlYWtpbmdcIixcIm5vdGNoXCIsXCJhbGxwYXNzXCJdLFxuICAgICAgICB2YWx1ZTogbm9kZS50eXBlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLnR5cGUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwiZGVsYXlcIixcbiAgICBsYWJlbDogXCJEZWxheVwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImRlbGF5VGltZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkRlbGF5IFRpbWVcIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDMwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5kZWxheVRpbWUudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZGVsYXlUaW1lLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJjb21wcmVzc29yXCIsXG4gICAgbGFiZWw6IFwiRHluYW1pY3MgQ29tcHJlc3NvclwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInRocmVzaG9sZFwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIlRocmVzaG9sZFwiLFxuICAgICAgICBtaW46IC0xMDAsXG4gICAgICAgIG1heDogMCxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUudGhyZXNob2xkLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLnRocmVzaG9sZC52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwia25lZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIktuZWVcIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDQwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5rbmVlLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmtuZWUudmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInJhdGlvXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiUmF0aW9cIixcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDIwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5yYXRpby52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5yYXRpby52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiYXR0YWNrXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiQXR0YWNrXCIsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5hdHRhY2sudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuYXR0YWNrLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJyZWxlYXNlXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiUmVsZWFzZVwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUucmVsZWFzZS52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5yZWxlYXNlLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgXVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJnYWluXCIsXG4gICAgbGFiZWw6IFwiR2FpblwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImdhaW5cIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJHYWluXCIsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5nYWluLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmdhaW4udmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBPc2NpbGxhdG9yTm9kZTogcmVxdWlyZSgnLi9vc2NpbGxhdG9yJyksXG4gIEF1ZGlvQnVmZmVyU291cmNlTm9kZTogcmVxdWlyZSgnLi9hdWRpby1idWZmZXItc291cmNlJyksXG4gIEJpcXVhZEZpbHRlck5vZGU6IHJlcXVpcmUoJy4vYmlxdWFkLWZpbHRlcicpLFxuICBHYWluTm9kZTogcmVxdWlyZSgnLi9nYWluJyksXG4gIERlbGF5Tm9kZTogcmVxdWlyZSgnLi9kZWxheScpLFxuICBXYXZlU2hhcGVyTm9kZTogcmVxdWlyZSgnLi93YXZlLXNoYXBlcicpLFxuICBTdGVyZW9QYW5uZXJOb2RlOiByZXF1aXJlKCcuL3N0ZXJlby1wYW5uZXInKSxcbiAgRHluYW1pY3NDb21wcmVzc29yTm9kZTogcmVxdWlyZSgnLi9keW5hbWljcy1jb21wcmVzc29yJyksXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJvc2NpbGxhdG9yXCIsXG4gICAgbGFiZWw6IFwiT3NjaWxsYXRvclwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImZyZXF1ZW5jeVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkZyZXF1ZW5jeVwiLFxuICAgICAgICBtaW46IDEwLFxuICAgICAgICBtYXg6IG5vZGUuY29udGV4dC5zYW1wbGVSYXRlIC8gMixcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUuZnJlcXVlbmN5LnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmZyZXF1ZW5jeS52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZGV0dW5lXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiRGV0dW5lXCIsXG4gICAgICAgIG1pbjogLTM2MDAsXG4gICAgICAgIG1heDogMzYwMCxcbiAgICAgICAgc3RlcDogMSxcbiAgICAgICAgdmFsdWU6IG5vZGUuZGV0dW5lLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmRldHVuZS52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwidHlwZVwiLFxuICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICBsYWJlbDogXCJUeXBlXCIsXG4gICAgICAgIG9wdHM6IFtcInNpbmVcIiwgXCJzcXVhcmVcIiwgXCJzYXd0b290aFwiLCBcInRyaWFuZ2xlXCJdLFxuICAgICAgICB2YWx1ZTogbm9kZS50eXBlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLnR5cGUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwic3RlcmVvLXBhbm5lclwiLFxuICAgIGxhYmVsOiBcIlN0ZXJlbyBQYW5uZXJcIixcbiAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJwYW5cIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJQYW5cIixcbiAgICAgICAgbWluOiAtMSxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5wYW4udmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUucGFuLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn0iLCJ2YXIgbWFrZURpc3RvcnRpb25DdXJ2ZSA9IHJlcXVpcmUoJ21ha2UtZGlzdG9ydGlvbi1jdXJ2ZScpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIGFtb3VudCA9IDUwXG4gIG5vZGUuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKGFtb3VudClcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwid2F2ZS1zaGFwZXJcIixcbiAgICBsYWJlbDogXCJXYXZlIFNoYXBlclwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImFtb3VudFwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkFtb3VudFwiLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogNTAwMCxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IGFtb3VudCxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUodmFsKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwib3ZlcnNhbXBsZVwiLFxuICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICBsYWJlbDogXCJPdmVyc2FtcGxlXCIsXG4gICAgICAgIG9wdHM6IFtcIm5vbmVcIiwgXCIyeFwiLCBcIjR4XCJdLFxuICAgICAgICB2YWx1ZTogbm9kZS5vdmVyc2FtcGxlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLm92ZXJzYW1wbGUgPSB2YWxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICBdXG4gIH1cbn0iLCJ2YXIgY3JlYXRlUmFuZ2UgPSByZXF1aXJlKCcuL2NyZWF0ZS1yYW5nZScpXG52YXIgY3JlYXRlU2VsZWN0ID0gcmVxdWlyZSgnLi9jcmVhdGUtc2VsZWN0JylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihub2RlLCBjb25maWcpe1xuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm5vZGUtY29udGFpbmVyIFwiICsgY29uZmlnLmNsYXNzTmFtZSlcblxuICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICBsYWJlbC50ZXh0Q29udGVudCA9IGNvbmZpZy5sYWJlbFxuICBsYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxhYmVsIG5vZGUtbGFiZWxcIilcbiAgZWwuYXBwZW5kQ2hpbGQobGFiZWwpXG5cbiAgY29uZmlnLmF0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAoYXR0cmlidXRlQ29uZmlnKSB7XG4gICAgaWYgKGF0dHJpYnV0ZUNvbmZpZy50eXBlID09PSAncmFuZ2UnKSB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChjcmVhdGVSYW5nZShhdHRyaWJ1dGVDb25maWcpKVxuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlQ29uZmlnLnR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChjcmVhdGVTZWxlY3QoYXR0cmlidXRlQ29uZmlnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgJ2lkayB3aGF0IHRvIGRvIHdpdGgnICsgSlNPTi5zdHJpbmdpZnkoYXR0cmlidXRlQ29uZmlnKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGVsXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVSYW5nZShjb25maWcpIHtcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbmZpZy5hdHRyaWJ1dGUgKyBcIi1jb250YWluZXIgZWwtY29udGFpbmVyXCIpXG5cbiAgdmFyIHJhbmdlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFuZ2VcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjb25maWcuYXR0cmlidXRlICsgXCItcmFuZ2VcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgY29uZmlnLm1pbilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgY29uZmlnLm1heClcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIGNvbmZpZy5zdGVwKVxuICByYW5nZUlucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGNvbmZpZy52YWx1ZSlcblxuICB2YXIgcmFuZ2VMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIHJhbmdlTGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWluZm9cIilcbiAgcmFuZ2VMYWJlbC50ZXh0Q29udGVudCA9IGNvbmZpZy52YWx1ZVxuICByYW5nZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgY29uZmlnLnVwZGF0ZShlLnRhcmdldC52YWx1ZUFzTnVtYmVyKVxuICAgIHJhbmdlTGFiZWwudGV4dENvbnRlbnQgPSBlLnRhcmdldC52YWx1ZUFzTnVtYmVyLnRvRml4ZWQoMyk7XG4gIH0pXG5cbiAgdmFyIGZyZXFMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGZyZXFMYWJlbC50ZXh0Q29udGVudCA9IGNvbmZpZy5sYWJlbFxuICBmcmVxTGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWxhYmVsIGxhYmVsIGVsLWxhYmVsXCIpXG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZyZXFMYWJlbClcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJhbmdlSW5wdXQpXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyYW5nZUxhYmVsKVxuICBcbiAgcmV0dXJuIGNvbnRhaW5lclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlU2VsZWN0KGNvbmZpZykge1xuICB2YXIgc2VsZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBzZWxlY3RDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcblxuICB2YXIgc2VsZWN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpXG4gIHNlbGVjdElucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpXG4gIHNlbGVjdElucHV0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbmZpZy5hdHRyaWJ1dGUgKyBcIi1zZWxlY3RcIilcbiAgY29uZmlnLm9wdHMuZm9yRWFjaChmdW5jdGlvbihvcHRUZXh0KXtcbiAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgIG9wdC52YWx1ZSA9IG9wdC50ZXh0Q29udGVudCA9IG9wdFRleHRcbiAgICBzZWxlY3RJbnB1dC5hcHBlbmRDaGlsZChvcHQpXG4gIH0pXG4gIHNlbGVjdElucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGNvbmZpZy52YWx1ZSlcbiAgc2VsZWN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBjb25maWcudXBkYXRlKGUudGFyZ2V0LnZhbHVlKVxuICB9KVxuXG4gIHZhciBzZWxlY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIHNlbGVjdExhYmVsLnRleHRDb250ZW50ID0gY29uZmlnLmxhYmVsXG4gIHNlbGVjdExhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbmZpZy5hdHRyaWJ1dGUgKyBcIi1sYWJlbCBsYWJlbCBlbC1sYWJlbFwiKVxuXG4gIHNlbGVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RMYWJlbClcbiAgc2VsZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdElucHV0KVxuXG4gIHJldHVybiBzZWxlY3RDb250YWluZXJcbn0iLCJ2YXIgbG9hZFNhbXBsZTJCdWZmID0gcmVxdWlyZSgnbG9hZC1zYW1wbGUtMi1idWZmJylcbnZhciBjb250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKClcbnZhciB1aSA9IHJlcXVpcmUoJy4uLycpXG5cbnZhciBvc2MgPSBjb250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxub3NjLmZyZXF1ZW5jeS52YWx1ZSA9IDQ0MFxudmFyIG9zY0VsID0gdWkob3NjKVxuXG52YXIgZmlsdGVyID0gY29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxudmFyIGZpbHRlckVsID0gdWkoZmlsdGVyKVxuXG5cbnZhciBwYW4gPSBjb250ZXh0LmNyZWF0ZVN0ZXJlb1Bhbm5lcigpXG52YXIgcGFuRWwgPSB1aShwYW4pXG5cbnZhciBnYWluID0gY29udGV4dC5jcmVhdGVHYWluKClcbnZhciBnYWluRWwgPSB1aShnYWluKVxuXG52YXIgY29tcHJlc3NvciA9IGNvbnRleHQuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKClcbnZhciBjb21wcmVzc29yRWwgPSB1aShjb21wcmVzc29yKVxuXG5cbnZhciBkZWxheSA9IGNvbnRleHQuY3JlYXRlRGVsYXkoKVxudmFyIGRlbGF5RWwgPSB1aShkZWxheSlcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvc2NFbClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmlsdGVyRWwpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGdhaW5FbClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGVsYXlFbClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcHJlc3NvckVsKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYW5FbClcblxub3NjLmNvbm5lY3QoZmlsdGVyKVxuZmlsdGVyLmNvbm5lY3QoZ2FpbilcbmdhaW4uY29ubmVjdChkZWxheSlcbmRlbGF5LmNvbm5lY3QoY29tcHJlc3NvcilcbmNvbXByZXNzb3IuY29ubmVjdChwYW4pXG5wYW4uY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKVxuZ2Fpbi5nYWluLnZhbHVlID0gMC4xXG5vc2Muc3RhcnQoKVxuXG5cbnZhciBwbGF5ZXIgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG5cbmxvYWRTYW1wbGUyQnVmZihjb250ZXh0LCAnd3d3L2FtZW4ud2F2JywgZnVuY3Rpb24oYnVmZmVyKXtcblxuICB2YXIgcGxheWVyRmlsdGVyID0gY29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICB2YXIgcGxheWVyR2FpbiA9IGNvbnRleHQuY3JlYXRlR2FpbigpXG4gIHBsYXllci5jb25uZWN0KHBsYXllckZpbHRlcilcbiAgcGxheWVyRmlsdGVyLmNvbm5lY3QocGxheWVyR2FpbilcbiAgcGxheWVyR2Fpbi5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pXG4gIHBsYXllci5idWZmZXIgPSBidWZmZXJcbiAgcGxheWVyLmxvb3AgPSB0cnVlXG4gIHBsYXllckdhaW4uZ2Fpbi52YWx1ZSA9IDAuM1xuXG4gIHZhciBwbGF5ZXJFbCA9IHVpKHBsYXllcilcbiAgdmFyIHBsYXllckZpbHRlckVsID0gdWkocGxheWVyRmlsdGVyKVxuICB2YXIgcGxheWVyR2FpbkVsID0gdWkocGxheWVyR2FpbilcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5ZXJFbClcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5ZXJGaWx0ZXJFbClcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5ZXJHYWluRWwpXG5cbiAgcGxheWVyLnN0YXJ0KClcbn0pIl19
