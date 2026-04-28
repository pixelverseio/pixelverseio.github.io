const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener('click', () =>{
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
})