const theatreId = 41;
//Elements
const divShow = document.querySelector(".ui.cards.showings")
console.log(divShow);

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then((resp) => {
  return resp.json()
})
.then((ticketObj) => {
  ticketObj.showings.forEach((eachShow) => {
      numOfTickets = eachShow.capacity - eachShow.tickets_sold
      slapItOnDom(eachShow, numOfTickets)
  })
})


function slapItOnDom(eachShow, numOfTickets ){
  const divCard = document.createElement("div") //main one outerelement
  divCard.className = "card"
  divCard.innerHTML = `

  <div class="content">
  <div class="header">
    ${eachShow.film.title}
  </div>
  <div class="meta">
    ${eachShow.film.runtime}
  </div>
  <div class="description">
      ${numOfTickets}
  </div>
  <span class="ui label">
      ${eachShow.showtime}
  </span>
</div>
<div class="extra content">
  <div class="ui blue button">Buy Ticket</div>
</div>

  `
  divShow.append(divCard)



//=========================create Tickets Post Request ================
  const ticketButton = divCard.querySelector(".ui.blue.button")

    ticketButton.addEventListener("click", (evt) => {
  // here I have to target the numOF tickets and decrement the num by
  // if the the num = 0 , button should show sold out
  //if there are tickets show button


  let numTickets = divCard.querySelector(".description")
  let newNum = parseInt(numTickets.innerText) - 1
    console.log(newNum);
  // console.log(counter);

      fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify( {

         showing_id: eachShow.id
        })
      })
      .then((resp) => {
        return resp.json()
      })
      .then((jsonObj) => {

      numNum = eachShow.capacity - eachShow.tickets_sold
      let ttickets = divCard.querySelector(".description")
       ttickets.innerText = numNum
          // console.log(ticketObj.capacity);
      })

    }) // end of button event addEventListener



} // end of main function
