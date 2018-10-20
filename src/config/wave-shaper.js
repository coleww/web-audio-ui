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