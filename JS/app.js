"use strict";

(() => {
  const BUSINESS = {
    name: "ROYAL MABATI FACTORY LTD",
    phone: "0752523422",
    internationalPhone: "254752523422"
  };

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
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  function initializeApp() {
    initializeMobileMenu();
    initializeBackToTop();
    initializeCurrentYear();
    initializeNewsletter();
    initializeQuickView();
    initializeGlobalSearch();
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
