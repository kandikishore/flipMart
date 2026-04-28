const CART_KEY = "chorBazaarCart";
const CATEGORY_META = window.CATEGORY_META || {};
const PRODUCTS = window.PRODUCTS || [];

const pageType = document.body.dataset.page || "home";
const activeCategory = document.body.dataset.category || "home";

const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const menuToggle = document.getElementById("menuToggle");
const navPanel = document.getElementById("navPanel");

let toastTimer;

const state = {
    search: "",
    sort: "featured",
    price: "all",
    rating: "all"
};

document.addEventListener("DOMContentLoaded", () => {
    // Shared setup keeps all pages consistent without duplicating logic.
    initNavigation();
    updateCartCount();
    initGlobalSearch();
    initPage();
    initDocumentActions();
});

function initNavigation() {
    if (menuToggle && navPanel) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navPanel.classList.toggle("open");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 820) {
                navPanel.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    document.querySelectorAll("[data-nav]").forEach((element) => {
        const key = element.dataset.nav;
        const isHome = pageType === "home" && key === "home";
        const isCategory = key === activeCategory;
        if (isHome || isCategory) {
            element.classList.add("active");
        }
    });
}

function initGlobalSearch() {
    if (!searchInput || !searchForm) {
        return;
    }

    searchInput.addEventListener("input", (event) => {
        state.search = event.target.value.trim().toLowerCase();
        renderCurrentPage();
    });

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        state.search = searchInput.value.trim().toLowerCase();
        renderCurrentPage();
    });
}

function initPage() {
    if (pageType === "home") {
        renderHomePage();
        return;
    }

    if (pageType === "category") {
        initCategoryControls();
        renderCategoryHero();
        renderCategoryPage(true);
        return;
    }

    if (pageType === "cart") {
        renderCartPage();
    }
}

