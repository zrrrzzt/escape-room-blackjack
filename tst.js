(async () => {
  const createDeck = require('./lib/create-deck')
  const createPlayer = require('./lib/create-player')
  const pickWinner = require('./lib/pick-winner')
  const deck = createDeck()
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
  console.log(table)
  while (!playerTwo.isBroke() && !playerOne.isBroke()) {
    table += playerOne.bet(1)
    table += playerTwo.bet(1)
    playerOne.draw({ cards: 2 })
    playerTwo.draw({ cards: 2 })
    console.log(playerOne.showHand())
    console.log(playerTwo.showHand())
    gotWinner = pickWinner(playerOne, playerTwo)
    if (gotWinner.length > 0) {
      // Got one winner
      if (gotWinner.length === 1) {
        const winner = gotWinner[0]
        console.log(winner.showStats())
        table -= winner.win(table)
        gotWinner = []
      }
      // Draw
      if (gotWinner.length === 2) {
        console.log('It\'s a draw!')
        gotWinner = []
      }
    } else {
      // Game continues
      playerOne.draw({ score: 17 })
      gotWinner = pickWinner(playerOne, playerTwo)
      // Got one winner
      if (gotWinner.length === 1) {
        const winner = gotWinner[0]
        console.log(winner.showStats())
        table -= winner.win(table)
        gotWinner = []
      } else {
        // Game continues
        playerTwo.draw({ score: playerOne.getScore() + 1 })
        gotWinner = pickWinner(playerOne, playerTwo)
        if (gotWinner.length === 1) {
          // Got a winner
          const winner = gotWinner[0]
          console.log(winner.showStats())
          table -= winner.win(table)
          gotWinner = []
        }
      }
    }
    deck.newGame()
    deck.shuffle()
    playerOne.newGame()
    playerTwo.newGame()
  }
})()
