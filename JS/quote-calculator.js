
(() => {
  "use strict";

  const priceTable = {
    "Box Profile|30|Glossy": 350,
    "Box Profile|28|Glossy": 400,
    "Box Profile|30|Matte": 450,
    "Box Profile|28|Matte": 530,

    "Ordinary Dumuzaz|30|Glossy": 250,
    "Ordinary Dumuzaz|28|Glossy": 300,

    "Corrugated Profile|30|Glossy": 300,
    "Corrugated Profile|28|Glossy": 350,
    "Corrugated Profile|30|Matte": 400,
    "Corrugated Profile|28|Matte": 480,

    "Versatile|30|Glossy": 580,
    "Versatile|28|Glossy": 600,
    "Versatile|30|Matte": 750,
    "Versatile|28|Matte": 850,

    "Roman Tile|30|Glossy": 500,
    "Roman Tile|28|Glossy": 550,
    "Roman Tile|30|Matte": 600,
    "Roman Tile|28|Matte": 700,

    "Stone-Coated Tiles|28|Glossy": 550,
    "Stone-Coated Tiles|28|Matte": 550
  };

  function money(value) {
    return `KSh ${Number(value || 0).toLocaleString("en-KE")}`;
  }

  function updateEstimate() {
    const profile = document.querySelector("#quote-profile")?.value || "";
    const gauge = document.querySelector("#quote-gauge")?.value || "";
    const finish = document.querySelector("#quote-finish")?.value || "Glossy";
    const length = Number(document.querySelector("#quote-sheet-length")?.value || 0);
    const quantity = Number(document.querySelector("#quote-sheet-count")?.value || 0);
    const total = document.querySelector("#smart-quote-total");
    const note = document.querySelector("#smart-quote-note");

    if (!total || !note) return;

    const key = `${profile}|${gauge}|${finish}`;
    const unitPrice = priceTable[key];

    if (!unitPrice || !quantity) {
      total.textContent = "KSh 0";
      note.textContent = "Select a supported profile, gauge, finish, length, and quantity to calculate an estimate.";
      return;
    }

    const isPiece = profile === "Stone-Coated Tiles";
    const amount = isPiece
      ? unitPrice * quantity
      : unitPrice * Math.max(length, 0) * quantity;

    total.textContent = money(amount);
    note.textContent = isPiece
      ? `${quantity} piece(s) × ${money(unitPrice)}. Accessories and delivery conditions are confirmed separately.`
      : `${quantity} sheet(s) × ${length || 0} m × ${money(unitPrice)} per metre. This is an estimate, not a final quotation.`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    [
      "#quote-profile",
      "#quote-gauge",
      "#quote-finish",
      "#quote-sheet-length",
      "#quote-sheet-count"
    ].forEach((selector) => {
      document.querySelector(selector)?.addEventListener("input", updateEstimate);
      document.querySelector(selector)?.addEventListener("change", updateEstimate);
    });

    updateEstimate();
  });
})();
