const getScore = require('./get-score')
const showHand = require('./show-hand')

module.exports = options => {
  let hand = []
  let cash = options.cash || 10
  let name = options.name
  return {
    newGame (deck) {
      hand = []
    },
    isBroke () {
      return cash <= 0
    },
    bet (sum) {
      cash -= sum
      return sum
    },
    win (sum) {
      cash += sum
      return sum
    },
    showPocket () {
      return cash
    },
    getScore () {
      return getScore(hand)
    },
    draw (limit = {}) {
      if (limit.score) {
        while (this.getScore() < limit.score) {
          this.draw()
        }
      } else if (limit.cards) {
        let count = 0
        while (count !== limit.cards) {
          count++
          this.draw()
        }
      } else {
        hand.push(options.deck.draw())
      }
    },
    showHand () {
      return showHand(hand)
    },
    showStats () {
      return {
        name,
        cash,
        numberOfCards: hand.length,
        score: this.getScore(),
        hand: this.showHand()
      }
    }
  }
}
