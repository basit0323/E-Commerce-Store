export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart = [
        {
            productId: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
            quantity: 2
        }, {
            productId: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
            quantity: 2
        }
    ];
}


export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
saveToStorage();


export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((item) => {
        if (item.productId !== productId) {
            newCart.push(item);
        }
    });
    cart = newCart;
    saveToStorage();
    return cart;
};


export function cartQuantity() {
    let cartQuantity = document.querySelector('.js-cart-count-number');
    let quantity = 0;
    cart.forEach((item) => {
        quantity += item.quantity;
    })
    cartQuantity.innerHTML = quantity;
}

document.addEventListener("DOMContentLoaded", () => {
    cartQuantity();
})