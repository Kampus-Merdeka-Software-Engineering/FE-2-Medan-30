// Button
const menuButton = document.getElementById("menu-button");
const searchButton = document.getElementById("search-button");
const closeModalButton = document.getElementById("close-menu-button");

// Modal
const menuModal = document.getElementById("menu-modal");

// On Menu Button Click
menuButton.addEventListener("click", () => {
  menuModal.classList.add("show");
  menuModal.classList.remove("hide");
  searchButton.classList.add("hide");
  menuButton.classList.add("hide");
  closeModalButton.classList.remove("hide");
});

// On Close Menu Button Click
closeModalButton.addEventListener("click", () => {
  menuModal.classList.remove("show");
  // Show Close Animation before hide
  menuModal.classList.add("close-animation");
  setTimeout(() => {
    menuModal.classList.add("hide");
    menuModal.classList.remove("close-animation");
  }, 500);
  searchButton.classList.remove("hide");
  menuButton.classList.remove("hide");
  closeModalButton.classList.add("hide");
});
