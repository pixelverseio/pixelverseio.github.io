const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;
let timer;

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Logic for wrapping around (first to last, last to first)
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
// Event Listeners
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


let gamesData = JSON.parse(localStorage.getItem("games")); //getting the gamesData data
// console.log("gamesData = ",gamesData);

let categories = ["explore", "new"];
let main = document.querySelector("main");

window.addEventListener("load", function(){
    categories.forEach(function(category){
        let categorysection = document.createElement("section");
        categorysection.id = `${category}`;
        if(category == "explore"){
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
        else{
        categorysection.innerHTML = `
        <h1> ${category[0].toUpperCase()}${category.slice(1)} </h1>`;
        }
        let container = document.createElement("div");
        container.classList.add("cards-container");
        for (let name in gamesData) {
            if(gamesData[name].categories.includes(category)){
                // console.log(name);
                const gameOb = gamesData[name];
                const price = gameOb.price;
                // console.log(gameOb);
                
                const card = document.createElement("div");
                card.classList.add("game-card");
                card.id = name;
                
                card.innerHTML = `
                <span class="badge">${gameOb.badge}</span>
                <span class="wish" onclick="wishListActive('${name}')" style="color: #ff3b3b">⭐</span>
                <img src="${gameOb.image}">
                <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
                <p style="margin: 0 10px 10px; color: #d1ff05; font-weight: bold;">${gameOb.price=="free"? "Free" : `${gameOb.price}$`}</p>
                <button class="action-btn" onclick="libraryActive('${name}')">
                Buy Now
                </button>`;
                container.appendChild(card);
                categorysection.append(container)
                main.append(categorysection);
            }
        }
    })
});



let usersData = JSON.parse(localStorage.getItem("users")); //getting the usersData data
console.log("usersData = ",usersData);

let username = localStorage.getItem("pixeluser");
console.log("username = ",username);


function libraryActive(game_div){
    // console.log("usersData[username].library = ", usersData[username].library)
    // console.log(game_div);
    let gameName = game_div;

    if(usersData[username].library.includes(gameName) === false){
        usersData[username].library.push(gameName);
    }
    // console.log("usersData[username].library = ",usersData[username].library)
    localStorage.removeItem("users");
    localStorage.setItem("users",JSON.stringify(usersData));
}

function wishListActive(game_div){
    // console.log("game_div = ",game_div)
    // console.log("usersData = ",usersData)
    // console.log("username = ",username)
    // console.log("usersData[username].wishlist = ",usersData[username].wishlist)
    if(usersData[username].wishlist.includes(game_div) === false){
        usersData[username].wishlist.push(game_div);
    }
    // console.log("usersData[username].wishlist.push(game_div) = ",usersData[username].wishlist);
    localStorage.removeItem("users");
    localStorage.setItem("users",JSON.stringify(usersData));
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