const theatre=  51
const theaterList=  document.querySelector("#theatreId")
let movieName = document.getElementById('ui cards showings')
let movieContent = document.getElementById('content')

fetch("https://evening-plateau-54365.herokuapp.com/theatres/51")
.then(r => r.json())
.then ((movieArr) => {
    movieArr.forEach(movieObj => {
        TakeOneMovieToLi(movieObj)
        
    })
})

function TakeOneMOvieToLi(movieObj){
    let movieNameLi = document.createElement("li")
    movieNameLi.className = "card"
    movieNameLi.innerText = movieObj.name

}
    
    
    
    
    
    
    
    
    
    
    
    // Obj.keys(Obj).forEach(key => {
    
    //     console.log(`key: ${key}, value: ${Obj[key]}`)
   
        
    // if (typeof obj[key] === 'ticketObject') {
    //             iterate(obj[key])
    //         }
    //     })
    // })








