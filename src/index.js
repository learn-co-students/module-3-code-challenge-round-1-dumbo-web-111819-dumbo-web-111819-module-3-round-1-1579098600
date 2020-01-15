const theatreId = 52;
const showingsDiv = document.querySelector('div.showings')


renderShowings()

function fetchShowings(){
    return fetch('https://evening-plateau-54365.herokuapp.com/theatres/52')
        .then(resp => resp.json())
}

function fetchBuyTicket(showing){
    const configObj={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            showing_id: showing.id
        })
    }
    return fetch(`https://evening-plateau-54365.herokuapp.com/tickets`,configObj)
        .then(resp => resp.json())
}



function renderShowings(){
    fetchShowings().then(json =>{
        json.showings.forEach(individualShowing)
    })
}

function individualShowing(showing){
    let showCard = document.createElement('div')
    showCard.className = 'card'
    showCard.innerHTML = `
    <div class="content">
        <div class="header">
            ${showing.film.title}
        </div>
        <div class="meta">
            ${showing.film.runtime} minutes
        </div>
        <div class="description">
            ${showing.capacity - showing.tickets_sold} remaining tickets
        </div>
        <span class="ui label">
            ${showing.showtime}
        </span>
    </div>
    <div class="extra content">
        <div class="ui blue button">Buy Ticket</div>
        <p class = 'sold-out'>Sold Out</p>
    </div>`
    const buyButton = showCard.querySelector('.blue')
    const soldOutText = showCard.querySelector('.sold-out')
        soldOutText.style.display = 'none'
    const ticketsRemaining = showCard.querySelector('.description')
    console.log(ticketsRemaining)
    // if(showing.tickets_sold !== showing.capacity){
        // while(showing.capacity === showing.tickets_sold){
        //     buyButton.style.display = 'none'
        //     soldOutText.style.display = 'block'
        // }
        buyButton.addEventListener('click', (e)=>{
            fetchBuyTicket(showing)
            .then(json => {
                if(showing.tickets_sold !== showing.capacity){
                    showing.tickets_sold = showing.tickets_sold +1
                    ticketsRemaining.innerText = `${showing.capacity - (showing.tickets_sold)} remaining tickets`
                    return;
                } else {
                    buyButton.style.display = 'none'
                    soldOutText.style.display = 'block'
                }
                
            })
        })

        if(showing.tickets_sold === showing.capacity){
            buyButton.style.display = 'none'
            soldOutText.style.display = 'block'
        }

                showingsDiv.append(showCard)  
}

