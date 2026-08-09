"use strict";

(() => {
  const BUSINESS = {
    name: "ROYAL MABATI FACTORY LTD",
    phone: "0752523422",
    internationalPhone: "254752523422"
  };

  const TRANSPARENT_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

  function select(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function selectAll(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function showToast(message, type = "success") {
    let container = select("#toast-container");

    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "true");
      document.body.appendChild(container);
    }

    const supportedTypes = new Set(["success", "error", "warning", "info"]);
    const safeType = supportedTypes.has(type) ? type : "info";
    const icons = {
      success: "fa-circle-check",
      error: "fa-circle-exclamation",
      warning: "fa-triangle-exclamation",
      info: "fa-circle-info"
    };

    const toast = document.createElement("div");
    toast.className = `toast ${safeType}`;
    toast.setAttribute("role", safeType === "error" ? "alert" : "status");
    toast.innerHTML = `
      <i class="fa-solid ${icons[safeType]}" aria-hidden="true"></i>
      <span>${escapeHTML(message)}</span>
      <button type="button" class="toast-close" aria-label="Close notification">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    const remove = () => {
      toast.classList.add("toast-leaving");
      window.setTimeout(() => toast.remove(), 220);
    };

    select(".toast-close", toast)?.addEventListener("click", remove);
    window.setTimeout(remove, 3500);
  }

  function initializeMobileMenu() {
    const menu = select("#mobile-menu");
    const openButton = select("#menu-toggle");
    const closeButton = select("#mobile-menu-close");

    if (!menu || !openButton) return;

    const open = () => {
      menu.classList.add("active");
      menu.setAttribute("aria-hidden", "false");
      openButton.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    };

    const close = () => {
      menu.classList.remove("active");
      menu.setAttribute("aria-hidden", "true");
      openButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    openButton.addEventListener("click", open);
    closeButton?.addEventListener("click", close);

    menu.addEventListener("click", (event) => {
      if (event.target === menu) close();
    });

    selectAll("a", menu).forEach((link) => {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("active")) {
        close();
        openButton.focus();
      }
    });
  }

  function initializeBackToTop() {
    const button = select("#back-to-top");
    if (!button) return;

    const update = () => {
      button.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    button.addEventListener("click", () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function initializeCurrentYear() {
    selectAll("#current-year").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
  }

  function initializeNewsletter() {
    selectAll("#newsletter-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = String(new FormData(form).get("email") || "").trim();

        if (!email || !email.includes("@")) {
          showToast("Enter a valid email address.", "error");
          return;
        }

        try {
          localStorage.setItem("royalMabatiNewsletter", email);
        } catch (error) {
          console.warn("Newsletter preference could not be saved.", error);
        }

        form.reset();
        showToast("Thank you for subscribing.", "success");
      });
    });
  }

  function closeQuickView() {
    const modal = select("#quick-view-modal");
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  function openQuickView(productId) {
    const product =
      typeof window.getProductById === "function"
        ? window.getProductById(productId)
        : window.PRODUCTS?.find((item) => item.id === productId);

    const modal = select("#quick-view-modal");
    const content = select("#quick-view-content");

    if (!product || !modal || !content) {
      window.location.href =
        `product-details.html?id=${encodeURIComponent(productId)}`;
      return;
    }

    const price =
      typeof window.formatKSh === "function"
        ? window.formatKSh(product.price)
        : `KSh ${Number(product.price || 0).toLocaleString("en-KE")}`;

    content.innerHTML = `
      <div class="quick-view-grid">
        <img src="${escapeHTML(product.image || "")}" alt="${escapeHTML(product.name)}">
        <div>
          <p class="product-category">${escapeHTML(product.categoryName || product.category || "Mabati")}</p>
          <h2 id="quick-view-title">${escapeHTML(product.name)}</h2>
          <p>${escapeHTML(product.shortDescription || product.description || "")}</p>
          <p class="current-price">${price}</p>
          <div class="product-detail-actions">
            <a class="btn btn-outline" href="product-details.html?id=${encodeURIComponent(product.id)}">
              View Details
            </a>
            <button type="button" class="btn btn-primary" data-add-cart-id="${escapeHTML(product.id)}">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }

  function initializeQuickView() {
    const modal = select("#quick-view-modal");
    const closeButton = select("#quick-view-close");

    closeButton?.addEventListener("click", closeQuickView);

    modal?.addEventListener("click", (event) => {
      if (event.target === modal) closeQuickView();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal?.classList.contains("active")) {
        closeQuickView();
      }
    });
  }

  function initializeGlobalSearch() {
    select("#open-search")?.addEventListener("click", () => {
      const search = select("#product-search");
      if (search) {
        search.focus();
        search.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.location.href = "products.html";
      }
    });
  }

  function formatProductPrice(product) {
    if (typeof window.formatKSh === "function") {
      return window.formatKSh(product.price);
    }

    return `KSh ${Number(product.price || 0).toLocaleString("en-KE")}`;
  }

  function createFeaturedProductCard(product) {
    const gauges = Array.isArray(product.gauge)
      ? product.gauge.join(", ")
      : product.gauge || product.defaultGauge || "Confirm";
    const colours = Array.isArray(product.colours)
      ? product.colours.slice(0, 3).join(", ")
      : product.colours || "Confirm available colours";

    return `
      <article class="product-card" data-product-id="${escapeHTML(product.id)}">
        <div class="product-image-wrap">
          <img
            src="${escapeHTML(product.image || "images/roofing-placeholder.jpg")}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            decoding="async"
          >
          <div class="product-badges">
            ${product.freeDelivery ? '<span class="badge badge-delivery">Free Delivery</span>' : ""}
            <span class="badge badge-stock">In Stock</span>
          </div>
          <div class="product-actions-top">
            <button type="button" class="icon-btn" data-wishlist-id="${escapeHTML(product.id)}" aria-label="Add ${escapeHTML(product.name)} to wishlist">
              <i class="fa-regular fa-heart"></i>
            </button>
            <button type="button" class="icon-btn" data-quick-view-id="${escapeHTML(product.id)}" aria-label="Quick view ${escapeHTML(product.name)}">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
        </div>
        <div class="product-content">
          <p class="product-category">${escapeHTML(product.categoryName || product.category || "Mabati")}</p>
          <h3 class="product-title">
            <a href="product-details.html?id=${encodeURIComponent(product.id)}">${escapeHTML(product.name)}</a>
          </h3>
          <div class="product-meta">
            <span><i class="fa-solid fa-layer-group"></i> Gauge: ${escapeHTML(gauges)}</span>
            <span><i class="fa-solid fa-paint-roller"></i> ${escapeHTML(product.finish || "Roofing finish")}</span>
          </div>
          <p class="product-colours"><strong>Colours:</strong> ${escapeHTML(colours)}</p>
          <div class="product-price">
            <span class="current-price">${formatProductPrice(product)}</span>
          </div>
          <p class="price-note">${escapeHTML(product.priceUnit || "Confirm price unit")}</p>
          <div class="product-card-buttons">
            <button type="button" class="btn btn-primary" data-add-cart-id="${escapeHTML(product.id)}">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
            <a class="btn btn-outline" href="product-details.html?id=${encodeURIComponent(product.id)}">View Details</a>
          </div>
        </div>
      </article>
    `;
  }

  function renderFeaturedProducts() {
    const grid = select("#featured-product-grid");
    if (!grid) return;

    const products = Array.isArray(window.PRODUCTS)
      ? window.PRODUCTS.filter(
          (product) => product.featured && product.availability !== false
        ).slice(0, 4)
      : [];

    if (products.length === 0) {
      grid.innerHTML = '<p class="empty-state">Featured products are temporarily unavailable. <a href="products.html">View all products</a>.</p>';
      return;
    }

    grid.innerHTML = products.map(createFeaturedProductCard).join("");
  }

  function initializeFeaturedProductActions() {
    document.addEventListener("click", (event) => {
      const quickViewButton = event.target.closest("[data-quick-view-id]");
      if (quickViewButton) {
        openQuickView(quickViewButton.dataset.quickViewId);
      }
    });
  }


  function initializeMobileBottomNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    let nav = document.querySelector(".store-mobile-nav");

    if (!nav) {
      nav = document.createElement("nav");
      nav.className = "store-mobile-nav";
      nav.setAttribute("aria-label", "Mobile store navigation");
      nav.innerHTML = `
        <a href="index.html" class="${currentPage === "index.html" ? "active" : ""}">
          <i class="fa-solid fa-house"></i><span>Home</span>
        </a>
        <a href="products.html" class="${currentPage === "products.html" ? "active" : ""}">
          <i class="fa-solid fa-store"></i><span>Products</span>
        </a>
        <button type="button" data-mobile-search aria-label="Search products">
          <i class="fa-solid fa-magnifying-glass"></i><span>Search</span>
        </button>
        <a href="wishlist.html" class="${currentPage === "wishlist.html" ? "active" : ""}">
          <i class="fa-solid fa-heart"></i><span>Wishlist</span>
        </a>
        <a href="cart.html" class="${currentPage === "cart.html" ? "active" : ""}">
          <i class="fa-solid fa-cart-shopping"></i><span>Cart</span>
        </a>
      `;
      document.body.appendChild(nav);
    }

    if (nav.dataset.initialized === "true") return;
    nav.dataset.initialized = "true";

    nav.querySelector("[data-mobile-search]")?.addEventListener("click", () => {
      const search = document.querySelector("#product-search");
      if (search) {
        search.scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(() => search.focus(), 350);
      } else {
        window.location.href = "products.html?focus=search";
      }
    });
  }

  function initializeImageFallbacks() {
    document.addEventListener("error", (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.src = TRANSPARENT_IMAGE;
      image.classList.add("image-fallback");
    }, true);
  }

  function initializeLazyFrames() {
    const frames = selectAll("iframe[data-lazy-src]");
    if (frames.length === 0) return;

    const loadFrame = (frame) => {
      if (!frame.dataset.lazySrc) return;
      frame.src = frame.dataset.lazySrc;
      frame.removeAttribute("data-lazy-src");
    };

    if (!("IntersectionObserver" in window)) {
      window.addEventListener("load", () => frames.forEach(loadFrame), { once: true });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadFrame(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "400px 0px" });

    frames.forEach((frame) => observer.observe(frame));
  }

  function initializeFAQs() {
    selectAll(".faq-item").forEach((item, index) => {
      const question = select(".faq-question", item);
      const answer = select(".faq-answer", item);
      if (!question || !answer) return;

      const answerId = answer.id || `faq-answer-${index + 1}`;
      answer.id = answerId;
      question.setAttribute("aria-controls", answerId);

      const setExpanded = (expanded) => {
        item.classList.toggle("active", expanded);
        question.setAttribute("aria-expanded", String(expanded));
        answer.hidden = !expanded;
      };

      setExpanded(item.classList.contains("active"));
      question.addEventListener("click", () => {
        setExpanded(question.getAttribute("aria-expanded") !== "true");
      });
    });
  }

  function initializeApp() {
    initializeMobileMenu();
    initializeBackToTop();
    initializeCurrentYear();
    initializeNewsletter();
    initializeQuickView();
    initializeGlobalSearch();
    renderFeaturedProducts();
    initializeFeaturedProductActions();
    initializeMobileBottomNavigation();
    initializeImageFallbacks();
    initializeLazyFrames();
    initializeFAQs();
  }

  window.showToast = showToast;
  window.openQuickView = openQuickView;
  window.closeQuickView = closeQuickView;
  window.ROYAL_MABATI_BUSINESS = BUSINESS;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }
})();
