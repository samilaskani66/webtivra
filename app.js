const filterButtons = [...document.querySelectorAll(".filter-button")];
const templateCards = [...document.querySelectorAll(".template-card")];
const searchInput = document.querySelector("#template-search");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");

let activeCategory = "all";

function updateTemplates() {
	const searchTerm = searchInput.value.trim().toLowerCase();
	let visibleCount = 0;

	templateCards.forEach((card) => {
		const categoryMatches = activeCategory === "all" || card.dataset.category === activeCategory;
		const searchMatches = `${card.dataset.name} ${card.textContent}`.toLowerCase().includes(searchTerm);
		const isVisible = categoryMatches && searchMatches;
		card.hidden = !isVisible;
		if (isVisible) visibleCount += 1;
	});

	resultsCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "template" : "templates"}`;
	emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		activeCategory = button.dataset.filter;
		filterButtons.forEach((item) => {
			const isActive = item === button;
			item.classList.toggle("active", isActive);
			item.setAttribute("aria-pressed", String(isActive));
		});
		updateTemplates();
	});
});

searchInput.addEventListener("input", updateTemplates);

document.addEventListener("keydown", (event) => {
	if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
		event.preventDefault();
		searchInput.focus();
	}
});

const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeMenu() {
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Open navigation menu");
	primaryNav.classList.remove("open");
	document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
	const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
	primaryNav.classList.toggle("open", isOpen);
	document.body.classList.toggle("menu-open", isOpen);
});

primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") closeMenu();
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

document.querySelector("#contact-form").addEventListener("submit", (event) => {
	event.preventDefault();
	const form = event.currentTarget;
	if (!form.reportValidity()) return;

	const name = form.elements.name.value.trim();
	const email = form.elements.email.value.trim();
	const message = form.elements.message.value.trim();
	const subject = encodeURIComponent(`Webtivra inquiry from ${name}`);
	const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
	window.location.href = `mailto:hello@webtivra.com?subject=${subject}&body=${body}`;
});
