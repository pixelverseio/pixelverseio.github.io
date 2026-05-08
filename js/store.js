const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;
let timer;

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // wrapping around (first to last, last to first)
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    // Add active class to the selected slide
    slides[currentIndex].classList.add('active');
}
nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    clearInterval(timer);
    timer = setInterval(() => {

    showSlide(currentIndex + 1);
}, 5000);
});

prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    clearInterval(timer);
    timer = setInterval(() => {

    showSlide(currentIndex + 1);
}, 5000);
});

timer = setInterval(() => {

    showSlide(currentIndex + 1);
}, 5000);


let gamesData = JSON.parse(localStorage.getItem("games")); // getting the gamesData data

let categories = ["explore", "new"];
let categoriesContainer = document.getElementById("categories-container");

let usersData = JSON.parse(localStorage.getItem("users")); //getting the usersData data

let username = localStorage.getItem("pixeluser");

// on loading window
window.addEventListener("load", function(){
    // loop over the categories to show in store page
    categories.forEach(function(category){
        let categorysection = document.createElement("section");
        // give the section id with value of the category being displayeed
        categorysection.id = `${category}`;
        if(category == "explore"){
            // in explore category only add a link to browse page
            categorysection.innerHTML = `
            <div class = "">
                <h1> 
                    <a href = "browse.html" class = "explore">
                        ${category[0].toUpperCase()}${category.slice(1)}
                        <i class="fa-solid fa-chevron-right" class = "arrow"></i>
                    </a>
                </h1>
            </div>`;
        }
        else{ // other categories
        categorysection.innerHTML = `
        <h1> ${category[0].toUpperCase()}${category.slice(1)} </h1>`;
        }

        let container = document.createElement("div");
        container.classList.add("cards-container");
        for (let name in gamesData) {
            // creat a card for every game if having this category
            if(gamesData[name].categories.includes(category)){
                const gameOb = gamesData[name];
                const price = gameOb.price;
                
                const card = document.createElement("div");
                card.classList.add("game-card", name);
                
                card.innerHTML = `
                <span class="badge">${gameOb.badge}</span>
                <div class = "wish-container" onclick="event.stopPropagation(); wishListActive(this, '${name}')">
                    <i class="fa-regular fa-bookmark wish regular"></i>
                    <i class="fa-solid fa-bookmark wish solid"></i>
                </div>
                <img src="${gameOb.image}">
                <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
                <p style="color: #d1ff05; font-weight: bold;">${gameOb.price=="free"? "Free" : `${gameOb.price}`}</p>
                `;

                // make cards clickable and switches to the game's page
                card.addEventListener("click", function(){
                    window.location.href = `${name}.html`;
                })

                // put card in page in the category section
                container.appendChild(card);
                categorysection.append(container)
                categoriesContainer.append(categorysection);

                // add the active class to whislist icon container 
                // if the wishlist of this user contain this game
                if(usersData[username].wishlist.includes(name)){
                    let wishContainer = card.querySelector(".wish-container");
                    wishContainer.classList.add("active");
                }
            }
        }
    })
});


// function libraryActive(gameName){
//     if(login === ""){
//         window.location.href = `signin.html`;
//     }
//     if(usersData[username].library.includes(gameName) === false){
//         usersData[username].library.push(gameName);
//     }
//     // console.log("usersData[username].library = ",usersData[username].library)
//     localStorage.removeItem("users");
//     localStorage.setItem("users",JSON.stringify(usersData));
// }

function wishListActive(Container, gameName){
    // if user not logged in go to login page
    if(login === ""){
        window.location.href = `signin.html`;
    }
    else{
        // user logged in;
        let inWish = usersData[username].wishlist.includes(gameName);
        let allCards = document.querySelectorAll(`.${gameName}`);
        console.log(allCards);
        // if not in user's wishlist add it
        if(!inWish){
            usersData[username].wishlist.push(gameName);
            allCards.forEach(card => {
                let wishContainer = card.querySelector(".wish-container");
                wishContainer.classList.add("active");
            })
        }else{ // if exists in user's wishlist remove it
            let wishlistArray = usersData[username].wishlist;
            usersData[username].wishlist = wishlistArray.filter(game => game != gameName);
            allCards.forEach(card => {
                let wishContainer = card.querySelector(".wish-container");
                wishContainer.classList.remove("active");
            })
        }
        localStorage.removeItem("users");
        localStorage.setItem("users",JSON.stringify(usersData));
    }
}


//     const containers = document.querySelectorAll(".cards-container");
//     containers.forEach(function(container){
//         for (let name in gamesData) {
//             // console.log(name);
//             const gameOb = gamesData[name];
//             const price = gameOb.price;
//             // console.log(gameOb);
            
//             const card = document.createElement("div");
//             card.classList.add("game-card");
//             card = name;
            
//             card.innerHTML = `
//             <span class="badge">${gameOb.badge}</span>
//             <span class="wish" onclick="wishListActive(${name})" style="color: #ff3b3b">⭐</span>
//             <img src="${gameOb.image}">
//             <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
//             <p style="margin: 0 10px 10px; color: #d1ff05; font-weight: bold;">${gameOb.price=="free"? "Free" : `${gameOb.price}$`}</p>
//             <button class="action-btn" onclick="alert('Added to Cart!')">
//             Buy Now
//             </button>
//             `;
//             container.appendChild(card);
//         }
//     })
// });
// window.addEventListener("load", function(){
//     const containers = document.querySelectorAll(".cards-container");
//     containers.forEach(function(container){
//         for (let name in gamesData) {
//             // console.log(name);
//             const gameOb = gamesData[name];
//             const price = gameOb.price;
//             // console.log(gameOb);
            
//             const card = document.createElement("div");
//             card.classList.add("game-card");
//             card.id = name;
            
//             card.innerHTML = `
//             <span class="badge">${gameOb.badge}</span>
//             <span class="wish" onclick="wishListActive(${name})" style="color: #ff3b3b">⭐</span>
//             <img src="${gameOb.image}">
//             <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
//             <p style="margin: 0 10px 10px; color: #d1ff05; font-weight: bold;">${gameOb.price=="free"? "Free" : `${gameOb.price}$`}</p>
//             <button class="action-btn" onclick="alert('Added to Cart!')">
//             Buy Now
//             </button>
//             `;
//             container.appendChild(card);
//         }
//     })

// });