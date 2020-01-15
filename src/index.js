const theatreId = 35;
const showPage = document.getElementById("showings")
const menu = document.querySelector(".ui inverted red menu")
fetch("https://evening-plateau-54365.herokuapp.com/theatres/35").then(r => r.json())
.then(obj => obj.showings.forEach(turnJSONtoHTML))
// (showings => showings.forEach(turnJSONtoHTML))

function turnJSONtoHTML(showing) { 
    let firstDiv = document.createElement('div')
    let secondLi = document.createElement('div')
    let thirdLi = document.createElement('li')
    let fourthLi = document.createElement('li')
    let fifthLi = document.createElement('li')
    let newDiv = document.createElement('div')
    newDiv.className = "card"
    firstDiv.className = "header"
    secondLi.className = "meta"
    fifthLi.className = "description"
    let buyButton = document.createElement('button')
    // console.log(showing.film.title)
    let capacity = showing.capacity
    let ticketsSold = showing.tickets_sold
     let remainingTickets = capacity - ticketsSold
     let showingID = showing.id
      firstDiv.innerText = showing.film.title
      secondLi.innerText = `${showing.film.runtime} minutes`
      thirdLi.innerText = `Capacity is ${showing.capacity}`
      fourthLi.innerText = `Showtime is ${showing.showtime}`
      fifthLi.innerText = `${remainingTickets} remaining tickets`
      buyButton.innerText = `Buy Tickets`

      if (remainingTickets < 1) {
        buyButton.disabled =  true
        buyButton.innerText = "Sold Out"
    } else {
        buyButton.innerText = "Buy Tickets"
    }   

      buyButton.addEventListener("click", (event) => {
          let soldTicket = showing.tickets_sold +1 
          let newCapacity = showing.capacity -1

          remainingTickets = remainingTickets -1
          let newRemainingTickets = remainingTickets
          fetch("https://evening-plateau-54365.herokuapp.com/tickets", { 
              method: "POST", 
              headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
               },
              body: JSON.stringify({ 
               showing_id: showing.id,
               capacity: newCapacity,
               tickets_sold: soldTicket
              })
          }).then(r => r.json()).then(fifthLi.innerText = `${remainingTickets} remaining tickets`)
            if (remainingTickets < 1) {
        buyButton.disabled =  true
        buyButton.innerText = "Sold Out"
    } else {
        buyButton.innerText = "Buy Tickets"
    }   
     
        
      })
      newDiv.append(firstDiv,secondLi,thirdLi,fourthLi,fifthLi,buyButton)
    //   debugger
      showPage.append(newDiv)
}

// <div class="card">
//   <div class="content">
//     <div class="header">
//       (Film Title)
//     </div>
//     <div class="meta">
//       (Runtime) minutes
//     </div>
//     <div class="description">
//       (Num Tickets) remaining tickets
//     </div>
//     <span class="ui label">
//       (Showtime)
//     </span>
//   </div>
//   <div class="extra content">
//     <div class="ui blue button">Buy Ticket</div>
//   </div>
// </div>