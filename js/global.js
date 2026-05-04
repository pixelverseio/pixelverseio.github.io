// dark-mood nav toggle (small screens)
let navToggle = document.querySelector(".nav-toggle");
let navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", function(){
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
})

// light-mood nav toggle
let ltNavToggle = document.querySelector(".lightnav-toggle");
let header = document.querySelector("header");

ltNavToggle.addEventListener("click", function(){
    ltNavToggle.classList.toggle("active-light");
    header.classList.toggle("active-light");
})

// Dark/Light theme switching
let themeToggle = document.querySelector(".theme-toggle");
let link = document.querySelector("link.theme");
let currentTheme = localStorage.getItem("theme");

if(currentTheme == "dark")
{
    link.setAttribute("href", "css/global.css");
    link.classList.remove("light-theme");
    link.classList.add("dark-theme");
}else{
    link.setAttribute("href", "css/light-mood.css");
    link.classList.remove("dark-theme");
    link.classList.add("light-theme");
}

themeToggle.addEventListener("click", function(){
    if(link.classList.contains("dark-theme")){
        link.setAttribute("href", "css/light-mood.css");
        link.classList.remove("dark-theme");
        link.classList.add("light-theme");
        localStorage.setItem("theme", "light");
    }
    else{
        link.setAttribute("href", "css/global.css");
        link.classList.remove("light-theme");
        link.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    }
})
