const sideBar = document.querySelector('.js-responsive-nav');

document.querySelector('.js-hamburger').addEventListener("click", () => {
    sideBar.classList.add('active');
});

document.querySelector('.exit-option').addEventListener("click", () => {
    sideBar.classList.remove('active');
})