module.exports = function (node) {
  return {
    className: "delay",
    label: "Delay",
    type: "DelayNode",
    attributes: [
      {
        attribute: "delayTime",
        type: "range",
        label: "Delay Time",
        min: 0,
        max: 30,
        step: "any",
        value: node.delayTime.value,
        update: function (val) {
          node.delayTime.value = val
        }
      }
    ]
  }
}

