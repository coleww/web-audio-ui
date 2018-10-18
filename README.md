web-audio-ui
----------------


FIX buffer looping thing
restrict biquad Q to something sensible


[![NPM](https://nodei.co/npm/web-audio-ui.png)](https://nodei.co/npm/web-audio-ui/)

generate plain UI widgets for web audio nodes.

[DEMO](http://coleww.github.io/web-audio-ui)

CURRENTLY SUPPORTED:

- gain
- oscillator
- delay
- biquad filter
- audio buffer source
- wave shaper node (forcibly uses this [distortion curve](https://www.npmjs.com/package/make-distortion-curve))


### INSTALL
`npm install web-audio-ui`

### USE

```
var ui = require('web-audio-ui').generate
// you can also require individual functions if you want to be more "explicit" or whatever 

var context = new (window.AudioContext || window.webkitAudioContext)()
var osc = context.createOscillator()

var el = ui(osc)
// WOW! el is an html element with inputs bound to the parameters of the audio node! 

document.body.appendChild(el)
osc.start()
// now you have a lovely tone ringing in yr ears! -->
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
# start watchify 
npm run test
# => open browser to localhost:8000/test.html and inspect the console
```

### TODO

[] make numerical inputs editable
[] abstract the endless javascript garbage
[] add customizeable labels (for things like "reverbGain", "gnarlierFilter" etc.)