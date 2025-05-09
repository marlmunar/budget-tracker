const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const form = document.getElementById("signinForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInfo = {
    email: userEmail.value.trim(),
    password: userPassword.value.trim(),
  };

  console.log(JSON.stringify(userInfo));
});
