module.exports = store

const createDeck = require('../lib/create-deck')
const createPlayer = require('../lib/create-player')
const pickWinner = require('../lib/pick-winner')

function store (state, emitter) {
  state.message = ''
  state.table = 0
  state.controlDisableBet = false
  state.controlDisableDraw = false
  state.controlDisableStop = false
  state.controlDisableNewRound = false
  state.deck = createDeck()
  state.playerOne = createPlayer({
    deck: state.deck,
    name: 'You',
    cash: 5
  })
  state.playerTwo = createPlayer({
    deck: state.deck,
    name: 'Grusomme Gunnar',
    cash: 5
  })

  emitter.on('DOMContentLoaded', function () {
    emitter.on('game:tie', function () {
      state.message = 'Tie! No winners, just loosers!'
      state.controlDisableBet = true
      state.controlDisableDraw = true
      state.controlDisableStop = true
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:winner', function (winner) {
      state.table -= winner.win(state.table)
      const stats = winner.showStats()
      state.message = `${stats.name} wins it all!`
      state.controlDisableBet = true
      state.controlDisableDraw = true
      state.controlDisableStop = true
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:bet', function () {
      state.table += state.playerOne.bet(1)
      state.table += state.playerTwo.bet(1)
      state.controlDisableBet = true
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:draw', function () {
      state.playerOne.draw()
      const gotWinner = pickWinner(state.playerOne, state.playerTwo)
      if (gotWinner.length === 1) {
        emitter.emit('game:winner', gotWinner[0])
      } else {
        emitter.emit(state.events.RENDER)
      }
    })
    emitter.on('game:stop', function () {
      state.controlDisableBet = true
      state.controlDisableStop = true
      state.controlDisableDraw = true
      state.playerTwo.draw({ score: state.playerOne.getScore() + 1 })
      const gotWinner = pickWinner(state.playerOne, state.playerTwo)
      emitter.emit('game:winner', gotWinner[0])
    })
    emitter.on('game:resetcontrols', function () {
      state.controlDisableBet = false
      state.controlDisableDraw = false
      state.controlDisableStop = false
      state.controlDisableNewRound = false
      state.message = ''
    })
    emitter.on('game:newround', function () {
      emitter.emit('game:resetcontrols')
      state.deck.newGame()
      state.deck.shuffle()
      state.playerOne.newGame()
      state.playerTwo.newGame()
      state.table += state.playerOne.bet(1)
      state.table += state.playerTwo.bet(1)
      state.playerOne.draw({ cards: 2 })
      state.playerTwo.draw({ cards: 2 })
      const gotBlackJack = state.playerOne.getScore() === 21 || state.playerTwo.getScore() === 21
      if (gotBlackJack) {
        const gotWinner = pickWinner(state.playerOne, state.playerTwo)
        if (gotWinner.length === 1) {
          emitter.emit('game:winner', gotWinner[0])
        } else if (gotWinner.length === 2) {
          emitter.emit('game:tie')
        }
      } else {
        // No more cash
        if (state.playerOne.cash === 0 || state.playerTwo.cash === 0) {
          state.controlDisableBet = true
        }
        emitter.emit(state.events.RENDER)
      }
    })
    emitter.emit('game:newround')
  })
}
