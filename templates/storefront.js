const cartCount = document.querySelector("#store-cart-count");
const statusMessage = document.querySelector("#store-status");
let cartItems = 0;
let statusTimeout;

document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
	button.addEventListener("click", () => {
		cartItems += 1;
		cartCount.textContent = String(cartItems);
		statusMessage.textContent = `${button.dataset.addToCart} added to your bag`;
		statusMessage.classList.add("visible");
		window.clearTimeout(statusTimeout);
		statusTimeout = window.setTimeout(() => statusMessage.classList.remove("visible"), 2200);
	});
});

document.querySelector("#store-year").textContent = String(new Date().getFullYear());
