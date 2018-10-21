var tap = require('tape')
var triggerChange = require('trigger-change')

var context = new (window.AudioContext || window.webkitAudioContext)()
var webAudioUI = require('./')

tap.test('Delay',function(t){
  t.plan(2)
  var delay = context.createDelay(5.0)
  var el = webAudioUI(delay)

  var delayRange = el.querySelector('.delayTime-range')
  t.looseEqual(delayRange.value, 0, 'default')
  triggerChange(delayRange, 3)
  t.looseEqual(delay.delayTime.value, 3, 'updates delay')
  triggerChange(delayRange, 0)
  document.body.appendChild(el)
})

tap.test('Oscillator',function(t){
  t.plan(6)

  var osc = context.createOscillator()
  var el = webAudioUI(osc)

  var typeSelect = el.querySelector('.type-select')
  t.looseEqual(typeSelect.value, 'sine', 'default')
  triggerChange(typeSelect, 'sawtooth')
  t.looseEqual(osc.type, 'sawtooth', 'updates osc')

  var freqRange = el.querySelector('.frequency-range')
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

tap.test('BiquadFilter',function(t){
  t.plan(10)

  var filter = context.createBiquadFilter()
  var el = webAudioUI(filter)

  var typeSelect = el.querySelector('.type-select')
  t.looseEqual(typeSelect.value, 'lowpass', 'default')
  triggerChange(typeSelect, 'peaking')
  t.looseEqual(filter.type, 'peaking', 'updates filter')

  var freqRange = el.querySelector('.frequency-range')
  t.looseEqual(freqRange.value, 350, 'default freq')
  triggerChange(freqRange, 1000)
  t.looseEqual(filter.frequency.value, 1000, 'updates filter')

  var detuneRange = el.querySelector('.detune-range')
  t.looseEqual(detuneRange.value, 0, 'default detune')
  triggerChange(detuneRange, 400)
  t.looseEqual(filter.detune.value, 400, 'updates filter')
  triggerChange(detuneRange, 0)

  var qRange = el.querySelector('.Q-range')
  t.looseEqual(qRange.value, 1, 'default q')
  triggerChange(qRange, 1)
  t.looseEqual(filter.Q.value, 1, 'updates filter')

  var gainRange = el.querySelector('.gain-range')
  t.looseEqual(gainRange.value, 0, 'default')
  triggerChange(gainRange, 0.5)
  t.looseEqual(filter.gain.value, 0.5, 'updates filter')

  document.body.appendChild(el)
})

tap.test('Gain',function(t){
  t.plan(2)
  var gain = context.createGain()
  var el = webAudioUI(gain)
  var gainRange = el.querySelector('.gain-range')
  t.looseEqual(gainRange.value, 1, 'default')
  triggerChange(gainRange, 0.5)
  t.looseEqual(gain.gain.value, 0.5, 'updates gain')
  document.body.appendChild(el)
})

tap.test('WaveShaper',function(t){
  t.plan(4)
  var waveShaper = context.createWaveShaper()
  var el = webAudioUI(waveShaper)

  var amountRange = el.querySelector('.amount-range')
  t.looseEqual(amountRange.value, 50, 'default')

  var old = waveShaper.curve
  triggerChange(amountRange, 100)
  t.notEqual(old, waveShaper.curve, 'updates curve')

  var oversampleSelect = el.querySelector('.oversample-select')
  t.looseEqual(oversampleSelect.value, 'none')
  triggerChange(oversampleSelect, '4x')
  t.equal(waveShaper.oversample, '4x', 'updates waveShaper')
  document.body.appendChild(el)
})

tap.test('AudioBufferSource',function(t){
  t.plan(10)

  var abs = context.createBufferSource()
  var buffer = context.createBuffer(2, context.sampleRate * 3, context.sampleRate)
  abs.buffer = buffer

  var el = webAudioUI(abs)

  var detuneRange = el.querySelector('.detune-range')
  t.looseEqual(detuneRange.value, 0, 'default detune')
  triggerChange(detuneRange, 400)
  t.looseEqual(abs.detune.value, 400, 'updates abs')

  var loopSelect = el.querySelector('.loop-select')
  t.looseEqual(loopSelect.value, 'false')
  triggerChange(loopSelect, 'true')
  t.ok(abs.loop, 'updates abs')

  var loopStartRange = el.querySelector('.loopStart-range')
  t.looseEqual(loopStartRange.value, 0, 'default loopStart')
  triggerChange(loopStartRange, 2)
  t.looseEqual(abs.loopStart, 2, 'updates abs')

  var loopEndRange = el.querySelector('.loopEnd-range')
  t.looseEqual(loopEndRange.value, 0, 'default loopEnd')
  triggerChange(loopEndRange, 1)
  t.looseEqual(abs.loopEnd, 1, 'updates abs')

  var playBackRange = el.querySelector('.playbackRate-range')
  t.looseEqual(playBackRange.value, 1, 'default')
  triggerChange(playBackRange, 1.5)
  t.looseEqual(abs.playbackRate.value, 1.5, 'updates abs')
  document.body.appendChild(el)
})

tap.test('Delay',function(t){
  t.plan(2)
  var delay = context.createDelay(5.0)
  var el = webAudioUI(delay)

  var delayRange = el.querySelector('.delayTime-range')
  t.looseEqual(delayRange.value, 0, 'default')
  triggerChange(delayRange, 3)
  t.looseEqual(delay.delayTime.value, 3, 'updates delay')
  triggerChange(delayRange, 0)
  document.body.appendChild(el)
})

// tap.test('Panner',function(t){
//   var osc = context.createPanner()
//   var el = webAudioUI(osc)

// })
