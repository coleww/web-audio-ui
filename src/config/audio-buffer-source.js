module.exports = function (node) {
  return {
    className: "audio-buffer-source",
    label: "Audio Buffer Source",
    type: "AudioBufferSourceNode",
    attributes: [
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
        attribute: "playbackRate",
        type: "range",
        label: "Playback Rate",
        min: 0.1,
        max: 5,
        value: node.playbackRate.value,
        update: function (val) {
          node.playbackRate.value = val
        },
        step: "any"
      },
      {
        attribute: "loopStart",
        type: "range",
        label: "Loop Start",
        min: 0,
        max: node.buffer.duration,
        value: node.loopStart,
        update: function (val) {
          node.loopStart = val
        },
        step: "any"
      },
      {
        attribute: "loopEnd",
        type: "range",
        label: "Loop End",
        min: 0,
        max: node.buffer.duration,
        value: node.loopEnd,
        update: function (val) {
          node.loopEnd = val
        },
        step: "any"
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