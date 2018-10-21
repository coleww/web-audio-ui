module.exports = function (node) {
  return {
    className: "filter",
    label: "Filter",
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
        attribute: "Q",
        type: "range",
        label: "Q",
        min: 0.0001,
        max: 1000,
        step: "any",
        value: node.Q.value,
        update: function (val) {
          node.Q.value = val
        }
      },
      {
        attribute: "gain",
        type: "range",
        label: "Gain",
        min: 0,
        max: 1,
        step: "any",
        value: node.gain.value,
        update: function (val) {
          node.gain.value = val
        }
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