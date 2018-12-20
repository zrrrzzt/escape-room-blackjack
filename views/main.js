var html = require('choo/html')

var TITLE = 'Enigma'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
          <form onsubmit=${handleSubmit}>
            <input id="suggestion" placeholder="Enter your suggestion" />
            <button type="submit" class="shadow-3 pa3 mb3 mt3 bg-white w-50 pointer">Check</button>
          </form>
          <div>
          ${state.message}
          </div>
      </main>
    </body>
  `

  function handleSubmit (e) {
    e.preventDefault()
    const suggestionField = document.getElementById('suggestion')
    const suggestion = suggestionField.value
    emit('suggestion:submit', suggestion)
    suggestionField.value = ''
  }
}
