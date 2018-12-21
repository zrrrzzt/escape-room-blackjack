module.exports = hand => {
  const data = hand.map(card => `${card.suit[0]}${card.value}`)
  return data.join(',')
}
