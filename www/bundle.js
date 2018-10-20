(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var typey = require('get-object-type')

var createEl = require('./src/create-el')
var defaultConfigs = require('./src/config')

module.exports = function(node, cfg){
  var config = cfg || {}
  var type = config.type || typey(node)
  console.log(defaultConfigs, type)
  var defaultConfig = defaultConfigs[type](node)

  // my brain tells me i should add nullchecks here, 
  // but my heart says that this works and is more elegant
  // bite me
  var mergedConfig = Object.assign({}, defaultConfig, config)

  return createEl(node, mergedConfig)
}

},{"./src/config":8,"./src/create-el":11,"get-object-type":2}],2:[function(require,module,exports){
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
        min: -1200,
        max: 1200,
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        },
        step: "any"
      },
      {
        attribute: "playbackRate",
        type: "range",
        label: "Playback Rate",
        min: 0.1,
        max: 5,
        value: node.playbackRate.value,
        update: function (val) {
          node.playbackRate.value = val
        },
        step: "any"
      },
      {
        attribute: "loopStart",
        type: "range",
        label: "Loop Start",
        min: 0,
        max: node.buffer.duration,
        value: node.loopStart,
        update: function (val) {
          node.loopStart = val
        },
        step: "any"
      },
      {
        attribute: "loopEnd",
        type: "range",
        label: "Loop End",
        min: 0,
        max: node.buffer.duration,
        value: node.loopEnd,
        update: function (val) {
          node.loopEnd = val
        },
        step: "any"
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
},{}],5:[function(require,module,exports){
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
        min: 1,
        max: 20000,
        value: node.frequency.value,
        update: function (val) {
          node.frequency.value = val
        },
        step: "any"
      },
      {
        attribute: "detune",
        type: "range",
        label: "Detune",
        min: -1200,
        max: 1200,
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        },
        step: "any"
      },
      {
        attribute: "Q",
        type: "range",
        label: "Q",
        min: 0,
        max: 1000,
        value: node.Q.value,
        update: function (val) {
          node.Q.value = val
        },
        step: "any"
      },
      {
        attribute: "gain",
        type: "range",
        label: "Gain",
        min: 0,
        max: 1,
        value: node.gain.value,
        update: function (val) {
          node.gain.value = val
        },
        step: "any"
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
},{}],6:[function(require,module,exports){
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
        max: 20000,
        value: node.delayTime.value,
        update: function (val) {
          node.delayTime.value = val
        },
        step: "any"
      }
    ]
  }
}


},{}],7:[function(require,module,exports){
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
        value: node.gain.value,
        update: function (val) {
          node.gain.value = val
        },
        step: 0.05
      }
    ]
  }
}
},{}],8:[function(require,module,exports){
module.exports = {
  OscillatorNode: require('./oscillator'),
  AudioBufferSourceNode: require('./audio-buffer-source'),
  BiquadFilterNode: require('./biquad-filter'),
  GainNode: require('./gain'),
  DelayNode: require('./delay'),
  WaveShaperNode: require('./wave-shaper'),
}
},{"./audio-buffer-source":4,"./biquad-filter":5,"./delay":6,"./gain":7,"./oscillator":9,"./wave-shaper":10}],9:[function(require,module,exports){
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
        min: 1,
        max: 20000,
        value: node.frequency.value,
        update: function (val) {
          node.frequency.value = val
        },
        step: "any"
      },
      {
        attribute: "detune",
        type: "range",
        label: "Detune",
        min: -1200,
        max: 1200,
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        },
        step: "any"
      },
      {
        attribute: "type",
        type: "select",
        label: "Type",
        opts: ["sine", "square", "sawtooth", "triangle"],
        value: node.type,
        update: function (val) {
          node.type = val
        },
      }
    ]
  }
}
},{}],10:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')

