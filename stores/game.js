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
    emitter.on('game:over', function () {
      if (state.playerOne.showPocket() === 0) {
        state.message = 'Muuwahahahah! You can not beat me!'
      }
      if (state.playerTwo.showPocket() === 0) {
        state.message = `Ok.. here's the secret code: 42`
      }
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:tie', function () {
      state.message = 'Tie! No winners, just loosers!'
      state.controlDisableBet = true
      state.controlDisableDraw = true
      state.controlDisableStop = true
      state.controlDisableNewRound = false
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:winner', function (winner) {
      state.table -= winner.win(state.table)
      const stats = winner.showStats()
      state.message = `Winner: ${stats.name}! ...the winner takes it aaaaalllll...`
      state.controlDisableBet = true
      state.controlDisableDraw = true
      state.controlDisableStop = true
      state.controlDisableNewRound = false
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:bet', function () {
      if (state.playerOne.showPocket() > 0 && state.playerTwo.showPocket() > 0) {
        state.table += state.playerOne.bet(1)
        state.table += state.playerTwo.bet(1)
        state.controlDisableBet = true
      } else {
        state.controlDisableBet = true
      }
      emitter.emit(state.events.RENDER)
    })
    emitter.on('game:draw', function () {
      state.playerOne.draw()
      const gotBlackJack = state.playerOne.getScore() === 21
      const toHighScore = state.playerOne.getScore() > 21
      if (gotBlackJack || toHighScore) {
        const gotWinner = pickWinner(state.playerOne, state.playerTwo)
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
      const gameOver = state.playerOne.showPocket() === 0 || state.playerTwo.showPocket() === 0
      if (gameOver) {
        state.controlDisableNewRound = false
        emitter.emit('game:over')
      } else {
        emitter.emit('game:resetcontrols')
        state.controlDisableNewRound = true
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
          if (state.playerOne.showPocket() === 0 || state.playerTwo.showPocket() === 0) {
            state.controlDisableBet = true
          }
          emitter.emit(state.events.RENDER)
        }
      }
    })
    emitter.emit('game:newround')
  })
}
