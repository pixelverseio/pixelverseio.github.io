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


let form = document.getElementById("form");

let fields = {
    title: form.querySelector('input[name="game-title"]'),
    price: form.querySelector('input[name="price"]'),
    wallpaper: form.querySelector('input[placeholder="Main wallpaper URL"]'),
    video: form.querySelector('input[placeholder="Enter URL for trial video"]'),
    photos: form.querySelector(
    'input[placeholder="Enter URL Photos (between photo and other write (,))"]',
    ),
    about: form.querySelector('input[placeholder="write About for game"]'),
};

let successMessage = document.createElement("p");
successMessage.className = "success-message";
successMessage.style.cssText =
"display:none;color:rgb(209,255,5);font-weight:700;text-align:center;";
successMessage.textContent = "Game published successfully";
form.insertBefore(successMessage, form.querySelector(".register"));

Object.values(fields).forEach((input) => {
    let error = document.createElement("small");
        error.className = "error";
        error.style.cssText =
        "display:none;color:#ff6b6b;margin:4px 0 0 6px;font-weight:600;";
        input.parentElement.appendChild(error);

        input.addEventListener("input", () => {
        clearError(input);
        successMessage.style.display = "none";
        });
});

form.addEventListener("submit", (event) => {
event.preventDefault();

let isValid = true;

if (fields.title.value.trim().length < 3) {
    showError(fields.title, "Game title must be at least 3 characters.");
    isValid = false;
}

let price = Number(fields.price.value);
if (fields.price.value.trim() === "" || Number.isNaN(price) || price < 0) {
    showError(fields.price, "Price must be 0 or more.");
    isValid = false;
}

if (!isValidUrl(fields.wallpaper.value)) {
    showError(fields.wallpaper, "Enter a valid wallpaper URL.");
    isValid = false;
}

if (!isValidUrl(fields.video.value)) {
    showError(fields.video, "Enter a valid video URL.");
    isValid = false;
}

let photoUrls = fields.photos.value
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

if (photoUrls.length === 0 || !photoUrls.every(isValidUrl)) {
    showError(fields.photos, "Enter one or more valid photo URLs separated by commas.");
    isValid = false;
}

if (fields.about.value.trim().length < 20) {
    showError(fields.about, "About must be at least 20 characters.");
    isValid = false;
}

if (!isValid) {
    successMessage.style.display = "none";
    return;
}

successMessage.style.display = "block";
form.reset();
});

function showError(input, message) {
let error = input.parentElement.querySelector(".error");
error.textContent = message;
error.style.display = "block";
input.style.border = "2px solid #ff6b6b";
}

function clearError(input) {
let error = input.parentElement.querySelector(".error");
error.textContent = "";
error.style.display = "none";
input.style.border = "";
}

function isValidUrl(value) {
try {
    let url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
} catch {
    return false;
}
}
