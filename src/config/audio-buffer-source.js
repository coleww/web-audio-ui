module.exports = function (node) {
  return {
    className: "audio-buffer-source",
    label: "Audio Buffer Source",
    attributes: [
      {
        attribute: "detune",
        type: "range",
        label: "Detune",
        min: -3600,
        max: 3600,
        step: "any",
        value: node.detune.value,
        update: function (val) {
          node.detune.value = val
        }
      },
      {
        attribute: "playbackRate",
        type: "range",
        label: "Playback Rate",
        min: 0.1,
        max: 4,
        step: "any",
        value: node.playbackRate.value,
        update: function (val) {
          node.playbackRate.value = val
        }
      },
      {
        attribute: "loopStart",
        type: "range",
        label: "Loop Start",
        min: 0,
        max: node.buffer.duration,
        step: "any",
        value: node.loopStart,
        update: function (val) {
          node.loopStart = val
        }
      },
      {
        attribute: "loopEnd",
        type: "range",
        label: "Loop End",
        min: 0,
        max: node.buffer.duration,
        step: "any",
        value: node.loopEnd,
        update: function (val) {
          node.loopEnd = val
        }
      },
      {
        attribute: "loop",
        type: "select",
        label: "Loop",
        value: node.loop.toString(),
        update: function (val) {
          node.loop = (val === "true")
        },
        opts: ["false", "true"]
      }
    ]
  }
}