
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatMoney(value) {
    if (typeof window.formatKSh === "function") return window.formatKSh(value);
    return `KSh ${Number(value || 0).toLocaleString("en-KE")}`;
  }

  function productImage(product) {
    return product?.image || "images/roofing-placeholder-mobile.webp";
  }

  function injectMegaMenu() {
    const desktopNav = $(".nav-links");
    if (!desktopNav || $(".mega-menu-trigger", desktopNav)) return;

    const productsLink = $$("a", desktopNav).find((link) =>
      /mabati|products/i.test(link.textContent)
    );
    if (!productsLink) return;

    const wrapper = document.createElement("div");
    wrapper.className = "mega-menu-trigger";
    productsLink.replaceWith(wrapper);
    wrapper.appendChild(productsLink);

    const menu = document.createElement("div");
    menu.className = "mega-menu";
    menu.innerHTML = `
      <div class="mega-menu-grid">
        <div>
          <span class="mega-menu-label">Roofing profiles</span>
          <a href="products.html?category=box-profile">Box Profile</a>
          <a href="products.html?category=dumuzaz">Ordinary Dumuzaz</a>
          <a href="products.html?category=corrugated">Corrugated</a>
          <a href="products.html?category=versatile">Versatile</a>
          <a href="products.html?category=roman-tile">Roman Tile</a>
        </div>
        <div>
          <span class="mega-menu-label">Premium and accessories</span>
          <a href="products.html?category=stone-coated">Stone Coated Tiles</a>
          <a href="products.html?category=roofing-accessories">Roofing Accessories</a>
          <a href="products.html?category=nails-fasteners">Nails and Fasteners</a>
          <a href="gallery.html">Roofing Gallery</a>
        </div>
        <div class="mega-menu-feature">
          <i class="fa-solid fa-ruler-combined"></i>
          <strong>Need a roofing estimate?</strong>
          <span>Use the smart quotation form and send the result through WhatsApp.</span>
          <a href="contact.html#quote-form" class="btn btn-primary btn-sm">Calculate Quote</a>
        </div>
      </div>
    `;
    wrapper.appendChild(menu);

    productsLink.setAttribute("aria-haspopup", "true");
    productsLink.setAttribute("aria-expanded", "false");

    wrapper.addEventListener("mouseenter", () => productsLink.setAttribute("aria-expanded", "true"));
    wrapper.addEventListener("mouseleave", () => productsLink.setAttribute("aria-expanded", "false"));
    productsLink.addEventListener("focus", () => productsLink.setAttribute("aria-expanded", "true"));
  }

  function buildSearchOverlay() {
    if ($("#advanced-search-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "advanced-search-overlay";
    overlay.className = "advanced-search-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="advanced-search-panel" role="dialog" aria-modal="true" aria-labelledby="advanced-search-title">
        <button type="button" class="advanced-search-close" aria-label="Close search">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <span class="section-eyebrow">Search the Store</span>
        <h2 id="advanced-search-title">Find roofing products quickly</h2>
        <div class="advanced-search-input-wrap">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="search" id="advanced-search-input" placeholder="Search Roman tile, matte, Gauge 28, nails..." autocomplete="off">
        </div>
        <div class="advanced-search-hints">
          <button type="button" data-search-hint="Box Profile">Box Profile</button>
          <button type="button" data-search-hint="Dumuzaz">Dumuzaz</button>
          <button type="button" data-search-hint="Matte">Matte</button>
          <button type="button" data-search-hint="Gauge 28">Gauge 28</button>
          <button type="button" data-search-hint="Gutters">Gutters</button>
        </div>
        <div id="advanced-search-results" class="advanced-search-results">
          <div class="advanced-search-empty">Start typing to see matching products.</div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = $("#advanced-search-input", overlay);
    const results = $("#advanced-search-results", overlay);

    function openSearch() {
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
      setTimeout(() => input.focus(), 80);
    }

    function closeSearch() {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
    }

    function renderResults(term) {
      const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
      const normalized = term.trim().toLowerCase();

      if (!normalized) {
        results.innerHTML = '<div class="advanced-search-empty">Start typing to see matching products.</div>';
        return;
      }

      const matches = products.filter((product) => {
        const haystack = [
          product.name,
          product.categoryName,
          product.category,
          product.finish,
          product.priceUnit,
          ...(product.gauge || []),
          ...(product.colours || []),
          ...(product.features || [])
        ].join(" ").toLowerCase();
        return haystack.includes(normalized);
      }).slice(0, 8);

      if (!matches.length) {
        results.innerHTML = `
          <div class="advanced-search-empty">
            No exact product found. <a href="products.html?search=${encodeURIComponent(term)}">Search all products</a>
          </div>
        `;
        return;
      }

      results.innerHTML = matches.map((product) => `
        <a class="advanced-search-result" href="product-details.html?id=${encodeURIComponent(product.id)}">
          <img src="${escapeHTML(productImage(product))}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.onerror=null;this.src='images/roofing-placeholder-mobile.webp';">
          <div>
            <strong>${escapeHTML(product.name)}</strong>
            <span>${escapeHTML(product.categoryName || product.category || "")}</span>
          </div>
          <b>${formatMoney(product.price)}</b>
        </a>
      `).join("");
    }

    input.addEventListener("input", () => renderResults(input.value));
    $(".advanced-search-close", overlay).addEventListener("click", closeSearch);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeSearch();
    });

    $$("[data-search-hint]", overlay).forEach((button) => {
      button.addEventListener("click", () => {
        input.value = button.dataset.searchHint || "";
        renderResults(input.value);
        input.focus();
      });
    });

    $$(
      "#open-search, [data-mobile-search], .nav-icon[aria-label*='search' i]"
    ).forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        openSearch();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.classList.contains("active")) closeSearch();
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    });
  }

  function initializeRoofVisualizer() {
    const roof = $("#roof-preview-roof");
    const name = $("#roof-colour-name");
    const finish = $("#roof-finish-select");
    if (!roof || !name) return;

    function apply(button) {
      $$(".roof-colour-swatch").forEach((swatch) => swatch.classList.toggle("active", swatch === button));
      roof.style.setProperty("--roof-colour", button.dataset.colour || "#9b2c2c");
      name.textContent = button.dataset.roofColour || "Selected colour";
      roof.dataset.finish = finish?.value || "glossy";
    }

    $$(".roof-colour-swatch").forEach((button) => {
      button.addEventListener("click", () => apply(button));
    });

    finish?.addEventListener("change", () => {
      roof.dataset.finish = finish.value;
    });

    const first = $(".roof-colour-swatch.active") || $(".roof-colour-swatch");
    if (first) apply(first);
  }

  function initializeScrollAnimations() {
    const elements = $$(
      ".product-card, .trust-card, .choose-item, .brand-logo-card, .payment-logo-card, .county-card, .testimonial-card, .statistic-card, .blog-card"
    );
    if (!elements.length || !("IntersectionObserver" in window)) return;

    elements.forEach((element) => element.classList.add("reveal-on-scroll"));
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });

    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 60}ms`);
      observer.observe(element);
    });
  }

  function initializePageLoader() {
    if ($(".premium-page-loader")) return;
    const loader = document.createElement("div");
    loader.className = "premium-page-loader";
    loader.innerHTML = `
      <div class="premium-loader-mark">
        <i class="fa-solid fa-house-chimney"></i>
      </div>
      <span>Loading Royal Mabati...</span>
    `;
    document.body.appendChild(loader);

    window.addEventListener("load", () => {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 450);
    }, { once: true });

    setTimeout(() => {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 450);
    }, 2500);
  }

  function initializeGallerySlider() {
    const mainImage = $("#product-main-image");
    const thumbnails = $("#product-thumbnail-list");
    const prev = $("#product-gallery-prev");
    const next = $("#product-gallery-next");
    if (!mainImage || !thumbnails || !prev || !next) return;

    function availableImages() {
      return $$("button, img", thumbnails)
        .map((node) => {
          const image = node.tagName === "IMG" ? node : $("img", node);
          return image?.src || node.dataset.image || "";
        })
        .filter(Boolean);
    }

    function move(step) {
      const images = availableImages();
      if (!images.length) return;
      const current = images.findIndex((src) => mainImage.src === src || mainImage.src.endsWith(src));
      const nextIndex = (Math.max(current, 0) + step + images.length) % images.length;
      mainImage.src = images[nextIndex];

      $$("button", thumbnails).forEach((button, index) => {
        button.classList.toggle("active", index === nextIndex);
      });
    }

    prev.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));

    let startX = 0;
    mainImage.addEventListener("touchstart", (event) => {
      startX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });
    mainImage.addEventListener("touchend", (event) => {
      const endX = event.changedTouches[0]?.clientX || 0;
      const delta = endX - startX;
      if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
    }, { passive: true });
  }

  const COLOUR_MAP = {
    "Brick Red": "#9b2c2c",
    "Charcoal Grey": "#41464d",
    "Forest Green": "#22543d",
    "Coffee Brown": "#6b3f2a",
    "Maroon": "#6d1f31",
    "Blue": "#245aa6",
    "Royal Blue": "#245aa6",
    "Natural Silver": "#aeb5bd",
    "Matte Charcoal": "#35383d",
    "Matte Black": "#171717",
    "Matte Brown": "#55372a",
    "Matte Green": "#294c3a",
    "Matte Red": "#7f2d2d"
  };

  function initializeProductColourPicker() {
    const container = $("#product-colour-swatches");
    const select = $("#product-colour");
    const image = $("#product-main-image");
    if (!container || !select) return;

    function render() {
      const options = $$("option", select).filter((option) => option.value);
      container.innerHTML = options.map((option, index) => {
        const colour = COLOUR_MAP[option.value] || "#777";
        return `
          <button
            type="button"
            class="product-colour-swatch ${index === 0 ? "active" : ""}"
            data-value="${escapeHTML(option.value)}"
            style="--swatch:${colour}"
            aria-label="${escapeHTML(option.value)}"
            title="${escapeHTML(option.value)}"
          ></button>
        `;
      }).join("");

      $$(".product-colour-swatch", container).forEach((button) => {
        button.addEventListener("click", () => {
          select.value = button.dataset.value || "";
          select.dispatchEvent(new Event("change", { bubbles: true }));
          $$(".product-colour-swatch", container).forEach((swatch) => swatch.classList.toggle("active", swatch === button));
          if (image) {
            image.style.filter = `drop-shadow(0 12px 18px ${COLOUR_MAP[button.dataset.value] || "#777"}55)`;
          }
        });
      });
    }

    const observer = new MutationObserver(render);
    observer.observe(select, { childList: true });
    render();
  }

  function initializeCheckoutEnhancements() {
    const button = $("#checkout-whatsapp");
    const form = $("#checkout-customer-form");
    if (!button || !form) return;

    button.addEventListener("click", (event) => {
      const required = [
        ["#checkout-name", "full name"],
        ["#checkout-phone", "phone number"],
        ["#checkout-county", "county"],
        ["#checkout-location", "delivery location"]
      ];
      const missing = required.find(([selector]) => !$(selector)?.value.trim());
      if (missing) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.showToast?.(`Please enter your ${missing[1]}.`, "warning");
        $(missing[0])?.focus();
        return;
      }

      try {
        localStorage.setItem("royalMabatiCheckoutDetails", JSON.stringify({
          name: $("#checkout-name").value.trim(),
          phone: $("#checkout-phone").value.trim(),
          county: $("#checkout-county").value.trim(),
          location: $("#checkout-location").value.trim(),
          instructions: $("#checkout-instructions")?.value.trim() || ""
        }));
      } catch (_) {}
    }, true);

    try {
      const saved = JSON.parse(localStorage.getItem("royalMabatiCheckoutDetails") || "{}");
      Object.entries({
        "#checkout-name": saved.name,
        "#checkout-phone": saved.phone,
        "#checkout-county": saved.county,
        "#checkout-location": saved.location,
        "#checkout-instructions": saved.instructions
      }).forEach(([selector, value]) => {
        if ($(selector) && value) $(selector).value = value;
      });
    } catch (_) {}
  }

  function addOrganizationSEO() {
    if ($('script[data-premium-schema="organization"]')) return;
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.premiumSchema = "organization";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ROYAL MABATI FACTORY LTD",
      "url": "https://victor-kibet-cybersecurity-guy.github.io/mabati-store/",
      "telephone": "+254752523422",
      "areaServed": "Kenya",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254752523422",
        "contactType": "sales",
        "availableLanguage": ["English", "Swahili"]
      }
    });
    document.head.appendChild(schema);
  }

  function initialize() {
    initializePageLoader();
    injectMegaMenu();
    buildSearchOverlay();
    initializeRoofVisualizer();
    initializeGallerySlider();
    initializeProductColourPicker();
    initializeCheckoutEnhancements();
    initializeScrollAnimations();
    addOrganizationSEO();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
