let form = document.forms[0];

let numInput = document.querySelector("[name='num']");
let balInput = document.querySelector("[name='bal']");

let loading = document.createElement("div");
loading.innerHTML = `
  <div class="loading">
    <p>Loading</p>
    <div class="circle"></div>
  </div>
`;
balInput.after(loading);
loading.style.display = "none";

let loaded = document.createElement("div");
loaded.className = "successlogin";
loaded.id = "successlogin";
loaded.innerHTML = `
    <p>Loaded Successfully</p>
    <i class="fa-solid fa-circle-check" style="color: rgb(99, 230, 190)"></i>
`;
balInput.after(loaded);
loaded.style.display = "none";

let mustfill = document.createElement("p");
mustfill.className = "errChargeMsg";
mustfill.innerHTML = `
  <i class="fa-solid fa-triangle-exclamation"></i> All Fields should be filled!
`;
form.insertBefore(mustfill, form.children[1]);
mustfill.style.display = "none";

let errChargeMsg = document.createElement("div");
errChargeMsg.className = "errChargeMsg";
errChargeMsg.innerHTML = `
    <p>
      <i class="fa-solid fa-triangle-exclamation"></i>
      Wallet Number or Balance is Incorrect!
    </p>
`;

form.insertBefore(errChargeMsg, form.children[1]);

errChargeMsg.style.display = "none";

form.onsubmit = function (event) {
  event.preventDefault();

  let walletNum = numInput.value.trim();
  let balanceInput = balInput.value.trim();

  let numValid = false;
  let balValid = false;

  // Wallet Validation
  if (walletNum !== "" && walletNum.length === 11) {
    numValid = true;
  }

  // BalanceInput Validation
  if (balanceInput !== "" && Number(balanceInput) > 0) {
    balValid = true;
  }
  if (balanceInput === "" || walletNum === "") {
    mustfill.style.display = "block";
    setTimeout(() => {
      mustfill.style.display = "none";
    }, 2000);
    return;
  }
    if (!numValid || !balValid) {
      errChargeMsg.style.display = "block";
      setTimeout(function () {
        errChargeMsg.style.display = "none";
      }, 3000);
      return;
    }
  else {
    loading.style.display = "block";

    // console.log(balance);
    userData.balance += Number(balanceInput);
    // console.log(balance);
    // console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
    setTimeout(() => {
      loading.style.display = "none";
      loaded.style.display = "flex";
    }, 3000);

    setTimeout(() => {
      window.location.href = "balance.html";
    }, 4500);
  }
};
