const theatreId = 38;

// As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement the remaining tickets by one. This information should be persisted in the remote API.

// As a user I should not be able to purchase a ticket for a sold out showing. The 'Buy Ticket' button should be disabled on sold out showings, and the text should change to "sold out".


// DONE: 

    // You will be building out an application that allows a user to purchase movie tickets.

    // As a user, when the page loads I should see a list of movie showings fetched from a remote API.


const showingsDiv = document.querySelector(".showings")
// debugger


fetch("https://evening-plateau-54365.herokuapp.com/theatres/38")
.then(resp => resp.json())
.then(showingsData => {
    showingsData.showings.forEach(showingObj => {
        displayShowingObj(showingObj)
    });
})

function displayShowingObj(showingObj){
    const outerDiv = document.createElement('div')
        outerDiv.className = "card"
        const contentDiv = document.createElement('div')
            contentDiv.className = "content"
            const titleDiv = document.createElement('div')
                titleDiv.className = "header"
                titleDiv.innerText = showingObj.film.title
            const runtimeDiv = document.createElement('div')
                runtimeDiv.className = "meta"
                runtimeDiv.innerText = `${showingObj.film.runtime} minutes`
            const numTicketDiv = document.createElement('div')
                numTicketDiv.className = "description"
                numOfRemainingTickets = showingObj.capacity - showingObj["tickets_sold"]
                numTicketDiv.innerText = `${numOfRemainingTickets} remaining tickets` //refactor later
            const showtimeSpan = document.createElement('span')
                showtimeSpan.className = "ui label"
                showtimeSpan.innerText = showingObj.showtime
        const extraContentDiv = document.createElement('div')
            extraContentDiv.className = "extra content"
            const buyTicketDiv = document.createElement('div')
                buyTicketDiv.className = "ui blue button"
                buyTicketDiv.innerText = "Buy Ticket"
                buyTicketDiv.disabled = false
                // buyTicketDiv.dataset.id = showingObj.id

                buyTicketDiv.addEventListener('click', (e) => {
                    console.log("I've been bought!")
                    fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            showing_id: showingObj.id
                        })
                    })
                    .then(resp => resp.json())
                    .then(newTicketNum =>{
                        // showingObj.tickets_sold -= 1
                        // if (`${parseInt(numTicketDiv.innerText)}`){
                        //     buyTicketDiv.disabled
                        //     buyTicketDiv.innerText = "Sold Out!"
                        // } else {
                            numTicketDiv.innerText = `${parseInt(numTicketDiv.innerText)-1} remaining tickets`
                        // }
                    })
                })

                extraContentDiv.append(buyTicketDiv)
            contentDiv.append(titleDiv, runtimeDiv, numTicketDiv, showtimeSpan)
        outerDiv.append(contentDiv, extraContentDiv)
    
    
    showingsDiv.append(outerDiv)
}