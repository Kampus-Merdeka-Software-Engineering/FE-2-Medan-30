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

// Saved News ID
let newsID = null;

// Add Comment to DOM
const addComment = ({ name, comment, createdAt }) => {
  commentSectionResultContainer.innerHTML = `
  <div class="comment-card">
    <img class="comment-card-profile-image" width="40" height="40" />
    <div class="comment-card-info-container">
      <div class="comment-card-info">
      <p>${name || "Anonymous"}</p>
      <time datetime="${createdAt}">${getFormatDate(createdAt)}</time>
      </div>
      <p>${comment}</p>
    </div>
    </div>
    ${commentSectionResultContainer.innerHTML}
  `;
};

// On Load
window.addEventListener("load", async () => {
  // Get Params
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const news = await getNewsBySlug(slug);

  console.log(news);

  if (news) {
    newsID = news.id;
    // Set Page Title
    document.title = `${news.title} - Medan 30 News`;
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
  }
});

// Submit Comment to Server
submitCommentButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!commentNameInput.value) {
    commentNameInput.classList.add("error");
  } else {
    commentNameInput.classList.remove("error");
  }

  if (!commentInput.value) {
    commentInput.classList.add("error");
  } else {
    commentInput.classList.remove("error");
  }

  if (commentInput.value && commentNameInput.value) {
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
  }
});
