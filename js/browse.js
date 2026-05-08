console.log("gamesData = ",gamesData);

// console.log("users = ",users);

let username = localStorage.getItem("pixeluser");
// console.log("username = ",username);


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
        if(users[username].wishlist.includes(name)){
            let wishContainer = card.querySelector(".wish-container");
            wishContainer.classList.add("active");
        }
        card.addEventListener("click", function(){
        window.location.href = `${name}.html`;
        })
    }

});

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


let searchBar = document.querySelector(".search");

searchBar.addEventListener("input",function(event){
    console.log("working")
    let word = event.target.value.toLowerCase();
    let cards = document.querySelectorAll('.game-card'); 
    cards.forEach(function(card) {
        let title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(word)) {
            card.style.display = "block";
        } else {
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
