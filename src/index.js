const theatreId = 44;

const shows_url = 'https://evening-plateau-54365.herokuapp.com/theatres/44'

const show_times_div = document.querySelector('.ui.cards.showings')

// Fetch Function
fetchMovies()
function fetchMovies(){
    return fetch(shows_url)
    .then(res => res.json())
}

fetchMovies()
.then(flatironTheatre => {
    
    flatironTheatre.showings.forEach(show => {

        addOneShowToDOM(show)
    })
})

// Render one show 

function addOneShowToDOM(show){

    let show_div = document.createElement('div')
    show_div.className  = 'card'
    show_div.innerHTML = 

    `
    <div class="content">
      <div class="header">
        ${show.film.title}
      </div>
      <div class="meta">
        ${show.film.runtime} minutes
      </div>
      <div class="description" id = 'remaining' >
        ${show.capacity - show.tickets_sold} remaining tickets
      </div>
      <span class="ui label">
        ${show.showtime}
      </span>
      <div class="extra content">
      <div class="ui blue button">Buy Ticket</div>
     </div>
    </div>
  `    
  
    // If show is sold out, show sold out button 
    let btn = show_div.querySelector('.ui.blue.button')
        if(show.capacity - show.tickets_sold === 0){

            btn.style = 'background-color: F5F5F5; color:grey;'
            btn.innerText = 'Sold Out'
        }
        else{
            btn.innerText = 'Buy Ticket'
        }
    show_times_div.append(show_div)

    // Buy ticket

    let buy_button = show_div.querySelector('.ui.blue.button')
    buyTicketFunction(buy_button, show, show_div)

}

// Buying tickets

function buyTicketFunction(buy_button, show, show_div){
        let remaining_tickets = show.capacity - show.tickets_sold
        let sold_out_button = show_div.querySelector('.ui.blue.button')

    buy_button.addEventListener('click', e=> {

        fetch('https://evening-plateau-54365.herokuapp.com/tickets' , {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                showing_id: show.id
            })
        }) // end of post

            // If response = 422, post didnt go through ticket is soldout .
            // Else update the DOM 

        .then(response => {
            if (response.status === 422){
                let buy_button = show_div.querySelector('.ui.blue.button')
                buy_button.style = 'background-color:F5F5F5; color:grey;'
                buy_button.innerText = 'Sold Out'
            }

            else{
            // Update remaining tickets on DOM 
            let remaining_tickets = show_div.querySelector('#remaining')
       
            show.tickets_sold += 1 
            remaining_tickets.innerHTML = `${show.capacity - show.tickets_sold} remaining tickets`
               
            }
        })
    })
}



