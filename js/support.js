document.getElementById("supportForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("emailInput").value.trim();
  const prob = document.getElementById("probInput").value.trim();
  const msgBox = document.getElementById("validation-msg");

  if (email === "" || prob === "") {
    msgBox.textContent = "Please add contact email and describe your problem";
    msgBox.className = "error-style";
    msgBox.style.display = "block";
  } else {
    msgBox.textContent = "Submit";
    msgBox.className = "success-style";
    msgBox.style.display = "block";
    setTimeout(() => {
      this.submit();
    }, 2000);
  }
});