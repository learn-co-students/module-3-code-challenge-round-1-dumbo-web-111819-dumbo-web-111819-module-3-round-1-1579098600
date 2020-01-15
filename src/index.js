const theatreId = 46;
const THEATER_URL = "https://evening-plateau-54365.herokuapp.com/theatres";
const showDiv = document.getElementsByClassName("ui")[2];


//STRUCTURE OF A SHOWING
// {id: 403, film: {…}, capacity: 20, showtime: "11:10AM", tickets_sold: 10}
// id: 403
// film: {title: "The Millstone 2", runtime: 98}
// capacity: 20
// showtime: "11:10AM"
// tickets_sold: 10
// __proto__: Object


fetch(THEATER_URL + `/${theatreId}`)
.then(r => r.json())
.then(theaterData => {
    // console.log(theaterData)
    const theater = theaterData.showings


    theater.forEach(showing => {
        
        remainingTickets = showing.capacity - showing.tickets_sold ;
            
        console.log(showing.film.title)
           

               buildTicketLayout(showing, remainingTickets); 

         

                
        
    });
})

function buildTicketLayout(showing, remainingTickets){
    console.log()
    const h2 = document.createElement("h2");
        h2.innerText = showing.film.title;
    const smallTag = document.createElement("small");
    console.log(showing)
        smallTag.innerText = showing.showtime + "|" + `${remainingTickets}`;
    const ticketButton = document.createElement("button");
        ticketButton.innerText = "Buy Ticket";
        ticketButton.background = "skyblue";

        const outerEl = document.createElement("li")
        outerEl.innerHTML = `
        <div class="card">
          <div class="content">
            <div class="header">
              
            </div>
            <div class="meta">
              (Runtime) minutes
            </div>
            <div class="description">
              (Num Tickets) remaining tickets
            </div>
            <span class="ui label">
              (Showtime)
            </span>
          </div>
          <div class="extra content">
            <div class="ui blue button">Buy Ticket</div>
          </div>
        </div>`

        //DIDN'T READ ALL READ ME TILL LATER

        // console.log(showDiv)
        //how to append to an HTML COllection ???????
        showDiv.append(h2, smallTag, ticketButton );


        ticketButton.addEventListener('click', (e) => {

            fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {

                method: "POST",
                headers: {
                        'content-type':'application/json',
                        'accept':'application/json'
                },
                body: JSON.stringify({
                        showing_id: showing.id
                })
            })
            .then(r => r.json())
            .then(ticketData => {
                console.log(ticketButton)
                    ticketButton.innertext = "Sold Out"
            })
        })

}