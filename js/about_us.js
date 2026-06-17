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
