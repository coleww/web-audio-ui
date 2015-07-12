var tap = require('tape')
var triggerChange = require('trigger-change')

var context = new (window.AudioContext || window.webkitAudioContext)()
var webAudioUI = require('./')

tap.test('Oscillator',function(t){
  t.plan(6)

  var osc = context.createOscillator()
  var el = webAudioUI(osc)
  console.log(osc.detune.value)
  var typeSelect = el.querySelector('.type-select')
  t.looseEqual(typeSelect.value, 'sine', 'default')
  triggerChange(typeSelect, 'sawtooth')
  t.looseEqual(osc.type, 'sawtooth', 'updates osc')

  var freqRange = el.querySelector('.freq-range')
  t.looseEqual(freqRange.value, 440, 'default')
  triggerChange(freqRange, 1000)
  t.looseEqual(osc.frequency.value, 1000, 'updates osc')

  var detuneRange = el.querySelector('.detune-range')
  t.looseEqual(detuneRange.value, 0, 'default')
  triggerChange(detuneRange, 400)
  t.looseEqual(osc.detune.value, 400, 'updates osc')
  triggerChange(detuneRange, 0)
  document.body.appendChild(el)
})

// tap.test('BiquadFilter',function(t){
//   var osc = context.createBiquadFilter()
//   var el = webAudioUI(osc)

// })

// tap.test('Gain',function(t){
//   var osc = context.createGain()
//   var el = webAudioUI(osc)

// })

// tap.test('Convolver',function(t){
//   var osc = context.createConvolver()
//   var el = webAudioUI(osc)

// })

// tap.test('WaveShaper',function(t){
//   var osc = context.createWaveShaper()
//   var el = webAudioUI(osc)

// })

// tap.test('AudioBufferSource',function(t){
//   var osc = context.createAudioBufferSource()
//   var el = webAudioUI(osc)

// })

// tap.test('Delay',function(t){
//   var osc = context.createDelay()
//   var el = webAudioUI(osc)

// })

// tap.test('Panner',function(t){
//   var osc = context.createPanner()
//   var el = webAudioUI(osc)

// })
