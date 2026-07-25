"use strict";

/* ==========================================================
   ROYAL MABATI FACTORY LTD
   Wishlist Management
   File: js/wishlist.js
   ========================================================== */

(() => {
  const BUSINESS = {
    name: "ROYAL MABATI FACTORY LTD",
    phone: "0752523422",
    internationalPhone: "254752523422",
    currency: "KSh"
  };

  const STORAGE_KEYS = {
    wishlist: "royalMabatiWishlist",
    cart: "royalMabatiCart"
  };

  const SELECTORS = {
    wishlistContainer: "#wishlist-items",
    wishlistCount: "#wishlist-count",
    emptyWishlist: "#empty-wishlist",
    wishlistContent: "#wishlist-content",
    clearWishlistButton: "#clear-wishlist",
    moveAllButton: "#move-all-to-cart"
  };

  /* ----------------------------------------------------------
     GENERAL HELPERS
  ---------------------------------------------------------- */

  function select(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function selectAll(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  function toNumber(value, fallback = 0) {
    const parsedValue = Number(value);

    return Number.isFinite(parsedValue)
      ? parsedValue
      : fallback;
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

    return `${BUSINESS.currency} ${Math.round(
      toNumber(amount)
    ).toLocaleString("en-KE")}`;
  }

  function showNotification(message, type = "success") {
    if (typeof window.showToast === "function") {
      window.showToast(message, type);
      return;
    }

    console.log(`${type.toUpperCase()}: ${message}`);
  }

  function createWhatsAppLink(message) {
    return `https://wa.me/${BUSINESS.internationalPhone}?text=${encodeURIComponent(
      message
    )}`;
  }

  /* ----------------------------------------------------------
     PRODUCT HELPERS
  ---------------------------------------------------------- */

  function getProducts() {
    return Array.isArray(window.PRODUCTS)
      ? window.PRODUCTS
      : [];
  }

  function getProductById(productId) {
    if (typeof window.getProductById === "function") {
      return window.getProductById(productId);
    }

    return (
      getProducts().find(
        (product) => product.id === productId
      ) || null
    );
  }

  function getDiscountPercentage(product) {
    if (
      typeof window.getDiscountPercentage === "function"
    ) {
      return window.getDiscountPercentage(product);
    }

    const price = toNumber(product?.price);
    const oldPrice = toNumber(product?.oldPrice);

    if (oldPrice <= price || oldPrice <= 0) {
      return 0;
    }

    return Math.round(
      ((oldPrice - price) / oldPrice) * 100
    );
  }

  function getGaugeText(product) {
    if (
      product?.defaultGauge &&
      product.defaultGauge !== "N/A"
    ) {
      return `${product.defaultGauge}G`;
    }

    if (
      Array.isArray(product?.gauge) &&
      product.gauge.length > 0
    ) {
      return product.gauge
        .map((gauge) =>
          gauge === "N/A"
            ? "N/A"
            : `${gauge}G`
        )
        .join(", ");
    }

    return "Confirm gauge";
  }

  function getDefaultLength(product) {
    if (
      Array.isArray(product?.availableLengths) &&
      product.availableLengths.length > 0
    ) {
      return product.availableLengths[0];
    }

    return null;
  }

  function getDefaultColour(product) {
    if (
      Array.isArray(product?.colours) &&
      product.colours.length > 0
    ) {
      return product.colours[0];
    }

    return "Not specified";
  }

  function getDefaultGauge(product) {
    if (product?.defaultGauge) {
      return product.defaultGauge;
    }

    if (
      Array.isArray(product?.gauge) &&
      product.gauge.length > 0
    ) {
      return product.gauge[0];
    }

    return "Not specified";
  }

  function productIsAvailable(product) {
    return Boolean(
      product &&
      product.availability !== false &&
      product.stockStatus !== "Out of Stock"
    );
  }

  /* ----------------------------------------------------------
     LOCAL STORAGE HELPERS
  ---------------------------------------------------------- */

  function readStorage(key, fallback = []) {
    try {
      const storedValue = localStorage.getItem(key);

      if (!storedValue) {
        return fallback;
      }

      const parsedValue = JSON.parse(storedValue);

      return parsedValue ?? fallback;
    } catch (error) {
      console.error(
        `Could not read ${key}:`,
        error
      );

      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(
        `Could not save ${key}:`,
        error
      );

      showNotification(
        "Your browser could not save this change.",
        "error"
      );
    }
  }

  /* ----------------------------------------------------------
     WISHLIST STORAGE
  ---------------------------------------------------------- */

  function normalizeWishlistItem(item) {
    if (typeof item === "string") {
      return {
        productId: item,
        addedAt: null
      };
    }

    if (
      item &&
      typeof item === "object" &&
      item.productId
    ) {
      return {
        productId: String(item.productId),
        addedAt: item.addedAt || null
      };
    }

    return null;
  }

  function getWishlist() {
    const storedWishlist = readStorage(
      STORAGE_KEYS.wishlist,
      []
    );

    if (!Array.isArray(storedWishlist)) {
      return [];
    }

    const normalizedWishlist = storedWishlist
      .map(normalizeWishlistItem)
      .filter(Boolean);

    const uniqueWishlist = [];

    normalizedWishlist.forEach((item) => {
      const alreadyExists = uniqueWishlist.some(
        (existingItem) =>
          existingItem.productId === item.productId
      );

      if (!alreadyExists) {
        uniqueWishlist.push(item);
      }
    });

    return uniqueWishlist;
  }

  function saveWishlist(wishlist) {
    const normalizedWishlist = wishlist
      .map(normalizeWishlistItem)
      .filter(Boolean);

    writeStorage(
      STORAGE_KEYS.wishlist,
      normalizedWishlist
    );

    updateWishlistCounter();
    updateWishlistButtons();
    renderWishlist();

    document.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: {
          wishlist: normalizedWishlist
        }
      })
    );
  }

  function isInWishlist(productId) {
    return getWishlist().some(
      (item) => item.productId === productId
    );
  }

  /* ----------------------------------------------------------
     ADD, REMOVE AND TOGGLE
  ---------------------------------------------------------- */

  function addToWishlist(productId) {
    const product = getProductById(productId);

    if (!product) {
      showNotification(
        "This product could not be found.",
        "error"
      );

      return false;
    }

    const wishlist = getWishlist();

    const alreadySaved = wishlist.some(
      (item) => item.productId === productId
    );

    if (alreadySaved) {
      showNotification(
        `${product.name} is already in your wishlist.`,
        "info"
      );

      return false;
    }

    wishlist.push({
      productId,
      addedAt: new Date().toISOString()
    });

    saveWishlist(wishlist);

    showNotification(
      `${product.name} saved to wishlist.`,
      "success"
    );

    return true;
  }

  function removeFromWishlist(
    productId,
    showMessage = true
  ) {
    const product = getProductById(productId);

    const wishlist = getWishlist();

    const updatedWishlist = wishlist.filter(
      (item) => item.productId !== productId
    );

    if (
      updatedWishlist.length === wishlist.length
    ) {
      return false;
    }

    saveWishlist(updatedWishlist);

    if (showMessage) {
      showNotification(
        product
          ? `${product.name} removed from wishlist.`
          : "Product removed from wishlist.",
        "info"
      );
    }

    return true;
  }

  function toggleWishlist(productId) {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      return false;
    }

    addToWishlist(productId);
    return true;
  }

  function clearWishlist() {
    const wishlist = getWishlist();

    if (wishlist.length === 0) {
      showNotification(
        "Your wishlist is already empty.",
        "info"
      );

      return;
    }

    const confirmed = window.confirm(
      "Remove all products from your wishlist?"
    );

    if (!confirmed) {
      return;
    }

    saveWishlist([]);

    showNotification(
      "Your wishlist has been cleared.",
      "success"
    );
  }

  /* ----------------------------------------------------------
     CART HELPERS
  ---------------------------------------------------------- */

  function getCart() {
    const cart = readStorage(
      STORAGE_KEYS.cart,
      []
    );

    return Array.isArray(cart)
      ? cart
      : [];
  }

  function saveCart(cart) {
    writeStorage(
      STORAGE_KEYS.cart,
      cart
    );

    document.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: { cart }
      })
    );

    updateCartCounterFallback();
  }

  function createCartItemId(productId) {
    return `${productId}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
  }

  function addProductToCart(productId) {
    const product = getProductById(productId);

    if (!product) {
      showNotification(
        "This product could not be found.",
        "error"
      );

      return false;
    }

    if (!productIsAvailable(product)) {
      showNotification(
        `${product.name} is currently unavailable.`,
        "warning"
      );

      return false;
    }

    /*
     * Prefer the main cart function from cart.js.
     */
    if (
      typeof window.addProductToCart === "function" &&
      window.addProductToCart !== addProductToCart
    ) {
      window.addProductToCart(productId);
      return true;
    }

    const length = getDefaultLength(product);
    const colour = getDefaultColour(product);
    const gauge = getDefaultGauge(product);

    const cart = getCart();

    const existingItem = cart.find(
      (item) =>
        item.productId === productId &&
        String(item.length) === String(length) &&
        String(item.colour) === String(colour) &&
        String(item.gauge) === String(gauge)
    );

    if (existingItem) {
      existingItem.quantity =
        Math.max(
          1,
          toNumber(existingItem.quantity, 1)
        ) + 1;
    } else {
      cart.push({
        id: createCartItemId(productId),
        productId,
        quantity: 1,
        length,
        colour,
        gauge,
        addedAt: new Date().toISOString()
      });
    }

    saveCart(cart);

    showNotification(
      `${product.name} added to cart.`,
      "success"
    );

    return true;
  }

  function moveProductToCart(productId) {
    const added = addProductToCart(productId);

    if (!added) {
      return;
    }

    removeFromWishlist(productId, false);

    const product = getProductById(productId);

    showNotification(
      product
        ? `${product.name} moved to cart.`
        : "Product moved to cart.",
      "success"
    );
  }

  function moveAllToCart() {
    const wishlist = getWishlist();

    if (wishlist.length === 0) {
      showNotification(
        "Your wishlist is empty.",
        "info"
      );

      return;
    }

    let movedCount = 0;
    let unavailableCount = 0;

    wishlist.forEach((wishlistItem) => {
      const product = getProductById(
        wishlistItem.productId
      );

      if (!productIsAvailable(product)) {
        unavailableCount += 1;
        return;
      }

      const added = addProductToCart(
        wishlistItem.productId
      );

      if (added) {
        movedCount += 1;
      }
    });

    const remainingWishlist = wishlist.filter(
      (wishlistItem) => {
        const product = getProductById(
          wishlistItem.productId
        );

        return !productIsAvailable(product);
      }
    );

    saveWishlist(remainingWishlist);

    if (movedCount > 0) {
      showNotification(
        `${movedCount} product${
          movedCount === 1 ? "" : "s"
        } moved to cart.`,
        "success"
      );
    }

    if (unavailableCount > 0) {
      showNotification(
        `${unavailableCount} unavailable product${
          unavailableCount === 1 ? "" : "s"
        } remained in the wishlist.`,
        "warning"
      );
    }
  }

  function updateCartCounterFallback() {
    const cartCount = select("#cart-count");

    if (!cartCount) {
      return;
    }

    const totalItems = getCart().reduce(
      (total, item) =>
        total +
        Math.max(
          1,
          toNumber(item.quantity, 1)
        ),
      0
    );

    cartCount.textContent = String(totalItems);
  }

  /* ----------------------------------------------------------
     WISHLIST COUNTER
  ---------------------------------------------------------- */

  function updateWishlistCounter() {
    const totalItems = getWishlist().length;

    const mainCounter = select(
      SELECTORS.wishlistCount
    );

    if (mainCounter) {
      mainCounter.textContent =
        String(totalItems);

      mainCounter.setAttribute(
        "aria-label",
        `${totalItems} item${
          totalItems === 1 ? "" : "s"
        } in wishlist`
      );
    }

    selectAll("[data-wishlist-count]").forEach(
      (counter) => {
        counter.textContent =
          String(totalItems);
      }
    );
  }

  /* ----------------------------------------------------------
     UPDATE HEART BUTTONS
  ---------------------------------------------------------- */

  function updateWishlistButtons() {
    selectAll("[data-wishlist-id]").forEach(
      (button) => {
        const productId =
          button.dataset.wishlistId;

        const active =
          isInWishlist(productId);

        const icon = select("i", button);

        button.classList.toggle(
          "active",
          active
        );

        button.setAttribute(
          "aria-pressed",
          String(active)
        );

        button.setAttribute(
          "aria-label",
          active
            ? "Remove from wishlist"
            : "Add to wishlist"
        );

        if (icon) {
          icon.className = active
            ? "fa-solid fa-heart"
            : "fa-regular fa-heart";
        }
      }
    );
  }

  /* ----------------------------------------------------------
     WISHLIST PAGE RENDERING
  ---------------------------------------------------------- */

  function renderWishlist() {
    const container = select(
      SELECTORS.wishlistContainer
    );

    if (!container) {
      updateWishlistCounter();
      updateWishlistButtons();
      return;
    }

    const wishlist = getWishlist();

    const validWishlist = wishlist.filter(
      (wishlistItem) =>
        getProductById(wishlistItem.productId)
    );

    if (
      validWishlist.length !== wishlist.length
    ) {
      writeStorage(
        STORAGE_KEYS.wishlist,
        validWishlist
      );
    }

    if (validWishlist.length === 0) {
      renderEmptyWishlist(container);
      toggleWishlistPageState(true);
      return;
    }

    container.innerHTML = validWishlist
      .map(createWishlistCard)
      .join("");

    toggleWishlistPageState(false);
    updateWishlistButtons();
  }

  function renderEmptyWishlist(container) {
    container.innerHTML = `
      <div
        class="empty-state"
        style="grid-column: 1 / -1;"
      >
        <i class="fa-regular fa-heart"></i>

        <h2>Your wishlist is empty</h2>

        <p>
          Save your favourite mabati profiles,
          colours and roofing accessories here.
        </p>

        <a
          href="products.html"
          class="btn btn-primary"
        >
          Browse Products
        </a>
      </div>
    `;
  }

  function toggleWishlistPageState(isEmpty) {
    const emptyWishlist = select(
      SELECTORS.emptyWishlist
    );

    const wishlistContent = select(
      SELECTORS.wishlistContent
    );

    const clearButton = select(
      SELECTORS.clearWishlistButton
    );

    const moveAllButton = select(
      SELECTORS.moveAllButton
    );

    if (emptyWishlist) {
      emptyWishlist.hidden = !isEmpty;
    }

    if (wishlistContent) {
      wishlistContent.hidden = isEmpty;
    }

    if (clearButton) {
      clearButton.disabled = isEmpty;
    }

    if (moveAllButton) {
      moveAllButton.disabled = isEmpty;
    }
  }

  function createWishlistCard(wishlistItem) {
    const product = getProductById(
      wishlistItem.productId
    );

    if (!product) {
      return "";
    }

    const discount =
      getDiscountPercentage(product);

    const available =
      productIsAvailable(product);

    const colours =
      Array.isArray(product.colours) &&
      product.colours.length > 0
        ? product.colours
            .slice(0, 4)
            .join(", ")
        : "Confirm available colours";

    const dateAdded =
      formatDate(wishlistItem.addedAt);

    const whatsappMessage = [
      `Hello ${BUSINESS.name},`,
      "",
      `I am interested in ${product.name}.`,
      `Category: ${product.category || "Roofing product"}`,
      `Gauge: ${getGaugeText(product)}`,
      `Price: ${formatMoney(product.price)} ${
        product.priceUnit || ""
      }`,
      `Availability: ${
        product.stockStatus ||
        "Please confirm"
      }`,
      "",
      "Please send me the current price, available colours, lengths and delivery information."
    ].join("\n");

    return `
      <article
        class="wishlist-card product-card"
        data-wishlist-product="${escapeHTML(
          product.id
        )}"
      >

        <div class="product-image-wrap">

          <a
            href="product-details.html?id=${encodeURIComponent(
              product.id
            )}"
            aria-label="View ${escapeHTML(
              product.name
            )}"
          >
            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              width="500"
              height="400"
            >
          </a>

          <div class="product-badges">

            ${
              discount > 0
                ? `
                  <span class="badge badge-sale">
                    Save ${discount}%
                  </span>
                `
                : ""
            }

            <span class="badge ${getStockBadgeClass(
              product.stockStatus
            )}">
              ${escapeHTML(
                product.stockStatus ||
                "Confirm Stock"
              )}
            </span>

          </div>

          <button
            type="button"
            class="wishlist-remove-button"
            data-remove-wishlist="${escapeHTML(
              product.id
            )}"
            aria-label="Remove ${escapeHTML(
              product.name
            )} from wishlist"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

        </div>

        <div class="product-content">

          <p class="product-category">
            ${escapeHTML(
              product.category || ""
            )}
          </p>

          <h2 class="product-title">

            <a
              href="product-details.html?id=${encodeURIComponent(
                product.id
              )}"
            >
              ${escapeHTML(product.name)}
            </a>

          </h2>

          <div class="product-meta">

            <span>
              <i class="fa-solid fa-layer-group"></i>
              Gauge: ${escapeHTML(
                getGaugeText(product)
              )}
            </span>

            <span>
              <i class="fa-solid fa-paint-roller"></i>
              ${escapeHTML(
                product.finish ||
                "Standard finish"
              )}
            </span>

          </div>

          <p class="product-colours">
            <strong>Colours:</strong>
            ${escapeHTML(colours)}
          </p>

          <div class="product-price">

            <span class="current-price">
              ${formatMoney(product.price)}
            </span>

            ${
              product.oldPrice &&
              product.oldPrice > product.price
                ? `
                  <span class="old-price">
                    ${formatMoney(
                      product.oldPrice
                    )}
                  </span>
                `
                : ""
            }

          </div>

          <p class="price-note">
            ${escapeHTML(
              product.priceUnit || ""
            )}.
            ${escapeHTML(
              product.priceNote ||
              "Confirm the current price before ordering."
            )}
          </p>

          ${
            dateAdded
              ? `
                <p class="wishlist-date">
                  <i class="fa-regular fa-clock"></i>
                  Saved ${escapeHTML(dateAdded)}
                </p>
              `
              : ""
          }

          <div class="product-card-buttons">

            <button
              type="button"
              class="btn btn-primary btn-sm"
              data-move-to-cart="${escapeHTML(
                product.id
              )}"
              ${available ? "" : "disabled"}
            >
              <i class="fa-solid fa-cart-plus"></i>
              ${
                available
                  ? "Move to Cart"
                  : "Unavailable"
              }
            </button>

            <a
              href="${createWhatsAppLink(
                whatsappMessage
              )}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-whatsapp btn-sm"
            >
              <i class="fa-brands fa-whatsapp"></i>
              Enquire
            </a>

          </div>

        </div>

      </article>
    `;
  }

  function getStockBadgeClass(stockStatus) {
    const status = String(
      stockStatus || ""
    ).toLowerCase();

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

  function formatDate(dateValue) {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat(
      "en-KE",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    ).format(date);
  }

  /* ----------------------------------------------------------
     WISHLIST PAGE EVENTS
  ---------------------------------------------------------- */

  function initializeWishlistEvents() {
    document.addEventListener(
      "click",
      handleWishlistClick
    );

    select(
      SELECTORS.clearWishlistButton
    )?.addEventListener(
      "click",
      clearWishlist
    );

    select(
      SELECTORS.moveAllButton
    )?.addEventListener(
      "click",
      moveAllToCart
    );
  }

  function handleWishlistClick(event) {
    const removeButton = event.target.closest(
      "[data-remove-wishlist]"
    );

    if (removeButton) {
      removeFromWishlist(
        removeButton.dataset.removeWishlist
      );

      return;
    }

    const moveButton = event.target.closest(
      "[data-move-to-cart]"
    );

    if (moveButton) {
      moveProductToCart(
        moveButton.dataset.moveToCart
      );

      return;
    }

    /*
     * app.js handles ordinary data-wishlist-id buttons.
     *
     * This listener only handles them when app.js is not
     * included on the current page.
     */
    const wishlistButton = event.target.closest(
      "[data-wishlist-id]"
    );

    if (
      wishlistButton &&
      typeof window.showToast !== "function"
    ) {
      toggleWishlist(
        wishlistButton.dataset.wishlistId
      );
    }
  }

  /* ----------------------------------------------------------
     STORAGE SYNCHRONIZATION
  ---------------------------------------------------------- */

  function initializeStorageSync() {
    window.addEventListener(
      "storage",
      (event) => {
        if (
          event.key === STORAGE_KEYS.wishlist
        ) {
          updateWishlistCounter();
          updateWishlistButtons();
          renderWishlist();
        }

        if (event.key === STORAGE_KEYS.cart) {
          updateCartCounterFallback();
        }
      }
    );
  }

  /* ----------------------------------------------------------
     INITIALIZATION
  ---------------------------------------------------------- */

  function initializeWishlist() {
    updateWishlistCounter();
    updateWishlistButtons();
    updateCartCounterFallback();
    renderWishlist();
    initializeWishlistEvents();
    initializeStorageSync();
  }

  /* ----------------------------------------------------------
     GLOBAL FUNCTIONS
  ---------------------------------------------------------- */

  window.getRoyalMabatiWishlist =
    getWishlist;

  window.saveRoyalMabatiWishlist =
    saveWishlist;

  window.addRoyalMabatiWishlistItem =
    addToWishlist;

  window.removeRoyalMabatiWishlistItem =
    removeFromWishlist;

  window.toggleRoyalMabatiWishlist =
    toggleWishlist;

  window.clearRoyalMabatiWishlist =
    clearWishlist;

  window.moveRoyalMabatiWishlistToCart =
    moveProductToCart;

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeWishlist
    );
  } else {
    initializeWishlist();
  }
})();