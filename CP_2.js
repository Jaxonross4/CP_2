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

function displayProducts(products) {
  if (!Array.isArray(products)) return;

  // clear previous
  container.innerHTML = "";

  // first 5 only
  products.slice(0, 5).forEach((p) => {
    const name = p?.fields?.name || "No name";
    const priceCents = p?.fields?.price ?? 0; // cents
    const price = "$" + (priceCents / 100).toFixed(2);
    const imgSrc = p?.fields?.image?.[0]?.url || "";
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${imgSrc}" alt="${escapeHtml(name)}">
      <div class="name">${escapeHtml(name)}</div>
      <div class="price">${price}</div>
    `;
    container.appendChild(card);
  });
}

// simple escape for safety
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