module.exports = function (node) {
  var amount = 100
  node.curve = makeDistortionCurve(100)
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
        max: 20000,
        value: amount,
        update: function (val) {
          node.curve = makeDistortionCurve(val)
        },
        step: "any"
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
},{"make-distortion-curve":3}],11:[function(require,module,exports){
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
},{"./create-range":12,"./create-select":13}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){

var context = new (window.AudioContext || window.webkitAudioContext)()
var ui = require('../')

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
},{"../":1}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nZXQtb2JqZWN0LXR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWFrZS1kaXN0b3J0aW9uLWN1cnZlL2luZGV4LmpzIiwic3JjL2NvbmZpZy9hdWRpby1idWZmZXItc291cmNlLmpzIiwic3JjL2NvbmZpZy9iaXF1YWQtZmlsdGVyLmpzIiwic3JjL2NvbmZpZy9kZWxheS5qcyIsInNyYy9jb25maWcvZ2Fpbi5qcyIsInNyYy9jb25maWcvaW5kZXguanMiLCJzcmMvY29uZmlnL29zY2lsbGF0b3IuanMiLCJzcmMvY29uZmlnL3dhdmUtc2hhcGVyLmpzIiwic3JjL2NyZWF0ZS1lbC5qcyIsInNyYy9jcmVhdGUtcmFuZ2UuanMiLCJzcmMvY3JlYXRlLXNlbGVjdC5qcyIsInd3dy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIHR5cGV5ID0gcmVxdWlyZSgnZ2V0LW9iamVjdC10eXBlJylcblxudmFyIGNyZWF0ZUVsID0gcmVxdWlyZSgnLi9zcmMvY3JlYXRlLWVsJylcbnZhciBkZWZhdWx0Q29uZmlncyA9IHJlcXVpcmUoJy4vc3JjL2NvbmZpZycpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obm9kZSwgY2ZnKXtcbiAgdmFyIGNvbmZpZyA9IGNmZyB8fCB7fVxuICB2YXIgdHlwZSA9IGNvbmZpZy50eXBlIHx8IHR5cGV5KG5vZGUpXG4gIGNvbnNvbGUubG9nKGRlZmF1bHRDb25maWdzLCB0eXBlKVxuICB2YXIgZGVmYXVsdENvbmZpZyA9IGRlZmF1bHRDb25maWdzW3R5cGVdKG5vZGUpXG5cbiAgLy8gbXkgYnJhaW4gdGVsbHMgbWUgaSBzaG91bGQgYWRkIG51bGxjaGVja3MgaGVyZSwgXG4gIC8vIGJ1dCBteSBoZWFydCBzYXlzIHRoYXQgdGhpcyB3b3JrcyBhbmQgaXMgbW9yZSBlbGVnYW50XG4gIC8vIGJpdGUgbWVcbiAgdmFyIG1lcmdlZENvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDb25maWcsIGNvbmZpZylcblxuICByZXR1cm4gY3JlYXRlRWwobm9kZSwgbWVyZ2VkQ29uZmlnKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiAoe30pLnRvU3RyaW5nLmNhbGwob2JqKS5zbGljZSg4LCAtMSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgdmFyIGsgPSB0eXBlb2YgYW1vdW50ID09PSAnbnVtYmVyJyA/IGFtb3VudCA6IDUwLFxuICAgIG5fc2FtcGxlcyA9IDQ0MTAwLFxuICAgIGN1cnZlID0gbmV3IEZsb2F0MzJBcnJheShuX3NhbXBsZXMpLFxuICAgIGRlZyA9IE1hdGguUEkgLyAxODAsXG4gICAgaSA9IDAsXG4gICAgeDtcbiAgZm9yICggOyBpIDwgbl9zYW1wbGVzOyArK2kgKSB7XG4gICAgeCA9IGkgKiAyIC8gbl9zYW1wbGVzIC0gMTtcbiAgICBjdXJ2ZVtpXSA9ICggMyArIGsgKSAqIHggKiAyMCAqIGRlZyAvICggTWF0aC5QSSArIGsgKiBNYXRoLmFicyh4KSApO1xuICB9XG4gIHJldHVybiBjdXJ2ZTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwiYXVkaW8tYnVmZmVyLXNvdXJjZVwiLFxuICAgIGxhYmVsOiBcIkF1ZGlvIEJ1ZmZlciBTb3VyY2VcIixcbiAgICB0eXBlOiBcIkF1ZGlvQnVmZmVyU291cmNlTm9kZVwiLFxuICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImRldHVuZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkRldHVuZVwiLFxuICAgICAgICBtaW46IC0xMjAwLFxuICAgICAgICBtYXg6IDEyMDAsXG4gICAgICAgIHZhbHVlOiBub2RlLmRldHVuZS52YWx1ZSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5kZXR1bmUudmFsdWUgPSB2YWxcbiAgICAgICAgfSxcbiAgICAgICAgc3RlcDogXCJhbnlcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcInBsYXliYWNrUmF0ZVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIlBsYXliYWNrIFJhdGVcIixcbiAgICAgICAgbWluOiAwLjEsXG4gICAgICAgIG1heDogNSxcbiAgICAgICAgdmFsdWU6IG5vZGUucGxheWJhY2tSYXRlLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiBcImFueVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwibG9vcFN0YXJ0XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiTG9vcCBTdGFydFwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogbm9kZS5idWZmZXIuZHVyYXRpb24sXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3BTdGFydCxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5sb29wU3RhcnQgPSB2YWxcbiAgICAgICAgfSxcbiAgICAgICAgc3RlcDogXCJhbnlcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYXR0cmlidXRlOiBcImxvb3BFbmRcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJMb29wIEVuZFwiLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogbm9kZS5idWZmZXIuZHVyYXRpb24sXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3BFbmQsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUubG9vcEVuZCA9IHZhbFxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiBcImFueVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwibG9vcFwiLFxuICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICBsYWJlbDogXCJMb29wXCIsXG4gICAgICAgIHZhbHVlOiBub2RlLmxvb3AudG9TdHJpbmcoKSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgbm9kZS5sb29wID0gKHZhbCA9PT0gXCJ0cnVlXCIpXG4gICAgICAgIH0sXG4gICAgICAgIG9wdHM6IFtcImZhbHNlXCIsIFwidHJ1ZVwiXVxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwiZmlsdGVyXCIsXG4gICAgbGFiZWw6IFwiRmlsdGVyXCIsXG4gICAgdHlwZTogXCJCaXF1YWRGaWx0ZXJOb2RlXCIsXG4gICAgYXR0cmlidXRlczogW1xuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZnJlcXVlbmN5XCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiRnJlcXVlbmN5XCIsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAyMDAwMCxcbiAgICAgICAgdmFsdWU6IG5vZGUuZnJlcXVlbmN5LnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmZyZXF1ZW5jeS52YWx1ZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiBcImFueVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZGV0dW5lXCIsXG4gICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgbGFiZWw6IFwiRGV0dW5lXCIsXG4gICAgICAgIG1pbjogLTEyMDAsXG4gICAgICAgIG1heDogMTIwMCxcbiAgICAgICAgdmFsdWU6IG5vZGUuZGV0dW5lLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmRldHVuZS52YWx1ZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiBcImFueVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiUVwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIlFcIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEwMDAsXG4gICAgICAgIHZhbHVlOiBub2RlLlEudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuUS52YWx1ZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiBcImFueVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZ2FpblwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkdhaW5cIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIHZhbHVlOiBub2RlLmdhaW4udmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZ2Fpbi52YWx1ZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiBcImFueVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwidHlwZVwiLFxuICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICBsYWJlbDogXCJUeXBlXCIsXG4gICAgICAgIG9wdHM6IFtcImxvd3Bhc3NcIixcImhpZ2hwYXNzXCIsXCJiYW5kcGFzc1wiLFwibG93c2hlbGZcIixcImhpZ2hzaGVsZlwiLFwicGVha2luZ1wiLFwibm90Y2hcIixcImFsbHBhc3NcIl0sXG4gICAgICAgIHZhbHVlOiBub2RlLnR5cGUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUudHlwZSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJkZWxheVwiLFxuICAgIGxhYmVsOiBcIkRlbGF5XCIsXG4gICAgdHlwZTogXCJEZWxheU5vZGVcIixcbiAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJkZWxheVRpbWVcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJEZWxheSBUaW1lXCIsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAyMDAwMCxcbiAgICAgICAgdmFsdWU6IG5vZGUuZGVsYXlUaW1lLnZhbHVlLFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmRlbGF5VGltZS52YWx1ZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiBcImFueVwiXG4gICAgICB9XG4gICAgXVxuICB9XG59XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwiZ2FpblwiLFxuICAgIGxhYmVsOiBcIkdhaW5cIixcbiAgICB0eXBlOiBcIkdhaW5Ob2RlXCIsXG4gICAgYXR0cmlidXRlczogW1xuICAgICAge1xuICAgICAgICBhdHRyaWJ1dGU6IFwiZ2FpblwiLFxuICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgIGxhYmVsOiBcIkdhaW5cIixcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIHZhbHVlOiBub2RlLmdhaW4udmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZ2Fpbi52YWx1ZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiAwLjA1XG4gICAgICB9XG4gICAgXVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIE9zY2lsbGF0b3JOb2RlOiByZXF1aXJlKCcuL29zY2lsbGF0b3InKSxcbiAgQXVkaW9CdWZmZXJTb3VyY2VOb2RlOiByZXF1aXJlKCcuL2F1ZGlvLWJ1ZmZlci1zb3VyY2UnKSxcbiAgQmlxdWFkRmlsdGVyTm9kZTogcmVxdWlyZSgnLi9iaXF1YWQtZmlsdGVyJyksXG4gIEdhaW5Ob2RlOiByZXF1aXJlKCcuL2dhaW4nKSxcbiAgRGVsYXlOb2RlOiByZXF1aXJlKCcuL2RlbGF5JyksXG4gIFdhdmVTaGFwZXJOb2RlOiByZXF1aXJlKCcuL3dhdmUtc2hhcGVyJyksXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZTogXCJvc2NpbGxhdG9yXCIsXG4gICAgbGFiZWw6IFwiT3NjaWxsYXRvclwiLFxuICAgIHR5cGU6IFwiT3NjaWxsYXRvck5vZGVcIixcbiAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJmcmVxdWVuY3lcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJGcmVxdWVuY3lcIixcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDIwMDAwLFxuICAgICAgICB2YWx1ZTogbm9kZS5mcmVxdWVuY3kudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZnJlcXVlbmN5LnZhbHVlID0gdmFsXG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IFwiYW55XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJkZXR1bmVcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJEZXR1bmVcIixcbiAgICAgICAgbWluOiAtMTIwMCxcbiAgICAgICAgbWF4OiAxMjAwLFxuICAgICAgICB2YWx1ZTogbm9kZS5kZXR1bmUudmFsdWUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUuZGV0dW5lLnZhbHVlID0gdmFsXG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IFwiYW55XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJ0eXBlXCIsXG4gICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgIGxhYmVsOiBcIlR5cGVcIixcbiAgICAgICAgb3B0czogW1wic2luZVwiLCBcInNxdWFyZVwiLCBcInNhd3Rvb3RoXCIsIFwidHJpYW5nbGVcIl0sXG4gICAgICAgIHZhbHVlOiBub2RlLnR5cGUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUudHlwZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsInZhciBtYWtlRGlzdG9ydGlvbkN1cnZlID0gcmVxdWlyZSgnbWFrZS1kaXN0b3J0aW9uLWN1cnZlJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobm9kZSkge1xuICB2YXIgYW1vdW50ID0gMTAwXG4gIG5vZGUuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMClcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWU6IFwid2F2ZS1zaGFwZXJcIixcbiAgICBsYWJlbDogXCJXYXZlIFNoYXBlclwiLFxuICAgIHR5cGU6IFwiV2F2ZVNoYXBlck5vZGVcIixcbiAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJhbW91bnRcIixcbiAgICAgICAgdHlwZTogXCJyYW5nZVwiLFxuICAgICAgICBsYWJlbDogXCJBbW91bnRcIixcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBtYXg6IDIwMDAwLFxuICAgICAgICB2YWx1ZTogYW1vdW50LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBub2RlLmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSh2YWwpXG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IFwiYW55XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGF0dHJpYnV0ZTogXCJvdmVyc2FtcGxlXCIsXG4gICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgIGxhYmVsOiBcIk92ZXJzYW1wbGVcIixcbiAgICAgICAgb3B0czogW1wibm9uZVwiLCBcIjJ4XCIsIFwiNHhcIl0sXG4gICAgICAgIHZhbHVlOiBub2RlLm92ZXJzYW1wbGUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIG5vZGUub3ZlcnNhbXBsZSA9IHZhbFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIF1cbiAgfVxufSIsInZhciBjcmVhdGVSYW5nZSA9IHJlcXVpcmUoJy4vY3JlYXRlLXJhbmdlJylcbnZhciBjcmVhdGVTZWxlY3QgPSByZXF1aXJlKCcuL2NyZWF0ZS1zZWxlY3QnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5vZGUsIGNvbmZpZyl7XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibm9kZS1jb250YWluZXIgXCIgKyBjb25maWcuY2xhc3NOYW1lKVxuXG4gIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGxhYmVsLnRleHRDb250ZW50ID0gY29uZmlnLmxhYmVsXG4gIGxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGFiZWwgbm9kZS1sYWJlbFwiKVxuICBlbC5hcHBlbmRDaGlsZChsYWJlbClcblxuICBjb25maWcuYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVDb25maWcpIHtcbiAgICBpZiAoYXR0cmlidXRlQ29uZmlnLnR5cGUgPT09ICdyYW5nZScpIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNyZWF0ZVJhbmdlKGF0dHJpYnV0ZUNvbmZpZykpXG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVDb25maWcudHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNyZWF0ZVNlbGVjdChhdHRyaWJ1dGVDb25maWcpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyAnaWRrIHdoYXQgdG8gZG8gd2l0aCcgKyBKU09OLnN0cmluZ2lmeShhdHRyaWJ1dGVDb25maWcpXG4gICAgfVxuICB9KVxuICByZXR1cm4gZWxcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVJhbmdlKGNvbmZpZykge1xuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWNvbnRhaW5lciBlbC1jb250YWluZXJcIilcbiAgdmFyIHJhbmdlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFuZ2VcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjb25maWcuYXR0cmlidXRlICsgXCItcmFuZ2VcIilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgY29uZmlnLm1pbilcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgY29uZmlnLm1heClcbiAgcmFuZ2VJbnB1dC5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIGNvbmZpZy5zdGVwKVxuICByYW5nZUlucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGNvbmZpZy52YWx1ZSlcbiAgdmFyIHJhbmdlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICByYW5nZUxhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbmZpZy5hdHRyaWJ1dGUgKyBcIi1pbmZvXCIpXG4gIHJhbmdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICBjb25maWcudXBkYXRlKGUudGFyZ2V0LnZhbHVlQXNOdW1iZXIpXG4gICAgcmFuZ2VMYWJlbC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnZhbHVlQXNOdW1iZXJcbiAgfSlcbiAgdmFyIGZyZXFMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIGZyZXFMYWJlbC50ZXh0Q29udGVudCA9IGNvbmZpZy5sYWJlbFxuICBmcmVxTGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWxhYmVsIGxhYmVsIGVsLWxhYmVsXCIpXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmVxTGFiZWwpXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyYW5nZUlucHV0KVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmFuZ2VMYWJlbClcbiAgXG4gIHJldHVybiBjb250YWluZXJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdChjb25maWcpIHtcbiAgdmFyIHNlbGVjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgc2VsZWN0Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbmZpZy5hdHRyaWJ1dGUgKyBcIi1jb250YWluZXIgZWwtY29udGFpbmVyXCIpXG4gIHZhciBzZWxlY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIilcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLXNlbGVjdFwiKVxuICBjb25maWcub3B0cy5mb3JFYWNoKGZ1bmN0aW9uKG9wdFRleHQpe1xuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgb3B0LnZhbHVlID0gb3B0LnRleHRDb250ZW50ID0gb3B0VGV4dFxuICAgIHNlbGVjdElucHV0LmFwcGVuZENoaWxkKG9wdClcbiAgfSlcbiAgc2VsZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgY29uZmlnLnZhbHVlKVxuICBzZWxlY3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpe1xuICAgIGNvbmZpZy51cGRhdGUoZS50YXJnZXQudmFsdWUpXG4gIH0pXG4gIHZhciBzZWxlY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gIHNlbGVjdExhYmVsLnRleHRDb250ZW50ID0gXCJ0eXBlXCJcbiAgc2VsZWN0TGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29uZmlnLmF0dHJpYnV0ZSArIFwiLWxhYmVsIGxhYmVsIGVsLWxhYmVsXCIpXG4gIHNlbGVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RMYWJlbClcbiAgc2VsZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdElucHV0KVxuICByZXR1cm4gc2VsZWN0Q29udGFpbmVyXG59IiwiXG52YXIgY29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpXG52YXIgdWkgPSByZXF1aXJlKCcuLi8nKVxuXG52YXIgb3NjID0gY29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcbnZhciBvc2NFbCA9IHVpKG9zYylcblxudmFyIGZpbHRlciA9IGNvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcbnZhciBmaWx0ZXJFbCA9IHVpKGZpbHRlcilcblxudmFyIGdhaW4gPSBjb250ZXh0LmNyZWF0ZUdhaW4oKVxudmFyIGdhaW5FbCA9IHVpKGdhaW4pXG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3NjRWwpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZpbHRlckVsKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYWluRWwpXG5cbnZhciBkZWxheSA9IGNvbnRleHQuY3JlYXRlRGVsYXkoKVxudmFyIGRlbGF5RWwgPSB1aShkZWxheSlcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkZWxheUVsKVxuXG5vc2MuY29ubmVjdChmaWx0ZXIpXG5maWx0ZXIuY29ubmVjdChnYWluKVxuZ2Fpbi5jb25uZWN0KGRlbGF5KVxuZGVsYXkuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKVxuZ2Fpbi5nYWluLnZhbHVlID0gMC4xXG5vc2Muc3RhcnQoKSJdfQ==
