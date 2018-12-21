(async () => {
  const createDeck = require('./lib/create-deck')
  const createPlayer = require('./lib/create-player')
  const deck = createDeck()
  deck.shuffle()
  const playerOne = createPlayer({
    deck: deck,
    name: 'Geir',
    cash: 5
  })
  playerOne.bet(1)
  playerOne.draw()
  playerOne.draw()
  console.log(playerOne.showStats())
  playerOne.win(10)
  console.log(playerOne.showStats())
})()
