(async () => {
  const createDeck = require('./lib/create-deck')
  const deck = createDeck()
  deck.shuffle()
  deck.showCards()
  console.log(deck.draw())
  deck.showCards()
})()
