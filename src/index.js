const theatreId = 37;
const cardsShowings = document.querySelector(".ui.cards.showings")


fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(r => r.json())
.then(theatreObj => theatreObj.showings.forEach((show) => {turnShowsIntoHTML(show)}))

function turnShowsIntoHTML(show){
    const div = document.createElement('div')
    div.className = "card"
    div.innerHTML = `<div class="content">
    <div class="header">${show.film.title}</div>
    <div class="meta">${show.film.runtime}</div>
    </div>
    <div class="description">${show.capacity - show.tickets_sold}</div>
    <span class="ui label">${show.showtime}</span>
    </div>
    <div class="extra content">
    <button class="ui blue button">
    <div>Buy Ticket</div>
    </button>
    </div>`

  cardsShowings.append(div)

  let buyTicketBtn = div.querySelector('.ui.blue.button')
  let ticketsRemaining = div.querySelector('.description')


  buyTicketBtn.addEventListener("click", (event) => {
    //   debugger
    const ticketsSold = show.tickets_sold += 1

      fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                showing_id: show.id
            })
        })
        .then(r => r.json())
        .then((showing) => {
            ticketsRemaining.innerText = show.capacity - ticketsSold
            show.tickets_sold = ticketsSold
            turnShowsIntoHTML(showing)
        })
         if(ticketsSold === show.capacity){
            event.target.disabled = true
        }
  })

  
}

