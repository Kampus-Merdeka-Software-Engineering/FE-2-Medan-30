const ENDPOINT_URL = "https://be-2-medan-30-production.up.railway.app";

const getHomepage = (category_id) => {
  let endpoint = `${ENDPOINT_URL}/homepage`;

  if (category_id) {
    endpoint = endpoint + `?category_id=${category_id}`;
  }

  return fetch(endpoint)
    .then((res) => res.json())
    .catch((error) => console.error(`Error: ${error}`));
};

const getNews = (category_id, limit) => {
  let endpoint = `${ENDPOINT_URL}/news`;

  if (category_id || limit) {
    endpoint = endpoint + `?category_id=${category_id}&limit=${limit}`;
  }

  return fetch(endpoint)
    .then((res) => res.json())
    .catch((error) => console.error(`Error: ${error}`));
};

const getNewsBySlug = (slug) => {
  return fetch(`${ENDPOINT_URL}/news/slug/${slug}`)
    .then((res) => res.json())
    .catch((error) => console.error(`Error: ${error}`));
};

const getSearch = (keyword) => {
  let endpoint = `${ENDPOINT_URL}/news/search?keyword=${keyword}`;

  return fetch(endpoint)
    .then((res) => res.json())
    .catch((error) => console.error(`Error: ${error}`));
};

const getCategories = () => {
  return fetch(`${ENDPOINT_URL}/categories`)
    .then((res) => res.json())
    .catch((error) => console.error(`Error: ${error}`));
};

const createComment = ({ news_id, name, comment }) => {
  return fetch(`${ENDPOINT_URL}/comments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ news_id, name, comment }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(`Error: ${error}`));
};
