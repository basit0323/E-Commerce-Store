import { products } from '../data/products.js';
import { centsToDollars } from '../data/price.js';
import { gridProducts } from '../data/grid-products.js';
import { cart, saveToStorage, cartQuantity } from '../data/cart.js';
import { renderSearchHTML, saveSearchValueToStorage } from '../data/searchData.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';


const navbar = document.querySelector('.js-navbar');
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0 || currentScroll < lastScroll) {
        navbar.classList.remove('nav-hidden');
    }

    else if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('nav-hidden');
    }

    lastScroll = currentScroll;
})


let swiper = new Swiper(".mySwiper", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


let navButton = document.querySelector('.filter-btn');
let filterOptions = document.getElementById('product-options');
let filterBtnText = document.querySelector('.filter-btn-text');

navButton.addEventListener("click", () => {
    filterOptions.style.visibility = "visible";
});

function renderHomeProductsHTML() {
    function renderProdutsHTML(product, productsHTML) {
        productsHTML += `
         <div class="product">
            <div class="product-name">
                <h3>${product.name}</h3>
            </div>
            <div class="product-img">
                <img src="${product.image}" alt="img">
            </div>
            <div class="product-price">
                <p>Price : $${centsToDollars(product.priceCents)}</p>
            </div>
            <div class="add-to-cart-message" id="js-add-to-cart-message-${product.id}">
                <img src="images/icons/checkmark.png" alt="img">
                <p>Added to Cart</p>
            </div>
            <div class="add-to-cart-btn" data-product-id="${product.id}">
                <p>Add to Cart</p>
            </div>
        </div> `;
        return productsHTML;
    };


    function renderHomeProducts() {
        let productsHTML = '';
        products.forEach((product) => {
            productsHTML = renderProdutsHTML(product, productsHTML);
        });
        document.querySelector('.products-grid').innerHTML = productsHTML;
        renderButtonEvents();
    }
    renderHomeProducts();


    let productAll = document.querySelector('.product-all');
    productAll.addEventListener("click", () => {
        filterBtnText.innerHTML = productAll.innerHTML;
        filterOptions.style.visibility = "hidden";
        let productsAllHTML = '';
        products.forEach((product) => {
            productsAllHTML = renderProdutsHTML(product, productsAllHTML);
        });
        document.querySelector('.products-grid').innerHTML = productsAllHTML;
        renderButtonEvents();
    });


    let productWearing = document.querySelector('.product-wearing');
    productWearing.addEventListener("click", () => {
        filterBtnText.innerHTML = productWearing.innerHTML;
        filterOptions.style.visibility = "hidden";
        let wearingHTML = '';
        products.forEach((product) => {
            if (product.category === 'wearing') {
                wearingHTML = renderProdutsHTML(product, wearingHTML);
            }
        });
        document.querySelector('.products-grid').innerHTML = wearingHTML;
        renderButtonEvents();
    });


    let productDecoration = document.querySelector('.product-decoration');
    productDecoration.addEventListener("click", () => {
        filterBtnText.innerHTML = productDecoration.innerHTML;
        filterOptions.style.visibility = "hidden";
        let decorationHTML = '';
        products.forEach((product) => {
            if (product.category === 'decoration') {
                decorationHTML = renderProdutsHTML(product, decorationHTML)
            }
        });
        document.querySelector('.products-grid').innerHTML = decorationHTML;
        renderButtonEvents();
    });


    let productKitchen = document.querySelector('.product-kitchen');
    productKitchen.addEventListener("click", () => {
        filterBtnText.innerHTML = productKitchen.innerHTML;
        filterOptions.style.visibility = "hidden";
        let kitchenHTML = '';
        products.forEach((product) => {
            if (product.category === 'kitchen') {
                kitchenHTML = renderProdutsHTML(product, kitchenHTML);
            }
        });
        document.querySelector('.products-grid').innerHTML = kitchenHTML;
        renderButtonEvents();
    });


    let productSport = document.querySelector('.product-sport');
    productSport.addEventListener("click", () => {
        filterBtnText.innerHTML = productSport.innerHTML;
        filterOptions.style.visibility = "hidden";
        let sportHTML = '';
        products.forEach((product) => {
            if (product.category === 'sports') {
                sportHTML = renderProdutsHTML(product, sportHTML)
            }
        });
        document.querySelector('.products-grid').innerHTML = sportHTML;
        renderButtonEvents();
    });


    let productOther = document.querySelector('.product-other');
    productOther.addEventListener("click", () => {
        filterBtnText.innerHTML = productOther.innerHTML;
        filterOptions.style.visibility = "hidden";
        let otherHTML = '';
        products.forEach((product) => {
            if (product.category === 'others') {
                otherHTML = renderProdutsHTML(product, otherHTML);
            }
        });
        document.querySelector('.products-grid').innerHTML = otherHTML;
        renderButtonEvents();
    });
}
renderHomeProductsHTML();


function renderGridProducts() {
    let gridProductsHTML = '';
    gridProducts.forEach((product) => {
        gridProductsHTML += `
         <div class="grid-product-item">
                <h4>${product.name}</h4>
                <div class="images-grid">
                    <div class="image-grid-box">
                        <img src="${product.images.image1}" alt="">
                        <p>${product.images.image1Name}</p>
                    </div>
                    <div class="image-grid-box">
                        <img src="${product.images.image2}" alt="">
                        <p>${product.images.image2Name}</p>
                    </div>
                    <div class="image-grid-box">
                        <img src="${product.images.image3}" alt="">
                        <p>${product.images.image3Name}</p>
                    </div>
                    <div class="image-grid-box">
                        <img src="${product.images.image4}" alt="">
                        <p>${product.images.image4Name}</p>
                    </div>
                </div>
                <a href="#">${product.btnLink}</a>
            </div>
        `
    });
    document.querySelector('.grid-products').innerHTML = gridProductsHTML;
}
renderGridProducts();


function renderButtonEvents() {
    document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
        btn.addEventListener("click", () => {
            const { productId } = btn.dataset;
            const cartMessage = document.getElementById(`js-add-to-cart-message-${productId}`);
            const intervalId = setInterval(() => {
                cartMessage.style.visibility = "visible";
            }, 200);
            setInterval(() => {
                clearInterval(intervalId);
                cartMessage.style.visibility = "hidden";
            }, 1500);
            const cartItem = {
                productId,
                quantity: 1
            };
            let matchingProduct;
            cart.forEach((item) => {
                if (cartItem.productId === item.productId) {
                    matchingProduct = item;
                }
            });
            if (matchingProduct) {
                matchingProduct.quantity += cartItem.quantity;
            }
            else {
                cart.push(cartItem);
            }
            saveToStorage();
            cartQuantity();
        });
    });
}


document.querySelector(".back-to-top").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


const searchInput = document.querySelector('.product-search-input');

document.querySelector('.search-icon').addEventListener("click", () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    console.log(searchValue);
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