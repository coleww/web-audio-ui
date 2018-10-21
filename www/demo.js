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