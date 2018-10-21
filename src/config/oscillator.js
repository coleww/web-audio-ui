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
        min: 10,
        max: node.context.sampleRate / 2,
        step: "any",
        value: node.frequency.value,
        update: function (val) {
          node.frequency.value = val
        }
      },
      {
        attribute: "detune",
        type: "range",
        label: "Detune",
        min: -3600,
        max: 3600,
        step: 1,
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        }
      },
      {
        attribute: "type",
        type: "select",
        label: "Type",
        opts: ["sine", "square", "sawtooth", "triangle"],
        value: node.type,
        update: function (val) {
          node.type = val
        }
      }
    ]
  }
}