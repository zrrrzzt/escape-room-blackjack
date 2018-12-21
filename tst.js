(async () => {
  const createDeck = require('./lib/create-deck')
  const createPlayer = require('./lib/create-player')
  const isWinner = require('./lib/is-winner')
  let deck = createDeck()
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
  playerOne.bet(1)
  playerTwo.bet(1)
  playerOne.draw()
  playerOne.draw()
  playerTwo.draw()
  playerTwo.draw()
  console.log(playerOne.showHand())
  console.log(playerTwo.showHand())
  console.log(isWinner(playerOne, playerTwo))
  deck.newGame()
  deck.shuffle()
  playerOne.newGame()
  playerTwo.newGame()
  playerOne.bet(1)
  playerTwo.bet(1)
  playerOne.draw()
  playerOne.draw()
  playerTwo.draw()
  playerTwo.draw()
  console.log(playerOne.showHand())
  console.log(playerTwo.showHand())
  console.log(isWinner(playerOne, playerTwo))
})()
