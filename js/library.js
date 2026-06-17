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
let enjoyPlayingMsg = document.createElement("div");
enjoyPlayingMsg.className = "enjoy";
enjoyPlayingMsg.innerHTML = `
  <p>Enjoy playing!</p>
  <i class="fa-solid fa-gamepad"></i>
`;
document.body.append(enjoyPlayingMsg);
enjoyPlayingMsg.style.display = "none";
// get the username from local storage
let username = localStorage.getItem("pixeluser");
console.log("username = ", username);
//select the container where game cards will be displayed
const container = document.getElementById("library-container");
console.log("username = ", username);
//loop over the user games library
for (let i = 0; i < users[username].library.length; i++) {
  let game_key = users[username].library[i];
  let gameOb = gamesData[users[username].library[i]];
  console.log("gameOb = ", gameOb);
  //create a new div element for the game card
  const card = document.createElement("div");
  card.className = "game-card";
  card.id = game_key;
  //write the card with HTML content image and title and button
  card.innerHTML = `
        <span class="badge">${gameOb.badge}</span>
        <img src="${gameOb.image}">
        <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
        <button class="action-btn">
            <span>🎮</span> Play
        </button>
        `;
  //add the card to the container in the webpage
  container.appendChild(card);
  //redirect to the game page when the card is clicked
  card.addEventListener("click", function () {
    enjoyPlayingMsg.style.display = "block";
    body.style.display = "none";
    setTimeout(() => {
      enjoyPlayingMsg.style.display = "none";
      document.body.style.display = "block";
    }, 3000);
    window.location.href = `${game_key}.html`;
  });
}
//Select the class where search box will be displayed
const searchBox = document.querySelector(".search-box");
// Run this function every time the input value changes
searchBox.addEventListener("input", (e) => {
  //Make all the inputs small
  let word = e.target.value.toLowerCase();
  //Select all elements with the class game-card and store them in a list
  let cards = document.querySelectorAll(".game-card");
  //check each card to see if it matches the search word
  cards.forEach((card) => {
    //made the game name Small and we are searching for it
    let title = card.querySelector("h3").textContent.toLowerCase();
    if (title.includes(word)) {
      card.style.display = "block"; // Show card
    } else {
      card.style.display = "none"; //hide card
    }
  });
});
