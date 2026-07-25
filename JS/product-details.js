(() => {
  const BUSINESS = {
    name: "ROYAL MABATI FACTORY LTD",
    phone: "0752523422",
    internationalPhone: "254752523422",
    currency: "KSh"
  };

  let currentProduct = null;

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

    return `${BUSINESS.currency} ${Math.round(
      toNumber(amount)
    ).toLocaleString("en-KE")}`;
  }

  function createWhatsAppLink(message) {
    return `https://wa.me/${BUSINESS.internationalPhone}?text=${encodeURIComponent(
      message
    )}`;
  }

  function showNotification(message, type = "success") {
    if (typeof window.showToast === "function") {
      window.showToast(message, type);
      return;
    }

    console.log(`${type.toUpperCase()}: ${message}`);
  }

  function getProductById(productId) {
    if (typeof window.getProductById === "function") {
      return window.getProductById(productId);
    }

    if (!Array.isArray(window.PRODUCTS)) {
      return null;
    }

    return (
      window.PRODUCTS.find((product) => product.id === productId) ||
      null
    );
  }

  function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
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
      ? [...new Set(product.colours.map(String))]
      : [];
  }

  function getProductLengths(product) {
    return Array.isArray(product.availableLengths)
      ? [...new Set(product.availableLengths)]
      : [];
  }

  function getProductImages(product) {
    const images = [];

    if (product.image) {
      images.push(product.image);
    }

    if (Array.isArray(product.images)) {
      images.push(...product.images);
    }

    if (Array.isArray(product.gallery)) {
      images.push(...product.gallery);
    }

    return [...new Set(images.filter(Boolean))];
  }

  function getDiscount(product) {
    if (typeof window.getDiscountPercentage === "function") {
      return window.getDiscountPercentage(product);
    }

    const oldPrice = toNumber(product.oldPrice);
    const price = toNumber(product.price);

    if (!oldPrice || oldPrice <= price) {
      return 0;
    }

    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  function calculateProductTotal(
    product,
    quantity,
    selectedLength
  ) {
    const safeQuantity = Math.max(
      1,
      Math.floor(toNumber(quantity, 1))
    );

    const price = toNumber(product.price);
    const priceUnit = String(product.priceUnit || "").toLowerCase();
    const length = toNumber(selectedLength);

    if (
      length > 0 &&
      (
        priceUnit.includes("metre") ||
        priceUnit.includes("meter") ||
        priceUnit.includes("/m")
      )
    ) {
      return price * length * safeQuantity;
    }

    return price * safeQuantity;
  }

  function getSelectedOptions() {
    return {
      gauge:
        select("#product-gauge")?.value ||
        currentProduct?.defaultGauge ||
        "Not specified",

      colour:
        select("#product-colour")?.value ||
        currentProduct?.colours?.[0] ||
        "Not specified",

      length:
        select("#product-length")?.value
          ? toNumber(select("#product-length").value)
          : null,

      quantity: Math.max(
        1,
        Math.floor(
          toNumber(select("#product-quantity")?.value, 1)
        )
      )
    };
  }

  /* ----------------------------------------------------------
     PAGE STATE
  ---------------------------------------------------------- */

  function showLoadingState() {
    select("#product-loading")?.classList.remove("hidden");
    select("#product-not-found")?.classList.add("hidden");
    select("#product-details-container")?.classList.add("hidden");
    select("#product-tabs")?.classList.add("hidden");
  }

  function showProductState() {
    select("#product-loading")?.classList.add("hidden");
    select("#product-not-found")?.classList.add("hidden");
    select("#product-details-container")?.classList.remove("hidden");
    select("#product-tabs")?.classList.remove("hidden");
  }

  function showNotFoundState() {
    select("#product-loading")?.classList.add("hidden");
    select("#product-not-found")?.classList.remove("hidden");
    select("#product-details-container")?.classList.add("hidden");
    select("#product-tabs")?.classList.add("hidden");

    const relatedGrid = select("#related-products-grid");

    if (relatedGrid) {
      relatedGrid.innerHTML = "";
    }
  }

  /* ----------------------------------------------------------
     PRODUCT RENDERING
  ---------------------------------------------------------- */

  function renderProduct(product) {
    currentProduct = product;

    updatePageMetadata(product);
    renderMainDetails(product);
    renderGallery(product);
    renderSelectors(product);
    renderSpecifications(product);
    renderDescription(product);
    renderStock(product);
    renderBadges(product);
    renderRating(product);
    renderRelatedProducts(product);
    updateWishlistButton();
    updateEstimatedTotal();
    updateWhatsAppLink();

    showProductState();
  }

  function renderMainDetails(product) {
    setText("#page-product-title", product.name);
    setText("#breadcrumb-product-name", product.name);
    setText("#product-name", product.name);
    setText("#product-category", product.category || "Mabati");
    setText("#product-current-price", formatMoney(product.price));
    setText(
      "#product-price-note",
      product.priceNote ||
        `${product.priceUnit || "Per item"}. Confirm current price before ordering.`
    );
    setText(
      "#product-description",
      product.shortDescription ||
        product.description ||
        "Quality roofing product supplied by ROYAL MABATI FACTORY LTD."
    );

    const oldPrice = select("#product-old-price");

    if (oldPrice) {
      if (
        product.oldPrice &&
        toNumber(product.oldPrice) > toNumber(product.price)
      ) {
        oldPrice.textContent = formatMoney(product.oldPrice);
        oldPrice.classList.remove("hidden");
      } else {
        oldPrice.classList.add("hidden");
      }
    }

    const deliveryNote = select("#product-delivery-note");

    if (deliveryNote) {
      deliveryNote.innerHTML = product.freeDelivery === false
        ? `
          <i class="fa-solid fa-truck"></i>
          Confirm delivery terms before ordering
        `
        : `
          <i class="fa-solid fa-truck-fast"></i>
          Free delivery available across Kenya
        `;
    }

    const addButton = select("#add-product-to-cart");
    const available =
      product.availability !== false &&
      product.stockStatus !== "Out of Stock";

    if (addButton) {
      addButton.disabled = !available;
      addButton.innerHTML = available
        ? `
          <i class="fa-solid fa-cart-plus"></i>
          Add to Cart
        `
        : `
          <i class="fa-solid fa-ban"></i>
          Out of Stock
        `;
    }
  }

  function setText(selector, value) {
    const element = select(selector);

    if (element) {
      element.textContent = String(value ?? "");
    }
  }

  /* ----------------------------------------------------------
     PRODUCT GALLERY
  ---------------------------------------------------------- */

  function renderGallery(product) {
    const images = getProductImages(product);
    const mainImage = select("#main-product-image");
    const thumbnailList = select("#product-thumbnail-list");

    if (!mainImage) {
      return;
    }

    const firstImage =
      images[0] ||
      createImagePlaceholder(product.name);

    mainImage.src = firstImage;
    mainImage.alt = product.name;

    if (!thumbnailList) {
      return;
    }

    if (images.length <= 1) {
      thumbnailList.innerHTML = "";
      thumbnailList.hidden = true;
      return;
    }

    thumbnailList.hidden = false;

    thumbnailList.innerHTML = images
      .map(
        (image, index) => `
          <button
            type="button"
            class="thumbnail ${index === 0 ? "active" : ""}"
            data-product-image="${escapeHTML(image)}"
            aria-label="View image ${index + 1} of ${escapeHTML(product.name)}"
          >
            <img
              src="${escapeHTML(image)}"
              alt="${escapeHTML(product.name)} view ${index + 1}"
              loading="lazy"
              width="180"
              height="120"
            >
          </button>
        `
      )
      .join("");
  }

  function initializeGalleryEvents() {
    document.addEventListener("click", (event) => {
      const thumbnail = event.target.closest("[data-product-image]");

      if (!thumbnail) {
        return;
      }

      const image = thumbnail.dataset.productImage;
      const mainImage = select("#main-product-image");

      if (mainImage && image) {
        mainImage.src = image;
      }

      selectAll("[data-product-image]").forEach((button) => {
        button.classList.toggle("active", button === thumbnail);
      });
    });
  }

  /* ----------------------------------------------------------
     PRODUCT SELECTORS
  ---------------------------------------------------------- */

  function renderSelectors(product) {
    renderSelectOptions(
      "#product-gauge",
      getProductGauges(product),
      (value) => `Gauge ${value}`,
      product.defaultGauge
    );

    renderSelectOptions(
      "#product-colour",
      getProductColours(product),
      (value) => value,
      product.colours?.[0]
    );

    renderSelectOptions(
      "#product-length",
      getProductLengths(product),
      (value) => `${value} metres`,
      product.availableLengths?.[0]
    );

    toggleSelectorGroup(
      "#gauge-selector-group",
      getProductGauges(product).length > 0
    );

    toggleSelectorGroup(
      "#colour-selector-group",
      getProductColours(product).length > 0
    );

    toggleSelectorGroup(
      "#length-selector-group",
      getProductLengths(product).length > 0
    );
  }

  function renderSelectOptions(
    selector,
    values,
    formatter,
    selectedValue
  ) {
    const selectElement = select(selector);

    if (!selectElement) {
      return;
    }

    if (!Array.isArray(values) || values.length === 0) {
      selectElement.innerHTML = `
        <option value="">
          Not specified
        </option>
      `;
      return;
    }

    selectElement.innerHTML = values
      .map((value, index) => {
        const selected =
          String(value) === String(selectedValue) ||
          (!selectedValue && index === 0);

        return `
          <option
            value="${escapeHTML(value)}"
            ${selected ? "selected" : ""}
          >
            ${escapeHTML(formatter(value))}
          </option>
        `;
      })
      .join("");
  }

  function toggleSelectorGroup(selector, visible) {
    const group = select(selector);

    if (group) {
      group.hidden = !visible;
    }
  }

  /* ----------------------------------------------------------
     STOCK, BADGES, AND RATINGS
  ---------------------------------------------------------- */

  function renderStock(product) {
    const stock = select("#product-stock");
    const stockText = select("#product-stock-text");

    if (!stock || !stockText) {
      return;
    }

    const status = product.stockStatus || "Confirm availability";
    const normalized = String(status).toLowerCase();

    stock.classList.remove(
      "in-stock",
      "low-stock",
      "out-of-stock",
      "preorder"
    );

    if (normalized === "in stock") {
      stock.classList.add("in-stock");
    } else if (normalized === "limited stock") {
      stock.classList.add("low-stock");
    } else if (normalized === "out of stock") {
      stock.classList.add("out-of-stock");
    } else {
      stock.classList.add("preorder");
    }

    stockText.textContent = status;
  }

  function renderBadges(product) {
    const container = select("#product-detail-badges");

    if (!container) {
      return;
    }

    const badges = [];
    const discount = getDiscount(product);

    if (discount > 0) {
      badges.push(`
        <span class="badge badge-sale">
          Save ${discount}%
        </span>
      `);
    }

    if (product.featured) {
      badges.push(`
        <span class="badge badge-order">
          Featured
        </span>
      `);
    }

    if (product.freeDelivery !== false) {
      badges.push(`
        <span class="badge badge-delivery">
          Free Delivery
        </span>
      `);
    }

    badges.push(`
      <span class="badge ${getStockBadgeClass(product.stockStatus)}">
        ${escapeHTML(product.stockStatus || "Confirm Stock")}
      </span>
    `);

    container.innerHTML = badges.join("");
  }

  function getStockBadgeClass(stockStatus) {
    const status = String(stockStatus || "").toLowerCase();

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

  function renderRating(product) {
    const rating = Math.min(
      5,
      Math.max(0, toNumber(product.rating, 4.5))
    );

    const reviewCount = Math.max(
      0,
      Math.floor(toNumber(product.reviewCount, 0))
    );

    const starsContainer = select("#product-rating-stars");

    if (starsContainer) {
      starsContainer.innerHTML = Array.from(
        { length: 5 },
        (_, index) => {
          const position = index + 1;

          if (rating >= position) {
            return '<i class="fa-solid fa-star"></i>';
          }

          if (rating >= position - 0.5) {
            return '<i class="fa-solid fa-star-half-stroke"></i>';
          }

          return '<i class="fa-regular fa-star"></i>';
        }
      ).join("");

      starsContainer.setAttribute(
        "aria-label",
        `${rating.toFixed(1)} out of 5 stars`
      );
    }

    setText("#product-rating-text", rating.toFixed(1));
    setText(
      "#product-review-count",
      `(${reviewCount} review${reviewCount === 1 ? "" : "s"})`
    );
  }

  /* ----------------------------------------------------------
     DESCRIPTION AND SPECIFICATIONS
  ---------------------------------------------------------- */

  function renderDescription(product) {
    const description =
      product.longDescription ||
      product.description ||
      product.shortDescription ||
      "Quality roofing product supplied by ROYAL MABATI FACTORY LTD.";

    const container = select("#full-product-description");

    if (container) {
      container.innerHTML = `
        <p>${escapeHTML(description)}</p>
      `;
    }
  }

  function renderSpecifications(product) {
    const container = select("#product-specifications");

    if (!container) {
      return;
    }

    const rows = [
      ["Product Name", product.name],
      ["Category", product.category],
      ["Subcategory", product.subcategory],
      ["Profile", product.profile],
      ["Gauge", getProductGauges(product).join(", ")],
      ["Finish", product.finish],
      ["Coating", product.coating],
      ["Colours", getProductColours(product).join(", ")],
      [
        "Available Lengths",
        getProductLengths(product).length
          ? getProductLengths(product)
              .map((length) => `${length} m`)
              .join(", ")
          : ""
      ],
      ["Effective Width", product.effectiveWidth],
      ["Price Unit", product.priceUnit],
      ["Stock Status", product.stockStatus],
      [
        "Delivery",
        product.freeDelivery === false
          ? "Confirm delivery terms"
          : "Free delivery across Kenya"
      ],
      ["Warranty", product.warranty]
    ].filter(([, value]) => value !== undefined && value !== null && value !== "");

    container.innerHTML = `
      <div class="result-list">
        ${rows
          .map(
            ([label, value]) => `
              <div class="result-item">
                <span>${escapeHTML(label)}</span>
                <strong class="result-value">
                  ${escapeHTML(value)}
                </strong>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  /* ----------------------------------------------------------
     PRICE AND QUANTITY
  ---------------------------------------------------------- */

  function updateEstimatedTotal() {
    if (!currentProduct) {
      return;
    }

    const options = getSelectedOptions();
    const total = calculateProductTotal(
      currentProduct,
      options.quantity,
      options.length
    );

    setText("#product-estimated-total", formatMoney(total));
    updateWhatsAppLink();
  }

  function initializeQuantityControls() {
    const input = select("#product-quantity");

    select("#increase-product-quantity")?.addEventListener(
      "click",
      () => {
        if (!input) {
          return;
        }

        input.value = String(
          Math.max(1, toNumber(input.value, 1)) + 1
        );

        updateEstimatedTotal();
      }
    );

    select("#decrease-product-quantity")?.addEventListener(
      "click",
      () => {
        if (!input) {
          return;
        }

        input.value = String(
          Math.max(1, toNumber(input.value, 1) - 1)
        );

        updateEstimatedTotal();
      }
    );

    input?.addEventListener("input", () => {
      input.value = String(
        Math.max(1, Math.floor(toNumber(input.value, 1)))
      );

      updateEstimatedTotal();
    });

    [
      "#product-gauge",
      "#product-colour",
      "#product-length"
    ].forEach((selector) => {
      select(selector)?.addEventListener(
        "change",
        updateEstimatedTotal
      );
    });
  }

  /* ----------------------------------------------------------
     CART
  ---------------------------------------------------------- */

  function addCurrentProductToCart() {
    if (!currentProduct) {
      return;
    }

    const options = getSelectedOptions();

    if (typeof window.addProductToCart === "function") {
      window.addProductToCart(currentProduct.id, options);
      showCartSuccessMessage();
      return;
    }

    showNotification(
      "Cart functionality is unavailable. Confirm cart.js is loaded.",
      "error"
    );
  }

  function showCartSuccessMessage() {
    const message = select("#product-cart-success");

    if (!message) {
      return;
    }

    message.classList.add("active");

    window.setTimeout(() => {
      message.classList.remove("active");
    }, 3500);
  }

  /* ----------------------------------------------------------
     WISHLIST
  ---------------------------------------------------------- */

  function getWishlist() {
    if (typeof window.getRoyalMabatiWishlist === "function") {
      return window.getRoyalMabatiWishlist();
    }

    if (typeof window.getKenyaMabatiWishlist === "function") {
      return window.getKenyaMabatiWishlist();
    }

    try {
      return JSON.parse(
        localStorage.getItem("royalMabatiWishlist") || "[]"
      );
    } catch {
      return [];
    }
  }

  function isProductInWishlist(productId) {
    return getWishlist().some((item) =>
      typeof item === "string"
        ? item === productId
        : item.productId === productId
    );
  }

  function updateWishlistButton() {
    const button = select("#add-product-to-wishlist");

    if (!button || !currentProduct) {
      return;
    }

    const active = isProductInWishlist(currentProduct.id);

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));

    button.innerHTML = active
      ? `
        <i class="fa-solid fa-heart"></i>
        Remove from Wishlist
      `
      : `
        <i class="fa-regular fa-heart"></i>
        Add to Wishlist
      `;
  }

  function toggleCurrentProductWishlist() {
    if (!currentProduct) {
      return;
    }

    if (typeof window.toggleWishlist === "function") {
      window.toggleWishlist(currentProduct.id);
      window.setTimeout(updateWishlistButton, 0);
      return;
    }

    showNotification(
      "Wishlist functionality is unavailable. Confirm wishlist.js is loaded.",
      "error"
    );
  }

  /* ----------------------------------------------------------
     WHATSAPP ORDERING
  ---------------------------------------------------------- */

  function updateWhatsAppLink() {
    const link = select("#product-whatsapp-order");

    if (!link || !currentProduct) {
      return;
    }

    const options = getSelectedOptions();
    const total = calculateProductTotal(
      currentProduct,
      options.quantity,
      options.length
    );

    const message = [
      `Hello ${BUSINESS.name},`,
      "",
      `I would like to order: ${currentProduct.name}`,
      `Category: ${currentProduct.category || "Mabati"}`,
      options.gauge && options.gauge !== "Not specified"
        ? `Gauge: ${options.gauge}`
        : null,
      options.colour && options.colour !== "Not specified"
        ? `Colour: ${options.colour}`
        : null,
      options.length
        ? `Sheet Length: ${options.length} metres`
        : null,
      `Quantity: ${options.quantity}`,
      `Price: ${formatMoney(currentProduct.price)} ${currentProduct.priceUnit || ""}`,
      `Estimated Total: ${formatMoney(total)}`,
      "",
      "Please confirm current price, availability, measurements, and delivery details."
    ]
      .filter(Boolean)
      .join("\n");

    link.href = createWhatsAppLink(message);
  }

  /* ----------------------------------------------------------
     PRODUCT TABS
  ---------------------------------------------------------- */

  function initializeTabs() {
    const buttons = selectAll("[data-tab-target]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.tabTarget;

        buttons.forEach((currentButton) => {
          const active = currentButton === button;

          currentButton.classList.toggle("active", active);
          currentButton.setAttribute(
            "aria-selected",
            String(active)
          );
        });

        selectAll(".tab-panel").forEach((panel) => {
          panel.classList.toggle(
            "active",
            panel.id === targetId
          );
        });
      });
    });
  }

  /* ----------------------------------------------------------
     RELATED PRODUCTS
  ---------------------------------------------------------- */

  function renderRelatedProducts(product) {
    const grid = select("#related-products-grid");

    if (!grid || !Array.isArray(window.PRODUCTS)) {
      return;
    }

    const related = window.PRODUCTS
      .filter((candidate) => candidate.id !== product.id)
      .sort((a, b) => {
        const aCategoryMatch =
          a.category === product.category ? 1 : 0;
        const bCategoryMatch =
          b.category === product.category ? 1 : 0;

        return bCategoryMatch - aCategoryMatch;
      })
      .slice(0, 4);

    if (related.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-box-open"></i>
          <h3>No related products found</h3>
          <p>Browse all mabati products for more options.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = related
      .map(createRelatedProductCard)
      .join("");

    if (typeof window.updateWishlistButtons === "function") {
      window.updateWishlistButtons();
    }
  }

  function createRelatedProductCard(product) {
    const available =
      product.availability !== false &&
      product.stockStatus !== "Out of Stock";

    const productUrl = `product-details.html?id=${encodeURIComponent(
      product.id
    )}`;

    return `
      <article class="product-card">

        <div class="product-image-wrap">

          <a href="${productUrl}">
            <img
              src="${escapeHTML(product.image || "")}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              width="500"
              height="400"
            >
          </a>

          <div class="product-actions-top">

            <button
              type="button"
              class="icon-btn"
              data-related-wishlist-id="${escapeHTML(product.id)}"
              aria-label="Add ${escapeHTML(product.name)} to wishlist"
            >
              <i class="fa-regular fa-heart"></i>
            </button>

          </div>

        </div>

        <div class="product-content">

          <p class="product-category">
            ${escapeHTML(product.category || "Mabati")}
          </p>

          <h3 class="product-title">
            <a href="${productUrl}">
              ${escapeHTML(product.name)}
            </a>
          </h3>

          <div class="product-price">
            <span class="current-price">
              ${formatMoney(product.price)}
            </span>
          </div>

          <p class="price-note">
            ${escapeHTML(product.priceUnit || "per item")}
          </p>

          <div class="product-actions">

            <button
              type="button"
              class="add-to-cart-button"
              data-related-cart-id="${escapeHTML(product.id)}"
              ${available ? "" : "disabled"}
            >
              <i class="fa-solid fa-cart-plus"></i>
              ${available ? "Add to Cart" : "Out of Stock"}
            </button>

            <a
              href="${productUrl}"
              class="wishlist-button"
              aria-label="View ${escapeHTML(product.name)}"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </a>

          </div>

        </div>

      </article>
    `;
  }

  function initializeRelatedProductEvents() {
    document.addEventListener("click", (event) => {
      const cartButton = event.target.closest(
        "[data-related-cart-id]"
      );

      if (cartButton) {
        if (typeof window.addProductToCart === "function") {
          window.addProductToCart(
            cartButton.dataset.relatedCartId
          );
        }

        return;
      }

      const wishlistButton = event.target.closest(
        "[data-related-wishlist-id]"
      );

      if (wishlistButton) {
        if (typeof window.toggleWishlist === "function") {
          window.toggleWishlist(
            wishlistButton.dataset.relatedWishlistId
          );
        }
      }
    });
  }

  /* ----------------------------------------------------------
     SEO AND STRUCTURED DATA
  ---------------------------------------------------------- */

  function updatePageMetadata(product) {
    document.title =
      `${product.name} | ROYAL MABATI FACTORY LTD`;

    updateMeta(
      'meta[name="description"]',
      product.metaDescription ||
        product.description ||
        `View ${product.name} prices, colours, gauges, and availability from ROYAL MABATI FACTORY LTD.`
    );

    updateMeta(
      'meta[property="og:title"]',
      `${product.name} | ROYAL MABATI FACTORY LTD`
    );

    updateMeta(
      'meta[property="og:description"]',
      product.description ||
        `View ${product.name} product details and pricing.`
    );

    updateMeta(
      'meta[property="og:image"]',
      product.image || ""
    );

    updateMeta(
      'meta[name="twitter:title"]',
      `${product.name} | ROYAL MABATI FACTORY LTD`
    );

    updateMeta(
      'meta[name="twitter:description"]',
      product.description ||
        `View ${product.name} product details and pricing.`
    );

    updateMeta(
      'meta[name="twitter:image"]',
      product.image || ""
    );

    const canonical = select('link[rel="canonical"]');

    if (canonical) {
      canonical.href = window.location.href;
    }

    updateStructuredData(product);
  }

  function updateMeta(selector, content) {
    const element = select(selector);

    if (element && content) {
      element.setAttribute("content", content);
    }
  }

  function updateStructuredData(product) {
    const script = select("#product-structured-data");

    if (!script) {
      return;
    }

    const available =
      product.availability !== false &&
      product.stockStatus !== "Out of Stock";

    const data = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: getProductImages(product),
      description:
        product.description ||
        `Roofing product supplied by ${BUSINESS.name}.`,
      sku: product.sku || product.id,
      brand: {
        "@type": "Brand",
        name: BUSINESS.name
      },
      offers: {
        "@type": "Offer",
        url: window.location.href,
        priceCurrency: "KES",
        price: toNumber(product.price),
        availability: available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock"
      }
    };

    if (product.rating) {
      data.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: toNumber(product.rating),
        reviewCount: Math.max(
          1,
          Math.floor(toNumber(product.reviewCount, 1))
        )
      };
    }

    script.textContent = JSON.stringify(data, null, 2);
  }

  /* ----------------------------------------------------------
     IMAGE FALLBACK
  ---------------------------------------------------------- */

  function createImagePlaceholder(label) {
    const safeLabel = String(label || "Roofing Product")
      .slice(0, 35)
      .replace(/[<>&'"]/g, "");

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
        <rect width="100%" height="100%" fill="#f4f5f7"/>
        <path
          d="M160 370 L400 170 L640 370"
          fill="none"
          stroke="#b32025"
          stroke-width="34"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="245"
          y="350"
          width="310"
          height="150"
          rx="10"
          fill="#222222"
        />
        <text
          x="400"
          y="555"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="28"
          fill="#666666"
        >
          ${safeLabel}
        </text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  /* ----------------------------------------------------------
     EVENTS
  ---------------------------------------------------------- */

  function initializeActionEvents() {
    select("#add-product-to-cart")?.addEventListener(
      "click",
      addCurrentProductToCart
    );

    select("#add-product-to-wishlist")?.addEventListener(
      "click",
      toggleCurrentProductWishlist
    );

    document.addEventListener("wishlistUpdated", () => {
      updateWishlistButton();
    });
  }

  /* ----------------------------------------------------------
     INITIALIZATION
  ---------------------------------------------------------- */

  function initializeProductDetailsPage() {
    showLoadingState();

    initializeGalleryEvents();
    initializeQuantityControls();
    initializeActionEvents();
    initializeTabs();
    initializeRelatedProductEvents();

    const productId = getProductIdFromURL();

    if (!productId) {
      showNotFoundState();
      return;
    }

    if (!Array.isArray(window.PRODUCTS)) {
      console.error(
        "PRODUCTS data was not found. Make sure products.js loads before product-details.js."
      );

      showNotFoundState();
      return;
    }

    const product = getProductById(productId);

    if (!product) {
      showNotFoundState();
      return;
    }

    renderProduct(product);
  }

  /* ----------------------------------------------------------
     EXPOSE SELECTED FUNCTIONS
  ---------------------------------------------------------- */

  window.updateProductDetailsWishlistButton =
    updateWishlistButton;

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeProductDetailsPage
    );
  } else {
    initializeProductDetailsPage();
  }
})();

