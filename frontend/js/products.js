const API_URL = "http://localhost:5000/api/products";

const productsContainer =
  document.getElementById("productsContainer");

const productImages = {
  "iPhone 15":
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000",

  "MacBook Air":
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1000",

  "AirPods Pro":
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1000"
};

async function fetchProducts() {

  try {

    const res = await fetch(API_URL);

    const products = await res.json();

    productsContainer.innerHTML = "";

    products.forEach((product) => {

      const image =
        productImages[product.name] ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";

      const card = document.createElement("div");

      card.classList.add("product-card");

      card.innerHTML = `

        <div class="sale-badge">
          SALE
        </div>

        <img
          src="${image}"
          class="product-image"
        />

        <div class="product-info">

          <h3 class="product-title">
            ${product.name}
          </h3>

          <p class="product-rating">
            ⭐ 4.8
          </p>

          <p class="product-price">
            ₹${product.price}
          </p>

          <p class="product-description">
            ${product.description}
          </p>

          <button
            class="add-cart-btn"
          >
            Add To Cart
          </button>

        </div>

      `;

      const button =
        card.querySelector(".add-cart-btn");

      button.addEventListener("click", () => {
        addToCart(product);
      });

      productsContainer.appendChild(card);

    });

  } catch (error) {
    console.log(error);
  }

}

function addToCart(product) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert(`${product.name} added to cart`);
}

fetchProducts();