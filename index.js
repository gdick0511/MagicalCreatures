console.log('Hello World')

// document.addEventListener('DOMContentLoaded', renderCreatures)

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
        
function initialize(){
 getAllCreatures()
}
        
initialize()
        
        
// {/* <span class='donation_count">${creature.donations}</span> Donated */}