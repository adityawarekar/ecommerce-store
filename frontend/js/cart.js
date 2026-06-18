const cartContainer =
  document.getElementById("cartContainer");

const totalPriceElement =
  document.getElementById("totalPrice");

let cart =
  JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {

  cartContainer.innerHTML = "";

  let total = 0;

  if(cart.length === 0){

    cartContainer.innerHTML = `
      <h2>Your Cart Is Empty</h2>
    `;

    totalPriceElement.innerText =
      "Total: ₹0";

    return;
  }

  cart.forEach((product,index)=>{

    total += Number(product.price);

    const item = document.createElement("div");

    item.classList.add("cart-item");

    item.innerHTML = `

      <div>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <h4>₹${product.price}</h4>

      </div>

      <button
        class="remove-btn"
        onclick="removeItem(${index})"
      >
        Remove
      </button>

    `;

    cartContainer.appendChild(item);

  });

  totalPriceElement.innerText =
    `Total: ₹${total}`;

}

function removeItem(index){

  cart.splice(index,1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  renderCart();

}

renderCart();