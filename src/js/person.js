const imgUpload = document.getElementById("imgUpload");
const profileImg = document.getElementById("profileImg");

document.addEventListener("DOMContentLoaded", () => {
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    profileImg.src = savedImage;
  }
});

imgUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      profileImg.src = imageData;
      localStorage.setItem("profileImage", imageData);
    };
    reader.readAsDataURL(file);
  }
});
