module.exports = function (node) {
  return {
    className: "filter",
    label: "Filter",
    type: "BiquadFilterNode",
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
        attribute: "Q",
        type: "range",
        label: "Q",
        min: 0,
        max: 1000,
        value: node.Q.value,
        update: function (val) {
          node.Q.value = val
        },
        step: "any"
      },
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
        step: "any"
      },
      {
        attribute: "type",
        type: "select",
        label: "Type",
        opts: ["lowpass","highpass","bandpass","lowshelf","highshelf","peaking","notch","allpass"],
        value: node.type,
        update: function (val) {
          node.type = val
        }
      }
    ]
  }
}