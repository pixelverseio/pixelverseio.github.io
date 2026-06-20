let userInput = document.querySelector("[name='user']"),
  passInput = document.querySelector("[name='pass']"),
  form = document.getElementById("form"),
  adminName = "administrator",
  adminPass = "admingg";

let loading = document.createElement("div");
loading.innerHTML = `
  <div class="loading">
    <p>Loading</p>
    <div class="circle"></div>
  </div>
`;
passInput.after(loading);

let loaded = document.createElement("div");
loaded.className = "successlogin";
loaded.id = "successlogin";
loaded.innerHTML = `
    <p>Loaded Successfully</p>
    <i class="fa-solid fa-circle-check" style="color: rgb(99, 230, 190)"></i>
`;
passInput.after(loaded);

let adminLoginSuccess = document.createElement("div");
adminLoginSuccess.className = "adminsuccesslogin";
adminLoginSuccess.id = "adminsuccesslogin";
adminLoginSuccess.innerHTML = `
    <p>Admin Login Successful</p>
    <i class="fa-solid fa-circle-check" style="color: rgb(99, 230, 190)"></i>
`;
document.body.appendChild(adminLoginSuccess);

let appearMes = document.createElement("div");
appearMes.className = "error";
appearMes.id = "error";
appearMes.innerHTML = `
    <p>
      <i class="fa-solid fa-triangle-exclamation"></i>
      Username or Password may be Incorrect, try again!
    </p>
`;

form.insertBefore(appearMes, form.children[1]);
loading.style.display = "none";
appearMes.style.display = "none";
loaded.style.display = "none";
adminLoginSuccess.style.display = "none";
document.forms[0].onsubmit = function (event) {
  var username = userInput.value.trim();

  if (
    userInput.value.trim() === adminName &&
    passInput.value.trim() === adminPass
  ) {
    console.log("Admin");
    localStorage.setItem("login", "admin");
    event.preventDefault();
    adminLoginSuccess.style.display = "block";
    form.style.display = "none";
    setTimeout(function () {
      window.location.href = "index.html";
    }, 2000);
  } else {
    let userValid = false,
      passValid = false;

    if (
      userInput.value.trim() !== "" &&
      Object.keys(users).includes(username)
    ) {
      userValid = true;
    }

    if (
      passInput.value.trim() !== "" &&
      passInput.value.length > 4 &&
      passInput.value.length <= 20
    ) {
      //////////////////////////
      passValid = true;
    }

    if (userValid === false || passValid === false) {
      event.preventDefault();
      appearMes.style.display = "block";
      setTimeout(function () {
        appearMes.style.display = "none";
      }, 3000);
    } else {
      ////////////////////////////////////
      let found = function () {
        let username = userInput.value.trim();
        let password = passInput.value.trim();

        let user = users[username];
        console.log(username);

        return user !== undefined && user.password === password;
      };

      event.preventDefault();
      if (found()) {
        if (found()) {
          loading.style.display = "block";

          localStorage.setItem("login", "user");
          localStorage.setItem("pixeluser", username);

          setTimeout(() => {
            loading.style.display = "none";
            loaded.style.display = "flex";
          }, 3000);

          setTimeout(() => {
            window.location.href = "index.html";
          }, 4000);
        } else {
          appearMes.style.display = "block";
          setTimeout(function () {
            appearMes.style.display = "none";
          }, 3000);
        }
      }
    }
  }
};
