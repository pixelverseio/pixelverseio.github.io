// getting game name from url without / and .html
let gameName = window.location.pathname.slice(1,-5);
let price = gamesData[gameName].price;
//** users, user, userData, balance are initialized in global ***////

let balanceSpan = document.querySelector(".balanceLi span");
// console.log(balanceSpan)


// console.log(gamesData)
// console.log(balance);
// console.log(gamesData[gameName])

// message when balance not enough
let noBalanceMsg = document.createElement("div");
noBalanceMsg.innerHTML = `<p> No Enough Balance For Purchase</p>`;
noBalanceMsg.id = ("no-balance-div");


// buy button logic
let buyBtn = document.querySelector("#buy-btn");
if(userData.library.includes(gameName)){
    // if game in library
    buyBtn.innerHTML = "Library"
    buyBtn.onclick = () =>{
        window.location.href = "library.html"
    }
}
else{
    // game not bought
    buyBtn.innerHTML = (price === "free"? `Free`: `Buy Now $${price}`);
    buyBtn.onclick= () => {
        if(!userData.library.includes(gameName)){
            if(price != "free"){
                if(balance >= price){
                    balance -= price;
                    userData.balance = balance;
                    userData.library.push(`${gameName}`);
                    buyBtn.innerHTML = "Library"
                    balanceSpan.innerHTML = `$${balance}`;
                    buyBtn.onclick = () =>{
                    window.location.href = "library.html"
                    }
                    localStorage.setItem("users", JSON.stringify(users))
                }
                else{
                    buyBtn.before(noBalanceMsg);
                    setTimeout(function () {
                        noBalanceMsg.remove();
                    }, 2000);
                }
            }else{
                userData.library.push(`${gameName}`);
                buyBtn.innerHTML = "Library"
                buyBtn.onclick = () =>{
                window.location.href = "library.html"
                }
            }
        }
    }
}

// wishlist button
let wishlistBtn = document.querySelector("#wishlist-btn");
if(userData.wishlist.includes(gameName)){
    wishlistBtn.innerHTML = "In Wishlist";
}
else{
    wishlistBtn.innerHTML = "Add to Wishlist";
}

wishlistBtn.onclick = () =>{
    // game in list remove it
    if(userData.wishlist.includes(gameName)){
        wishlistBtn.innerHTML = "Add to Wishlist";
        userData.wishlist = userData.wishlist.filter(game => game != gameName);
        console.log(userData.wishlist);
    }
    else{ // game not in library add it
        wishlistBtn.innerHTML = "In Wishlist";
        userData.wishlist.push(`${gameName}`);
        console.log(userData.wishlist);
    }
    localStorage.removeItem("users");
    localStorage.setItem("users",JSON.stringify(users));
    console.log(users);
}

let trailer = document.getElementById("watch-trailer");
// to display trailer when watch trailer clicked
trailer.addEventListener("click", ()=>{
    let trailerDiv = document.createElement("div");
    trailerDiv.classList.add("trailer-container");
    trailerDiv.innerHTML = `
        <video 
            src = "images/${gameName}/trailer.mp4"
            controls
            class = "trailer-vid"
        ></video>
        <i class="fa-solid fa-x" id = "close"></i>
    `;
    document.body.prepend(trailerDiv);
    let x = trailerDiv.querySelector("#close");
    x.addEventListener("click", ()=>{
        trailerDiv.remove();
    })
})
// update content displayed on show screen
function updateMainContent(element) {
    const mainImage = document.getElementById("screenImage");
    mainImage.style.display = "block";
    mainImage.src = element.src;   
}
