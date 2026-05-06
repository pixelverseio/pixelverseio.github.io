let gamesData = JSON.parse(localStorage.getItem("games")); //getting the gamesData data
console.log("gamesData = ",gamesData);

let usersData = JSON.parse(localStorage.getItem("users")); //getting the users data
console.log("users = ",usersData);

let username = localStorage.getItem("pixeluser");
console.log("username = ",username);

const container = document.getElementById("library-container");
console.log("username = ",username)
for(let i = 0 ; i<usersData[username].library.length ; i++){
    let game_key = usersData[username].library[i]
    let gameOb = gamesData[usersData[username].library[i]];
    console.log("gameOb = ",gameOb)
    const card = document.createElement("div");
    card.className = "game-card";
    card.id = game_key;
    card.innerHTML = `
        <span class="badge">${gameOb.badge}</span>
        <img src="${gameOb.image}">
        <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
        <button class="action-btn" onclick="alert('Enjoy playing!')">
            <span>🎮</span> Play
        </button>
    `;
    container.appendChild(card);
    }

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('input', (e) => {
    let word = e.target.value.toLowerCase();
    let cards = document.querySelectorAll('.game-card'); 
    cards.forEach(card => {
        let title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(word)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});