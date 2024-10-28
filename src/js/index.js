if (!localStorage.getItem("password")) {
  window.location.href = "/src/login.html";
}
if (!localStorage.getItem("token")) {
  window.location.href = "/src/authorization_login.html";
}
import { swiper } from "./swiper.js";
const form = document.querySelector(".form");
const message__div = document.querySelector(".massage__div");
const img_user = document.querySelector(".img_user");
const swiper_wrapper = document.querySelector(".swiper-wrapper");
const swiper_item = document.querySelector(".swiper_item");
const close = document.querySelector(".close");
const imgFile = document.getElementById("file");
const lock = document.getElementById("lock");
const logout = document.getElementById("logout");
function date() {
  let date = new Date();
  let hour = date.getHours() > 10 ? 0 + date.getHours() : date.getHours();
  let minute =
    date.getMinutes() > 10 ? 0 + date.getMinutes() : date.getMinutes();
  return `${hour}:${minute}`;
}
form.addEventListener("submit", (e) => {
  console.log(form.input__text__For__sarvar.value);
  e.preventDefault();
  fetch("https://67172d90b910c6a6e026d725.mockapi.io/mesage/telgram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ID: 2,
      text: form.input__text__For__sarvar.value,
      date: date(),
    }),
  });
  getData().then((data) => renderData(data));
});
const getData = async () => {
  const request = await fetch(
    "https://67172d90b910c6a6e026d725.mockapi.io/mesage/telgram"
  );
  const response = await request.json();
  return response;
};

getData().then((data) => renderData(data));
function renderData(data) {
  message__div.innerHTML = "";
  data.forEach((value) => {
    if (value.ID === 1) {
      message__div.innerHTML += `
        <div class="massage__text">
        <p>${value.text}</p>
        <div>
          <span>${value.date}</span>
        </div>
      </div>
        `;
    }
    if (value.ID === 2) {
      message__div.innerHTML += `
    <div class="massage__textme">
    <p>${value.text}</p>
    <div>
      <span>${value.date}</span>
      <img src="./img/check.svg" alt="" />
    </div>
  </div>
    `;
    }
  });
}

const getImageUser = async () => {
  const request = await fetch(
    "https://67172d90b910c6a6e026d725.mockapi.io/mesage/img"
  );
  const response = await request.json();
  return response;
};

getImageUser().then((data) => editImgUser(data));

function editImgUser(data) {
  data.forEach((value) => {
    swiper_wrapper.innerHTML += `
    <div class="swiper-slide"><img src=${value.image_user} alt=${value.id} /></div>
    `;
  });
  img_user.src = data[data.length - 1].image_user;
  swiper.update();
}

const showModal = (type) =>
  type === "show"
    ? (swiper_item.style.cssText = "opacity:1; visibility: visible;")
    : (swiper_item.style.cssText = "opacity:0; visibility: hidden;");

img_user.addEventListener("click", () => showModal("show"));
close.addEventListener("click", () => showModal("hidden"));

imgFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const imgData = e.target.result;
    fetch("https://67172d90b910c6a6e026d725.mockapi.io/mesage/img", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_user: imgData,
      }),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error.message));
    getImageUser().then((data) => editImgUser(data));
  };
  reader.readAsDataURL(file);
  console.log("dataaa");
});

lock.addEventListener("click", (e) => {
  e.target.classList.value = "fa-solid fa-lock";
  setTimeout(() => {
    window.location.href = "/src/login.html";
  }, 500);
});
logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/src/authorization_login.html";
});
