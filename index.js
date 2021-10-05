console.log('Hello World')

// document.addEventListener('DOMContentLoaded', renderCreatures)

document.getElementById('form').addEventListener('submit', handleSubmit)

function renderCreatures(creature){
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
        <img src="${creature.imageUrl}">
        <div class='content'>
            <h4>${creature.name}
            <p class="dontation_count">$${creature.donations}
            </p>
            <p>${creature.description}</P>
            </div>
            <div class="buttons">
            <button> Donate 100 Gold </button>    
            `
            document.getElementById('creature_list').appendChild(card)
}
    
function getAllCreatures(){
 fetch('http://localhost:3000/creatureData')
 .then(resp => resp.json())
 .then(creatureData => creatureData.forEach(creature => renderCreatures(creature)))
            
            // .then(creatureData => creatureData.forEach(creature => renderCreatures(creature)))
}



function handleSubmit(e){
    e.preventDefault()
    let creatureObj = {
        name:e.target['name'].value,
        imageUrl:e.target['picture'].value,
        description:e.target['description'].value,
        donations: 0
    }
    renderCreatures(creatureObj)
    addCreature(creatureObj)
}

function addCreature(creatureObj){
    fetch('http://localhost:3000/creatureData',{
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(creatureObj)
    })
    .then(res => res.json())
    .then(creature => console.log(creature))
}

function initialize(){
 getAllCreatures()
}
        
initialize()
        
        
// {/* <span class='donation_count">${creature.donations}</span> Donated */}