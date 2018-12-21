module.exports = (p1, p2) => {
  const winner = []
  const playerOne = p1.showStats()
  const playerTwo = p2.showStats()
  if (playerOne.numberOfCards === 2 && playerTwo.numberOfCards === 2) {
    if (playerOne.score === 21) {
      winner.push(playerOne)
    }
    if (playerTwo.score === 21) {
      winner.push(playerTwo)
    }
  } else {
    if (playerOne.score > playerTwo.score && playerOne.score < 22) {
      winner.push(playerOne)
    }
    if (playerTwo.score > playerOne.score && playerTwo.score < 22) {
      winner.push(playerTwo)
    }
  }
  return winner.length > 0 ? winner : false
}
