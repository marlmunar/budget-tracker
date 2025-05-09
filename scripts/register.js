const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInfo = {
    name: userName.value.trim(),
    email: userEmail.value.trim(),
    password: userPassword.value.trim(),
    confirmPassword: confirmPassword.value.trim(),
  };

  console.log(JSON.stringify(userInfo));
});
