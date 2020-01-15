// const theatreId = null;

// let showingCard=document.querySelector(".ui cards showings")
const theatreId=47
fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(response=>response.json())
.then(theater=>theater.showings.forEach((showing) => {
    convertJsonToHtml(showing)
}))
let convertJsonToHtml=function(showing){
    // console.log(showing)
    let showingCard=document.querySelectorAll(".ui")[2]
    console.log(showingCard)
    let divShowing=document.createElement('div')
    divShowing.classList.add("card")
    // divShowing.classList.add("showings")
    // debugger
    // console.log(divShowing)
    divShowing.innerHTML=`<div class="content">
    <div class="header">
      ${showing.film.title}
    </div>
    <div class="meta">
      ${showing.film.runtime} minutes
    </div>
    <div class="description">
      ${showing.capacity-showing.tickets_sold} remaining tickets
    </div>
    <span class="ui label">
      ${showing.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>`
    showingCard.append(divShowing)
    // debugger


    let createTicket=showingCard.querySelector('.ui.blue.button')
// console.log(createTicket)
createTicket.addEventListener('click',(event) => {
    // debugger
    // console.log(event.target)
    // console.log("hello")
    fetch("https://evening-plateau-54365.herokuapp.com/tickets",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body:JSON.stringify({
            showing_id: showing.id

        })
        .then(response=>response.json())
        .then()
    })
    
})


    /*
    POST `https://evening-plateau-54365.herokuapp.com/tickets`

```
Required Headers
{
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

Required Keys

{
  showing_id: <add showing_id here>
}
    */


}

/*
<div class="card">
  <div class="content">
    <div class="header">
      (Film Title)
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
</div>
*/