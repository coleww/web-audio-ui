var makeDistortionCurve = require('make-distortion-curve')

module.exports = function (node) {
  var amount = 50
  node.curve = makeDistortionCurve(amount)
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