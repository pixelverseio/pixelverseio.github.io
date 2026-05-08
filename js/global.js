if (localStorage.getItem("pixeluser")) {
  var user = localStorage.getItem("pixeluser");
} else {
  var user = {
    username: "no User",
  };
}

// dark-mood nav toggle (small screens)
let navToggle = document.querySelector(".nav-toggle");
let navMenu = document.querySelector(".nav-menu");

let sign_in_up = document.querySelector(".sign-in-up");
if (!sign_in_up) {
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// light-mood nav toggle
let ltNavToggle = document.querySelector(".lightnav-toggle");
let header = document.querySelector("header");

if (!sign_in_up) {
  ltNavToggle.addEventListener("click", function () {
    ltNavToggle.classList.toggle("active-light");
    header.classList.toggle("active-light");
  });
}

// Login Nav
let signinBtn = document.querySelector(".sign-in");
let signinUserContainer = document.querySelector("#signin-userContainer");
let logo = document.querySelector(".nav-logo");
let currentTheme = localStorage.getItem("theme");
let login = localStorage.getItem("login");

// User & Admin account icon
let profile = document.createElement("div");
if (login == "admin") {
  profile.innerHTML = `<i class="fa-solid fa-circle-plus"></i>`;
  let add_game = profile.addEventListener("click",function(){
    window.location.href = "add_game.html";
  });
} else {
  profile.innerHTML = `<i class = "fa-solid fa-circle-user"></i>`;
}
profile.classList.add("user-photo");

// Drop down menu
let subMenuContainer = document.createElement("div");
subMenuContainer.classList.add("menu-container");
let balance = 0;
subMenuContainer.innerHTML = `<ul class="sub-menu">
    <li class="user-info">
        <i class="fa-solid fa-circle-user"></i>
        <p class="username">${user}</p>
    </li>
    <li class="balanceLi">
        <i class="fa-solid fa-wallet"></i>
        <p>Balance</p>
        <span>${balance}$</sapn>
    </li>
    <li>
        <a href = "wishlist.html">
            <i class="bi bi-heart-fill"></i>
            <p>Wishlist</p>
            <i class="fa-solid fa-chevron-right"></i>
        </a>
    </li>
    <li>
        <a href = "support.html">
            <i class="fa-solid fa-headset"></i>
            <p>Support</p>
            <i class="fa-solid fa-chevron-right"></i>
        </a>
    </li>
    <li>
        <a href = "index.html" class = "logout">
            <i class="fa-solid fa-right-from-bracket"></i>
            <p>Logout</p>
            <i></i>
        </a>
    </li>
</ul>`;

// when user icon clicked => User Info appear & support hidden from nav
let sessionDepLi = document.querySelector(".session-dependentLink");
let dynamicLink = sessionDepLi.firstElementChild;
if (login == "user") {
  // add drop menu
  signinUserContainer.append(subMenuContainer);
  // add username to profile
  let usernameP = document.createElement("p");
  usernameP.innerHTML = `${user}`;
  profile.append(usernameP);
  // remove support link (added to drop menu)
  dynamicLink.setAttribute("href", "library.html");
  dynamicLink.firstElementChild.className = "";
  dynamicLink.firstElementChild.classList.add("bi", "bi-grid-3x3-gap-fill");
  // dynamicLink.firstElementChild.classList.add("fa-solid", "fa-layer-group");

  dynamicLink.lastElementChild.innerHTML = "Library";

  if (currentTheme == "dark") {
    signinUserContainer.append(profile);
  } else if (currentTheme == "light") {
    logo.after(profile);
  }
  signinBtn.remove();
} else if (login == "admin") {
  if (currentTheme == "dark") {
    signinUserContainer.append(profile);
  } else if (currentTheme == "light") {
    logo.after(profile);
  }
  signinBtn.remove();
}
profile.addEventListener("click", function () {
  subMenuContainer.classList.toggle("active");
});
//logout
logout = document.querySelector(".logout");
// check if the logout button exists (user logged in)
if (logout) {
  logout.addEventListener("click", function () {
    localStorage.setItem("login", "");
  });
}

// Dark/Light theme switching
window.addEventListener("load", function () {
  let themeToggle = document.querySelector("label.theme-toggle");
  let link = document.querySelector("link.theme");
  if (currentTheme == "light") {
    link.setAttribute("href", "css/light-mood.css");
    link.classList.remove("dark-theme");
    link.classList.add("light-theme");
    document.documentElement.className = "light-theme";
    // document.classList.add("");
  } else {
    link.setAttribute("href", "css/global.css");
    link.classList.remove("light-theme");
    link.classList.add("dark-theme");
    document.documentElement.className = "dark-theme";
    // document.classList.add("dark-theme");
  }
  themeToggle.addEventListener("click", function () {
    if (link.classList.contains("dark-theme")) {
      // change theme to light
      link.setAttribute("href", "css/light-mood.css");
      link.classList.remove("dark-theme");
      link.classList.add("light-theme");
      localStorage.setItem("theme", "light");
      document.documentElement.className = "light-theme";
      // change profile location
      if (login == "user" || login == "admin") {
        profile.remove();
        profile.style.color = "#252444";
        logo.after(profile);
      }
    } else {
      // change theme to dark
      link.setAttribute("href", "css/global.css");
      link.classList.remove("light-theme");
      link.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
      document.documentElement.className = "dark-theme";
      // change profile location
      if (login == "user" || login == "admin") {
        profile.remove();
        profile.style.color = "#c7c7c7";
        signinUserContainer.append(profile);
      }
    }
  });
});

// localStorage.setItem("pixelUser", JSON.stringify(userobj));

// let obj = JSON.parse(localStorage.getItem("pixelUser"));
