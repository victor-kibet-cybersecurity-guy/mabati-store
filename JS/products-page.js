(() => {
  const PRODUCTS_PER_PAGE = 12;

  const state = {
    products: [],
    filteredProducts: [],
    visibleCount: PRODUCTS_PER_PAGE,
    search: "",
    category: "all",
    gauges: new Set(),
    colours: new Set(),
    stockStatuses: new Set(),
    specialFilters: new Set(),
    sort: "featured"
  };

  const comparisonIds = new Set();

  const selectors = {
    grid: "#products-grid",
    resultsCount: "#product-results-count",
    emptyState: "#products-empty-state",
    loadMoreContainer: "#load-more-container",
    loadMoreButton: "#load-more-products",
    search: "#product-search",
    sort: "#product-sort",
    filterSidebar: "#filter-sidebar",
    filterToggle: "#filter-toggle",
    clearFilters: "#clear-filters",
    resetSearch: "#reset-product-search",
    activeFilterSummary: "#active-filter-summary",
    categoryTabs: "[data-category-filter]"
  };

  function select(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function selectAll(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  function toNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatMoney(amount) {
    if (typeof window.formatKSh === "function") {
      return window.formatKSh(toNumber(amount));
    }

    return `KSh ${Math.round(toNumber(amount)).toLocaleString("en-KE")}`;
  }

  function getDiscount(product) {
    if (typeof window.getDiscountPercentage === "function") {
      return window.getDiscountPercentage(product);
    }

    if (
      !product.oldPrice ||
      toNumber(product.oldPrice) <= toNumber(product.price)
    ) {
      return 0;
    }

    return Math.round(
      ((toNumber(product.oldPrice) - toNumber(product.price)) /
        toNumber(product.oldPrice)) *
        100
    );
  }

  function normalize(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function getProductGauges(product) {
    const gauges = [];

    if (product.defaultGauge && product.defaultGauge !== "N/A") {
      gauges.push(String(product.defaultGauge));
    }

    if (Array.isArray(product.gauge)) {
      gauges.push(
        ...product.gauge
          .filter((gauge) => gauge !== "N/A")
          .map(String)
      );
    }

    return [...new Set(gauges)];
  }

  function getProductColours(product) {
    return Array.isArray(product.colours)
      ? product.colours.map(String)
      : [];
  }

  function getSearchText(product) {
    return [
      product.name,
      product.category,
      product.categoryName,
      product.subcategory,
      product.description,
      product.finish,
      product.stockStatus,
      product.priceUnit,
      ...getProductGauges(product),
      ...getProductColours(product),
      ...(Array.isArray(product.tags) ? product.tags : [])
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function readURLFilters() {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");
    const search = params.get("search");

    if (category) {
      state.category = category;
    }

    if (search) {
      state.search = search;

      const searchInput = select(selectors.search);

      if (searchInput) {
        searchInput.value = search;
      }
    }
  }

  function matchesCategory(product) {
    if (state.category === "all") {
      return true;
    }

    return normalize(product.category) === normalize(state.category);
  }

  function matchesSearch(product) {
    if (!state.search) {
      return true;
    }

    return getSearchText(product).includes(normalize(state.search));
  }

  function matchesGauge(product) {
    if (state.gauges.size === 0) {
      return true;
    }

    const productGauges = getProductGauges(product);

    return [...state.gauges].some((gauge) =>
      productGauges.includes(String(gauge))
    );
  }

  function matchesColour(product) {
    if (state.colours.size === 0) {
      return true;
    }

    const colours = getProductColours(product).map(normalize);

    return [...state.colours].some((colour) =>
      colours.includes(normalize(colour))
    );
  }

  function matchesStock(product) {
    if (state.stockStatuses.size === 0) {
      return true;
    }

    return state.stockStatuses.has(String(product.stockStatus || ""));
  }

  function matchesSpecial(product) {
    if (state.specialFilters.size === 0) {
      return true;
    }

    return [...state.specialFilters].every((filter) => {
      if (filter === "featured") {
        return Boolean(product.featured);
      }

      if (filter === "sale") {
        return Boolean(product.onSale) || getDiscount(product) > 0;
      }

      if (filter === "freeDelivery") {
        return product.freeDelivery !== false;
      }

      return true;
    });
  }

  function sortProducts(products) {
    const sorted = [...products];

    switch (state.sort) {
      case "name-asc":
        sorted.sort((a, b) =>
          String(a.name).localeCompare(String(b.name))
        );
        break;

      case "name-desc":
        sorted.sort((a, b) =>
          String(b.name).localeCompare(String(a.name))
        );
        break;

      case "price-low":
        sorted.sort(
          (a, b) => toNumber(a.price) - toNumber(b.price)
        );
        break;

      case "price-high":
        sorted.sort(
          (a, b) => toNumber(b.price) - toNumber(a.price)
        );
        break;

      case "discount":
        sorted.sort((a, b) => getDiscount(b) - getDiscount(a));
        break;

      case "featured":
      default:
        sorted.sort((a, b) => {
          const featuredDifference =
            Number(Boolean(b.featured)) - Number(Boolean(a.featured));

          if (featuredDifference !== 0) {
            return featuredDifference;
          }

          const bestsellerDifference =
            Number(Boolean(b.bestseller)) -
            Number(Boolean(a.bestseller));

          if (bestsellerDifference !== 0) {
            return bestsellerDifference;
          }

          return String(a.name).localeCompare(String(b.name));
        });
    }

    return sorted;
  }

  function applyFilters() {
    state.filteredProducts = sortProducts(
      state.products.filter(
        (product) =>
          matchesCategory(product) &&
          matchesSearch(product) &&
          matchesGauge(product) &&
          matchesColour(product) &&
          matchesStock(product) &&
          matchesSpecial(product)
      )
    );

    renderProducts();
    renderFilterSummary();
    updateCategoryTabs();
  }

  function createProductCard(product) {
    const available =
      product.availability !== false &&
      product.stockStatus !== "Out of Stock";

    const discount = getDiscount(product);
    const productUrl = `product-details.html?id=${encodeURIComponent(
      product.id
    )}`;

    const colours = getProductColours(product);
    const gauges = getProductGauges(product);

    const whatsappMessage = [
      "Hello ROYAL MABATI FACTORY LTD,",
      "",
      `I am interested in ${product.name}.`,
      `Category: ${product.category || "Mabati"}`,
      `Price: ${formatMoney(product.price)} ${product.priceUnit || ""}`,
      gauges.length ? `Gauge: ${gauges.join(", ")}` : null,
      colours.length
        ? `Available colours: ${colours.slice(0, 5).join(", ")}`
        : null,
      "",
      "Please confirm availability and send me a quotation."
    ]
      .filter(Boolean)
      .join("\n");

    return `
      <article class="product-card" data-product-id="${escapeHTML(product.id)}">

        <div class="product-image-wrap">

          <a href="${productUrl}" aria-label="View ${escapeHTML(product.name)}">
            <img
              src="${escapeHTML(product.image || "")}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              width="500"
              height="400"
              onerror="this.onerror=null;this.src=\'images/favicon.png\';"
            >
          </a>

          <div class="product-badges">

            ${
              discount > 0
                ? `<span class="badge badge-sale">Save ${discount}%</span>`
                : ""
            }

            ${
              product.freeDelivery
                ? `<span class="badge badge-delivery">Free Delivery</span>`
                : ""
            }

            <span class="badge ${getStockBadgeClass(product.stockStatus)}">
              ${escapeHTML(product.stockStatus || "Confirm Stock")}
            </span>

          </div>

          <div class="product-actions-top">

            <button
              type="button"
              class="icon-btn"
              data-wishlist-id="${escapeHTML(product.id)}"
              aria-label="Add ${escapeHTML(product.name)} to wishlist"
              aria-pressed="false"
            >
              <i class="fa-regular fa-heart"></i>
            </button>

            <button
              type="button"
              class="icon-btn"
              data-quick-view-id="${escapeHTML(product.id)}"
              aria-label="Quick view ${escapeHTML(product.name)}"
            >
              <i class="fa-regular fa-eye"></i>
            </button>

          </div>

        </div>

        <div class="product-content">

          <p class="product-category">
            ${escapeHTML(product.categoryName || product.category || "Mabati")}
          </p>

          <h3 class="product-title">
            <a href="${productUrl}">
              ${escapeHTML(product.name)}
            </a>
          </h3>

          <div class="product-meta">

            ${
              gauges.length
                ? `
                  <span>
                    <i class="fa-solid fa-layer-group"></i>
                    Gauge: ${escapeHTML(gauges.join(", "))}
                  </span>
                `
                : ""
            }

            <span>
              <i class="fa-solid fa-paint-roller"></i>
              ${escapeHTML(product.finish || "Standard finish")}
            </span>

          </div>

          ${
            colours.length
              ? `
                <p class="product-colours">
                  <strong>Colours:</strong>
                  ${escapeHTML(colours.slice(0, 3).join(", "))}
                  ${colours.length > 3 ? ` +${colours.length - 3} more` : ""}
                </p>
              `
              : ""
          }

          <div class="product-price">

            <span class="current-price">
              ${formatMoney(product.price)}
            </span>

            ${
              product.oldPrice &&
              toNumber(product.oldPrice) > toNumber(product.price)
                ? `
                  <span class="old-price">
                    ${formatMoney(product.oldPrice)}
                  </span>
                `
                : ""
            }

          </div>

          <p class="price-note">
            ${escapeHTML(product.priceUnit || "per item")}.
            ${escapeHTML(
              product.priceNote ||
                "Confirm the current price before ordering."
            )}
          </p>

          <div class="product-actions">
            <button
              type="button"
              class="add-to-cart-button"
              data-add-cart-id="${escapeHTML(product.id)}"
              ${available ? "" : "disabled"}
            >
              <i class="fa-solid fa-cart-plus"></i>
              ${available ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              type="button"
              class="wishlist-button"
              data-wishlist-id="${escapeHTML(product.id)}"
              aria-label="Add ${escapeHTML(product.name)} to wishlist"
              aria-pressed="false"
            >
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>

          <div class="product-secondary-actions">
            <a href="${productUrl}" class="btn btn-outline btn-sm">
              <i class="fa-regular fa-eye"></i> View Details
            </a>
            ${
              !["roofing-accessories", "nails-fasteners"].includes(product.category)
                ? `
                  <button type="button" class="btn btn-dark btn-sm" data-compare-id="${escapeHTML(product.id)}">
                    <i class="fa-solid fa-code-compare"></i> Compare
                  </button>
                `
                : ""
            }
          </div>

          <a
            href="https://wa.me/254752523422?text=${encodeURIComponent(
              whatsappMessage
            )}"
            target="_blank"
            rel="noopener"
            class="btn btn-whatsapp btn-sm btn-block"
            style="margin-top: 10px;"
          >
            <i class="fa-brands fa-whatsapp"></i>
            Order on WhatsApp
          </a>

        </div>

      </article>
    `;
  }

  function getStockBadgeClass(stockStatus) {
    const status = normalize(stockStatus);

    if (status === "in stock") {
      return "badge-stock";
    }

    if (status === "limited stock") {
      return "badge-limited";
    }

    if (status === "made to order") {
      return "badge-order";
    }

    return "badge-out";
  }

  function renderProducts() {
    const grid = select(selectors.grid);
    const emptyState = select(selectors.emptyState);
    const loadMoreContainer = select(selectors.loadMoreContainer);

    if (!grid) {
      return;
    }

    const visibleProducts = state.filteredProducts.slice(
      0,
      state.visibleCount
    );

    grid.innerHTML = visibleProducts
      .map(createProductCard)
      .join("");

    const isEmpty = state.filteredProducts.length === 0;

    grid.classList.toggle("hidden", isEmpty);
    emptyState?.classList.toggle("hidden", !isEmpty);

    if (loadMoreContainer) {
      loadMoreContainer.hidden =
        isEmpty ||
        state.visibleCount >= state.filteredProducts.length;
    }

    updateResultsCount();

    if (typeof window.updateWishlistButtons === "function") {
      window.updateWishlistButtons();
    } else {
      syncWishlistButtons();
    }

    updateComparisonDock();
  }

  function updateResultsCount() {
    const element = select(selectors.resultsCount);

    if (!element) {
      return;
    }

    const total = state.filteredProducts.length;
    const shown = Math.min(state.visibleCount, total);

    element.textContent =
      total === 0
        ? "No products found"
        : `Showing ${shown} of ${total} product${total === 1 ? "" : "s"}`;
  }

  function syncWishlistButtons() {
    const wishlist =
      typeof window.getRoyalMabatiWishlist === "function"
        ? window.getRoyalMabatiWishlist()
        : [];

    const ids = new Set(
      wishlist.map((item) =>
        typeof item === "string" ? item : item.productId
      )
    );

    selectAll("[data-wishlist-id]").forEach((button) => {
      const active = ids.has(button.dataset.wishlistId);
      const icon = select("i", button);

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));

      if (icon) {
        icon.className = active
          ? "fa-solid fa-heart"
          : "fa-regular fa-heart";
      }
    });
  }

  function renderFilterSummary() {
    const container = select(selectors.activeFilterSummary);

    if (!container) {
      return;
    }

    const filters = [];

    if (state.search) {
      filters.push(`Search: ${state.search}`);
    }

    if (state.category !== "all") {
      filters.push(`Category: ${state.category}`);
    }

    state.gauges.forEach((gauge) =>
      filters.push(`Gauge ${gauge}`)
    );

    state.colours.forEach((colour) =>
      filters.push(colour)
    );

    state.stockStatuses.forEach((status) =>
      filters.push(status)
    );

    state.specialFilters.forEach((filter) => {
      const labels = {
        featured: "Featured",
        sale: "On Sale",
        freeDelivery: "Free Delivery"
      };

      filters.push(labels[filter] || filter);
    });

    container.innerHTML = filters
      .map(
        (filter) => `
          <span class="active-filter-tag">
            ${escapeHTML(filter)}
          </span>
        `
      )
      .join("");
  }

  function updateCategoryTabs() {
    selectAll(selectors.categoryTabs).forEach((tab) => {
      const active =
        normalize(tab.dataset.categoryFilter) ===
        normalize(state.category);

      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });

    selectAll('input[name="category"]').forEach((radio) => {
      radio.checked =
        normalize(radio.value) === normalize(state.category);
    });
  }

  function resetFilters() {
    state.search = "";
    state.category = "all";
    state.gauges.clear();
    state.colours.clear();
    state.stockStatuses.clear();
    state.specialFilters.clear();
    state.sort = "featured";
    state.visibleCount = PRODUCTS_PER_PAGE;

    const searchInput = select(selectors.search);
    const sortSelect = select(selectors.sort);

    if (searchInput) {
      searchInput.value = "";
    }

    if (sortSelect) {
      sortSelect.value = "featured";
    }

    selectAll(
      'input[name="gauge"], input[name="colour"], input[name="stock"], input[name="special"]'
    ).forEach((input) => {
      input.checked = false;
    });

    const allCategory = select(
      'input[name="category"][value="all"]'
    );

    if (allCategory) {
      allCategory.checked = true;
    }

    window.history.replaceState(
      {},
      "",
      window.location.pathname
    );

    applyFilters();
  }

  function initializeCategoryTabs() {
    selectAll(selectors.categoryTabs).forEach((tab) => {
      tab.addEventListener("click", () => {
        state.category =
          tab.dataset.categoryFilter || "all";
        state.visibleCount = PRODUCTS_PER_PAGE;

        applyFilters();
      });
    });
  }

  function initializeSidebarFilters() {
    selectAll('input[name="category"]').forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) {
          state.category = input.value;
          state.visibleCount = PRODUCTS_PER_PAGE;
          applyFilters();
        }
      });
    });

    const groupedFilters = [
      ["gauge", state.gauges],
      ["colour", state.colours],
      ["stock", state.stockStatuses],
      ["special", state.specialFilters]
    ];

    groupedFilters.forEach(([name, collection]) => {
      selectAll(`input[name="${name}"]`).forEach((input) => {
        input.addEventListener("change", () => {
          if (input.checked) {
            collection.add(input.value);
          } else {
            collection.delete(input.value);
          }

          state.visibleCount = PRODUCTS_PER_PAGE;
          applyFilters();
        });
      });
    });
  }

  function initializeSearchAndSort() {
    const searchInput = select(selectors.search);
    const sortSelect = select(selectors.sort);

    let searchTimer = null;

    searchInput?.addEventListener("input", () => {
      window.clearTimeout(searchTimer);

      searchTimer = window.setTimeout(() => {
        state.search = searchInput.value.trim();
        state.visibleCount = PRODUCTS_PER_PAGE;
        applyFilters();
      }, 250);
    });

    sortSelect?.addEventListener("change", () => {
      state.sort = sortSelect.value;
      state.visibleCount = PRODUCTS_PER_PAGE;
      applyFilters();
    });
  }

  function initializeFilterSidebar() {
    const toggle = select(selectors.filterToggle);
    const sidebar = select(selectors.filterSidebar);

    toggle?.addEventListener("click", () => {
      const active = sidebar?.classList.toggle("active") || false;

      toggle.setAttribute("aria-expanded", String(active));
    });
  }


  function updateComparisonDock() {
    const dock = select("#comparison-dock");
    const count = select("#comparison-count");
    if (!dock || !count) return;

    dock.hidden = comparisonIds.size === 0;
    count.textContent = `${comparisonIds.size} product${comparisonIds.size === 1 ? "" : "s"} selected`;

    selectAll("[data-compare-id]").forEach((button) => {
      const active = comparisonIds.has(button.dataset.compareId);
      button.classList.toggle("active", active);
      button.innerHTML = active
        ? '<i class="fa-solid fa-check"></i> Selected'
        : '<i class="fa-solid fa-code-compare"></i> Compare';
    });
  }

  function toggleComparison(productId) {
    if (comparisonIds.has(productId)) {
      comparisonIds.delete(productId);
    } else {
      if (comparisonIds.size >= 3) {
        window.showToast?.("You can compare up to 3 products.", "warning");
        return;
      }
      comparisonIds.add(productId);
    }
    updateComparisonDock();
  }

  function openComparison() {
    if (comparisonIds.size < 2) {
      window.showToast?.("Select at least 2 products to compare.", "info");
      return;
    }

    const products = [...comparisonIds]
      .map((id) => state.products.find((product) => product.id === id))
      .filter(Boolean);

    const modal = select("#comparison-modal");
    const content = select("#comparison-content");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              ${products.map((product) => `<th>${escapeHTML(product.name)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr><th>Price</th>${products.map((product) => `<td>${formatMoney(product.price)} ${escapeHTML(product.priceUnit || "")}</td>`).join("")}</tr>
            <tr><th>Gauge</th>${products.map((product) => `<td>${escapeHTML(getProductGauges(product).join(", ") || "N/A")}</td>`).join("")}</tr>
            <tr><th>Finish</th>${products.map((product) => `<td>${escapeHTML(product.finish || "Standard")}</td>`).join("")}</tr>
            <tr><th>Profile</th>${products.map((product) => `<td>${escapeHTML(product.categoryName || product.category)}</td>`).join("")}</tr>
            <tr><th>Stock</th>${products.map((product) => `<td>${escapeHTML(product.stockStatus || "Confirm")}</td>`).join("")}</tr>
            <tr><th>Best for</th>${products.map((product) => `<td>${escapeHTML((product.applications || []).slice(0, 3).join(", "))}</td>`).join("")}</tr>
          </tbody>
        </table>
      </div>
    `;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }

  function closeComparison() {
    const modal = select("#comparison-modal");
    modal?.classList.remove("active");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  function initializeComparison() {
    select("#open-comparison")?.addEventListener("click", openComparison);
    select("#clear-comparison")?.addEventListener("click", () => {
      comparisonIds.clear();
      updateComparisonDock();
    });
    select("#comparison-close")?.addEventListener("click", closeComparison);
    select("#comparison-modal")?.addEventListener("click", (event) => {
      if (event.target.id === "comparison-modal") closeComparison();
    });
  }

  function initializeProductActions() {
    document.addEventListener("click", (event) => {
      const wishlistButton = event.target.closest(
        "[data-wishlist-id]"
      );

      if (wishlistButton) {
        const productId = wishlistButton.dataset.wishlistId;

        if (typeof window.toggleWishlist === "function") {
          window.toggleWishlist(productId);
          window.setTimeout(syncWishlistButtons, 0);
        } else {
          console.error("toggleWishlist is unavailable.");
        }

        return;
      }

      const compareButton = event.target.closest("[data-compare-id]");

      if (compareButton) {
        toggleComparison(compareButton.dataset.compareId);
        return;
      }

      const quickViewButton = event.target.closest(
        "[data-quick-view-id]"
      );

      if (quickViewButton) {
        const productId = quickViewButton.dataset.quickViewId;

        if (typeof window.openQuickView === "function") {
          window.openQuickView(productId);
        } else {
          window.location.href =
            `product-details.html?id=${encodeURIComponent(productId)}`;
        }
      }
    });
  }

  function initializeLoadMore() {
    select(selectors.loadMoreButton)?.addEventListener(
      "click",
      () => {
        state.visibleCount += PRODUCTS_PER_PAGE;
        renderProducts();
      }
    );
  }

  function initializeResetButtons() {
    select(selectors.clearFilters)?.addEventListener(
      "click",
      resetFilters
    );

    select(selectors.resetSearch)?.addEventListener(
      "click",
      resetFilters
    );
  }

  function initializeProductsPage() {
    if (!Array.isArray(window.PRODUCTS)) {
      const attempts = Number(document.body.dataset.productLoadAttempts || 0);
      if (attempts < 10) {
        document.body.dataset.productLoadAttempts = String(attempts + 1);
        window.setTimeout(initializeProductsPage, 150);
        return;
      }

      const grid = select(selectors.grid);
      if (grid) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fa-solid fa-box-open"></i>
            <h2>Products could not be loaded</h2>
            <p>Refresh the page or check your internet connection.</p>
            <button type="button" class="btn btn-primary" onclick="window.location.reload()">Reload Products</button>
          </div>
        `;
      }
      return;
    }

    state.products = [...window.PRODUCTS];

    readURLFilters();
    initializeCategoryTabs();
    initializeSidebarFilters();
    initializeSearchAndSort();
    initializeFilterSidebar();
    initializeProductActions();
    initializeLoadMore();
    initializeResetButtons();
    initializeComparison();

    applyFilters();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeProductsPage
    );
  } else {
    initializeProductsPage();
  }
})();
