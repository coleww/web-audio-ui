
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