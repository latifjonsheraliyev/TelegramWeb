const form = document.getElementById("form_password");
const input_password = document.getElementById("password");
const btn = document.getElementById("btn");
let password_text = "";
localStorage.removeItem("password");
input_password.addEventListener("keydown", (e) => {
  password_text = e.target.value;
  if (password_text.trim()) {
    btn.style.backgroundColor = "#8774E1";
    btn.disabled = false;
  }
  if (!password_text.trim()) {
    btn.style.backgroundColor = "#544A81";
    btn.disabled = true;
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.password.value === "0000") {
    window.location.href = "/src/index.html";
    localStorage.setItem("password", "token has be password");
  }
});
