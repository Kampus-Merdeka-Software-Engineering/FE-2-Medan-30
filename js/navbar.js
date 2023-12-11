// Button
const menuButton = document.getElementById("menu-button");
const searchButton = document.getElementById("search-button");
const closeModalButton = document.getElementById("close-menu-button");

// Modal
const menuModal = document.getElementById("menu-modal");
const searchModal = document.getElementById("search-modal");
const searchModalContent = document.getElementById("search-modal-content");

// Menu Modal Content
const menuModalCategoryList = document.getElementById(
  "menu-modal-category-list"
);
const menuModalResultTitle = document.getElementById("menu-modal-result-title");
const menuModalResultContainer = document.getElementById(
  "menu-modal-result-list-container"
);

// Search Modal Content
const searchModalInput = document.getElementById("search-modal-input");
const searchModalContentResultContainer = document.getElementById(
  "search-modal-content-result-container"
);

const chooseMenuCategories = async (category_id, category_name) => {
  const news = await getNews(category_id, 4);

  const categoriesButton = document.querySelectorAll(
    ".menu-modal-category-list-item"
  );

  categoriesButton.forEach(async (categoryButton) => {
    if (categoryButton.classList.contains("active")) {
      categoryButton.classList.remove("active");
    }

    if (categoryButton.innerHTML === category_name) {
      categoryButton.classList.add("active");
    }
  });

  menuModalResultTitle.innerHTML = category_name;
  menuModalResultContainer.innerHTML = null;
  news.forEach((news) => {
    const menuModalResult = document.createElement("a");
    menuModalResult.classList.add("menu-modal-result-list");
    menuModalResult.setAttribute("href", `news?slug=${news.slug}`);
    menuModalResult.innerHTML = `
    <h2 class="menu-modal-result-list-title">
      ${news.title}
    </h2>
    <time
      class="menu-modal-result-list-time"
      datetime="${news.createdAt}"
      >${getFormatDate(news.createdAt)}</time>
    `;
    menuModalResultContainer.appendChild(menuModalResult);
  });
};

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
  searchModalContentResultContainer.innerHTML = null;
  searchModalInput.value = null;
});

// Prevent Search Modal Content from Closing Modal
searchModalContent.addEventListener("click", (e) => {
  e.stopPropagation();
});

// On Load: Fetch and Set Categories Data
window.addEventListener("load", async () => {
  const categories = await getCategories();

  categories.forEach((category, index) => {
    const menuModalCategory = document.createElement("a");
    menuModalCategory.classList.add("menu-modal-category-list-item");
    menuModalCategory.addEventListener("click", () =>
      chooseMenuCategories(category.id, category.name)
    );
    if (index === 0) {
      menuModalCategory.classList.add("active");
      chooseMenuCategories(category.id, category.name);
    }
    menuModalCategory.innerHTML = category.name;
    menuModalCategoryList.appendChild(menuModalCategory);
  });
});

// On User Search
let timeout = null;
searchModalInput.addEventListener("keyup", async (event) => {
  event.preventDefault();
  searchModalContentResultContainer.innerHTML = null;
  searchModalContentResultContainer.classList.add("loading-spinner");

  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    if (searchModalInput.value) {
      const search = await getSearch(searchModalInput.value);

      search.forEach((news) => {
        const searchModalContentResult = document.createElement("a");
        searchModalContentResult.classList.add("search-modal-content-result");
        searchModalContentResult.setAttribute("href", `news?slug=${news.slug}`);
        searchModalContentResult.innerHTML = `
          <p>${news.category.name}</p>
          <h3>${news.title}</h3>
          <time datetime="${news.createdAt}">${getFormatDate(
          news.createdAt
        )}</time>
        `;
        searchModalContentResultContainer.appendChild(searchModalContentResult);
      });
    }
    searchModalContentResultContainer.classList.remove("loading-spinner");
  }, 500);
});
