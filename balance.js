let form = document.forms[0];

let numInput = document.querySelector("[name='num']");
let balInput = document.querySelector("[name='bal']");

// Success Message
let chargeMsg = document.createElement("div");
chargeMsg.className = "chargeMsg";
chargeMsg.innerHTML = `
    <p>Charged Successfully</p>
    <i class="fa-solid fa-circle-check" style="color: rgb(99, 230, 190)"></i>
`;
document.body.appendChild(chargeMsg);

// Error Message
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
chargeMsg.style.display = "none";
form.onsubmit = function (event) {
  event.preventDefault();

  let walletNum = numInput.value.trim();
  let balanceInput = Number(balInput.value.trim());

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

  if (!numValid || !balValid) {
    errChargeMsg.style.display = "block";
    setTimeout(function () {
      errChargeMsg.style.display = "none";
    }, 3000);
  } else {
    // console.log(balance);
    userData.balance += balanceInput;
    // console.log(balance);
    // console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
    chargeMsg.style.display = "block";
    form.style.display = "none";
    setTimeout(function () {
      window.location.href = "balance.html";
    }, 30000);
  }
};
