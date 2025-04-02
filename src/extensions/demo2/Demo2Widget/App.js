function App() {
  function postMsg(action, payload) {
    globalThis.parent.postMessage({ action, payload }, '*')
  }

  function handleFlyToTokyo() {
    postMsg('flyToTokyo')
  }

  const card = document.createElement('div')
  card.className = 'card'

  // ----- Header -----
  const header = document.createElement('div')
  header.className = 'card-header'

  const title = document.createElement('h3')
  title.className = 'card-title'
  title.textContent = 'Hello world2'

  const desc = document.createElement('p')
  desc.className = 'card-description'
  desc.textContent = 'Lipsum dolor sit amet, consectetur adipiscing elit'

  header.append(title, desc)
  card.appendChild(header)

  // ----- Table -----
  const content = document.createElement('div')
  content.className = 'card-content'

  const table = document.createElement('table')
  table.className = 'table'

  const thead = document.createElement('thead')
  const trHead = document.createElement('tr')
  ;['', 'Longitude', 'Latitude', 'Height'].forEach((text) => {
    const th = document.createElement('th')
    th.textContent = text
    trHead.appendChild(th)
  })
  thead.appendChild(trHead)

  const tbody = document.createElement('tbody')
  const trBody = document.createElement('tr')

  const tdLabel = document.createElement('td')
  tdLabel.textContent = 'Mouse'
  tdLabel.className = 'font-semibold'

  function createInput(id) {
    const td = document.createElement('td')

    const input = document.createElement('input')
    input.type = 'number'
    input.disabled = true
    input.id = id

    td.appendChild(input)
    return td
  }

  window.addEventListener('message', (event) => {
    const { data } = event
    if (data.action === 'mouseMove' && data.payload) {
      const { lng, lat, height } = data.payload
      document.getElementById('mouse-lng').value = lng
      document.getElementById('mouse-lat').value = lat
      document.getElementById('mouse-height').value = height
    }
  })

  trBody.append(tdLabel, createInput('mouse-lng'), createInput('mouse-lat'), createInput('mouse-height'))
  tbody.appendChild(trBody)

  table.append(thead, tbody)
  content.appendChild(table)
  card.appendChild(content)

  // ----- Footer -----
  const footer = document.createElement('div')
  footer.className = 'card-footer'

  const button = document.createElement('button')
  button.className = 'btn'
  button.textContent = 'Fly to Tokyo ✈️'
  button.onclick = handleFlyToTokyo

  footer.appendChild(button)
  card.appendChild(footer)

  return card
}

export default App
