(async () => {
  const createDeck = require('./lib/create-deck')
  const createPlayer = require('./lib/create-player')
  const isWinner = require('./lib/is-winner')
  let deck = createDeck()
  let table = 0
  let gotWinner = []
  deck.shuffle()
  const playerOne = createPlayer({
    deck: deck,
    name: 'Geir',
    cash: 5
  })
  const playerTwo = createPlayer({
    deck: deck,
    name: 'Grusomme Gunnar',
    cash: 5
  })
  table += playerOne.bet(1)
  table += playerTwo.bet(1)
  console.log(table)
  playerOne.draw({ cards: 2 })
  playerTwo.draw({ cards: 2 })
  console.log(playerOne.showHand())
  console.log(playerTwo.showHand())
  gotWinner = isWinner(playerOne, playerTwo)
  if (gotWinner.length === 1) {
    const winner = gotWinner[0]
    console.log(winner.showStats())
    table -= winner.win(table)
    gotWinner = []
  }
  deck.newGame()
  deck.shuffle()
  playerOne.newGame()
  playerTwo.newGame()
  playerOne.bet(1)
  playerTwo.bet(1)
  playerOne.draw({ cards: 2 })
  playerTwo.draw({ cards: 2 })
  console.log(playerOne.showHand())
  console.log(playerTwo.showHand())
})()
