console.log('Hello World')

function renderCreatures(creatures){
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
        <img src='${creatures.imageUrl}'>
        <div class='content'>
            <h4>${creatures.name}
            <p>
                $<span class='donation_count">${creatures.donations}</span> Donated
            </p>
            <p>${creatures.description}</P>
        </div>    
    `
    document.querySelector('#creature_list').appendChild(card)
}