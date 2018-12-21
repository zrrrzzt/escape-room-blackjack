const getScore = require('./get-score')
const showHand = require('./show-hand')

module.exports = options => {
  const hand = []
  let cash = options.cash || 10
  let name = options.name
  return {
    isBroke () {
      return cash <= 0
    },
    bet (sum) {
      cash -= sum
      return sum
    },
    win (sum) {
      cash += sum
    },
    showPocket () {
      return cash
    },
    score () {
      return getScore(hand)
    },
    draw () {
      hand.push(options.deck.draw())
    },
    showHand () {
      return showHand(hand)
    },
    showStats () {
      return {
        name,
        cash,
        score: this.score(),
        hand: this.showHand()
      }
    }
  }
}
