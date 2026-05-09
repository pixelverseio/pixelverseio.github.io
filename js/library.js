// console.log("gamesData = ",gamesData);

// console.log("users = ",users);

let username = localStorage.getItem("pixeluser");
console.log("username = ",username);

const container = document.getElementById("library-container");
console.log("username = ",username)
for(let i = 0 ; i<users[username].library.length ; i++){
    let game_key = users[username].library[i]
    let gameOb = gamesData[users[username].library[i]];
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

        card.addEventListener("click", function(){
        window.location.href = `${game_key}.html`;
        });
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