function initCategoryControls() {
    const sortSelect = document.getElementById("sortSelect");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");

    if (sortSelect) {
        sortSelect.addEventListener("change", (event) => {
            state.sort = event.target.value;
            renderCategoryPage();
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener("change", (event) => {
            state.price = event.target.value;
            renderCategoryPage();
        });
    }

    if (ratingFilter) {
        ratingFilter.addEventListener("change", (event) => {
            state.rating = event.target.value;
            renderCategoryPage();
        });
    }
}

function initDocumentActions() {
    document.addEventListener("click", (event) => {
        const addButton = event.target.closest(".add-to-cart");
        if (addButton) {
            addToCart(addButton.dataset.productId);
            return;
        }

        const quantityButton = event.target.closest(".quantity-button");
        if (quantityButton) {
            const delta = Number(quantityButton.dataset.delta);
            updateQuantity(quantityButton.dataset.productId, delta);
            return;
        }

        const removeButton = event.target.closest(".remove-button");
        if (removeButton) {
            removeFromCart(removeButton.dataset.productId);
        }
    });
}

function renderCurrentPage() {
    if (pageType === "home") {
        renderHomePage();
    } else if (pageType === "category") {
        renderCategoryPage();
    } else if (pageType === "cart") {
        renderCartPage();
    }
}

function renderHomePage() {
    const featuredElectronics = document.getElementById("featuredElectronics");
    const featuredLifestyle = document.getElementById("featuredLifestyle");

    if (!featuredElectronics || !featuredLifestyle) {
        return;
    }

    const electronicsProducts = PRODUCTS
        .filter((product) => ["electronics", "mobiles", "appliances"].includes(product.category))
        .filter((product) => matchesSearch(product, state.search))
        .slice(0, 8);

    const lifestyleProducts = PRODUCTS
        .filter((product) => ["minutes", "grocery", "fashion"].includes(product.category))
        .filter((product) => matchesSearch(product, state.search))
        .slice(0, 8);

    renderProductGrid(featuredElectronics, electronicsProducts, "No electronics matched your search.");
    renderProductGrid(featuredLifestyle, lifestyleProducts, "No lifestyle products matched your search.");
}

function renderCategoryHero() {
    const hero = document.getElementById("categoryHero");
    const meta = CATEGORY_META[activeCategory];

    if (!hero || !meta) {
        return;
    }

    hero.innerHTML = `
        <div class="hero-copy">
            <span class="hero-tag">${meta.tag}</span>
            <h2>${meta.title}</h2>
            <p>${meta.description}</p>
            <div class="hero-stats">
                <span class="stat-pill">${getCategoryProducts(activeCategory).length} products</span>
                <span class="stat-pill">Live search and filters</span>
                <span class="stat-pill">Cart synced across pages</span>
            </div>
        </div>
        <a class="cta-button" href="cart.html">Go to Cart</a>
    `;
}

function renderCategoryPage(showLoading = false) {
    const grid = document.getElementById("productGrid");
    const title = document.getElementById("catalogTitle");
    const resultsMeta = document.getElementById("resultsMeta");
    const meta = CATEGORY_META[activeCategory];

    if (!grid || !meta) {
        return;
    }

    if (title) {
        title.textContent = meta.title;
    }

    const allProducts = getCategoryProducts(activeCategory);
    const filteredProducts = applyCatalogFilters(allProducts);

    if (resultsMeta) {
        resultsMeta.textContent = `Showing ${filteredProducts.length} of ${allProducts.length} products`;
    }

    if (showLoading) {
        // A short skeleton state adds a subtle loading effect on catalog pages.
        renderSkeletons(grid, 8);
        window.setTimeout(() => {
            renderProductGrid(grid, filteredProducts, "No products matched your filters.");
        }, 180);
        return;
    }

    renderProductGrid(grid, filteredProducts, "No products matched your filters.");
}

function applyCatalogFilters(products) {
    let filtered = products.filter((product) => matchesSearch(product, state.search));

    if (state.price !== "all") {
        filtered = filtered.filter((product) => matchesPriceRange(product.price, state.price));
    }

    if (state.rating !== "all") {
        filtered = filtered.filter((product) => product.rating >= Number(state.rating));
    }

    if (state.sort === "price-asc") {
        filtered.sort((first, second) => first.price - second.price);
    } else if (state.sort === "price-desc") {
        filtered.sort((first, second) => second.price - first.price);
    } else if (state.sort === "rating-desc") {
        filtered.sort((first, second) => second.rating - first.rating);
    }

    return filtered;
}

function renderProductGrid(container, products, emptyMessage) {
    if (!products.length) {
        container.innerHTML = createEmptyState("Nothing found", emptyMessage);
        return;
    }

    container.innerHTML = products.map((product) => createProductCard(product)).join("");
}

function renderSkeletons(container, count) {
    container.innerHTML = Array.from({ length: count }, () => "<div class=\"skeleton-card\"></div>").join("");
}

function createProductCard(product) {
    return `
        <article class="product-card">
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-meta">
                <p class="product-price">${formatPrice(product.price)}</p>
                <span class="rating-badge">&#9733; ${product.rating.toFixed(1)}</span>
            </div>
            <p class="product-note">${CATEGORY_META[product.category].shortNote}</p>
            <button class="add-to-cart" type="button" data-product-id="${product.id}">Add to Cart</button>
        </article>
    `;
}

function renderCartPage() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartMeta = document.getElementById("cartMeta");
    const summaryItems = document.getElementById("summaryItems");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryTotal = document.getElementById("summaryTotal");

    if (!cartItemsContainer) {
        return;
    }

    const cart = getCart();
    const detailedItems = cart
        .map((entry) => {
            const product = PRODUCTS.find((item) => item.id === entry.id);
            if (!product) {
                return null;
            }

            return {
                ...product,
                quantity: entry.quantity
            };
        })
        .filter(Boolean);

    const filteredItems = detailedItems.filter((product) => matchesSearch(product, state.search));
    const totalQuantity = detailedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = detailedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    if (cartMeta) {
        cartMeta.textContent = detailedItems.length
            ? `Showing ${filteredItems.length} of ${detailedItems.length} cart items`
            : "Your cart is currently empty.";
    }

    if (summaryItems) {
        summaryItems.textContent = String(detailedItems.length);
    }

    if (summaryQuantity) {
        summaryQuantity.textContent = String(totalQuantity);
    }

    if (summaryTotal) {
        summaryTotal.textContent = formatPrice(totalPrice);
    }

    if (!detailedItems.length) {
        cartItemsContainer.innerHTML = createEmptyState(
            "Your cart is empty",
            "Add products from the home or category pages to see them here."
        );
        return;
    }

    if (!filteredItems.length) {
        cartItemsContainer.innerHTML = createEmptyState(
            "No cart items found",
            "Try a different search term or continue shopping."
        );
        return;
    }

    cartItemsContainer.innerHTML = filteredItems.map((item) => createCartItem(item)).join("");
}

function createCartItem(product) {
    return `
        <article class="cart-item">
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div>
                <h3 class="cart-item-title">${product.name}</h3>
                <p class="cart-item-price">${formatPrice(product.price)}</p>
                <p class="cart-item-note">${CATEGORY_META[product.category].title}</p>
                <span class="rating-badge">&#9733; ${product.rating.toFixed(1)}</span>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-button" type="button" data-product-id="${product.id}" data-delta="-1">-</button>
                    <span class="quantity-value">${product.quantity}</span>
                    <button class="quantity-button" type="button" data-product-id="${product.id}" data-delta="1">+</button>
                </div>
                <strong>${formatPrice(product.price * product.quantity)}</strong>
                <button class="remove-button" type="button" data-product-id="${product.id}">Remove</button>
            </div>
        </article>
    `;
}

function createEmptyState(title, message) {
    return `
        <div class="empty-state">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
}

function getCategoryProducts(category) {
    return PRODUCTS.filter((product) => product.category === category);
}

function matchesSearch(product, query) {
    if (!query) {
        return true;
    }

    return product.name.toLowerCase().includes(query);
}

function matchesPriceRange(price, range) {
    if (range === "0-500") {
        return price <= 500;
    }

    if (range === "501-1000") {
        return price >= 501 && price <= 1000;
    }

    if (range === "1001-5000") {
        return price >= 1001 && price <= 5000;
    }

    if (range === "5001-plus") {
        return price >= 5001;
    }

    return true;
}

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const existingItem = cart.find((item) => item.id === productId);
    const product = PRODUCTS.find((item) => item.id === productId);

    if (!product) {
        return;
    }

    if (existingItem) {
        // Duplicates increase quantity instead of creating repeated entries.
        existingItem.quantity += 1;
        showToast(`${product.name} quantity updated in cart`);
    } else {
        cart.push({ id: productId, quantity: 1 });
        showToast(`${product.name} added to cart`);
    }

    saveCart(cart);
    updateCartCount();

    if (pageType === "cart") {
        renderCartPage();
    }
}

function updateQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find((entry) => entry.id === productId);

    if (!item) {
        return;
    }

    item.quantity += delta;

    if (item.quantity <= 0) {
        const nextCart = cart.filter((entry) => entry.id !== productId);
        saveCart(nextCart);
        showToast("Item removed from cart");
    } else {
        saveCart(cart);
    }

    updateCartCount();
    renderCartPage();
}

function removeFromCart(productId) {
    const nextCart = getCart().filter((item) => item.id !== productId);
    saveCart(nextCart);
    updateCartCount();
    renderCartPage();
    showToast("Item removed from cart");
}

function updateCartCount() {
    if (!cartCount) {
        return;
    }

    const totalQuantity = getCart().reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = String(totalQuantity);
}

function showToast(message) {
    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function formatPrice(value) {
    return `Rs ${value.toLocaleString("en-IN")}`;
}
