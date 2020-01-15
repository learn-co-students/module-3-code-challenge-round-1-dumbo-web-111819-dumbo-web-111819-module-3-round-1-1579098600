const theatreId = 39;

let filmUrl = "https://evening-plateau-54365.herokuapp.com/theatres/39"
let buyTicketUrl = "https://evening-plateau-54365.herokuapp.com/tickets"
let cardsContainer = document.querySelector(".ui.cards.showings")

fetch(`${filmUrl}`)
    .then(r=>r.json())
    .then(data => {
        data.showings.forEach(showing => {
            renderShow(showing)
        })
    })

function renderShow(showing){
    let remainingTickets = showing.capacity - showing.tickets_sold
    let divCard = document.createElement("div")
    divCard.className = "card"
    divCard.id = showing.id
    if(remainingTickets > 0){
        divCard.innerHTML = `
                <div class="content">
                    <div class="header">
                        ${showing.film.title}
                    </div>
                    <div class="meta">
                        ${showing.film.runtime} minutes
                    </div>
                    <div class="description">
                        ${remainingTickets} remaining tickets
                    </div>
                    <span class="ui label">
                        ${showing.showtime}
                    </span>
                </div>
                <div class="extra content">
                    <button class="ui blue button">Buy Ticket</button>
                </div>
        `
        divCard.addEventListener("click", (e) => {
            buyTicket(e, showing)
        })
        cardsContainer.append(divCard)
    } else {
        divCard.innerHTML = `
                <div class="content">
                    <div class="header">
                        ${showing.film.title}
                    </div>
                    <div class="meta">
                        ${showing.film.runtime} minutes
                    </div>
                    <div class="description">
                        ${remainingTickets} remaining tickets
                    </div>
                    <span class="ui label">
                        ${showing.showtime}
                    </span>
                </div>
                <div class="extra content">
                    Sold Out
                </div>
        `
        cardsContainer.append(divCard)
    }
}

function buyTicket(e, showing){
    let remainingTickets = showing.capacity - showing.tickets_sold
    console.log(remainingTickets)
    if(e.target.classList.value === "ui blue button" && remainingTickets > 0){
        fetch(`${buyTicketUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                showing_id: showing.id
            })
        })
        .then(r=>r.json())
        .then(function(){
            let divCard = document.getElementById(`${showing.id}`)
            showing.tickets_sold++
            let remainingTickets = showing.capacity - showing.tickets_sold
            divCard.innerHTML = `
                    <div class="content">
                        <div class="header">
                            ${showing.film.title}
                        </div>
                        <div class="meta">
                            ${showing.film.runtime} minutes
                        </div>
                        <div class="description">
                            ${remainingTickets} remaining tickets
                        </div>
                        <span class="ui label">
                            ${showing.showtime}
                        </span>
                    </div>
                    <div class="extra content">
                        <button class="ui blue button">Buy Ticket</button>
                    </div>
            `
        })
    } else {
        let divCard = document.getElementById(`${showing.id}`)
            divCard.innerHTML = `
                    <div class="content">
                        <div class="header">
                            ${showing.film.title}
                        </div>
                        <div class="meta">
                            ${showing.film.runtime} minutes
                        </div>
                        <div class="description">
                            ${remainingTickets} remaining tickets
                        </div>
                        <span class="ui label">
                            ${showing.showtime}
                        </span>
                    </div>
                    <div class="extra content">
                        Sold Out
                    </div>
            `
    }
}

