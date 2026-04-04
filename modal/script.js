const modalBtn = document.querySelector(".modal-btn");
const closeModalBtn = document.querySelector(".closeBtn");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");

modalBtn.addEventListener("click", function () {
  modal.style.opacity = 1;
  modalBg.style.backgroundColor = "gray";
  modalBg.style.opacity = 0.3;
});

closeModalBtn.addEventListener("click", function () {
  modal.style.opacity = 0;
  modalBg.style.backgroundColor = "transparent";
  modalBg.style.opacity = 0;
});

window.addEventListener("click", function (e) {
  if (e.target === modalBg) {
    modal.style.opacity = 0;
    modalBg.style.backgroundColor = "gray";
    modalBg.style.backgroundColor = "transparent";
    modalBg.style.opacity = 0;
  }
});
