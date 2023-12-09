const ENDPOINT_URL = "https://be-2-medan-30-production.up.railway.app";

// Get Homepage Data
const getHomepage = (category_id) => {
  let endpoint = `${ENDPOINT_URL}/homepage`;

  if (category_id) {
    endpoint = endpoint + `?category_id=${category_id}`;
  }

  return fetch(endpoint)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .catch(async (err) => {
      const error = await err;
      showErrorToast({
        title: "Get Homepage Error",
        description: `${error.errorCode}: ${error.error} `,
      });
    });
};

// Get News Data
const getNews = (category_id, limit) => {
  let endpoint = `${ENDPOINT_URL}/news`;

  if (category_id || limit) {
    endpoint = endpoint + `?category_id=${category_id}&limit=${limit}`;
  }

  return fetch(endpoint)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .catch(async (err) => {
      const error = await err;
      showErrorToast({
        title: "Get News Error",
        description: `${error.errorCode}: ${error.error}`,
      });
    });
};

// Get News By Slug Data
const getNewsBySlug = async (slug) => {
  return fetch(`${ENDPOINT_URL}/news/slug/${slug}`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .catch(async (err) => {
      const error = await err;
      showErrorToast({
        title: "Get News Error",
        description: `${error.errorCode}: ${error.error}`,
      });
    });
};

// Get News By Search
const getSearch = (keyword) => {
  let endpoint = `${ENDPOINT_URL}/news/search?keyword=${keyword}`;

  return fetch(endpoint)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .catch(async (err) => {
      const error = await err;
      showErrorToast({
        title: "Get News Error",
        description: `${error.errorCode}: ${error.error}`,
      });
    });
};

// Get Categories
const getCategories = () => {
  return fetch(`${ENDPOINT_URL}/categories`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .catch(async (err) => {
      const error = await err;
      showErrorToast({
        title: "Get Categories Error",
        description: `${error.errorCode}: ${error.error}`,
      });
    });
};

// Create Comment
const createComment = ({ news_id, name, comment }) => {
  return fetch(`${ENDPOINT_URL}/comments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ news_id, name, comment }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .catch(async (err) => {
      const error = await err;
      showErrorToast({
        title: "Create Comment Error",
        description: `${error.errorCode}: ${error.error}`,
      });
    });
};
