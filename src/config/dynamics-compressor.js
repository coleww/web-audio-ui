module.exports = function (node) {
  return {
    className: "compressor",
    label: "Dynamics Compressor",
    attributes: [
      {
        attribute: "threshold",
        type: "range",
        label: "Threshold",
        min: -100,
        max: 0,
        step: "any",
        value: node.threshold.value,
        update: function (val) {
          node.threshold.value = val
        }
      },
      {
        attribute: "knee",
        type: "range",
        label: "Knee",
        min: 0,
        max: 40,
        step: "any",
        value: node.knee.value,
        update: function (val) {
          node.knee.value = val
        }
      },
      {
        attribute: "ratio",
        type: "range",
        label: "Ratio",
        min: 1,
        max: 20,
        step: "any",
        value: node.ratio.value,
        update: function (val) {
          node.ratio.value = val
        }
      },
      {
        attribute: "attack",
        type: "range",
        label: "Attack",
        min: 0,
        max: 1,
        step: "any",
        value: node.attack.value,
        update: function (val) {
          node.attack.value = val
        }
      },
      {
        attribute: "release",
        type: "range",
        label: "Release",
        min: 0,
        max: 1,
        step: "any",
        value: node.release.value,
        update: function (val) {
          node.release.value = val
        }
      },
    ]
  }
}