const valueMapper = {
  A: 11,
  J: 10,
  K: 10,
  Q: 10
}

module.exports = value => {
  return parseInt(value, 10) ? parseInt(value, 10) : valueMapper[value]
}
