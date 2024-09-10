import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCart, cart } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";
import { calculateCartQuantity } from "../data/cart.js";

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

async function loadPage() {
  try {
    await loadProductsFetch();
    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });

    updateCartQuantity();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log("Unexpected Error. Please Try Again Later.");
  }
}

loadPage();
