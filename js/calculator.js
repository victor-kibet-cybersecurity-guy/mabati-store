"use strict";

/* ==========================================================
   KENYA MABATI CENTRE
   Roofing Calculator
   File: js/calculator.js
   ========================================================== */

(() => {
  const CURRENCY = "KSh";

  const SELECTORS = {
    form: "#roofing-calculator-form",
    roofLength: "#roof-length",
    roofWidth: "#roof-width",
    roofSections: "#roof-sections",
    sheetLength: "#selected-sheet-length",
    effectiveWidth: "#sheet-effective-width",
    wastePercentage: "#waste-percentage",
    productSelect: "#calculator-product",
    resultSheetCount: "#result-sheet-count",
    resultTotalMetres: "#result-total-metres",
    resultCost: "#result-cost",
    resultExtraSheets: "#result-extra-sheets",
    resultContainer: "#calculator-result"
  };

  /**
   * Select an element from the document.
   * @param {string} selector
   * @returns {Element|null}
   */
  function select(selector) {
    return document.querySelector(selector);
  }

  /**
   * Convert a value to a number safely.
   * @param {*} value
   * @param {number} fallback
   * @returns {number}
   */
  function toNumber(value, fallback = 0) {
    const number = Number(value);

    return Number.isFinite(number) ? number : fallback;
  }

  /**
   * Format money as Kenyan Shillings.
   * @param {number} amount
   * @returns {string}
   */
  function formatMoney(amount) {
    if (typeof window.formatKSh === "function") {
      return window.formatKSh(amount);
    }

    return `${CURRENCY} ${Math.round(amount).toLocaleString("en-KE")}`;
  }

  /**
   * Display a notification.
   * Uses app.js toast when available.
   * @param {string} message
   * @param {"success"|"error"|"warning"|"info"} type
   */
  function notify(message, type = "info") {
    if (typeof window.showToast === "function") {
      window.showToast(message, type);
      return;
    }

    console.log(`${type.toUpperCase()}: ${message}`);
  }

  /**
   * Get all available products.
   * @returns {object[]}
   */
  function getProducts() {
    if (!Array.isArray(window.PRODUCTS)) {
      return [];
    }

    return window.PRODUCTS;
  }

  /**
   * Find a product by its ID.
   * @param {string} productId
   * @returns {object|null}
   */
  function getProductById(productId) {
    if (typeof window.getProductById === "function") {
      return window.getProductById(productId);
    }

    return (
      getProducts().find((product) => product.id === productId) || null
    );
  }

  /**
   * Check whether a product is suitable for roofing calculations.
   * Accessories should not appear in the calculator.
   * @param {object} product
   * @returns {boolean}
   */
  function isRoofingSheet(product) {
    if (!product || typeof product !== "object") {
      return false;
    }

    const category = String(product.category || "").toLowerCase();
    const productType = String(product.productType || "").toLowerCase();
    const priceUnit = String(product.priceUnit || "").toLowerCase();

    const accessoryWords = [
      "accessory",
      "accessories",
      "ridge",
      "gutter",
      "valley",
      "nail",
      "screw",
      "flashing",
      "sealant",
      "insulation",
      "downpipe",
      "washer"
    ];

    const isAccessory = accessoryWords.some(
      (word) =>
        category.includes(word) ||
        productType.includes(word)
    );

    const usesMetrePricing =
      priceUnit.includes("metre") ||
      priceUnit.includes("meter") ||
      priceUnit.includes("/m");

    return !isAccessory && usesMetrePricing;
  }

  /**
   * Get a readable gauge value.
   * @param {object} product
   * @returns {string}
   */
  function getGaugeText(product) {
    if (product.defaultGauge && product.defaultGauge !== "N/A") {
      return `${product.defaultGauge}G`;
    }

    if (Array.isArray(product.gauge) && product.gauge.length > 0) {
      return product.gauge
        .filter((gauge) => gauge !== "N/A")
        .map((gauge) => `${gauge}G`)
        .join(", ");
    }

    return "";
  }

  /**
   * Populate the calculator product dropdown.
   */
  function populateProductSelect() {
    const productSelect = select(SELECTORS.productSelect);

    if (!productSelect) {
      return;
    }

    const roofingProducts = getProducts()
      .filter(isRoofingSheet)
      .filter(
        (product) =>
          product.availability !== false &&
          product.stockStatus !== "Out of Stock"
      )
      .sort((firstProduct, secondProduct) =>
        String(firstProduct.name).localeCompare(
          String(secondProduct.name)
        )
      );

    productSelect.innerHTML = `
      <option value="">Select a roofing product</option>
    `;

    roofingProducts.forEach((product) => {
      const option = document.createElement("option");
      const gaugeText = getGaugeText(product);

      option.value = product.id;

      option.textContent = [
        product.name,
        gaugeText,
        `${formatMoney(toNumber(product.price))} ${
          product.priceUnit || "per metre"
        }`
      ]
        .filter(Boolean)
        .join(" – ");

      productSelect.appendChild(option);
    });

    if (roofingProducts.length === 0) {
      const option = document.createElement("option");

      option.value = "";
      option.textContent = "No roofing products available";
      option.disabled = true;

      productSelect.appendChild(option);
    }
  }

  /**
   * Calculate roofing requirements.
   *
   * Assumptions:
   * - Roof length runs horizontally along the building.
   * - Sheet length runs from the ridge to the eaves.
   * - Effective width includes side-lap allowance.
   * - Roof sections normally means the number of roof slopes.
   *
   * @param {object} values
   * @returns {object}
   */
  function calculateRoofing(values) {
    const roofLength = values.roofLength;
    const roofWidth = values.roofWidth;
    const roofSections = values.roofSections;
    const sheetLength = values.sheetLength;
    const effectiveWidth = values.effectiveWidth;
    const wastePercentage = values.wastePercentage;
    const pricePerMetre = values.pricePerMetre;

    /*
     * Sheets needed along one roof section.
     * Math.ceil ensures partial spaces use a full sheet.
     */
    const sheetsPerSection = Math.ceil(
      roofLength / effectiveWidth
    );

    /*
     * Base sheet quantity across all roof sections.
     */
    const baseSheetCount =
      sheetsPerSection * roofSections;

    /*
     * The roof-width estimate is used as a safety check.
     *
     * When the selected sheet length is shorter than the
     * required slope width, more than one sheet row may be
     * required from ridge to eaves.
     */
    const rowsPerSection = Math.max(
      1,
      Math.ceil(roofWidth / sheetLength)
    );

    const adjustedBaseSheetCount =
      baseSheetCount * rowsPerSection;

    /*
     * Extra sheets caused by cutting, damage, overlaps,
     * design complexity, and site wastage.
     */
    const extraSheets = Math.ceil(
      adjustedBaseSheetCount *
        (wastePercentage / 100)
    );

    const totalSheetCount =
      adjustedBaseSheetCount + extraSheets;

    /*
     * Total chargeable metres.
     * Mabati is commonly priced per running metre.
     */
    const totalMetres =
      totalSheetCount * sheetLength;

    const estimatedCost =
      totalMetres * pricePerMetre;

    const roofArea =
      roofLength * roofWidth * roofSections;

    return {
      roofArea,
      sheetsPerSection,
      rowsPerSection,
      baseSheetCount: adjustedBaseSheetCount,
      extraSheets,
      totalSheetCount,
      totalMetres,
      estimatedCost
    };
  }

  /**
   * Read calculator form values.
   * @returns {object|null}
   */
  function getCalculatorValues() {
    const roofLengthInput = select(SELECTORS.roofLength);
    const roofWidthInput = select(SELECTORS.roofWidth);
    const roofSectionsInput = select(SELECTORS.roofSections);
    const sheetLengthInput = select(SELECTORS.sheetLength);
    const effectiveWidthInput = select(SELECTORS.effectiveWidth);
    const wasteInput = select(SELECTORS.wastePercentage);
    const productSelect = select(SELECTORS.productSelect);

    if (
      !roofLengthInput ||
      !roofWidthInput ||
      !roofSectionsInput ||
      !sheetLengthInput ||
      !effectiveWidthInput ||
      !wasteInput ||
      !productSelect
    ) {
      return null;
    }

    const product = getProductById(productSelect.value);

    return {
      roofLength: toNumber(roofLengthInput.value),
      roofWidth: toNumber(roofWidthInput.value),
      roofSections: toNumber(roofSectionsInput.value),
      sheetLength: toNumber(sheetLengthInput.value),
      effectiveWidth: toNumber(effectiveWidthInput.value),
      wastePercentage: toNumber(wasteInput.value),
      product,
      pricePerMetre: toNumber(product?.price)
    };
  }

  /**
   * Validate calculator inputs.
   * @param {object} values
   * @returns {string[]}
   */
  function validateCalculator(values) {
    const errors = [];

    if (!values.product) {
      errors.push("Select a roofing product.");
    }

    if (values.roofLength <= 0) {
      errors.push("Enter a valid roof length.");
    }

    if (values.roofWidth <= 0) {
      errors.push("Enter a valid roof width.");
    }

    if (
      !Number.isInteger(values.roofSections) ||
      values.roofSections < 1
    ) {
      errors.push(
        "The number of roof sections must be at least 1."
      );
    }

    if (values.sheetLength <= 0) {
      errors.push("Enter a valid sheet length.");
    }

    if (values.effectiveWidth <= 0) {
      errors.push("Enter a valid effective sheet width.");
    }

    if (
      values.wastePercentage < 0 ||
      values.wastePercentage > 30
    ) {
      errors.push(
        "Waste percentage must be between 0% and 30%."
      );
    }

    if (values.product && values.pricePerMetre <= 0) {
      errors.push(
        "The selected product does not have a valid price."
      );
    }

    return errors;
  }

  /**
   * Highlight invalid fields.
   * @param {object} values
   */
  function highlightInvalidFields(values) {
    const fields = [
      {
        selector: SELECTORS.roofLength,
        invalid: values.roofLength <= 0
      },
      {
        selector: SELECTORS.roofWidth,
        invalid: values.roofWidth <= 0
      },
      {
        selector: SELECTORS.roofSections,
        invalid:
          !Number.isInteger(values.roofSections) ||
          values.roofSections < 1
      },
      {
        selector: SELECTORS.sheetLength,
        invalid: values.sheetLength <= 0
      },
      {
        selector: SELECTORS.effectiveWidth,
        invalid: values.effectiveWidth <= 0
      },
      {
        selector: SELECTORS.wastePercentage,
        invalid:
          values.wastePercentage < 0 ||
          values.wastePercentage > 30
      },
      {
        selector: SELECTORS.productSelect,
        invalid: !values.product
      }
    ];

    fields.forEach(({ selector, invalid }) => {
      const field = select(selector);

      if (!field) {
        return;
      }

      if (invalid) {
        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");
      } else {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
      }
    });
  }

  /**
   * Remove validation styling.
   */
  function clearValidationStyles() {
    const form = select(SELECTORS.form);

    if (!form) {
      return;
    }

    form
      .querySelectorAll(".input-error")
      .forEach((field) => {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
      });
  }

  /**
   * Display calculation results.
   * @param {object} result
   * @param {object} values
   */
  function displayResults(result, values) {
    const sheetCountElement = select(
      SELECTORS.resultSheetCount
    );

    const totalMetresElement = select(
      SELECTORS.resultTotalMetres
    );

    const costElement = select(
      SELECTORS.resultCost
    );

    const extraSheetsElement = select(
      SELECTORS.resultExtraSheets
    );

    if (sheetCountElement) {
      sheetCountElement.textContent =
        result.totalSheetCount.toLocaleString("en-KE");
    }

    if (totalMetresElement) {
      totalMetresElement.textContent =
        `${result.totalMetres.toLocaleString("en-KE", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 2
        })} m`;
    }

    if (costElement) {
      costElement.textContent = formatMoney(
        result.estimatedCost
      );
    }

    if (extraSheetsElement) {
      extraSheetsElement.textContent =
        result.extraSheets.toLocaleString("en-KE");
    }

    updateDetailedResults(result, values);
  }

  /**
   * Add extra details below the standard result rows.
   * @param {object} result
   * @param {object} values
   */
  function updateDetailedResults(result, values) {
    const resultContainer = select(
      SELECTORS.resultContainer
    );

    if (!resultContainer) {
      return;
    }

    let detailsContainer = select(
      "#calculator-detailed-results"
    );

    if (!detailsContainer) {
      detailsContainer = document.createElement("div");
      detailsContainer.id =
        "calculator-detailed-results";
      detailsContainer.className = "calculator-note";

      resultContainer.appendChild(detailsContainer);
    }

    const productName =
      values.product?.name || "Selected product";

    const rowsMessage =
      result.rowsPerSection > 1
        ? `
          <p>
            <strong>Important:</strong>
            The selected ${values.sheetLength} m sheet length is shorter
            than the entered ${values.roofWidth} m roof width. The estimate
            therefore uses ${result.rowsPerSection} sheet rows per section.
            Confirm sheet joining and overlap requirements with a roofer.
          </p>
        `
        : "";

    detailsContainer.innerHTML = `
      <p>
        <strong>Selected product:</strong>
        ${escapeHTML(productName)}
      </p>

      <p>
        <strong>Estimated roof area:</strong>
        ${result.roofArea.toLocaleString("en-KE", {
          maximumFractionDigits: 2
        })} m²
      </p>

      <p>
        <strong>Sheets per row:</strong>
        ${result.sheetsPerSection}
      </p>

      <p>
        <strong>Sheet rows per section:</strong>
        ${result.rowsPerSection}
      </p>

      <p>
        <strong>Sheets before wastage:</strong>
        ${result.baseSheetCount}
      </p>

      <p>
        <strong>Price used:</strong>
        ${formatMoney(values.pricePerMetre)} per metre
      </p>

      ${rowsMessage}

      <button
        type="button"
        class="btn btn-whatsapp btn-block"
        id="send-calculator-estimate"
        style="margin-top: 16px;"
      >
        <i class="fa-brands fa-whatsapp"></i>
        Send Estimate on WhatsApp
      </button>
    `;

    const whatsappButton = select(
      "#send-calculator-estimate"
    );

    whatsappButton?.addEventListener("click", () => {
      sendEstimateToWhatsApp(result, values);
    });
  }

  /**
   * Escape text before inserting it into HTML.
   * @param {*} value
   * @returns {string}
   */
  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /**
   * Open the calculator estimate in WhatsApp.
   * @param {object} result
   * @param {object} values
   */
  function sendEstimateToWhatsApp(result, values) {
    const productName =
      values.product?.name || "Roofing product";

    const gauge = getGaugeText(values.product);

    const message = [
      "Hello Kenya Mabati Centre,",
      "",
      "I used the roofing calculator and would like a quotation.",
      "",
      `Selected Product: ${productName}`,
      gauge ? `Gauge: ${gauge}` : null,
      `Price Used: ${formatMoney(values.pricePerMetre)} per metre`,
      "",
      `Roof Length: ${values.roofLength} metres`,
      `Roof Width: ${values.roofWidth} metres`,
      `Roof Sections: ${values.roofSections}`,
      `Selected Sheet Length: ${values.sheetLength} metres`,
      `Effective Sheet Width: ${values.effectiveWidth} metres`,
      `Waste Allowance: ${values.wastePercentage}%`,
      "",
      `Estimated Roof Area: ${result.roofArea.toFixed(2)} m²`,
      `Estimated Sheets: ${result.totalSheetCount}`,
      `Extra Sheets: ${result.extraSheets}`,
      `Total Running Metres: ${result.totalMetres.toFixed(2)} m`,
      `Estimated Product Cost: ${formatMoney(result.estimatedCost)}`,
      "",
      "Please confirm the measurements, current price, accessories, and delivery details."
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappURL =
      `https://wa.me/254752523422?text=${encodeURIComponent(
        message
      )}`;

    window.open(whatsappURL, "_blank", "noopener");
  }

  /**
   * Reset displayed results.
   */
  function resetResults() {
    const sheetCountElement = select(
      SELECTORS.resultSheetCount
    );

    const totalMetresElement = select(
      SELECTORS.resultTotalMetres
    );

    const costElement = select(
      SELECTORS.resultCost
    );

    const extraSheetsElement = select(
      SELECTORS.resultExtraSheets
    );

    if (sheetCountElement) {
      sheetCountElement.textContent = "0";
    }

    if (totalMetresElement) {
      totalMetresElement.textContent = "0 m";
    }

    if (costElement) {
      costElement.textContent = `${CURRENCY} 0`;
    }

    if (extraSheetsElement) {
      extraSheetsElement.textContent = "0";
    }

    select("#calculator-detailed-results")?.remove();
  }

  /**
   * Update sheet-length options when a product changes.
   * The HTML uses a number input, so the first available
   * length is inserted automatically.
   */
  function updateSheetLengthFromProduct() {
    const productSelect = select(
      SELECTORS.productSelect
    );

    const sheetLengthInput = select(
      SELECTORS.sheetLength
    );

    if (!productSelect || !sheetLengthInput) {
      return;
    }

    const product = getProductById(
      productSelect.value
    );

    if (!product) {
      return;
    }

    if (
      Array.isArray(product.availableLengths) &&
      product.availableLengths.length > 0
    ) {
      const availableLengths =
        product.availableLengths
          .map((length) => toNumber(length))
          .filter((length) => length > 0);

      if (availableLengths.length > 0) {
        sheetLengthInput.value =
          String(availableLengths[0]);

        sheetLengthInput.min =
          String(Math.min(...availableLengths));

        sheetLengthInput.max =
          String(Math.max(...availableLengths));
      }
    }

    if (toNumber(product.effectiveWidth) > 0) {
      const effectiveWidthInput = select(
        SELECTORS.effectiveWidth
      );

      if (effectiveWidthInput) {
        effectiveWidthInput.value =
          String(product.effectiveWidth);
      }
    }

    resetResults();
  }

  /**
   * Handle calculator submission.
   * @param {SubmitEvent} event
   */
  function handleCalculatorSubmit(event) {
    event.preventDefault();

    clearValidationStyles();

    const values = getCalculatorValues();

    if (!values) {
      notify(
        "The roofing calculator could not be loaded.",
        "error"
      );

      return;
    }

    const validationErrors =
      validateCalculator(values);

    highlightInvalidFields(values);

    if (validationErrors.length > 0) {
      notify(validationErrors[0], "error");

      const firstInvalidField = select(
        `${SELECTORS.form} [aria-invalid="true"]`
      );

      firstInvalidField?.focus();
      return;
    }

    const result = calculateRoofing(values);

    displayResults(result, values);

    notify(
      "Your roofing estimate has been calculated.",
      "success"
    );

    const resultContainer = select(
      SELECTORS.resultContainer
    );

    resultContainer?.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "nearest"
    });
  }

  /**
   * Remove a field's error styling when edited.
   */
  function initializeFieldValidationClearing() {
    const form = select(SELECTORS.form);

    if (!form) {
      return;
    }

    form.addEventListener("input", (event) => {
      const field = event.target;

      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement
      ) {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
      }
    });
  }

  /**
   * Initialize the roofing calculator.
   */
  function initializeCalculator() {
    const form = select(SELECTORS.form);

    if (!form) {
      return;
    }

    populateProductSelect();
    resetResults();

    form.addEventListener(
      "submit",
      handleCalculatorSubmit
    );

    select(SELECTORS.productSelect)?.addEventListener(
      "change",
      updateSheetLengthFromProduct
    );

    initializeFieldValidationClearing();
  }

  /*
   * Expose the main calculation function so it can also
   * be reused on another page later.
   */
  window.calculateRoofingRequirements =
    calculateRoofing;

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeCalculator
    );
  } else {
    initializeCalculator();
  }
})();