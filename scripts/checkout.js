import { products } from "../data/products.js";
import { cart, removeFromCart, cartQuantity, saveToStorage } from "../data/cart.js";
import { centsToDollars } from '../data/price.js';
import { renderSearchHTML, saveSearchValueToStorage } from "../data/searchData.js";

function renderCheckoutProductHTML() {
    let matchingProduct;
    let checkoutHTML = '';
    cart.forEach((item) => {
        products.forEach((product) => {
            if (item.productId === product.id) {
                matchingProduct = product;
                checkoutHTML += `
                 <div class="checkout-grid-item js-checkout-grid-item-${matchingProduct.id}">
                    <div class="checkout-item-img">
                        <img src="${matchingProduct.image}" alt="">
                    </div>
                    <div class="checkout-item-text">
                        <div class="checkout-item-name-price">
                            <p>${matchingProduct.name}</p>
                            <h4>$${centsToDollars(matchingProduct.priceCents)}</h4>
                        </div>
                        <div class="checkout-item-about">
                            <p>#1 Best Seller in Kitchen Kits</p>
                        </div>
                        <div class="checkout-item-checkout">
                            <input type="checkbox">
                            <p>This is a Gift</p>
                        </div>
                        <div class="checkout-item-color">
                            <p>color: white</p>
                        </div>
                        <div class="checkout-item-size">
                            <p>Size: medium</p>
                        </div>
                        <div class="checkout-item-quantity">
                            <div class="quantity-increments">
                                <i class="fa-solid fa-trash js-delete-link-icon" data-product-id="${matchingProduct.id}"></i>
                                <p class="checkout-cart-quantity js-checkout-cart-quantity-${matchingProduct.id}">${item.quantity}</p>
                                <i class="fa-solid fa-plus js-quantity-adding-icon" data-product-id="${matchingProduct.id}"></i>
                            </div>
                            <a class="js-delete-link-btn" data-product-id="${matchingProduct.id}">Delete</a>
                            <a>Save for Later</a>
                        </div>
                    </div>
                </div>
                `
            }
        })
    });
    document.querySelector('.js-checkout-cart-grid').innerHTML = checkoutHTML;
};
renderCheckoutProductHTML();


function checkoutItemQuantity() {
    let quantity = 0;
    let totalPrice = 0;
    let matchingProduct;
    let quantityHTML = '';
    let quantityTotalHTML = '';
    let placeOrderHTML = '';
    cart.forEach((item) => {
        quantity += item.quantity;
        products.forEach((product) => {
            if (item.productId === product.id) {
                matchingProduct = product;
                totalPrice += matchingProduct.priceCents * item.quantity;
            }
        })
    });
    quantityHTML = `
    <p>Checkout Items (${quantity})</p>
    `;
    quantityTotalHTML = `
    <p>Subtotal (${quantity} items):<h4>$ ${centsToDollars(totalPrice)}</h4></p>
    `;
    placeOrderHTML = `
    <p>Subtotal (${quantity} items):</p>
    <h4>$${centsToDollars(totalPrice)}</h4>
    `;
    document.querySelector('.js-checkout-navbar').innerHTML = quantityHTML;
    document.querySelector('.js-cart-grid-total').innerHTML = quantityTotalHTML;
    document.querySelector('.js-payment-summary-total').innerHTML = placeOrderHTML;
}
checkoutItemQuantity();


document.querySelectorAll('.js-delete-link-btn').forEach((link) => {
    link.addEventListener("click", () => {
        const { productId } = link.dataset;
        removeItemFromCart(productId);
    })
});


document.querySelectorAll('.js-delete-link-icon').forEach((link) => {
    link.addEventListener("click", () => {
        const { productId } = link.dataset;
        removeItemFromCart(productId);
    })
})


function removeItemFromCart(productId) {
    removeFromCart(productId);
    console.log(cart);
    const container = document.querySelector(`.js-checkout-grid-item-${productId}`);
    container.remove();
    checkoutItemQuantity();
    cartQuantity();
}

function cartQuantityIncreaser(productId) {
    cart.forEach((item) => {
        if (item.productId === productId) {
            item.quantity++;
            let quantity = item.quantity;
            document.querySelector(`.js-checkout-cart-quantity-${productId}`).innerHTML = quantity;
            saveToStorage();
            cartQuantity();
            checkoutItemQuantity();
        }
    })
}

document.querySelectorAll('.js-quantity-adding-icon').forEach((link) => {
    link.addEventListener("click", () => {
        const { productId } = link.dataset;
        cartQuantityIncreaser(productId);
    })
})

document.addEventListener("DOMContentLoaded", () => {
    cartQuantity();
});

const searchInput = document.querySelector('.product-search-input');

document.querySelector('.search-icon').addEventListener("click", () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    renderSearchHTML(searchValue);
    saveSearchValueToStorage(searchValue);
    window.location.href = "search.html";
});


searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const searchValue = searchInput.value.trim().toLowerCase();
        renderSearchHTML(searchValue);
        saveSearchValueToStorage(searchValue);
        window.location.href = "search.html";
    }
});