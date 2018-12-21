const getValue = require('./get-value')

module.exports = data => {
  return data
    .map(card => getValue(card.value))
    .reduce((prev, curr) => {
      prev += curr
      return prev
    }, 0)
}
