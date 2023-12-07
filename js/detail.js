// Node
const detailContentHeaderCategory = document.getElementById(
  "detail-content-header-category"
);
const detailContentHeaderTitle = document.getElementById(
  "detail-content-header-title"
);
const detailContentHeaderTime = document.getElementById(
  "detail-content-header-time"
);
const detailContentThumbnail = document.getElementById(
  "detail-content-thumbnail"
);
const detailContentThumbnailDescription = document.getElementById(
  "detail-content-thumbnail-description"
);
const detailContentNews = document.getElementById("detail-content-news");

const commentSectionResultContainer = document.getElementById(
  "comment-section-result-container"
);

// Input
const commentNameInput = document.getElementById("comment-name-input");
const commentInput = document.getElementById("comment-input");
const submitCommentButton = document.getElementById("submit-comment-button");

let newsID = null;

const addComment = ({ name, comment, createdAt }) => {
  commentSectionResultContainer.innerHTML = `
  <div class="comment-card">
    <img class="comment-card-profile-image" width="40" height="40" />
    <div class="comment-card-info-container">
      <div class="comment-card-info">
      <p>${name}</p>
      <time datetime="${createdAt}">${getFormatDate(createdAt)}</time>
      </div>
      <p>${comment}</p>
    </div>
    </div>
    ${commentSectionResultContainer.innerHTML}
  `;
};

window.addEventListener("load", async () => {
  // Get Params
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const news = await getNewsBySlug(slug);

  newsID = news.id;
  // Get News Detail
  detailContentHeaderCategory.innerHTML = news.category.name;
  detailContentHeaderTitle.innerHTML = news.title;
  detailContentHeaderTime.innerHTML = getFormatDate(news.createdAt);
  detailContentThumbnail.src = news.thumbnail;
  detailContentThumbnailDescription.innerHTML = news.thumbnail_description;
  detailContentNews.innerHTML = news.content;

  // Set Comment
  news.comments.forEach((comment) => addComment(comment));

  // Stop Loading
  detailContentHeaderCategory.classList.remove("loading");
  detailContentHeaderTitle.classList.remove("loading");
  detailContentHeaderTime.classList.remove("loading");
  detailContentThumbnail.classList.remove("loading");
});

submitCommentButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const createdComment = await createComment({
    news_id: newsID,
    name: commentNameInput.value,
    comment: commentInput.value,
  });

  addComment({
    name: createdComment.name,
    comment: createdComment.comment,
    createdAt: createdComment.createdAt,
  });
  commentNameInput.value = "";
  commentInput.value = "";
});
