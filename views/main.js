var html = require('choo/html')

var TITLE = 'BlackJack'

module.exports = view

function renderPlayer (player) {
  const data = player.showStats()
  return html`
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2>${data.name}</h2>
      <div>Cards: ${data.hand}</div>
      <div>Cash: ${data.cash}</div>
      <div>Score: ${data.score}</div>
    </div>
  `
}

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="container mx-auto py-8">
      <main>
        <h1>BlackJack</h1>
        ${state.playerOne && renderPlayer(state.playerOne)}
        ${state.playerTwo && renderPlayer(state.playerTwo)}
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2>Table: $ ${state.table}</h2>
          <div>${state.message}</div>
        </div>
        <div class="flex items-center justify-between">
          <button onclick=${handleBet} class="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow${state.controlDisableBet ? ' cursor-not-allowed' : ''}" ${state.controlDisableBet ? 'disabled' : ''}>Bet</button>
          <button onclick=${handleDraw} class="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow${state.controlDisableDraw ? ' cursor-not-allowed' : ''}" ${state.controlDisableDraw ? 'disabled' : ''}>Draw</button>
          <button onclick=${handleStop} class="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow${state.controlDisableStop ? ' cursor-not-allowed' : ''}" ${state.controlDisableStop ? 'disabled' : ''}>Stop</button>
          <button onclick=${handleNewRound} class="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow${state.controlDisableNewRound ? ' cursor-not-allowed' : ''}" ${state.controlDisableNewRound ? 'disabled' : ''}>New deal</button>
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
