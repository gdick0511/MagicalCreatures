
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
    document.getElementById('creature_list').appendChild(card)
 card.querySelector('#donate').addEventListener('click', () => {
     creature.donations += 100
     card.querySelector('.dontation_count').textContent = `$${creature.donations}`
     updateDonations(creature)
 })
 card.querySelector('#donate').addEventListener('mouseover', () => {
     card.querySelector('#donate').textContent = 'Please Donate!'
 })
 card.querySelector('#donate').addEventListener('mouseout', () => {
    card.querySelector('#donate').textContent = 'Donate 100 Gold'
})
    // <button id= 'delete'> Delete </button> This button will need to go on line 18 in order for the delete function to work once commented back in 
    // card.querySelector('#delete').addEventListener('click', () => {
    //     // card.remove()
    //     deleteCreature(creature.id)
    // })
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
    let form = document.getElementById('form')
    form.reset()
}

function getAllCreatures(){
 fetch('https://magical-creatures-database.herokuapp.com/creatureData')
 .then(resp => resp.json())
 .then(creatureData => creatureData.forEach(creature => renderCreatures(creature)))
}

function updateDonations(creatureObj){
    fetch(`https://magical-creatures-database.herokuapp.com/creatureData/${creatureObj.id}`, {
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
    fetch('https://magical-creatures-database.herokuapp.com/creatureData',{
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(creatureObj)
    })
    .then(res => res.json())
    .then(creature => console.log(creature))
}

// function deleteCreature(id){
//     fetch(`https://magical-creatures-database.herokuapp.com/creatureData/${id}`, {
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
// }

function initialize(){
 getAllCreatures()
}
        
initialize()      