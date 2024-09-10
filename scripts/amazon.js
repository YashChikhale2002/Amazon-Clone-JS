import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = "";
  const timeouts = {}; // To store timeout references for each product

  products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-select" data-product-id="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart" data-product-id="${
            product.id
          }" style="opacity: 0; visibility: hidden;">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
    `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML =
      cartQuantity > 0 ? cartQuantity : "";
  }

  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const quantity = parseInt(
        document.querySelector(
          `.js-quantity-select[data-product-id="${productId}"]`
        ).value
      );
      addToCart(productId, quantity);
      updateCartQuantity();

      const addedMessage = document.querySelector(
        `.js-added-to-cart[data-product-id="${productId}"]`
      );

      addedMessage.style.opacity = 1;
      addedMessage.style.visibility = "visible";

      if (timeouts[productId]) {
        clearTimeout(timeouts[productId]);
      }

      timeouts[productId] = setTimeout(() => {
        addedMessage.style.opacity = 0;
        addedMessage.style.visibility = "hidden";
      }, 2000);
    });
  });

  updateCartQuantity();
}
