module.exports = function (node) {
  return {
    className: "stereo-panner",
    label: "Stereo Panner",
    attributes: [
      {
        attribute: "pan",
        type: "range",
        label: "Pan",
        min: -1,
        max: 1,
        step: "any",
        value: node.pan.value,
        update: function (val) {
          node.pan.value = val
        }
      }
    ]
  }
}