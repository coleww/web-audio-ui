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