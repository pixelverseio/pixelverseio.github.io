let userInput = document.querySelector("[name='user']"),
  passInput = document.querySelector("[name='pass']"),
  ConPassInput = document.querySelector("[name='Cpass']"),
  emailInput = document.querySelector("[name='email']"),
  form = document.getElementById("form"),
  container = document.getElementById("container");

function validateEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

let invalidEmailMsg = document.createElement("div");
invalidEmailMsg.className = "error";
invalidEmailMsg.id = "equalCheck";
invalidEmailMsg.innerHTML = `<p><i class="fa-solid fa-triangle-exclamation"></i> Invalid Email Format!</p>`;
form.insertBefore(invalidEmailMsg, form.children[1]);
invalidEmailMsg.style.display = "none";

let createaccsuccess = document.createElement("div");
createaccsuccess.className = "createaccsuccess";
createaccsuccess.id = "createaccsuccess";
createaccsuccess.innerHTML = `
    <p>Account is created Successfully!</p>
    <i class="fa-solid fa-circle-check" style="color: rgb(99, 230, 190)"></i>
`;
document.body.appendChild(createaccsuccess);

let emailMsg = document.createElement("div");
emailMsg.className = "equalCheck";
emailMsg.id = "Eerror";
emailMsg.innerHTML = `<p><i class="fa-solid fa-triangle-exclamation"></i> Email Exists, try another one!</p>`;
form.insertBefore(emailMsg, form.children[1]);
emailMsg.style.display = "none";

let userMsg = document.createElement("div");
userMsg.className = "equalCheck";
userMsg.id = "Uerror";
userMsg.innerHTML = `<p><i class="fa-solid fa-triangle-exclamation"></i> Username Exists, try another one!</p>`;
form.insertBefore(userMsg, form.children[1]);
userMsg.style.display = "none";

let equalCheck = document.createElement("p");
equalCheck.className = "equalCheck";
equalCheck.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Password Should be Equal in both!`;
form.insertBefore(equalCheck, form.children[1]);
equalCheck.style.display = "none";

let mustfill = document.createElement("p");
mustfill.className = "equalCheck";
mustfill.innerHTML = `
  <i class="fa-solid fa-triangle-exclamation"></i> All Fields should be filled!
`;
form.insertBefore(mustfill, form.children[1]);
mustfill.style.display = "none";

document.forms[0].onsubmit = function (event) {
  let userValid = false,
    passValid = false,
    emailValid = false,
    ConPassValid = false;

  if (
    userInput.value.trim() === "" ||
    passInput.value.trim() === "" ||
    ConPassInput.value.trim() === "" ||
    emailInput.value.trim() === ""
  ) {
    event.preventDefault();
    mustfill.style.display = "block";

    setTimeout(function () {
      mustfill.style.display = "none";
    }, 3000);
    return;
  }
  if (userInput.value.trim() !== "") {
    userValid = true;
  }
  if (validateEmail(emailInput.value.trim())) {
    emailValid = true;
  } else {
    emailValid = false;
  }
  if (
    passInput.value.trim() !== "" &&
    passInput.value.length > 4 &&
    passInput.value.length < 20
  ) {
    passValid = true;
  }
  if (
    ConPassInput.value.trim() !== "" &&
    ConPassInput.value.length > 4 &&
    ConPassInput.value.length < 20
  ) {
    ConPassValid = true;
  }

  if (!validateEmail(emailInput.value.trim())) {
    event.preventDefault();
    invalidEmailMsg.style.display = "block";

    setTimeout(function () {
      invalidEmailMsg.style.display = "none";
    }, 3000);
    return;
  }

  if (passInput.value.trim() !== ConPassInput.value.trim()) {
    event.preventDefault();
    equalCheck.style.display = "block";
    setTimeout(function () {
      equalCheck.style.display = "none";
    }, 3000);

    return;
  }

  if (
    userValid === false ||
    passValid === false ||
    emailValid === false ||
    ConPassValid === false
  ) {
    event.preventDefault();
  } else {
    let users = JSON.parse(localStorage.getItem("users")) || {};

    let emailExist = Object.values(users).find(function (user) {
      return user.email === emailInput.value.trim();
    });
    var username = userInput.value.trim();
    if (emailExist) {
      event.preventDefault();
      setTimeout(function () {
        emailMsg.style.display = "none";
      }, 3000);

      emailMsg.style.display = "block";
      return;
    }

    let userExist = Object.keys(users).includes(username);

    // let userExist = Object.values(users).find(function (user) {
    //   return user.username === userInput.value.trim();
    // });
    console.log(userExist);
    if (userExist) {
      console.log(users);
      console.log(Object.keys(users));
      console.log(username);
      event.preventDefault();
      userMsg.style.display = "block";
      setTimeout(function () {
        userMsg.style.display = "none";
      }, 3000);
      return;
    }
    users[username] = {
      email: `${emailInput.value.trim()}`,
      password: `${passInput.value.trim()}`,
      balance: 0,
      library: [],
      wishlist: [],
    };

    localStorage.setItem("users", JSON.stringify(users));

    event.preventDefault();
    createaccsuccess.style.display = "block";
    form.style.display = "none";

    setTimeout(function () {
      window.location.href = "signin.html";
    }, 2000);
  }
};
