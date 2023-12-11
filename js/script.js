// Declare DOM
const heroCategoryContainer = document.getElementById(
  "hero-category-container"
);
const highlightContainer = document.getElementById("highlight-container");
const highlightContainerLoading = document.getElementById(
  "highlight-container-loading"
);
const latestContentContainer = document.getElementById(
  "latest-content-container"
);
const trendingContentContainer = document.getElementById(
  "trending-content-container"
);
const moreContentContainer = document.getElementById("more-content-container");

const allCategories = document.getElementById("all-categories");

// Show Loading State
const showLoadingState = () => {
  highlightContainer.innerHTML =
    '<div class="loading show" id="highlight-container-loading" />';
  latestContentContainer.innerHTML = null;
  latestContentContainer.classList.add("loading");
  trendingContentContainer.classList.add("loading");
  moreContentContainer.classList.add("loading");
};

// Stop Loading State
const stopLoadingState = () => {
  highlightContainerLoading.classList.remove("show");
  latestContentContainer.classList.remove("loading");
  trendingContentContainer.classList.remove("loading");
  moreContentContainer.classList.remove("loading");
};

// Set Recommendation News
const setRecommendationNews = ({
  title,
  slug,
  thumbnail,
  thumbnail_description,
  createdAt,
}) => {
  // Show Recommendation
  highlightContainer.innerHTML = `
  <a class="highlight-content" href="news?slug=${slug}">
    <div class="highlight-content-info">
      <p>Rekomendasi</p>
      <h1>${title}</h1>
      <time datetime="${createdAt}">${getFormatDate(createdAt)}</time>
    </div>
    <img
      src="${thumbnail}" alt="${thumbnail_description}"
      class="highlight-content-thumbnail"
    />
  </a>`;
};

// Set Latest News
const setLatestNews = (latest) => {
  latestContentContainer.innerHTML = null;
  // Show Latest News
  latest.forEach((news) => {
    const latestContent = document.createElement("a");
    latestContent.classList.add("latest-content-card");
    latestContent.setAttribute("href", `news?slug=${news.slug}`);
    latestContent.innerHTML = `
    <p>${news.category.name}</p>
    <img src="${news.thumbnail}" alt="${news.thumbnail_description}" />
    <h4>${news.title}</h4>
    <time datetime="${news.createdAt}">${getFormatDate(news.createdAt)}</time>
    `;
    latestContentContainer.appendChild(latestContent);
  });
};

// Change Categories
const changeCategories = async (id, name) => {
  showLoadingState();

  const heroCategories = document.querySelectorAll(".hero-category");
  heroCategories.forEach(async (heroCategory) => {
    if (heroCategory.classList.contains("active")) {
      heroCategory.classList.remove("active");
    }

    if (heroCategory.innerHTML === name) {
      heroCategory.classList.add("active");
    }
  });
  const { recommendation, latest, moreNews } = await getHomepage(id);

  // Set Recommendation
  setRecommendationNews({
    title: recommendation.title,
    slug: recommendation.slug,
    thumbnail: recommendation.thumbnail,
    thumbnail_description: recommendation.thumbnail_description,
    createdAt: recommendation.createdAt,
  });

  // Set Latest news
  setLatestNews(latest);
  stopLoadingState();
};

// When "All Categories" Click
allCategories.addEventListener("click", () =>
  changeCategories(0, "Semua Berita")
);

// On Load
window.addEventListener("load", async () => {
  const { categories, recommendation, latest, trending, moreNews } =
    await getHomepage();

  // Show Categories
  categories.forEach((category) => {
    const heroCategory = document.createElement("a");
    heroCategory.classList.add("hero-category");
    heroCategory.addEventListener("click", () => {
      changeCategories(category.id, category.name);
    });
    heroCategory.textContent = category.name;
    heroCategoryContainer.appendChild(heroCategory);
  });

  setRecommendationNews({
    title: recommendation.title,
    slug: recommendation.slug,
    thumbnail: recommendation.thumbnail,
    createdAt: recommendation.createdAt,
  });

  setLatestNews(latest);

  // Trending Content Container
  trending.forEach((news) => {
    const trendingContent = document.createElement("a");
    trendingContent.classList.add("content-card");
    trendingContent.classList.add("border");
    trendingContent.setAttribute("href", `news?slug=${news.slug}`);
    trendingContent.innerHTML = `
    <p class="content-card-rank">Trending #${news.trending_rank}</p>
    <div class="content-card-news">
      <img  src="${news.thumbnail}" alt="${news.thumbnail_description}" />
      <div class="content-card-info">
        <div class="content-card-highlight">
          <p>${news.category.name}</p>
          <h3>
            ${news.title}
          </h3>
        </div>
        <time datetime="${news.createdAt}">${getFormatDate(
      news.createdAt
    )}</time>
      </div>
    </div>`;
    trendingContentContainer.appendChild(trendingContent);
  });

  const moreContentListContainer = document.createElement("div");
  moreContentListContainer.classList.add("more-content-list-container");

  moreNews.slice(0, 3).forEach((news) => {
    const moreContent = document.createElement("a");
    moreContent.classList.add("content-card");
    moreContent.setAttribute("href", `news?slug=${news.slug}`);
    moreContent.innerHTML = `
    <div class="content-card-news lg">
      <img src="${news.thumbnail}" alt="${news.thumbnail_description}" />
      <div class="content-card-info">
        <div class="content-card-highlight lg">
          <p>${news.category.name}</p>
          <h3>
            ${news.title}
          </h3>
        </div>
        <time datetime="${news.createdAt}">${getFormatDate(
      news.createdAt
    )}</time>
      </div>
    </div>`;
    moreContentListContainer.appendChild(moreContent);
  });

  moreContentContainer.appendChild(moreContentListContainer);

  if (moreNews.length > 3) {
    const moreContentHighlight = document.createElement("a");
    moreContentHighlight.classList.add("more-content-highlight");
    moreContentHighlight.setAttribute("href", `news?slug=${moreNews[3].slug}`);
    moreContentHighlight.innerHTML = `
    <img
    src="${moreNews[3].thumbnail}" alt="${moreNews[3].thumbnail_description}" 
      class="more-content-highlight-background"
    />
    <div class="more-content-highlight-info">
      <p>${moreNews[3].category.name}</p>
      <h3>
        ${moreNews[3].title}
      </h3>
      <time datetime="${moreNews[3].createdAt}">${getFormatDate(
      moreNews[3].createdAt
    )}</time>
    </div>`;
    moreContentContainer.appendChild(moreContentHighlight);
  }

  stopLoadingState();
});
