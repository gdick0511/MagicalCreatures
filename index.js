console.log('Hello World')

document.getElementById('form').addEventListener('submit', handleSubmit)

function renderCreatures(creature){
    let card = document.createElement('li')
    card.className = 'card'
    card.id = 'creature_card'
    card.innerHTML = `
        <img src="${creature.imageUrl}">
        <div class='content'>
            <h4>${creature.name}
            <p class="dontation_count">$${creature.donations}
            </p>
            <p>${creature.description}</P>
        </div>
        <div class="buttons">
            <button id='donate'> Donate 100 Gold </button> 
        </div>       
    `  
 card.querySelector('#donate').addEventListener('click', () => {
    creature.donations += 100
    card.querySelector('.dontation_count').textContent = creature.donations
    updateDonations(creature)
 })
 card.querySelector('#donate').addEventListener('mouseover', () => {
     card.querySelector('#donate').textContent = 'Please Donate!'
 })
 card.querySelector('#donate').addEventListener('mouseout', () => {
    card.querySelector('#donate').textContent = 'Donate 100 Gold'
})
 document.getElementById('creature_list').appendChild(card)
    
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

function getAllCreatures(){
 fetch('http://localhost:3000/creatureData')
 .then(resp => resp.json())
 .then(creatureData => creatureData.forEach(creature => renderCreatures(creature)))
}

function updateDonations(creatureObj){
    fetch(`http://localhost:3000/creatureData/${creatureObj.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creatureObj)
    })
    .then(res => res.json())
    .then(creature = console.log(creature))
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