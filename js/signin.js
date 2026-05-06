let userInput = document.querySelector("[name='user']"),
  passInput = document.querySelector("[name='pass']"),
  form = document.getElementById("form"),
  adminName = "administrator",
  adminPass = "admingg";

let loginSuccess = document.createElement("div");
loginSuccess.className = "successlogin";
loginSuccess.id = "successlogin";
loginSuccess.innerHTML = `
    <p>User Login Successful</p>
    <i class="fa-solid fa-circle-check" style="color: rgb(99, 230, 190)"></i>
`;

document.body.appendChild(loginSuccess);

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
document.forms[0].onsubmit = function (event) {
  var username = userInput.value.trim();
  appearMes.style.display = "none";
  loginSuccess.style.display = "none";
  adminLoginSuccess.style.display = "none";
  let userValid = false,
    passValid = false;

  if (userInput.value.trim() !== "") {
    userValid = true;
  }

  if (
    passInput.value.trim() !== "" &&
    passInput.value.length >= 4 &&
    passInput.value.length <= 10
  ) {
    passValid = true;
  }

  if (userValid === false || passValid === false) {
    event.preventDefault();
    appearMes.style.display = "block";
    setTimeout(function () {
      appearMes.style.display = "none";
    }, 3000);
  } else {
    if (
      userInput.value.trim() === adminName &&
      passInput.value.trim() === adminPass
    ) {
      localStorage.setItem("login", "admin");
      event.preventDefault();
      adminLoginSuccess.style.display = "block";
      form.style.display = "none";
      setTimeout(function () {
        window.location.href = "index.html";
      }, 2000);
    } else {
      let users = JSON.parse(localStorage.getItem("users")) || {};

      let found = function() {
        let username = userInput.value.trim();
        let password = passInput.value.trim();

        let user = users[username];
                console.log(username)

        return user !== undefined && user.password === password;
};
      // let found = users.find(function (user) {
      //   return (
      //     user.username === userInput.value.trim() &&
      //     user.password === passInput.value.trim()
      //   );
      // });
      event.preventDefault();

      if (found) {
        console.log(username)
        localStorage.setItem("login", "user");
        localStorage.setItem("pixeluser", username);
        loginSuccess.style.display = "block";
        form.style.display = "none";
        setTimeout(function () {
          window.location.href = "index.html";
        }, 2000);
      } else {
        appearMes.style.display = "block";
        setTimeout(function () {
          appearMes.style.display = "none";
        }, 3000);
      }
    }
  }
};
