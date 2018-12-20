module.exports = store

const { solutions, noKeyFound } = require('../lib/data/config.json')

function store (state, emitter) {
  state.message = ''

  emitter.on('DOMContentLoaded', function () {
    emitter.on('suggestion:submit', function (suggestion) {
      const message = solutions.find(line => line.key === suggestion.toLowerCase())
      state.message = message ? message.message : noKeyFound
      emitter.emit(state.events.RENDER)
    })
  })
}
