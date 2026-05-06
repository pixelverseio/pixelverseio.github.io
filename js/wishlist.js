let gamesData = JSON.parse(localStorage.getItem("games")); //getting the gamesData data
console.log("gamesData = ",gamesData);

let usersData = JSON.parse(localStorage.getItem("users")); //getting the users data
// console.log("users = ",users);

let username = localStorage.getItem("pixeluser");
console.log("username = ",username);

const container = document.getElementById("wishlist-container");
for(let i = 0 ; i<usersData[username].wishlist.length ; i++){
    let game_key = usersData[username].wishlist[i];
    console.log("gamesData[usersData[username].wishlist[i]] = ",gamesData[usersData[username].wishlist[i]]);
    let gameOb = gamesData[usersData[username].wishlist[i]];
    console.log("gameOb = ",gameOb)
    const card = document.createElement("div");
    card.className = "game-card";
    card.id = game_key;
    card.innerHTML = `
        <span class="badge">${gameOb.badge}</span>
        <span class="cross" onclick="removeFromWishlist(${game_key})" style="color: #ff3b3b">✖</span>
        <img src="${gameOb.image}">
        <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
        <p style="margin: 0 10px 10px; color: #d1ff05; font-weight: bold;">${gameOb.price}</p>
        <button class="action-btn" onclick="libraryAvtive(${game_key})">
         Buy
        </button>
    `;
    container.appendChild(card);
}

function removeFromWishlist(game_div) {
    console.log("game_div = ",game_div)
    game_div.style.display="none";
    let indexToDelete = usersData[username].wishlist.indexOf(game_div.id);
    usersData[username].wishlist.splice(indexToDelete , 1)
    localStorage.removeItem("users");
    localStorage.setItem("users",JSON.stringify(usersData));
}

function libraryAvtive(game_div){
    console.log("usersData[username].library = ",usersData[username].library)
    if(usersData[username].library.includes(game_div.id) === false){
        usersData[username].library.push(game_div.id);
    }
    console.log("usersData[username].library = ",usersData[username].library)
    localStorage.removeItem("users");
    localStorage.setItem("users",JSON.stringify(usersData));
}


function clearWishlist() {
    if(confirm("Clear your entire wishlist?")) {
        localStorage.removeItem("pixels_wishlist");
        wishlistIds = [];
        renderWishlist();
    }
}
