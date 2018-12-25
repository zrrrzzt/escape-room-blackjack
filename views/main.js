var html = require('choo/html')

var TITLE = 'BlackJack'

module.exports = view

function renderPlayer (player) {
  const data = player.showStats()
  return html`
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1>${data.name}</h1>
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
        ${state.playerOne && renderPlayer(state.playerOne)}
        ${state.playerTwo && renderPlayer(state.playerTwo)}
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1>Table: $ ${state.table}</h1>
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
