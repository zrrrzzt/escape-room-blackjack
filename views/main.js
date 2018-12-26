const html = require('choo/html')
const TITLE = 'BlackJack'

module.exports = view

function renderPlayer (player) {
  const data = player.showStats()
  const list = [...Array(data.cash).keys()]
  const hand = data.hand.split(', ')
  const cards = hand.map(card => html`<img src="../assets/images/cards/${card}.png" width="75" />`)
  const money = data.cash > 0 ? list.map(item => html`<img src="../assets/images/token.png" width="50" />`) : ''
  return html`
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <img src="../assets/images/${data.name}.png" width="100" class="float-right" />
      <h1>${data.name} ${data.score}</h1>
      <div>${cards}</div>
      <div>${money}</div>
    </div>
  `
}

function renderTable (cash) {
  const list = [...Array(cash).keys()]
  const money = cash > 0 ? list.map(item => html`<img src="../assets/images/token.png" width="50" />`) : ''
  return html`
    <div>
      ${money}
    </div>
  `
}

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="container mx-auto py-8">
      <main>
        ${state.playerOne && renderPlayer(state.playerOne)}
        ${state.playerTwo && renderPlayer(state.playerTwo)}
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          ${state.table && state.table > 0 ? renderTable(state.table) : ''}
          <div>${state.message}</div>
        </div>
        <div class="flex flex-col md:flex-row">
          <button onclick=${handleBet} class="flex-1 bg-white hover:bg-grey-lightest text-grey-darkest font-semibold my-1 py-4 px-4 border border-grey-light rounded shadow${state.controlDisableBet ? ' cursor-not-allowed' : ''}" ${state.controlDisableBet ? 'disabled' : ''}>Bet</button>
          <button onclick=${handleDraw} class="flex-1 bg-white hover:bg-grey-lightest text-grey-darkest font-semibold my-1 py-4 px-4 border border-grey-light rounded shadow${state.controlDisableDraw ? ' cursor-not-allowed' : ''}" ${state.controlDisableDraw ? 'disabled' : ''}>Hit</button>
          <button onclick=${handleStop} class="flex-1 bg-white hover:bg-grey-lightest text-grey-darkest font-semibold my-1 py-4 px-4 border border-grey-light rounded shadow${state.controlDisableStop ? ' cursor-not-allowed' : ''}" ${state.controlDisableStop ? 'disabled' : ''}>Stand</button>
          <button onclick=${handleNewRound} class="flex-1 bg-white hover:bg-grey-lightest text-grey-darkest font-semibold my-1 py-4 px-4 border border-grey-light rounded shadow${state.controlDisableNewRound ? ' cursor-not-allowed' : ''}" ${state.controlDisableNewRound ? 'disabled' : ''}>New round</button>
        </div>
      </main>
    </body>
  `

  function handleBet () {
    emit('game:bet')
  }
  function handleDraw () {
    emit('game:draw')
  }
  function handleStop () {
    emit('game:stop')
  }
  function handleNewRound () {
    emit('game:newround')
  }
}
