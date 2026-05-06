const supportForm = document.getElementById("supportForm");
const emailField = document.getElementById("emailInput");
const problemField = document.getElementById("probInput");
const msgBox = document.getElementById("validation-msg");

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function showValidationMessage(message, isSuccess) {
  msgBox.textContent = message;
  msgBox.className = isSuccess ? "success-style" : "error-style";
  msgBox.style.display = "block";

  clearTimeout(showValidationMessage.timeoutId);
  showValidationMessage.timeoutId = setTimeout(function () {
    msgBox.style.display = "none";
  }, 3000);
}

supportForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailField.value.trim();
  const problem = problemField.value.trim();

  if (!email || !problem) {
    showValidationMessage(
      "Please enter your email and describe the problem.",
      false,
    );
    return;
  }

  if (!validateEmail(email)) {
    showValidationMessage("Please enter a valid email address.", false);
    return;
  }

  if (problem.length < 10) {
    showValidationMessage(
      "Problem description must be at least 10 characters.",
      false,
    );
    return;
  }

  showValidationMessage("Your support request has been sent.", true);
  supportForm.reset();
});
