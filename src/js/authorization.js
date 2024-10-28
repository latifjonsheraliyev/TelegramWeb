const form = document.getElementById("form");
const form_btn = document.getElementById("form_btn");
const loading_svg = document.querySelector(".loading_svg");
const error = document.getElementById("error");
localStorage.removeItem("token");
function loading(load) {
  if (load) {
    loading_svg.style.display = "block";
    form_btn.disabled = true;
  } else {
    loading_svg.style.display = "none";
    form_btn.disabled = false;
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  error.style.display = "none";
  const getUsers = async () => {
    loading(true);
    const request = await fetch(
      "https://671b161cacf9aa94f6ac880d.mockapi.io/telegram/users"
    );
    const resonse = await request.json();
    loading(false);
    return resonse;
  };
  getUsers().then((data) =>
    authorizathion(data, {
      phone_number: form.phone_number.value,
      password: form.password.value,
    })
  );
});
function authorizathion(data, { phone_number, password }) {
  if (
    data.find(
      (value) =>
        value.phone_number === phone_number && value.password === password
    )
  ) {
    localStorage.setItem("token", "has be token jenereted");
    localStorage.setItem("password", "has be token password");
    setTimeout(() => {
      window.location.href = "/src/index.html";
    }, 1000);
  } else {
    error.style.display = "block";
  }
}
