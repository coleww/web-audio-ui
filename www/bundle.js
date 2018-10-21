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
  selectLabel.textContent = config.label
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nZXQtb2JqZWN0LXR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9hZC1zYW1wbGUtMi1idWZmL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21ha2UtZGlzdG9ydGlvbi1jdXJ2ZS9pbmRleC5qcyIsInNyYy9jb25maWcvYXVkaW8tYnVmZmVyLXNvdXJjZS5qcyIsInNyYy9jb25maWcvYmlxdWFkLWZpbHRlci5qcyIsInNyYy9jb25maWcvZGVsYXkuanMiLCJzcmMvY29uZmlnL2dhaW4uanMiLCJzcmMvY29uZmlnL2luZGV4LmpzIiwic3JjL2NvbmZpZy9vc2NpbGxhdG9yLmpzIiwic3JjL2NvbmZpZy9zdGVyZW8tcGFubmVyLmpzIiwic3JjL2NvbmZpZy93YXZlLXNoYXBlci5qcyIsInNyYy9jcmVhdGUtZWwuanMiLCJzcmMvY3JlYXRlLXJhbmdlLmpzIiwic3JjL2NyZWF0ZS1zZWxlY3QuanMiLCJ3d3cvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciB0eXBleSA9IHJlcXVpcmUoJ2dldC1vYmplY3QtdHlwZScpXG5cbnZhciBjcmVhdGVFbCA9IHJlcXVpcmUoJy4vc3JjL2NyZWF0ZS1lbCcpXG52YXIgZGVmYXVsdENvbmZpZ3MgPSByZXF1aXJlKCcuL3NyYy9jb25maWcnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5vZGUsIGNmZyl7XG4gIHZhciBjb25maWcgPSBjZmcgfHwge31cbiAgdmFyIHR5cGUgPSB0eXBleShub2RlKVxuICB2YXIgZGVmYXVsdENvbmZpZyA9IGRlZmF1bHRDb25maWdzW3R5cGVdICYmIGRlZmF1bHRDb25maWdzW3R5cGVdKG5vZGUpXG4gIHZhciBtZXJnZWRDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q29uZmlnLCBjb25maWcpXG4gIHJldHVybiBjcmVhdGVFbChub2RlLCBtZXJnZWRDb25maWcpXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChvYmopLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFjLCBwYXRoLCBjYil7XG5cbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgcmVxdWVzdC5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuXG4gIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgYWMuZGVjb2RlQXVkaW9EYXRhKHJlcXVlc3QucmVzcG9uc2UsIGNiLCBvbkJ1ZmZlckxvYWRFcnJvcik7XG4gIH07XG5cbiAgcmVxdWVzdC5zZW5kKCk7XG5cbiAgZnVuY3Rpb24gb25CdWZmZXJMb2FkRXJyb3IoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9XG5cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFtb3VudCkge1xuICB2YXIgayA9IHR5cGVvZiBhbW91bnQgPT09ICdudW1iZXInID8gYW1vdW50IDogNTAsXG4gICAgbl9zYW1wbGVzID0gNDQxMDAsXG4gICAgY3VydmUgPSBuZXcgRmxvYXQzMkFycmF5KG5fc2FtcGxlcyksXG4gICAgZGVnID0gTWF0aC5QSSAvIDE4MCxcbiAgICBpID0gMCxcbiAgICB4O1xuICBmb3IgKCA7IGkgPCBuX3NhbXBsZXM7ICsraSApIHtcbiAgICB4ID0gaSAqIDIgLyBuX3NhbXBsZXMgLSAxO1xuICAgIGN1cnZlW2ldID0gKCAzICsgayApICogeCAqIDIwICogZGVnIC8gKCBNYXRoLlBJICsgayAqIE1hdGguYWJzKHgpICk7XG4gIH1cbiAgcmV0dXJuIGN1cnZlO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJhdWRpby1idWZmZXItc291cmNlXCIsXG4gICAgbGFiZWw6IFwiQXVkaW8gQnVmZmVyIFNvdXJjZVwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImRldHVuZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkRldHVuZVwiLFxuICAgICAgICBtaW46IC0zNjAwLFxuICAgICAgICBtYXg6IDM2MDAsXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmRldHVuZS52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5kZXR1bmUudmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInBsYXliYWNrUmF0ZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIlBsYXliYWNrIFJhdGVcIixcbiAgICAgICAgbWluOiAwLjEsXG4gICAgICAgIG1heDogNCxcbiAgICAgICAgc3RlcDogXCJhbnlcIixcbiAgICAgICAgdmFsdWU6IG5vZGUucGxheWJhY2tSYXRlLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwibG9vcFN0YXJ0XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiTG9vcCBTdGFydFwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogbm9kZS5idWZmZXIuZHVyYXRpb24sXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3BTdGFydCxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5sb29wU3RhcnQgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImxvb3BFbmRcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJMb29wIEVuZFwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogbm9kZS5idWZmZXIuZHVyYXRpb24sXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3BFbmQsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUubG9vcEVuZCA9IHZhbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwibG9vcFwiLFxuICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICBsYWJlbDogXCJMb29wXCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3AudG9TdHJpbmcoKSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5sb29wID0gKHZhbCA9PT0gXCJ0cnVlXCIpXG4gICAgICAgIH0sXG4gICAgICAgIG9wdHM6IFtcImZhbHNlXCIsIFwidHJ1ZVwiXVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwiZmlsdGVyXCIsXG4gICAgbGFiZWw6IFwiRmlsdGVyXCIsXG4gICAgYXR0cmlidXRlczogW1xuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZnJlcXVlbmN5XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiRnJlcXVlbmN5XCIsXG4gICAgICAgIG1pbjogMTAsXG4gICAgICAgIG1heDogbm9kZS5jb250ZXh0LnNhbXBsZVJhdGUgLyAyLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5mcmVxdWVuY3kudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZnJlcXVlbmN5LnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJkZXR1bmVcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJEZXR1bmVcIixcbiAgICAgICAgbWluOiAtMzYwMCxcbiAgICAgICAgbWF4OiAzNjAwLFxuICAgICAgICBzdGVwOiAxLFxuICAgICAgICB2YWx1ZTogbm9kZS5kZXR1bmUudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZGV0dW5lLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJRXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiUVwiLFxuICAgICAgICBtaW46IDAuMDAwMSxcbiAgICAgICAgbWF4OiAxMDAwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5RLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLlEudmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImdhaW5cIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJHYWluXCIsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5nYWluLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmdhaW4udmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInR5cGVcIixcbiAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgbGFiZWw6IFwiVHlwZVwiLFxuICAgICAgICBvcHRzOiBbXCJsb3dwYXNzXCIsXCJoaWdocGFzc1wiLFwiYmFuZHBhc3NcIixcImxvd3NoZWxmXCIsXCJoaWdoc2hlbGZcIixcInBlYWtpbmdcIixcIm5vdGNoXCIsXCJhbGxwYXNzXCJdLFxuICAgICAgICB2YWx1ZTogbm9kZS50eXBlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLnR5cGUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwiZGVsYXlcIixcbiAgICBsYWJlbDogXCJEZWxheVwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImRlbGF5VGltZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkRlbGF5IFRpbWVcIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDMwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5kZWxheVRpbWUudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZGVsYXlUaW1lLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJnYWluXCIsXG4gICAgbGFiZWw6IFwiR2FpblwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImdhaW5cIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJHYWluXCIsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5nYWluLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmdhaW4udmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBPc2NpbGxhdG9yTm9kZTogcmVxdWlyZSgnLi9vc2NpbGxhdG9yJyksXG4gIEF1ZGlvQnVmZmVyU291cmNlTm9kZTogcmVxdWlyZSgnLi9hdWRpby1idWZmZXItc291cmNlJyksXG4gIEJpcXVhZEZpbHRlck5vZGU6IHJlcXVpcmUoJy4vYmlxdWFkLWZpbHRlcicpLFxuICBHYWluTm9kZTogcmVxdWlyZSgnLi9nYWluJyksXG4gIERlbGF5Tm9kZTogcmVxdWlyZSgnLi9kZWxheScpLFxuICBXYXZlU2hhcGVyTm9kZTogcmVxdWlyZSgnLi93YXZlLXNoYXBlcicpLFxuICBTdGVyZW9QYW5uZXJOb2RlOiByZXF1aXJlKCcuL3N0ZXJlby1wYW5uZXInKSxcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHJldHVybiB7XG4gICAgY2xhc3NOYW1lOiBcIm9zY2lsbGF0b3JcIixcbiAgICBsYWJlbDogXCJPc2NpbGxhdG9yXCIsXG4gICAgYXR0cmlidXRlczogW1xuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZnJlcXVlbmN5XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiRnJlcXVlbmN5XCIsXG4gICAgICAgIG1pbjogMTAsXG4gICAgICAgIG1heDogbm9kZS5jb250ZXh0LnNhbXBsZVJhdGUgLyAyLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogbm9kZS5mcmVxdWVuY3kudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZnJlcXVlbmN5LnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJkZXR1bmVcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJEZXR1bmVcIixcbiAgICAgICAgbWluOiAtMzYwMCxcbiAgICAgICAgbWF4OiAzNjAwLFxuICAgICAgICBzdGVwOiAxLFxuICAgICAgICB2YWx1ZTogbm9kZS5kZXR1bmUudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZGV0dW5lLnZhbHVlID0gdmFsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJ0eXBlXCIsXG4gICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgIGxhYmVsOiBcIlR5cGVcIixcbiAgICAgICAgb3B0czogW1wic2luZVwiLCBcInNxdWFyZVwiLCBcInNhd3Rvb3RoXCIsIFwidHJpYW5nbGVcIl0sXG4gICAgICAgIHZhbHVlOiBub2RlLnR5cGUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUudHlwZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJzdGVyZW8tcGFubmVyXCIsXG4gICAgbGFiZWw6IFwiU3RlcmVvIFBhbm5lclwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInBhblwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIlBhblwiLFxuICAgICAgICBtaW46IC0xLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIHN0ZXA6IFwiYW55XCIsXG4gICAgICAgIHZhbHVlOiBub2RlLnBhbi52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5wYW4udmFsdWUgPSB2YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsInZhciBtYWtlRGlzdG9ydGlvbkN1cnZlID0gcmVxdWlyZSgnbWFrZS1kaXN0b3J0aW9uLWN1cnZlJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgYW1vdW50ID0gNTBcbiAgbm9kZS5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoYW1vdW50KVxuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJ3YXZlLXNoYXBlclwiLFxuICAgIGxhYmVsOiBcIldhdmUgU2hhcGVyXCIsXG4gICAgYXR0cmlidXRlczogW1xuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiYW1vdW50XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiQW1vdW50XCIsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiA1MDAwLFxuICAgICAgICBzdGVwOiBcImFueVwiLFxuICAgICAgICB2YWx1ZTogYW1vdW50LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSh2YWwpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJvdmVyc2FtcGxlXCIsXG4gICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgIGxhYmVsOiBcIk92ZXJzYW1wbGVcIixcbiAgICAgICAgb3B0czogW1wibm9uZVwiLCBcIjJ4XCIsIFwiNHhcIl0sXG4gICAgICAgIHZhbHVlOiBub2RlLm92ZXJzYW1wbGUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUub3ZlcnNhbXBsZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsInZhciBjcmVhdGVSYW5nZSA9IHJlcXVpcmUoJy4vY3JlYXRlLXJhbmdlJylcbnZhciBjcmVhdGVTZWxlY3QgPSByZXF1aXJlKCcuL2NyZWF0ZS1zZWxlY3QnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5vZGUsIGNvbmZpZyl7XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibm9kZS1jb250YWluZXIgXCIgKyBjb25maWcuY2xhc3NOYW1lKVxuXG4gIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGxhYmVsLnRleHRDb250ZW50ID0gY29uZmlnLmxhYmVsXG4gIGxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgbm9kZS1sYWJlbFwiKVxuICBlbC5hcHBlbmRDaGlsZChsYWJlbClcblxuICBjb25maWcuYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVDb25maWcpIHtcbiAgICBpZiAoYXR0cmlidXRlQ29uZmlnLnR5cGUgPT09ICdyYW5nZScpIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNyZWF0ZVJhbmdlKGF0dHJpYnV0ZUNvbmZpZykpXG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVDb25maWcudHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNyZWF0ZVNlbGVjdChhdHRyaWJ1dGVDb25maWcpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyAnaWRrIHdoYXQgdG8gZG8gd2l0aCcgKyBKU09OLnN0cmluZ2lmeShhdHRyaWJ1dGVDb25maWcpXG4gICAgfVxuICB9KVxuICByZXR1cm4gZWxcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVJhbmdlKGNvbmZpZykge1xuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcblxuICB2YXIgcmFuZ2VJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICByYW5nZUlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYW5nZVwiKVxuICByYW5nZUlucHV0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbmZpZy5hdHRyaWJ1dGUgKyBcIi1yYW5nZVwiKVxuICByYW5nZUlucHV0LnNldEF0dHJpYnV0ZShcIm1pblwiLCBjb25maWcubWluKVxuICByYW5nZUlucHV0LnNldEF0dHJpYnV0ZShcIm1heFwiLCBjb25maWcubWF4KVxuICByYW5nZUlucHV0LnNldEF0dHJpYnV0ZShcInN0ZXBcIiwgY29uZmlnLnN0ZXApXG4gIHJhbmdlSW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgY29uZmlnLnZhbHVlKVxuXG4gIHZhciByYW5nZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgcmFuZ2VMYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjb25maWcuYXR0cmlidXRlICsgXCItaW5mb1wiKVxuICByYW5nZUxhYmVsLnRleHRDb250ZW50ID0gY29uZmlnLnZhbHVlXG4gIHJhbmdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBjb25maWcudXBkYXRlKGUudGFyZ2V0LnZhbHVlQXNOdW1iZXIpXG4gICAgcmFuZ2VMYWJlbC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXIudG9GaXhlZCgzKTtcbiAgfSlcblxuICB2YXIgZnJlcUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgZnJlcUxhYmVsLnRleHRDb250ZW50ID0gY29uZmlnLmxhYmVsXG4gIGZyZXFMYWJlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjb25maWcuYXR0cmlidXRlICsgXCItbGFiZWwgbGFiZWwgZWwtbGFiZWxcIilcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZnJlcUxhYmVsKVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmFuZ2VJbnB1dClcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJhbmdlTGFiZWwpXG4gIFxuICByZXR1cm4gY29udGFpbmVyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVTZWxlY3QoY29uZmlnKSB7XG4gIHZhciBzZWxlY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIHNlbGVjdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjb25maWcuYXR0cmlidXRlICsgXCItY29udGFpbmVyIGVsLWNvbnRhaW5lclwiKVxuXG4gIHZhciBzZWxlY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIilcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLXNlbGVjdFwiKVxuICBjb25maWcub3B0cy5mb3JFYWNoKGZ1bmN0aW9uKG9wdFRleHQpe1xuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgb3B0LnZhbHVlID0gb3B0LnRleHRDb250ZW50ID0gb3B0VGV4dFxuICAgIHNlbGVjdElucHV0LmFwcGVuZENoaWxkKG9wdClcbiAgfSlcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgY29uZmlnLnZhbHVlKVxuICBzZWxlY3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpe1xuICAgIGNvbmZpZy51cGRhdGUoZS50YXJnZXQudmFsdWUpXG4gIH0pXG5cbiAgdmFyIHNlbGVjdExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgc2VsZWN0TGFiZWwudGV4dENvbnRlbnQgPSBjb25maWcubGFiZWxcbiAgc2VsZWN0TGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWxhYmVsIGxhYmVsIGVsLWxhYmVsXCIpXG5cbiAgc2VsZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdExhYmVsKVxuICBzZWxlY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0SW5wdXQpXG5cbiAgcmV0dXJuIHNlbGVjdENvbnRhaW5lclxufSIsInZhciBsb2FkU2FtcGxlMkJ1ZmYgPSByZXF1aXJlKCdsb2FkLXNhbXBsZS0yLWJ1ZmYnKVxudmFyIGNvbnRleHQgPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKVxudmFyIHVpID0gcmVxdWlyZSgnLi4vJylcblxudmFyIG9zYyA9IGNvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5vc2MuZnJlcXVlbmN5LnZhbHVlID0gNDQwXG52YXIgb3NjRWwgPSB1aShvc2MpXG5cbnZhciBmaWx0ZXIgPSBjb250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG52YXIgZmlsdGVyRWwgPSB1aShmaWx0ZXIpXG5cblxudmFyIHBhbiA9IGNvbnRleHQuY3JlYXRlU3RlcmVvUGFubmVyKClcbnZhciBwYW5FbCA9IHVpKHBhbilcblxudmFyIGdhaW4gPSBjb250ZXh0LmNyZWF0ZUdhaW4oKVxudmFyIGdhaW5FbCA9IHVpKGdhaW4pXG5cblxudmFyIGRlbGF5ID0gY29udGV4dC5jcmVhdGVEZWxheSgpXG52YXIgZGVsYXlFbCA9IHVpKGRlbGF5KVxuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG9zY0VsKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmaWx0ZXJFbClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZ2FpbkVsKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkZWxheUVsKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYW5FbClcblxub3NjLmNvbm5lY3QoZmlsdGVyKVxuZmlsdGVyLmNvbm5lY3QoZ2FpbilcbmdhaW4uY29ubmVjdChkZWxheSlcbmRlbGF5LmNvbm5lY3QocGFuKVxucGFuLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbilcbmdhaW4uZ2Fpbi52YWx1ZSA9IDAuMVxub3NjLnN0YXJ0KClcblxuXG52YXIgcGxheWVyID0gY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKVxuXG5sb2FkU2FtcGxlMkJ1ZmYoY29udGV4dCwgJ3d3dy9hbWVuLndhdicsIGZ1bmN0aW9uKGJ1ZmZlcil7XG5cbiAgdmFyIHBsYXllckZpbHRlciA9IGNvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgdmFyIHBsYXllckdhaW4gPSBjb250ZXh0LmNyZWF0ZUdhaW4oKVxuICBwbGF5ZXIuY29ubmVjdChwbGF5ZXJGaWx0ZXIpXG4gIHBsYXllckZpbHRlci5jb25uZWN0KHBsYXllckdhaW4pXG4gIHBsYXllckdhaW4uY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKVxuICBwbGF5ZXIuYnVmZmVyID0gYnVmZmVyXG4gIHBsYXllci5sb29wID0gdHJ1ZVxuICBwbGF5ZXJHYWluLmdhaW4udmFsdWUgPSAwLjNcblxuICB2YXIgcGxheWVyRWwgPSB1aShwbGF5ZXIpXG4gIHZhciBwbGF5ZXJGaWx0ZXJFbCA9IHVpKHBsYXllckZpbHRlcilcbiAgdmFyIHBsYXllckdhaW5FbCA9IHVpKHBsYXllckdhaW4pXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGxheWVyRWwpXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGxheWVyRmlsdGVyRWwpXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGxheWVyR2FpbkVsKVxuXG4gIHBsYXllci5zdGFydCgpXG59KSJdfQ==
