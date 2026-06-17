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

// console.log() just to show that the data is loaded correctly from global.js
console.log("gamesData = ",gamesData);
console.log("users = ",users);

// getting the username of user logged in currently and show it in the console
let username = localStorage.getItem("pixeluser");
console.log("username = ",username);

// put the cards in the page using the gamesData data from global.js
document.addEventListener("DOMContentLoaded", function(){
    const container = document.querySelector(".cards-container");
    // loop through the gamesData and create a card for each game
    for (let name in gamesData) {
        const gameOb = gamesData[name]; // get the game object
        const price = gameOb.price;     // get the price of the game
        
        const card = document.createElement("div");
        card.classList.add("game-card");
        card.id = name;
        
        card.innerHTML = `
                <span class="badge">${gameOb.badge}</span>
                <div class = "wish-container" onclick="event.stopPropagation(); wishListActive(this, '${name}')">
                    <i class="fa-regular fa-bookmark wish regular"></i>
                    <i class="fa-solid fa-bookmark wish solid"></i>
                </div>
                <img src="${gameOb.image}">
                <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
                <p style="color: #d1ff05; font-weight: bold;">${gameOb.price=="free"? "Free" : `$${gameOb.price}`}</p>
                `;
        container.appendChild(card);


        // add the active class to whislist icon container 
        // if the wishlist of this user contain this game
        if(user != "no User"){
            if(users[username].wishlist.includes(name)){
                let wishContainer = card.querySelector(".wish-container");
                wishContainer.classList.add("active");
            }
        }
        //make the card clickable and go to the game page when click on it
        card.addEventListener("click", function(){
        window.location.href = `${name}.html`;
        })
    }

});

// function to add or remove game from user's wishlist
function wishListActive(Container, gameName){
    // if user not logged in go to login page
    if(login === ""){
        window.location.href = `signin.html`;
    }
    else{
        // user logged in;
        let inWish = users[username].wishlist.includes(gameName);
        let card = document.querySelector(`#${gameName}`);
        console.log(card);
        // if not in user's wishlist add it
        if(!inWish){
            users[username].wishlist.push(gameName);
            let wishContainer = card.querySelector(".wish-container");
            wishContainer.classList.add("active");
        }else{ // if exists in user's wishlist remove it
            let wishlistArray = users[username].wishlist;
            users[username].wishlist = wishlistArray.filter(game => game != gameName);
            let wishContainer = card.querySelector(".wish-container");
            wishContainer.classList.remove("active");
        }
        localStorage.removeItem("users");
        localStorage.setItem("users",JSON.stringify(users));
    }
}

// search bar logic
let searchBar = document.querySelector(".search");

searchBar.addEventListener("input",function(event){
    let word = event.target.value.toLowerCase();// get any thing in the search bar and convert it to lowercase
    let cards = document.querySelectorAll('.game-card'); 
    // loop through all cards
    cards.forEach(function(card) {
        let title = card.querySelector('h3').textContent.toLowerCase();
        // if hist title include the word in the search bar show it
        if (title.includes(word)) {
            card.style.display = "block";
        }
        //else hide it
        else {
            card.style.display = "none";
        }
    });
})



// let checkboxes = document.getElementsByClassName("input-checkbox");
// let activeboxes=[];
// let cards=document.querySelectorAll(".card");


// for(let i=0 ; i<checkboxes.length ; i++){
//     checkboxes[i].addEventListener("change", function(event) {
//         if(event.target.checked === true){seeCheckbox(event.target,true);}
//         else{seeCheckbox(event.target,false);}
//     })
// }
// function seeCheckbox(target,Active){
//     for(let j=0;j<cards.length;j++){
//         cards[j].style.display="none";
//     }

//     if(Active===true){
//         activeboxes.push(target);
//     }
//     else if(Active===false){
//         let indexToDelet = activeboxes.indexOf(target);
//         let forName = target.id;
//         activeboxes.splice(indexToDelet,1);
//         document.querySelector(`label[for='${forName}']`).style.color="#B4B5B7";

//     }

//     if (activeboxes.length === 0) {
//         for (let j = 0; j < cards.length; j++) {
//             cards[j].style.display = "block";
//         }
//     }
//     else if(activeboxes.length>0){
//         for(let i=0;i<activeboxes.length;i++){
//             let forName = activeboxes[i].id;
//             console.log("forName = ",forName);
//             document.querySelector(`label[for='${forName}']`).style.color="#fff";
//             for(let game in gamesData){
//                 for(let categoriesCounter=0 ; categoriesCounter<gamesData[game].categories.length ; categoriesCounter++){
//                     if(gamesData[game].categories[categoriesCounter] === activeboxes[i].name){
//                         console.log(game,"has the category");
//                         console.log(document.getElementById(game))
//                         document.getElementById(game).style.display="block";
//                     }
//                 }
//             }
//         }
//     }
// }




// searchBar.addEventListener("keydown",function(event){
//     if(event.key === "Enter"){
//         console.log("searchBar.value.length = ",searchBar.value.length)
//         if(searchBar.value.length>0){
//             for(let game in gamesData){
//                 if(game === searchBar.value){
//                     for(let j=0;j<cards.length;j++){
//                         cards[j].style.display="none";
//                     }
//                     document.getElementById(game).style.display="block";
//                 }
//             }
//         }
//         else{
//             for(let j=0;j<cards.length;j++){
//                 cards[j].style.display="block";
//             }
//         }
//     }
// })


// searchBar.addEventListener("change",function(){
//     searchBar.style.border="none";
// })
