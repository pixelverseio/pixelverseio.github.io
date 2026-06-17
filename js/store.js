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

let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let allGames = Object.keys(games);
let slideGames = allGames.filter((game) => games[game].categories.includes("store-slide"));
let screen = document.getElementById("display-screen");

slideGames.forEach((slide_game) => {
    // console.log(slide_game);
    let slideDiv = document.createElement("div");
    slideDiv.classList.add("slide");
    if(slide_game == "horizon-zero-dawn"){
        slideDiv.classList.add("active");
    }
    let img = document.createElement("img");
    img.src = `images/${slide_game}-slide.jpg`;
    let link = document.createElement("a");
    link.href = `${slide_game}.html`
    link.append(img)
    slideDiv.append(link);
    screen.append(slideDiv);
})

let currentIndex = 0;
let timer;

let slides = document.querySelectorAll(".slide");

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove("active"));
    
    // wrapping around (first to last, last to first)
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    // Add active class to the selected slide
    // console.log(slides[currentIndex])
    if(slides[currentIndex])
        slides[currentIndex].classList.add("active");
}
nextBtn.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    clearInterval(timer);
    timer = setInterval(() => {

    showSlide(currentIndex + 1);
}, 5000);
});

prevBtn.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    clearInterval(timer);
    timer = setInterval(() => {

    showSlide(currentIndex + 1);
}, 5000);
});

timer = setInterval(() => {

    showSlide(currentIndex + 1);
}, 5000);



let categories = ["explore", "most Played", "new"];
let categoriesContainer = document.getElementById("categories-container");


// on loading window
window.addEventListener("load", function(){
    // loop over the categories to show in store page
    categories.forEach(function(category){
        let categorysection = document.createElement("section");
        // give the section id with value of the category being displayeed
        categorysection.id = `${category}`;
        // console.log(category);
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
                <p style="color: #d1ff05; font-weight: bold;">${gameOb.price=="free"? "Free" : `$${gameOb.price}`}</p>
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
                if(login == "user" && userData.wishlist.includes(name)){
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
//     if(userData.library.includes(gameName) === false){
//         userData.library.push(gameName);
//     }
//     // console.log("userData.library = ",userData.library)
//     localStorage.removeItem("users");
//     localStorage.setItem("users",JSON.stringify(users));
// }

function wishListActive(Container, gameName){
    // if user not logged in go to login page
    if(login === ""){
        window.location.href = `signin.html`;
    }
    else{
        // user logged in;
        let inWish = userData.wishlist.includes(gameName);
        let allCards = document.querySelectorAll(`.${gameName}`);
        console.log(allCards);
        // if not in user's wishlist add it
        if(!inWish){
            userData.wishlist.push(gameName);
            allCards.forEach(card => {
                let wishContainer = card.querySelector(".wish-container");
                wishContainer.classList.add("active");
            })
        }else{ // if exists in user's wishlist remove it
            let wishlistArray = userData.wishlist;
            userData.wishlist = wishlistArray.filter(game => game != gameName);
            allCards.forEach(card => {
                let wishContainer = card.querySelector(".wish-container");
                wishContainer.classList.remove("active");
            })
        }
        localStorage.removeItem("users");
        localStorage.setItem("users",JSON.stringify(users));
    }
}