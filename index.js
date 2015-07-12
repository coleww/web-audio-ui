var typey = require('get-object-type')
var createOscillator = require('./src/create-oscillator')
var createDelay = require('./src/create-delay')
var createBiquadFilter = require('./src/create-biquad-filter')
var createGain = require('./src/create-gain')
var createAudioBufferSource = require('./src/create-audio-buffer-source')

module.exports = function(node){
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
    // case 'ConvolverNode':
      // createConvolver(el, node)
    //   break
    // case 'WaveShaperNode':
      // createWaveShaper(el, node)
    //   break
    case 'AudioBufferSourceNode':
      createAudioBufferSource(el, node)
      break
    // case 'PannerNode':
      // createPanner(el, node)
    //   break
    case 'BiquadFilterNode':
      createBiquadFilter(el, node)
      break
    default:
      console.log('bork')
  }
  return el
}

