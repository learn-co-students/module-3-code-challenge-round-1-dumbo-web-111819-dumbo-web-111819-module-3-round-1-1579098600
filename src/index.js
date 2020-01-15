const theatreId = 40;

const showDiv = document.getElementsByClassName('ui cards showings')[0]
// console.log(showDiv)


fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(r => r.json())
.then((theatreObj) => {
  theatreObj.showings.forEach((showObj) => {
    turnJsonToHtml(showObj)
  })
})


function turnJsonToHtml(showObj) {
  // CREATE OUTERMOST ELEMENT
  const remainingTickets = showObj.capacity - showObj.tickets_sold

  const newShowDiv = document.createElement('div')
  newShowDiv.className = 'card'
    newShowDiv.innerHTML = `<div class="content">
    <div class="header">
      <!-- (Film Title) -->
      ${showObj.film.title}
    </div>
    <div class="meta">
      <!-- (Runtime) minutes -->
      ${showObj.film.runtime}
    </div>
    <div class="description">
      ${showObj.capacity} remaining tickets
    </div>
    <span class="ui label">
      <!-- (Showtime) -->
      ${showObj.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>`

  showDiv.append(newShowDiv)

  const divButton = newShowDiv.getElementsByClassName('ui blue button')[0]
  fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    showing_id: showObj.id
  })

  })
    .then(r => r.json())
    .then(divButton.addEventListener('click', (event) => {
      showObj.capacity - showObj.tickets_sold

    }))


}
