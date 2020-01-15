const theatreId = null;

const tixUrl = 'https://evening-plateau-54365.herokuapp.com/theatres/45'
const showingDiv = document.querySelector('.showings')


function initLoad() {
    fetch(tixUrl)
      .then(r => r.json())
      .then(obj => {renderObj(obj)})
    //   .then((obj) => obj.showings.forEach(obj => (renderObj)))
}


function renderObj(obj) {
    // console.log(obj.showings)
    obj.showings.forEach(tixObj=> {
        let tixRemaining = tixObj.capacity
        const cardDiv = document.createElement('div')
        cardDiv.className = 'card'
        cardDiv.innerHTML = `
        <div class="content">
        <div class="header">
          ${tixObj.film.title}
        </div>
        <div class="meta">
          (${tixObj.film.runtime}) minutes
        </div>
        <div class="description">
          (${tixRemaining}) remaining tickets
        </div>
        <span class="ui label">
          (${tixObj.showtime})
        </span>
      </div>
      <div class="extra content">
        <div class="ui blue button">Buy Ticket</div>
      </div>
        `
    const buyButton = document.querySelector('div.button')
    buyButton.addEventListener('click', e => {
        // console.log('ccc')
        TixNumberUpdate(tixObj)
    })

    showingDiv.append(cardDiv)
})




function TixNumberUpdate(tixObj) {}


initLoad()