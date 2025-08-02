// Dummy autofill — in real implementation, this will fill data from backend
//let emailInput = document.querySelector("input[type='email']");
//let passwordInput = document.querySelector("input[type='password']");

//if (emailInput && passwordInput) {
  //emailInput.value = "user@example.com";
  //passwordInput.value = "super-secret";
  //console.log("JongoPass autofilled credentials.");
//}

// Autofill dummy credentials (to be replaced with backend response)
const emailInput = document.querySelector("input[type='email']");
const passwordInput = document.querySelector("input[type='password']");

if (emailInput && passwordInput) {
  emailInput.value = "user@example.com";
  passwordInput.value = "super-secret";
  console.log("JongoPass: Credentials autofilled!");
}