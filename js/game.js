let goUpBtn = document.createElement("div");
goUpBtn.className = "goUp";
goUpBtn.innerHTML = `    
    <i class="fa-solid fa-angles-up"></i> 
`;
document.body.append(goUpBtn);
goUpBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
window.onscroll = function () {
  if (window.scrollY >= 600) {
    goUpBtn.style.display = "block";
  } else {
    goUpBtn.style.display = "none";
  }
};

// getting game name from url without / and .html
const gameName = window.location.pathname.split('/').pop().replace('.html', '');
let price = gamesData[`${gameName}`].price;
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

// message on successful purchase
let buySuccesMsg = document.createElement("div");
buySuccesMsg.innerHTML = `<p> Game Purchase successful</p>`;
buySuccesMsg.id = ("purchase-successful-div");




// buy button logic
let buyBtn = document.querySelector("#buy-btn");

// buyBtn.before(buySuccesMsg);
// buyBtn.before(noBalanceMsg);


if(login == "user"){
    if(userData.library.includes(gameName)){
    // if game in library
        buyBtn.innerHTML = "Library"
        buyBtn.onclick = () =>{
            window.location.href = "library.html"
        }
    }
    else{// game not bought
        // Buy button either Free  or the game's price
        buyBtn.innerHTML = (price === "free"? `Free`: `Buy Now $${price}`);
        buyBtn.onclick= () => {
            // if not in the userslibrary
            if(!userData.library.includes(gameName)){
                if(price != "free"){// has a price
                    if(balance >= price){// enough balace to buy game
                        balance -= price;
                        userData.balance = balance; // update the balance of userData Object
                        userData.library.push(`${gameName}`);// add game to lib
                        buyBtn.innerHTML = "Library"
                        balanceSpan.innerHTML = `$${balance}`; // update balance in user menue
                        // ad an event for the button to take the user to library page
                        buyBtn.onclick = () =>{
                        window.location.href = "library.html" 
                        }
                        // display successfulpurchase message
                        buyBtn.before(buySuccesMsg);
                        setTimeout(function () {
                            buySuccesMsg.remove();
                        }, 2000);

                        localStorage.setItem("users", JSON.stringify(users))
                        // update the users info in the local storage
                        // users automatically updated one changing userData because objects are sent by refference
                    }
                    else{// no balance
                        // display message
                        buyBtn.before(noBalanceMsg);
                        setTimeout(function () {
                            noBalanceMsg.remove();
                        }, 2000);
                    }
                }else{// Free game
                    userData.library.push(`${gameName}`);
                    buyBtn.innerHTML = "Library"
                    buyBtn.onclick = () =>{
                        window.location.href = "library.html"
                    }
                    // display successfulpurchase message
                    buyBtn.before(buySuccesMsg);
                    setTimeout(function () {
                        buySuccesMsg.remove();
                    }, 2000);
                    localStorage.setItem("users", JSON.stringify(users))
                }
            }
        }
    }
}
else{// user not signed in
    buyBtn.innerHTML = (price === "free"? `Free`: `Buy Now $${price}`);
    buyBtn.onclick = () => {
        window.location.href = "signin.html";
    }
}

// wishlist button
let wishlistBtn = document.querySelector("#wishlist-btn");
if(login == "user"){
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
            // console.log(userData.wishlist);
        }
        else{ // game not in library add it
            wishlistBtn.innerHTML = "In Wishlist";
            userData.wishlist.push(`${gameName}`);
            // console.log(userData.wishlist);
        }
        localStorage.removeItem("users");
        localStorage.setItem("users",JSON.stringify(users));
        // console.log(users);
    }
}
else{
    wishlistBtn.innerHTML = "Add to Wishlist";
    wishlistBtn.onclick = () => {
        window.location.href = "signin.html";
    }
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
