const API_URL = "https://www.course-api.com/javascript-store-products";
const container = document.getElementById("product-container");

function fetchProductsThen() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      // log each product name
      data.forEach((p) => {
        // API shape: p.fields.name (common for this endpoint)
        const name = p?.fields?.name || "unknown";
        console.log(name);
      });
    })
    .catch((err) => {
      console.error("then-fetch failed:", err.message);
    });
}

function handleError(error) {
  console.error("An error occurred:", error?.message || error);
}

async function fetchProductsAsync() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    displayProducts(data);
  } catch (err) {
    handleError(err);
  }
}

