// console.log("gamesData = ",gamesData);

// console.log("users = ",users);

let username = localStorage.getItem("pixeluser");
console.log("username = ",username);

const container = document.getElementById("wishlist-container");
for(let i = 0 ; i<users[username].wishlist.length ; i++){
    let game_key = users[username].wishlist[i];
    console.log("gamesData[users[username].wishlist[i]] = ",gamesData[users[username].wishlist[i]]);
    let gameOb = gamesData[users[username].wishlist[i]];
    console.log("gameOb = ",gameOb);
    const card = document.createElement("div");
    card.className = "game-card";
    card.id = game_key;
    // console.log(game_key);
    card.innerHTML = `
        <span class="badge">${gameOb.badge}</span>
        <span class="cross" onclick="event.stopPropagation(); removeFromWishlist('${game_key}')" style="color: #ff3b3b">✖</span>
        <img src="${gameOb.image}">
        <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
        <p style="margin: 0 10px 10px; color: #d1ff05; font-weight: bold;">$${gameOb.price}</p>
        <button class="action-btn" onclick="libraryAvtive(${game_key})">
        Buy
        </button>
        `;
        container.appendChild(card);
        card.addEventListener("click", function(){
        window.location.href = `${game_key}.html`;
        })
}

function removeFromWishlist(gameName) {
    console.log("gameName = ",gameName);
    document.getElementById(`${gameName}`).remove();
    let wishlistArray = userData.wishlist;
    userData.wishlist = wishlistArray.filter(function(game){
        return game != gameName;
    });
    localStorage.removeItem("users");
    localStorage.setItem("users",JSON.stringify(users));
}

function libraryAvtive(game_div){
    // console.log("users[username].library = ",users[username].library)
    if(users[username].library.includes(game_div.id) === false){
        users[username].library.push(game_div.id);
    }
    // console.log("users[username].library = ",users[username].library)
    localStorage.removeItem("users");
    localStorage.setItem("users",JSON.stringify(users));
}


function clearWishlist() {
    if(confirm("Clear your entire wishlist?")) {
        localStorage.removeItem("pixels_wishlist");
        wishlistIds = [];
        renderWishlist();
    }
}
