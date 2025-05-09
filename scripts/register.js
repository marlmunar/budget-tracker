const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInfo = {
    userName,
    userEmail,
    userPassword,
    confirmPassword,
  };

  console.log(JSON.stringify(userInfo));
});
