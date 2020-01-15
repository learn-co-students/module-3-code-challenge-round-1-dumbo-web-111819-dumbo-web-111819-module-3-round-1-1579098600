const theatreId = 42;
const showDiv = document.querySelector(".showings")
console.log(showDiv)


console.log("i am working")
fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(r => r.json())
.then(r => {
    r.showings.forEach(showing => renderShow(showing))
    console.log(r)
})





function renderShow(show){
    const divCard = document.createElement("div")
    divCard.className = "card"
    const divContent = document.createElement("div")
    divContent.className = "content"
    const divheader = document.createElement("div")
    divheader.className = "header"
    const divMeta = document.createElement("div")
    divMeta.className = "meta"
    const divDesc = document.createElement("div")
    divDesc.className = "description"
    const span = document.createElement("div")
    span.className = "ui label"
    const divExtraCont = document.createElement("div")
    divExtraCont.className = "extra content"
    const divButt = document.createElement("div")
    divButt.className = "ui blue button"

    let remainingTicket = show.capacity - show.tickets_sold
    divDesc.innerText = isTicketRemaing(remainingTicket,divDesc)
    // isTicketRemaing(remainingTicket,divDesc)



    divheader.innerText = show.film.title
    divMeta.innerText = `${show.film.runtime} minutes`
   
    span.innerText = show.showtime

    if(remainingTicket > 0){
        divButt.innerText = "Buy Ticket"
    }
    else{
        divButt.className = ""
        divButt.innerText = "Sold Out"
    }
    

   



    divButt.addEventListener("click",e => {
        if (remainingTicket === 0) return;
        fetch("https://evening-plateau-54365.herokuapp.com/tickets",{
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
        .then(
            
            remainingTicket -= 1,
            divDesc.innerText =  isTicketRemaing(remainingTicket,divButt)

            
            
        )
    })  

    divExtraCont.append(divButt)
    divContent.append(divheader,divMeta,divDesc,span,divExtraCont)
    divCard.append(divContent)
    showDiv.append(divCard)
}

function isTicketRemaing(remainingTicket,divButt) {
    if(remainingTicket > 0 ){
        
        return `${remainingTicket} remaining tickets`
    }
    else{
        divButt.className = ""
        divButt.innerText = "Sold Out"

     return  "Sold Out"
     
        
    }
}
