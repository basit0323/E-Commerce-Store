import { products } from './products.js';
import { centsToDollars } from './price.js';

const searchInput = document.querySelector('.product-search-input');

export function renderSearchHTML(searchValue) {

    let searchHTML = '';
    let searchCount = 0;

    function saveSearchCount() {
        localStorage.setItem("searchCount", searchCount.toString());
    }

    if (searchValue !== '') {

        const searchResult = products.filter((product) => {
            return (product.name.toLowerCase().includes(searchValue) || product.category.toLowerCase().includes(searchValue));
        });

        searchResult.forEach((product) => {
            searchCount++;
            saveSearchCount();
            searchHTML += `
              <div class="search-item">
                <div class="item-img">
                    <img src="${product.image}" alt="img">
                </div>
                <div class="item-name">
                    <h3>${product.name}</h3>
                </div>
                <div class="item-price">
                    <p>$${centsToDollars(product.priceCents)}</p>
                </div>
                <div class="item-properties">
                    <p>color: gray</p>
                    <p>size: medium</p>
                </div>
                <div class="item-ratings">
                    <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="png">
                    <p>${product.rating.count}</p>
                </div>
                <div class="item-add-to-cart-message">
                    <img src="images/icons/checkmark.png" alt="img">
                    <p>Added to Cart</p>
                </div>
                <div class="item-add-to-cart-btn">
                    <p>Add to Cart</p>
                </div>
            </div>
            `;
        });
        if (searchResult.length === 0) {
            saveSearchCount();
            searchHTML = `
          <div class="empty-search">
            <img src="images/icons/empty-search-icon.webp" alt="empty-icon-img">
            <p>No result found for search <h4>"${searchValue}"</h4></p>
          </div>
        `;
        }
    }
    else if (searchValue === '') {
        searchHTML = `
          <div class="empty-search">
            <img src="images/icons/empty-search-icon.webp" alt="empty-icon-img">
            <p>No result found for search <h4>"${searchValue === "" ? "null" : searchValue}"</h4></p>
          </div>
        `;
    }
    return searchHTML;
};

export function searchResultsCounter() {
    const countResult = localStorage.getItem("searchCount" || 0);
    const searchValue = localStorage.getItem('searchValue' || '');
    const resultHTML = `
       <p>Total search results ${countResult} for <h4>"${searchInput.value === "" ? "null" : searchValue}"</h4></p>
    `;
    document.querySelector('.search-result-counter').innerHTML = resultHTML;
}

export function saveSearchValueToStorage(searchValue) {
    localStorage.setItem("searchValue", searchValue);
}