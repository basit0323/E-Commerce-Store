import { cartQuantity } from '../data/cart.js';
import { renderSearchHTML, searchResultsCounter, saveSearchValueToStorage } from '../data/searchData.js';


document.querySelector('.search-icon').addEventListener("click", () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    const searchValue2 = localStorage.getItem("searchValue");
    console.log(`${searchValue} ${searchValue2}`);
    saveSearchValueToStorage(searchValue);
    if (searchValue !== searchValue2) {
        const searchHTML = renderSearchHTML(searchValue);
        document.querySelector('.js-result-items').innerHTML = searchHTML;
    }
    searchResultsCounter();
});


const searchInput = document.querySelector('.product-search-input');

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const searchValue = searchInput.value;
        const searchValue2 = localStorage.getItem("searchValue");
        saveSearchValueToStorage(searchValue);
        if (searchValue !== searchValue2) {
            const searchHTML = renderSearchHTML(searchValue);
            document.querySelector('.js-result-items').innerHTML = searchHTML;
        }
        searchResultsCounter();
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const searchValue = localStorage.getItem('searchValue' || '');
    searchInput.value = searchValue;
    const searchHTML = renderSearchHTML(searchValue);
    saveSearchValueToStorage(searchValue);
    searchResultsCounter();
    document.querySelector('.js-result-items').innerHTML = searchHTML;
    cartQuantity();
});