module.exports = store

const createDeck = require('../lib/create-deck')
const createPlayer = require('../lib/create-player')

function store (state, emitter) {
  state.message = ''
  state.table = 0
  state.deck = createDeck()
  state.playerOne = createPlayer({
    deck: state.deck,
    name: 'Player',
    cash: 5
  })
  state.playerTwo = createPlayer({
    deck: state.deck,
    name: 'Grusomme Gunnar',
    cash: 5
  })

  emitter.on('DOMContentLoaded', function () {
    emitter.on('game:bet', function () {
      state.table += state.playerOne.bet(1)
      state.table += state.playerTwo.bet(1)
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:draw', function () {
      state.playerOne.draw()
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:stop', function () {
      state.playerTwo.draw({ score: state.playerOne.getScore() + 1 })
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:newround', function () {
      state.deck.newGame()
      state.deck.shuffle()
      state.playerOne.newGame()
      state.playerTwo.newGame()
      state.table += state.playerOne.bet(1)
      state.table += state.playerTwo.bet(1)
      state.playerOne.draw({ cards: 2 })
      state.playerTwo.draw({ cards: 2 })
      emitter.emit(state.events.RENDER)
    })
    emitter.emit('game:newround')
  })
}
