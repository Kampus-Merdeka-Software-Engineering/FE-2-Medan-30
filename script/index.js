// Button
const menuButton = document.getElementById("menu-button");
const searchButton = document.getElementById("search-button");
const closeModalButton = document.getElementById("close-menu-button");

// Modal
const menuModal = document.getElementById("menu-modal");
const searchModal = document.getElementById("search-modal");
const searchModalContent = document.getElementById("search-modal-content");

// On Menu Button Click
menuButton.addEventListener("click", () => {
  menuModal.classList.add("modal-show");
  menuModal.classList.remove("modal-hide");
  searchButton.classList.add("hide");
  menuButton.classList.add("hide");
  closeModalButton.classList.remove("hide");
});

// On Close Menu Button Click
closeModalButton.addEventListener("click", () => {
  menuModal.classList.remove("modal-show");
  // Show Close Animation before hide
  menuModal.classList.add("modal-close-animation");
  setTimeout(() => {
    menuModal.classList.add("modal-hide");
    menuModal.classList.remove("modal-close-animation");
  }, 500);
  searchButton.classList.remove("hide");
  menuButton.classList.remove("hide");
  closeModalButton.classList.add("hide");
});

// On Search Button Click
searchButton.addEventListener("click", () => {
  searchModal.classList.add("modal-show");
  searchModal.classList.remove("modal-hide");
});

// On Menu Modal Overlay Click
searchModal.addEventListener("click", () => {
  searchModal.classList.remove("modal-show");
  // Show Close Animation before hide
  searchModal.classList.add("modal-close-animation");
  setTimeout(() => {
    searchModal.classList.add("modal-hide");
    searchModal.classList.remove("modal-close-animation");
  }, 500);
});

// Prevent Search Modal Content from Closing Modal
searchModalContent.addEventListener("click", (e) => {
  e.stopPropagation();
});
