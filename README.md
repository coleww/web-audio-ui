web-audio-ui
----------------

[![NPM](https://nodei.co/npm/web-audio-ui.png)](https://nodei.co/npm/web-audio-ui/)

ostensibly this package is intended to render extremely simple UI elements for controlling web audio nodes,
however it can be configured to generate range inputs and select dropdowns that are bound to any sort of object,
perhaps to control the settings of a generative art piece, or a data visualization, or an "indie game".

if passed an audioNode`*`, it will automatically generate a UI element based on a default config,
however you can customize that by passing a config object in order to change behavior or support handling custom web audio objects (or any object for that matter)

[DEMO](http://coleww.github.io/web-audio-ui)

### `*` CURRENTLY SUPPORTED audioNodes !:

- Gain
- Oscillator
- Delay
- BiquadFilter
- AudioBufferSource
- WaveShaper (uses this [distortion curve](https://www.npmjs.com/package/make-distortion-curve) as a default)
- StereoPanner

### INSTALL
`npm install web-audio-ui`

### SIMPLE USE

```
var ui = require('web-audio-ui')

var context = new (window.AudioContext || window.webkitAudioContext)()
var osc = context.createOscillator()

var el = ui(osc)
// WOW! el is an html element with inputs bound to the parameters of the audio node! 

document.body.appendChild(el)
osc.start()
// now you have a lovely tone ringing in yr ears! play with the sliders to make it lovelier!-->
```

### ADVANCED USE

```
var ui = require('web-audio-ui')

// any sort of object can be bound to web-audio-ui, for example: a custom web audio module, a processing sketch, a bunch of jquery spaghetti
var node = {
  type: 'cool',
  time: 3,
}

// we can pass a configuration object to tell web-audio-ui what to do with an arbitrary object
var el = ui(node, {
  className: "wow", // CSS class name to use for the element
  label: "Wow", // label text
  attributes: [
    {
      attribute: "time", // attribute name, used for CSS classes
      type: "range", // input type, can be `range` or `select`
      label: "Time", // UI label text
      min: 0, // min value for the range
      max: 1000, // max value for the range
      step: "any", // increments that the range can be changed by, can be "any" or a number
      value: node.time, // initial value
      update: function (val) { // function to run when input is changed
        node.time = val
        console.log(node)
      }
    },
    {
      attribute: "type", // attribute name, used for CSS classes
      type: "select", // input type, can be `range` or `select`
      label: "Type", // UI label text
      opts: ["cool", "cooler", "coolest"], // options for the select
      value: node.type, // initial value
      update: function (val) { // function to run when input is changed
        node.type = val
        console.log(node)
      }
    }
  ]
})
// WOW! el is an html element with inputs bound to the parameters of the arbitary object thing! 

document.body.appendChild(el)
// now you can update whatever you want! -->
```

### STYLE IT

the demo [main.css](https://github.com/coleww/web-audio-ui/blob/gh-pages/www/main.css) shows off many of the classes you can target with yr styles. 

### DEV

```
# install dependencies

npm install

## to play with the nodes:
# start watchify and local server

npm run watch
python -m SimpleHTTPServer

## to run the tests
# start watchify to build the test files 

npm run test

# => open browser to localhost:8000/test.html and inspect the console
# => it would be rly great to be able to run these tests via a CLI, but...this seems easier...
```
