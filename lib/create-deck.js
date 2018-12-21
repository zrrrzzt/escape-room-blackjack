const shuffle = require('crypto-shuffle')
const suits = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES']
const values = ['A', 'J', 'K', 'Q', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const createDeck = () => {
  const deck = suits
    .map(suit => values.map(value => Object.assign({ suit, value })))
    .reduce((prev, curr) => {
      return prev.concat(curr)
    }, [])
  return deck
}

module.exports = () => {
  let cards = createDeck()
  return {
    showCards () {
      console.log(cards)
    },
    shuffle () {
      shuffle(cards)
    },
    draw () {
      return cards.shift()
    },
    newGame () {
      cards = createDeck()
    }
  }
}
