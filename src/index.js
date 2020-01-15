const theatreId = 48;
const showingsDiv = document.querySelector('.ui cards showings');

document.addEventListener("DOMContentLoaded", () => {

    fetch('https://evening-plateau-54365.herokuapp.com/theatres/48')
    .then (r => r.json())
    .then ((showings) => {
        let showingArr = Object.values(showings)[2];
        showingArr.forEach(turnJSONintoHTML)
    })

    function turnJSONintoHTML(showingsObj){
    
        let showingDiv = document.createElement("div")
        showingDiv.innerHTML = `<div class="card">
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
      </div>`
        showingsDiv.append(showingDiv)



    }




})