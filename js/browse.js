let gamesData = JSON.parse(localStorage.getItem("games")); //getting the gamesData data
console.log("gamesData = ",gamesData);

let usersData = JSON.parse(localStorage.getItem("users")); //getting the usersData data
console.log("usersData = ",usersData);

let username = localStorage.getItem("pixeluser");
console.log("username = ",username);


document.addEventListener("DOMContentLoaded", function(){
    const container = document.querySelector(".cards-container");
    
    for (let name in gamesData) {
        const gameOb = gamesData[name];
        const price = gameOb.price;
        
        const card = document.createElement("div");
        card.classList.add("game-card");
        card.id = name;
        
        card.innerHTML = `
        <span class="badge">${gameOb.badge}</span>
        <span class="wish" onclick="wishListActive(${name})" style="color: #ff3b3b">⭐</span>
        <img src="${gameOb.image}">
        <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
        <p style="margin: 0 10px 10px; color: #d1ff05; font-weight: bold;">${gameOb.price}</p>
        <button class="action-btn" onclick="libraryAvtive(${name})">
        Buy
        </button>
        `;
        container.appendChild(card);

    }
});

function wishListActive(game_div){
    console.log("game_div = ",game_div)
    console.log("usersData = ",usersData)
    console.log("username = ",username)
    console.log("usersData[username].wishlist = ",usersData[username].wishlist)
    if(usersData[username].wishlist.includes(game_div.id) === false){
        usersData[username].wishlist.push(game_div.id);
    }
    console.log("usersData[username].wishlist.push(game_div.id) = ",usersData[username].wishlist);
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






// let checkboxes = document.getElementsByClassName("input-checkbox");
// let activeboxes=[];
// let cards=document.querySelectorAll(".card");

// let searchBar = document.querySelector(".search");

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

// searchBar.addEventListener("input",function(){
//     for(let game in gamesData){
//         console.log("game = ",game);
//         console.log("searchBar.value = ",searchBar.value);
//         console.log("game === searchBar.value = ",game === searchBar.value);
//         if(game === searchBar.value){
//             searchBar.style.border="1px solid";
//             searchBar.style.borderColor="#0f0";
//             console.log("searchBar.style.border = ",searchBar.style.border)
//             console.log("searchBar.style.borderColor = ",searchBar.style.borderColor)
//         }
//         else{
//             searchBar.style.border="1px solid";
//             searchBar.style.borderColor="#f00";
//         }
//     }
// })


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
