"use strict";

/* ==========================================================
   ROYAL MABATI FACTORY LTD
   Shopping Cart
   File: js/cart.js
   ========================================================== */

(() => {
  const BUSINESS = {
    name: "ROYAL MABATI FACTORY LTD",
    phone: "0752523422",
    internationalPhone: "254752523422",
    currency: "KSh"
  };

  const STORAGE_KEY = "royalMabatiCart";

  const SELECTORS = {
    cartContainer: "#cart-items",
    cartSummary: "#cart-summary",
    subtotal: "#cart-subtotal",
    delivery: "#cart-delivery",
    total: "#cart-total",
    cartCount: "#cart-count",
    clearCart: "#clear-cart",
    checkoutButton: "#checkout-whatsapp",
    emptyCart: "#empty-cart",
    cartContent: "#cart-content"
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
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
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

  /* ----------------------------------------------------------
     CART STORAGE
  ---------------------------------------------------------- */

  function getCart() {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);

      if (!storedCart) {
        return [];
      }

      const parsedCart = JSON.parse(storedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];
    } catch (error) {
      console.error("Could not read cart:", error);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cart)
      );

      updateCartCounter();
      renderCart();

      document.dispatchEvent(
        new CustomEvent("cartUpdated", {
          detail: { cart }
        })
      );
    } catch (error) {
      console.error("Could not save cart:", error);

      showNotification(
        "Your browser could not save the cart.",
        "error"
      );
    }
  }

  /* ----------------------------------------------------------
     ADD TO CART
  ---------------------------------------------------------- */

  function addToCart(productId, options = {}) {
    const product = getProductById(productId);

    if (!product) {
      showNotification(
        "This product could not be found.",
        "error"
      );

      return false;
    }

    if (
      product.availability === false ||
      product.stockStatus === "Out of Stock"
    ) {
      showNotification(
        `${product.name} is currently out of stock.`,
        "warning"
      );

      return false;
    }

    const quantity = Math.max(
      1,
      Math.floor(toNumber(options.quantity, 1))
    );

    const length =
      options.length ??
      getDefaultLength(product);

    const colour =
      options.colour ??
      getDefaultColour(product);

    const gauge =
      options.gauge ??
      getDefaultGauge(product);

    const cart = getCart();

    const existingItem = cart.find(
      (item) =>
        item.productId === productId &&
        String(item.length) === String(length) &&
        String(item.colour) === String(colour) &&
        String(item.gauge) === String(gauge)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: createCartItemId(productId),
        productId,
        quantity,
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

  function createCartItemId(productId) {
    return `${productId}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
  }

  /* ----------------------------------------------------------
     CART ITEM CALCULATIONS
  ---------------------------------------------------------- */

  function calculateUnitPrice(item, product) {
    const productPrice = toNumber(product?.price);

    const priceUnit = String(
      product?.priceUnit || ""
    ).toLowerCase();

    const length = toNumber(item.length);

    if (
      length > 0 &&
      (
        priceUnit.includes("metre") ||
        priceUnit.includes("meter") ||
        priceUnit.includes("/m")
      )
    ) {
      return productPrice * length;
    }

    return productPrice;
  }

  function calculateItemTotal(item, product) {
    return (
      calculateUnitPrice(item, product) *
      Math.max(1, toNumber(item.quantity, 1))
    );
  }

  function calculateCartTotals(cart = getCart()) {
    const subtotal = cart.reduce((total, item) => {
      const product = getProductById(item.productId);

      if (!product) {
        return total;
      }

      return total + calculateItemTotal(item, product);
    }, 0);

    const delivery = 0;
    const total = subtotal + delivery;

    return {
      subtotal,
      delivery,
      total
    };
  }

  /* ----------------------------------------------------------
     UPDATE CART ITEMS
  ---------------------------------------------------------- */

  function updateQuantity(itemId, newQuantity) {
    const quantity = Math.max(
      1,
      Math.floor(toNumber(newQuantity, 1))
    );

    const cart = getCart();

    const item = cart.find(
      (cartItem) => cartItem.id === itemId
    );

    if (!item) {
      return;
    }

    item.quantity = quantity;
    saveCart(cart);
  }

  function increaseQuantity(itemId) {
    const cart = getCart();

    const item = cart.find(
      (cartItem) => cartItem.id === itemId
    );

    if (!item) {
      return;
    }

    item.quantity =
      Math.max(1, toNumber(item.quantity, 1)) + 1;

    saveCart(cart);
  }

  function decreaseQuantity(itemId) {
    const cart = getCart();

    const item = cart.find(
      (cartItem) => cartItem.id === itemId
    );

    if (!item) {
      return;
    }

    if (toNumber(item.quantity, 1) <= 1) {
      removeCartItem(itemId);
      return;
    }

    item.quantity -= 1;
    saveCart(cart);
  }

  function updateItemOption(itemId, optionName, value) {
    const cart = getCart();

    const item = cart.find(
      (cartItem) => cartItem.id === itemId
    );

    if (!item) {
      return;
    }

    if (
      !["length", "colour", "gauge"].includes(optionName)
    ) {
      return;
    }

    item[optionName] =
      optionName === "length"
        ? toNumber(value) || value
        : value;

    saveCart(cart);

    showNotification(
      "Cart item updated.",
      "success"
    );
  }

  function removeCartItem(itemId) {
    const cart = getCart();

    const item = cart.find(
      (cartItem) => cartItem.id === itemId
    );

    const product = item
      ? getProductById(item.productId)
      : null;

    const updatedCart = cart.filter(
      (cartItem) => cartItem.id !== itemId
    );

    saveCart(updatedCart);

    showNotification(
      product
        ? `${product.name} removed from cart.`
        : "Item removed from cart.",
      "info"
    );
  }

  function clearCart() {
    const cart = getCart();

    if (cart.length === 0) {
      showNotification(
        "Your cart is already empty.",
        "info"
      );

      return;
    }

    const confirmed = window.confirm(
      "Remove all products from your cart?"
    );

    if (!confirmed) {
      return;
    }

    saveCart([]);

    showNotification(
      "Your cart has been cleared.",
      "success"
    );
  }

  /* ----------------------------------------------------------
     CART COUNTER
  ---------------------------------------------------------- */

  function updateCartCounter() {
    const countElement = select(SELECTORS.cartCount);

    const totalItems = getCart().reduce(
      (total, item) =>
        total +
        Math.max(1, toNumber(item.quantity, 1)),
      0
    );

    if (countElement) {
      countElement.textContent = String(totalItems);
      countElement.setAttribute(
        "aria-label",
        `${totalItems} item${totalItems === 1 ? "" : "s"} in cart`
      );
    }

    selectAll("#cart-count, [data-cart-count]").forEach(
      (element) => {
        element.textContent = String(totalItems);
      }
    );
  }

  /* ----------------------------------------------------------
     CART PAGE RENDERING
  ---------------------------------------------------------- */

  function renderCart() {
    const cartContainer = select(
      SELECTORS.cartContainer
    );

    if (!cartContainer) {
      updateCartCounter();
      return;
    }

    const cart = getCart();

    const validCartItems = cart.filter((item) =>
      getProductById(item.productId)
    );

    if (validCartItems.length !== cart.length) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(validCartItems)
      );
    }

    if (validCartItems.length === 0) {
      renderEmptyCart(cartContainer);
      updateSummary({
        subtotal: 0,
        delivery: 0,
        total: 0
      });

      return;
    }

    cartContainer.innerHTML = validCartItems
      .map(createCartItemHTML)
      .join("");

    const totals =
      calculateCartTotals(validCartItems);

    updateSummary(totals);
    toggleCartPageState(false);
  }

  function renderEmptyCart(container) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-cart-shopping"></i>

        <h2>Your cart is empty</h2>

        <p>
          Browse our roofing sheets and accessories,
          then add the products you need.
        </p>

        <a
          href="products.html"
          class="btn btn-primary"
        >
          Shop Mabati
        </a>
      </div>
    `;

    toggleCartPageState(true);
  }

  function createCartItemHTML(item) {
    const product = getProductById(item.productId);

    if (!product) {
      return "";
    }

    const unitPrice =
      calculateUnitPrice(item, product);

    const itemTotal =
      calculateItemTotal(item, product);

    const lengths = createLengthOptions(
      product,
      item.length
    );

    const colours = createColourOptions(
      product,
      item.colour
    );

    const gauges = createGaugeOptions(
      product,
      item.gauge
    );

    return `
      <article
        class="cart-item"
        data-cart-item-id="${escapeHTML(item.id)}"
      >

        <div class="cart-item-image">

          <a
            href="product-details.html?id=${encodeURIComponent(
              product.id
            )}"
          >
            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              width="220"
              height="180"
            >
          </a>

        </div>

        <div class="cart-item-details">

          <p class="product-category">
            ${escapeHTML(product.category || "")}
          </p>

          <h2 class="cart-item-title">

            <a
              href="product-details.html?id=${encodeURIComponent(
                product.id
              )}"
            >
              ${escapeHTML(product.name)}
            </a>

          </h2>

          <p class="cart-stock-status">
            <strong>Stock:</strong>
            ${escapeHTML(
              product.stockStatus ||
                "Confirm availability"
            )}
          </p>

          <div class="cart-item-options">

            ${
              lengths
                ? `
                  <div class="form-group">
                    <label
                      for="length-${escapeHTML(item.id)}"
                    >
                      Length
                    </label>

                    <select
                      id="length-${escapeHTML(item.id)}"
                      data-cart-option="length"
                      data-item-id="${escapeHTML(item.id)}"
                    >
                      ${lengths}
                    </select>
                  </div>
                `
                : ""
            }

            ${
              colours
                ? `
                  <div class="form-group">
                    <label
                      for="colour-${escapeHTML(item.id)}"
                    >
                      Colour
                    </label>

                    <select
                      id="colour-${escapeHTML(item.id)}"
                      data-cart-option="colour"
                      data-item-id="${escapeHTML(item.id)}"
                    >
                      ${colours}
                    </select>
                  </div>
                `
                : ""
            }

            ${
              gauges
                ? `
                  <div class="form-group">
                    <label
                      for="gauge-${escapeHTML(item.id)}"
                    >
                      Gauge
                    </label>

                    <select
                      id="gauge-${escapeHTML(item.id)}"
                      data-cart-option="gauge"
                      data-item-id="${escapeHTML(item.id)}"
                    >
                      ${gauges}
                    </select>
                  </div>
                `
                : ""
            }

          </div>

          <div class="cart-item-price">

            <span>
              Unit price:
              <strong>${formatMoney(unitPrice)}</strong>
            </span>

            <span>
              ${escapeHTML(
                product.priceUnit ||
                  "per item"
              )}
            </span>

          </div>

        </div>

        <div class="cart-item-actions">

          <div
            class="quantity-control"
            aria-label="Quantity controls"
          >

            <button
              type="button"
              data-cart-decrease="${escapeHTML(item.id)}"
              aria-label="Decrease quantity"
            >
              <i class="fa-solid fa-minus"></i>
            </button>

            <input
              type="number"
              min="1"
              step="1"
              value="${Math.max(
                1,
                toNumber(item.quantity, 1)
              )}"
              data-cart-quantity="${escapeHTML(item.id)}"
              aria-label="Product quantity"
            >

            <button
              type="button"
              data-cart-increase="${escapeHTML(item.id)}"
              aria-label="Increase quantity"
            >
              <i class="fa-solid fa-plus"></i>
            </button>

          </div>

          <div class="cart-item-total">

            <span>Item total</span>

            <strong>
              ${formatMoney(itemTotal)}
            </strong>

          </div>

          <button
            type="button"
            class="remove-cart-item"
            data-cart-remove="${escapeHTML(item.id)}"
          >
            <i class="fa-solid fa-trash"></i>
            Remove
          </button>

        </div>

      </article>
    `;
  }

  function createLengthOptions(product, selectedLength) {
    if (
      !Array.isArray(product.availableLengths) ||
      product.availableLengths.length === 0
    ) {
      if (selectedLength) {
        return `
          <option value="${escapeHTML(
            selectedLength
          )}">
            ${escapeHTML(selectedLength)} m
          </option>
        `;
      }

      return "";
    }

    return product.availableLengths
      .map((length) => {
        const selected =
          String(length) === String(selectedLength);

        return `
          <option
            value="${escapeHTML(length)}"
            ${selected ? "selected" : ""}
          >
            ${escapeHTML(length)} m
          </option>
        `;
      })
      .join("");
  }

  function createColourOptions(product, selectedColour) {
    if (
      !Array.isArray(product.colours) ||
      product.colours.length === 0
    ) {
      return `
        <option value="${escapeHTML(
          selectedColour || "Not specified"
        )}">
          ${escapeHTML(
            selectedColour || "Confirm colour"
          )}
        </option>
      `;
    }

    return product.colours
      .map((colour) => {
        const selected =
          String(colour) === String(selectedColour);

        return `
          <option
            value="${escapeHTML(colour)}"
            ${selected ? "selected" : ""}
          >
            ${escapeHTML(colour)}
          </option>
        `;
      })
      .join("");
  }

  function createGaugeOptions(product, selectedGauge) {
    const gauges = Array.isArray(product.gauge)
      ? product.gauge
      : [];

    if (gauges.length === 0) {
      return `
        <option value="${escapeHTML(
          selectedGauge || "Not specified"
        )}">
          ${escapeHTML(
            selectedGauge || "Confirm gauge"
          )}
        </option>
      `;
    }

    return gauges
      .map((gauge) => {
        const selected =
          String(gauge) === String(selectedGauge);

        const label =
          String(gauge) === "N/A"
            ? "N/A"
            : `Gauge ${gauge}`;

        return `
          <option
            value="${escapeHTML(gauge)}"
            ${selected ? "selected" : ""}
          >
            ${escapeHTML(label)}
          </option>
        `;
      })
      .join("");
  }

  /* ----------------------------------------------------------
     SUMMARY
  ---------------------------------------------------------- */

  function updateSummary(totals) {
    const subtotalElement = select(
      SELECTORS.subtotal
    );

    const deliveryElement = select(
      SELECTORS.delivery
    );

    const totalElement = select(
      SELECTORS.total
    );

    if (subtotalElement) {
      subtotalElement.textContent =
        formatMoney(totals.subtotal);
    }

    if (deliveryElement) {
      deliveryElement.textContent =
        totals.delivery === 0
          ? "Free"
          : formatMoney(totals.delivery);
    }

    if (totalElement) {
      totalElement.textContent =
        formatMoney(totals.total);
    }
  }

  function toggleCartPageState(isEmpty) {
    const emptyCart = select(
      SELECTORS.emptyCart
    );

    const cartContent = select(
      SELECTORS.cartContent
    );

    const summary = select(
      SELECTORS.cartSummary
    );

    if (emptyCart) {
      emptyCart.hidden = !isEmpty;
    }

    if (cartContent) {
      cartContent.hidden = isEmpty;
    }

    if (summary) {
      summary.hidden = isEmpty;
    }
  }

  /* ----------------------------------------------------------
     WHATSAPP CHECKOUT
  ---------------------------------------------------------- */

  function checkoutOnWhatsApp() {
    const cart = getCart();

    if (cart.length === 0) {
      showNotification(
        "Add products to your cart before checking out.",
        "warning"
      );

      return;
    }

    const validItems = cart
      .map((item) => ({
        item,
        product: getProductById(item.productId)
      }))
      .filter(({ product }) => product);

    if (validItems.length === 0) {
      showNotification(
        "Your cart does not contain valid products.",
        "error"
      );

      return;
    }

    const customerForm = select("#checkout-customer-form");
    const customer = {
      name: select("#checkout-name")?.value.trim() || "",
      phone: select("#checkout-phone")?.value.trim() || "",
      county: select("#checkout-county")?.value.trim() || "",
      location: select("#checkout-location")?.value.trim() || "",
      instructions: select("#checkout-instructions")?.value.trim() || ""
    };

    if (customerForm && !customerForm.checkValidity()) {
      customerForm.reportValidity();
      showNotification(
        "Please complete your name, phone number, county, and delivery location.",
        "warning"
      );
      return;
    }

    const totals = calculateCartTotals(cart);

    const orderLines = validItems.flatMap(
      ({ item, product }, index) => {
        const unitPrice =
          calculateUnitPrice(item, product);

        const itemTotal =
          calculateItemTotal(item, product);

        return [
          `${index + 1}. ${product.name}`,
          `   Quantity: ${item.quantity}`,
          item.length
            ? `   Length: ${item.length} metres`
            : null,
          item.colour
            ? `   Colour: ${item.colour}`
            : null,
          item.gauge
            ? `   Gauge: ${item.gauge}`
            : null,
          `   Unit price: ${formatMoney(unitPrice)}`,
          `   Item total: ${formatMoney(itemTotal)}`,
          ""
        ].filter(Boolean);
      }
    );

    const message = [
      `Hello ${BUSINESS.name},`,
      "",
      "I would like to place the following roofing order:",
      "",
      ...orderLines,
      `Subtotal: ${formatMoney(totals.subtotal)}`,
      "Delivery: Free",
      `Grand Total: ${formatMoney(totals.total)}`,
      "",
      "Please confirm:",
      "- Delivery location",
      "- Payment instructions",
      "",
      `Customer Name: ${customer.name}`,
      `Phone Number: ${customer.phone}`,
      `County: ${customer.county}`,
      `Town/Delivery Location: ${customer.location}`,
      customer.instructions
        ? `Additional Instructions: ${customer.instructions}`
        : null
    ].filter((line) => line !== null).join("\n");

    window.open(
      createWhatsAppLink(message),
      "_blank",
      "noopener"
    );

    showNotification(
      "Your order has been prepared for WhatsApp.",
      "success"
    );
  }

  /* ----------------------------------------------------------
     CART EVENTS
  ---------------------------------------------------------- */

  function initializeCartEvents() {
    document.addEventListener("click", (event) => {
      const increaseButton = event.target.closest(
        "[data-cart-increase]"
      );

      if (increaseButton) {
        increaseQuantity(
          increaseButton.dataset.cartIncrease
        );

        return;
      }

      const decreaseButton = event.target.closest(
        "[data-cart-decrease]"
      );

      if (decreaseButton) {
        decreaseQuantity(
          decreaseButton.dataset.cartDecrease
        );

        return;
      }

      const removeButton = event.target.closest(
        "[data-cart-remove]"
      );

      if (removeButton) {
        removeCartItem(
          removeButton.dataset.cartRemove
        );

        return;
      }

      const addButton = event.target.closest(
        "[data-add-cart-id]"
      );

      if (addButton) {
        addToCart(addButton.dataset.addCartId);
      }
    });

    document.addEventListener("change", (event) => {
      const quantityInput = event.target.closest(
        "[data-cart-quantity]"
      );

      if (quantityInput) {
        updateQuantity(
          quantityInput.dataset.cartQuantity,
          quantityInput.value
        );

        return;
      }

      const optionSelect = event.target.closest(
        "[data-cart-option]"
      );

      if (optionSelect) {
        updateItemOption(
          optionSelect.dataset.itemId,
          optionSelect.dataset.cartOption,
          optionSelect.value
        );
      }
    });

    select(SELECTORS.clearCart)?.addEventListener(
      "click",
      clearCart
    );

    select(
      SELECTORS.checkoutButton
    )?.addEventListener(
      "click",
      checkoutOnWhatsApp
    );
  }

  /* ----------------------------------------------------------
     STORAGE SYNCHRONIZATION
  ---------------------------------------------------------- */

  function initializeStorageSync() {
    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) {
        updateCartCounter();
        renderCart();
      }
    });
  }

  /* ----------------------------------------------------------
     INITIALIZATION
  ---------------------------------------------------------- */

  function initializeCart() {
    updateCartCounter();
    renderCart();
    initializeCartEvents();
    initializeStorageSync();
  }

  /* ----------------------------------------------------------
     EXPOSE FUNCTIONS GLOBALLY
  ---------------------------------------------------------- */

  window.getRoyalMabatiCart = getCart;
  window.saveRoyalMabatiCart = saveCart;
  window.addProductToCart = addToCart;
  window.removeRoyalMabatiCartItem =
    removeCartItem;
  window.clearRoyalMabatiCart = clearCart;
  window.calculateRoyalMabatiCartTotals =
    calculateCartTotals;
  window.checkoutRoyalMabatiCart =
    checkoutOnWhatsApp;

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeCart
    );
  } else {
    initializeCart();
  }
})();
