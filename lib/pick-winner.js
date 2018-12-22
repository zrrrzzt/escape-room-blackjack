module.exports = (p1, p2) => {
  const winner = []
  const playerOne = p1.showStats()
  const playerTwo = p2.showStats()
  if (playerOne.score === 21) {
    winner.push(p1)
  } else if (playerTwo.score > 21) {
    winner.push(p1)
  } else if (playerOne.score > playerTwo.score && playerOne.score < 22) {
    winner.push(p1)
  }
  if (playerTwo.score === 21) {
    winner.push(p2)
  } else if (playerOne.score > 21) {
    winner.push(p2)
  } else if (playerTwo.score > playerOne.score && playerTwo.score < 22) {
    winner.push(p2)
  }
  return winner
}
