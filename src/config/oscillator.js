module.exports = function (node) {
  return {
    className: "oscillator",
    label: "Oscillator",
    type: "OscillatorNode",
    attributes: [
      {
        attribute: "frequency",
        type: "range",
        label: "Frequency",
        min: 1,
        max: 20000,
        value: node.frequency.value,
        update: function (val) {
          node.frequency.value = val
        },
        step: "any"
      },
      {
        attribute: "detune",
        type: "range",
        label: "Detune",
        min: -1200,
        max: 1200,
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        },
        step: "any"
      },
      {
        attribute: "type",
        type: "select",
        label: "Type",
        opts: ["sine", "square", "sawtooth", "triangle"],
        value: node.type,
        update: function (val) {
          node.type = val
        },
      }
    ]
  }
}