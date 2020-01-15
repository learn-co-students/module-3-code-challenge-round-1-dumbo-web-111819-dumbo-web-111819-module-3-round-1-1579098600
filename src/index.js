// A theatre has many showings. ( Theater -< Showing -< Ticket )

// https://evening-plateau-54365.herokuapp.com/theatres/36

// -----------------------------------------------------------------------------------------------------

// Deliverables: Build an application where users buy tickets.

// -----------------------------------------------------------------------------------------------------

const theatreId = 36;
const URL_PREFIX = `https://evening-plateau-54365.herokuapp.com`
const cardsContainer = document.querySelector(".ui.cards.showings")

fetchAllShowings()

// ---- DELIVERABLE 1 As a user, when the page loads I should see a list of movie showings fetched from a remote API.
function fetchAllShowings(){
   cardsContainer.innerHTML = ""
   fetch(`${URL_PREFIX}/theatres/${theatreId}`)
   .then(r => r.json())
   .then(theater => renderShowings(theater))
}

function renderShowings(theater){
   theater.showings.forEach(renderOneShowing);
}

function renderOneShowing(showing){
   const showingCard = document.createElement("div")
   showingCard.className = "card"
   renderShowingInfo(showing, showingCard)
   cardsContainer.append(showingCard)
}

// separated out so the individual showing card can be updated & stay in place w/o refreshing the whole page
function renderShowingInfo(showing, showingCard) {
   showingCard.innerHTML = ""

   const contentDiv = document.createElement("div")
      contentDiv.className = "content"
   const filmTitle = document.createElement("div")
      filmTitle.className = "header"
      filmTitle.innerText = showing.film.title
   const runtime = document.createElement("div")
      runtime.className = "meta"
      runtime.innerText = `${showing.film.runtime} minutes`
   const showtime = document.createElement("span")
      showtime.className = "ui label"
      showtime.innerText = showing.showtime
   const remainingTickets = document.createElement("div")
      remainingTickets.className = "description"
      remainingTickets.innerText = `${(showing.capacity - showing.tickets_sold)} remaining tickets`
   const extraContent = document.createElement("div")
      extraContent.className = "extra content"
// ---- DELIVERABLE 3.1 As a user I should not be able to purchase a ticket for a sold out showing.
// ---- DELIVERABLE 3.2 The 'Buy Ticket' button should be disabled on sold out showings, 
   const buyTicket = document.createElement("div")
      if ((showing.capacity - showing.tickets_sold) <= 0){
         buyTicket.className = "description"
// ---- DELIVERABLE 3.3 and the text should change to "sold out".
         buyTicket.innerText = "Sold Out"
      } else {
         buyTicket.className = "ui blue button"
         buyTicket.innerText = "Buy Ticket"
// ---- DELIVERABLE 2.1 As a user, clicking on the 'Buy Ticket' button... 
         buyTicket.addEventListener("click", () => {
            purchaseTicket(showing, showingCard)
         })
      }

   contentDiv.append(filmTitle, runtime, showtime, remainingTickets)
   extraContent.append(buyTicket)
   showingCard.append(contentDiv, extraContent)
}

// ---- DELIVERABLE 2.3 This information should be persisted in the remote API.
function purchaseTicket(showing, showingCard){
   fetch(`${URL_PREFIX}/tickets/`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json"
      },
      body: JSON.stringify({
         showing_id: showing.id
      })
   })
   .then(r => r.json())
   .then(ticket => {
      if (ticket.showing_id != undefined && ticket.showing_id === showing.id) {
// ---- DELIVERABLE 2.2 ...should purchase a ticket and decrement the remaining tickets by one. 
         showing.tickets_sold += 1
         renderShowingInfo(showing, showingCard)
      } // else display error message
   })
   // would we need to .catch here or would the error come through in .then?
}

