"use strict";

/* ==========================================================
   ROYAL MABATI FACTORY LTD
   Product Database
   File: js/products.js

   Important:
   - Prices below are sample website prices.
   - Update them whenever your selling prices change.
   - Product images should be placed inside assets/images/products/.
   ========================================================== */

const BUSINESS_DETAILS = {
  name: "ROYAL MABATI FACTORY LTD",
  phone: "0752523422",
  whatsapp: "254752523422",
  email: "sales@royalmabatifactory.co.ke",
  country: "Kenya",
  currency: "KSh",
  deliveryMessage: "Free delivery countrywide",
  minimumOrder: 20
};

/* ==========================================================
   PRODUCT CATEGORIES
   ========================================================== */

const PRODUCT_CATEGORIES = [
  {
    id: "box-profile",
    name: "Box Profile Mabati",
    description:
      "Strong, modern roofing sheets suitable for residential, commercial and industrial buildings."
  },
  {
    id: "tile-profile",
    name: "Tile Profile Mabati",
    description:
      "Elegant roofing sheets designed to provide the appearance of traditional roofing tiles."
  },
  {
    id: "corrugated",
    name: "Corrugated Mabati",
    description:
      "Reliable corrugated roofing sheets for homes, shops, farms and construction projects."
  },
  {
    id: "stone-coated",
    name: "Stone Coated Roofing",
    description:
      "Premium stone-coated roofing tiles offering durability, beauty and weather resistance."
  },
  {
    id: "transparent-sheets",
    name: "Transparent Roofing Sheets",
    description:
      "Daylight roofing sheets suitable for warehouses, walkways, patios and industrial buildings."
  },
  {
    id: "roofing-accessories",
    name: "Roofing Accessories",
    description:
      "Ridges, valleys, gutters, flashings, roofing nails and other installation accessories."
  }
];

/* ==========================================================
   PRODUCT DATABASE
   ========================================================== */

const PRODUCTS = [
  {
    id: "royal-box-profile-30g",
    slug: "royal-box-profile-30g",
    name: "Royal Box Profile 30G",
    category: "box-profile",
    categoryName: "Box Profile Mabati",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Strong and attractive box profile roofing sheet suitable for homes, shops and commercial buildings.",

    description:
      "Royal Box Profile 30G is manufactured for durability, strength and an attractive modern finish. It is suitable for residential houses, schools, churches, warehouses and commercial buildings.",

    price: 650,
    oldPrice: 720,
    priceUnit: "per metre",
    priceNote:
      "Price may vary depending on colour, gauge, coating and order quantity.",

    gauge: ["30", "28", "26"],
    defaultGauge: "30",

    availableLengths: [
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8,
      9,
      10,
      11,
      12
    ],

    effectiveWidth: 1,
    totalWidth: 1.05,

    colours: [
      "Brick Red",
      "Charcoal Grey",
      "Chocolate Brown",
      "Forest Green",
      "Tile Red",
      "Sky Blue",
      "Maroon"
    ],

    finish: "Glossy",
    coating: "Pre-painted galvanized steel",

    image: "assets/images/products/box-profile-30g.jpg",

    gallery: [
      "assets/images/products/box-profile-30g.jpg",
      "assets/images/products/box-profile-red.jpg",
      "assets/images/products/box-profile-grey.jpg"
    ],

    features: [
      "Strong box profile design",
      "Weather resistant coating",
      "Available in custom lengths",
      "Multiple colour options",
      "Suitable for residential and commercial roofing"
    ],

    applications: [
      "Residential houses",
      "Warehouses",
      "Schools",
      "Churches",
      "Commercial buildings"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestseller: true,
    onSale: true,
    rating: 4.9,
    reviewCount: 86,

    seoTitle:
      "Royal Box Profile 30G Mabati Price in Kenya",
    seoDescription:
      "Buy Royal Box Profile 30G roofing sheets from ROYAL MABATI FACTORY LTD with free countrywide delivery."
  },

  {
    id: "royal-box-profile-28g",
    slug: "royal-box-profile-28g",
    name: "Royal Box Profile 28G",
    category: "box-profile",
    categoryName: "Box Profile Mabati",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Heavy-duty box profile roofing sheet offering improved strength and long-term performance.",

    description:
      "Royal Box Profile 28G is a thicker and stronger roofing option designed for customers who require increased durability and structural performance.",

    price: 850,
    oldPrice: 920,
    priceUnit: "per metre",
    priceNote:
      "Contact us to confirm the current price and available colours.",

    gauge: ["28"],
    defaultGauge: "28",

    availableLengths: [
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8,
      9,
      10,
      11,
      12
    ],

    effectiveWidth: 1,
    totalWidth: 1.05,

    colours: [
      "Brick Red",
      "Charcoal Grey",
      "Chocolate Brown",
      "Forest Green",
      "Maroon"
    ],

    finish: "Glossy",
    coating: "Pre-painted galvanized steel",

    image: "assets/images/products/box-profile-28g.jpg",

    gallery: [
      "assets/images/products/box-profile-28g.jpg",
      "assets/images/products/box-profile-28g-red.jpg",
      "assets/images/products/box-profile-28g-grey.jpg"
    ],

    features: [
      "Heavy-duty 28 gauge steel",
      "Improved structural strength",
      "Custom-cut lengths",
      "Long-lasting coating",
      "Suitable for demanding roofing projects"
    ],

    applications: [
      "Large residential homes",
      "Warehouses",
      "Factories",
      "Schools",
      "Commercial properties"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestseller: false,
    onSale: true,
    rating: 4.8,
    reviewCount: 54,

    seoTitle:
      "Royal Box Profile 28G Roofing Sheets Kenya",
    seoDescription:
      "Order Royal Box Profile 28G roofing sheets from ROYAL MABATI FACTORY LTD with free delivery in Kenya."
  },

  {
    id: "royal-matte-box-profile",
    slug: "royal-matte-box-profile",
    name: "Royal Matte Box Profile",
    category: "box-profile",
    categoryName: "Box Profile Mabati",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Premium matte-finish box profile roofing sheet with a modern, elegant appearance.",

    description:
      "Royal Matte Box Profile combines the strength of box profile roofing with a premium non-reflective matte finish. It is ideal for modern homes and commercial projects.",

    price: 750,
    oldPrice: 820,
    priceUnit: "per metre",
    priceNote:
      "Final price depends on selected gauge, colour and order quantity.",

    gauge: ["30", "28"],
    defaultGauge: "30",

    availableLengths: [
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8,
      9,
      10,
      11,
      12
    ],

    effectiveWidth: 1,
    totalWidth: 1.05,

    colours: [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],

    finish: "Matte",
    coating: "Premium matte-coated galvanized steel",

    image: "assets/images/products/matte-box-profile.jpg",

    gallery: [
      "assets/images/products/matte-box-profile.jpg",
      "assets/images/products/matte-box-grey.jpg",
      "assets/images/products/matte-box-black.jpg"
    ],

    features: [
      "Premium matte appearance",
      "Reduced surface reflection",
      "Weather resistant",
      "Available in custom lengths",
      "Suitable for modern architecture"
    ],

    applications: [
      "Modern residential homes",
      "Apartments",
      "Hotels",
      "Office buildings",
      "Commercial developments"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestseller: true,
    onSale: true,
    rating: 4.9,
    reviewCount: 73,

    seoTitle:
      "Royal Matte Box Profile Mabati Kenya",
    seoDescription:
      "Shop premium Royal Matte Box Profile mabati from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "royal-eurotile",
    slug: "royal-eurotile",
    name: "Royal Eurotile",
    category: "tile-profile",
    categoryName: "Tile Profile Mabati",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Elegant tile-profile roofing sheet designed for stylish residential and commercial roofing.",

    description:
      "Royal Eurotile provides the visual appearance of traditional tiles while offering the strength, convenience and affordability of steel roofing sheets.",

    price: 780,
    oldPrice: 850,
    priceUnit: "per metre",
    priceNote:
      "Contact our sales team for current colour and gauge availability.",

    gauge: ["30", "28"],
    defaultGauge: "30",

    availableLengths: [
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8
    ],

    effectiveWidth: 1,
    totalWidth: 1.05,

    colours: [
      "Brick Red",
      "Charcoal Grey",
      "Chocolate Brown",
      "Forest Green",
      "Maroon"
    ],

    finish: "Glossy tile finish",
    coating: "Pre-painted galvanized steel",

    image: "assets/images/products/royal-eurotile.jpg",

    gallery: [
      "assets/images/products/royal-eurotile.jpg",
      "assets/images/products/eurotile-red.jpg",
      "assets/images/products/eurotile-grey.jpg"
    ],

    features: [
      "Elegant tile appearance",
      "Lightweight construction",
      "Easy installation",
      "Custom-cut lengths",
      "Weather resistant finish"
    ],

    applications: [
      "Residential homes",
      "Villas",
      "Apartments",
      "Hotels",
      "Office buildings"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestseller: true,
    onSale: true,
    rating: 4.9,
    reviewCount: 102,

    seoTitle:
      "Royal Eurotile Mabati Price in Kenya",
    seoDescription:
      "Buy Royal Eurotile roofing sheets from ROYAL MABATI FACTORY LTD with free delivery countrywide."
  },

  {
    id: "royal-versa-tile",
    slug: "royal-versa-tile",
    name: "Royal Versa Tile",
    category: "tile-profile",
    categoryName: "Tile Profile Mabati",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "A stylish tile-profile roofing sheet suitable for beautiful and durable roofing projects.",

    description:
      "Royal Versa Tile offers a premium tiled appearance with the durability and low maintenance requirements of modern steel roofing.",

    price: 800,
    oldPrice: 870,
    priceUnit: "per metre",
    priceNote:
      "Price varies according to gauge, colour and selected length.",

    gauge: ["30", "28"],
    defaultGauge: "30",

    availableLengths: [
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8
    ],

    effectiveWidth: 1,
    totalWidth: 1.05,

    colours: [
      "Brick Red",
      "Charcoal Grey",
      "Chocolate Brown",
      "Forest Green",
      "Maroon"
    ],

    finish: "Glossy tile finish",
    coating: "Pre-painted galvanized steel",

    image: "assets/images/products/royal-versa-tile.jpg",

    gallery: [
      "assets/images/products/royal-versa-tile.jpg",
      "assets/images/products/versa-tile-red.jpg",
      "assets/images/products/versa-tile-grey.jpg"
    ],

    features: [
      "Stylish tile profile",
      "Durable galvanized steel",
      "Weather resistant",
      "Low maintenance",
      "Custom lengths available"
    ],

    applications: [
      "Residential houses",
      "Luxury homes",
      "Guest houses",
      "Hotels",
      "Commercial properties"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestseller: false,
    onSale: false,
    rating: 4.8,
    reviewCount: 64,

    seoTitle:
      "Royal Versa Tile Roofing Sheets Kenya",
    seoDescription:
      "Purchase Royal Versa Tile roofing sheets from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "royal-corrugated-30g",
    slug: "royal-corrugated-30g",
    name: "Royal Corrugated 30G",
    category: "corrugated",
    categoryName: "Corrugated Mabati",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Affordable and durable corrugated roofing sheet for homes, farms and commercial structures.",

    description:
      "Royal Corrugated 30G is a versatile roofing sheet suitable for residential, agricultural and commercial use. It offers reliable water drainage and easy installation.",

    price: 580,
    oldPrice: 640,
    priceUnit: "per metre",
    priceNote:
      "Contact us to confirm available colours and lengths.",

    gauge: ["30", "28"],
    defaultGauge: "30",

    availableLengths: [
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8,
      9,
      10,
      11,
      12
    ],

    effectiveWidth: 0.85,
    totalWidth: 0.9,

    colours: [
      "Brick Red",
      "Charcoal Grey",
      "Chocolate Brown",
      "Forest Green",
      "Sky Blue",
      "Maroon"
    ],

    finish: "Glossy",
    coating: "Pre-painted galvanized steel",

    image: "assets/images/products/corrugated-30g.jpg",

    gallery: [
      "assets/images/products/corrugated-30g.jpg",
      "assets/images/products/corrugated-red.jpg",
      "assets/images/products/corrugated-grey.jpg"
    ],

    features: [
      "Traditional corrugated design",
      "Easy installation",
      "Affordable roofing option",
      "Custom lengths available",
      "Suitable for multiple applications"
    ],

    applications: [
      "Residential houses",
      "Farm buildings",
      "Shops",
      "Sheds",
      "Temporary structures"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestseller: true,
    onSale: true,
    rating: 4.7,
    reviewCount: 91,

    seoTitle:
      "Royal Corrugated Mabati 30G Price Kenya",
    seoDescription:
      "Order Royal Corrugated 30G roofing sheets from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "royal-corrugated-galvanized",
    slug: "royal-corrugated-galvanized",
    name: "Royal Galvanized Corrugated Sheet",
    category: "corrugated",
    categoryName: "Corrugated Mabati",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Unpainted galvanized corrugated roofing sheet for economical roofing and construction projects.",

    description:
      "Royal Galvanized Corrugated Sheet offers dependable protection and durability for customers seeking an economical unpainted roofing option.",

    price: 520,
    oldPrice: 570,
    priceUnit: "per metre",
    priceNote:
      "The final price depends on the selected gauge and order quantity.",

    gauge: ["32", "30", "28"],
    defaultGauge: "30",

    availableLengths: [
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8,
      9,
      10,
      11,
      12
    ],

    effectiveWidth: 0.85,
    totalWidth: 0.9,

    colours: ["Natural Galvanized Silver"],

    finish: "Galvanized",
    coating: "Zinc-coated galvanized steel",

    image:
      "assets/images/products/galvanized-corrugated.jpg",

    gallery: [
      "assets/images/products/galvanized-corrugated.jpg",
      "assets/images/products/galvanized-sheet-side.jpg"
    ],

    features: [
      "Economical roofing option",
      "Galvanized corrosion protection",
      "Easy to install",
      "Available in several gauges",
      "Custom-cut lengths"
    ],

    applications: [
      "Farm structures",
      "Workshops",
      "Temporary buildings",
      "Storage facilities",
      "Budget residential projects"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestseller: false,
    onSale: true,
    rating: 4.6,
    reviewCount: 43,

    seoTitle:
      "Galvanized Corrugated Mabati Kenya",
    seoDescription:
      "Buy galvanized corrugated roofing sheets from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "royal-stone-coated-classic",
    slug: "royal-stone-coated-classic",
    name: "Royal Stone Coated Classic",
    category: "stone-coated",
    categoryName: "Stone Coated Roofing",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Premium stone-coated steel roofing tile offering strength, elegance and long-term protection.",

    description:
      "Royal Stone Coated Classic provides a premium tiled appearance with the strength of steel and a protective stone-coated surface.",

    price: 950,
    oldPrice: 1050,
    priceUnit: "per piece",
    priceNote:
      "Accessories and installation materials are sold separately.",

    gauge: ["26"],
    defaultGauge: "26",

    availableLengths: [],
    effectiveWidth: 1.26,
    totalWidth: 1.34,

    colours: [
      "Charcoal",
      "Coffee Brown",
      "Brick Red",
      "Forest Green",
      "Mixed Brown"
    ],

    finish: "Stone coated",
    coating: "Natural stone granules over coated steel",

    image:
      "assets/images/products/stone-coated-classic.jpg",

    gallery: [
      "assets/images/products/stone-coated-classic.jpg",
      "assets/images/products/stone-coated-red.jpg",
      "assets/images/products/stone-coated-charcoal.jpg"
    ],

    features: [
      "Premium stone-coated finish",
      "Excellent weather resistance",
      "Reduced rain noise",
      "Elegant appearance",
      "Long service life"
    ],

    applications: [
      "Luxury homes",
      "Hotels",
      "Villas",
      "Apartments",
      "Institutional buildings"
    ],

    stockStatus: "Made to Order",
    availability: true,
    featured: true,
    bestseller: false,
    onSale: true,
    rating: 4.9,
    reviewCount: 38,

    seoTitle:
      "Royal Stone Coated Roofing Tiles Kenya",
    seoDescription:
      "Order Royal Stone Coated Classic roofing tiles from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "transparent-roofing-sheet",
    slug: "transparent-roofing-sheet",
    name: "Transparent Roofing Sheet",
    category: "transparent-sheets",
    categoryName: "Transparent Roofing Sheets",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Light-transmitting roofing sheet suitable for warehouses, patios and covered walkways.",

    description:
      "Transparent Roofing Sheets allow natural daylight into a building and can be combined with compatible roofing profiles.",

    price: 900,
    oldPrice: 980,
    priceUnit: "per metre",
    priceNote:
      "Confirm profile compatibility before placing your order.",

    gauge: ["N/A"],
    defaultGauge: "N/A",

    availableLengths: [
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6
    ],

    effectiveWidth: 0.85,
    totalWidth: 0.9,

    colours: [
      "Clear",
      "Translucent White"
    ],

    finish: "Transparent",
    coating: "UV-protected translucent material",

    image:
      "assets/images/products/transparent-roofing-sheet.jpg",

    gallery: [
      "assets/images/products/transparent-roofing-sheet.jpg",
      "assets/images/products/transparent-installed.jpg"
    ],

    features: [
      "Allows natural daylight",
      "UV-protected material",
      "Lightweight",
      "Easy to install",
      "Compatible with selected roofing profiles"
    ],

    applications: [
      "Warehouses",
      "Patios",
      "Walkways",
      "Factories",
      "Greenhouses"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestseller: false,
    onSale: false,
    rating: 4.6,
    reviewCount: 27,

    seoTitle:
      "Transparent Roofing Sheets Kenya",
    seoDescription:
      "Buy transparent roofing sheets from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "roof-ridge-cap",
    slug: "roof-ridge-cap",
    name: "Roof Ridge Cap",
    category: "roofing-accessories",
    categoryName: "Roofing Accessories",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Protective ridge cap used to cover and seal the highest point of a pitched roof.",

    description:
      "Roof Ridge Caps provide a neat, waterproof finish along the roof ridge and are available in colours matching selected mabati profiles.",

    price: 650,
    oldPrice: 700,
    priceUnit: "per piece",
    priceNote:
      "Standard and customized ridge sizes are available.",

    gauge: ["30", "28"],
    defaultGauge: "30",

    availableLengths: [2, 2.5, 3],

    effectiveWidth: null,
    totalWidth: null,

    colours: [
      "Brick Red",
      "Charcoal Grey",
      "Chocolate Brown",
      "Forest Green",
      "Maroon"
    ],

    finish: "Colour coated",
    coating: "Pre-painted galvanized steel",

    image: "assets/images/products/ridge-cap.jpg",

    gallery: [
      "assets/images/products/ridge-cap.jpg",
      "assets/images/products/ridge-cap-installed.jpg"
    ],

    features: [
      "Provides roof ridge protection",
      "Colour matching available",
      "Weather resistant",
      "Custom sizes available",
      "Neat roof finish"
    ],

    applications: [
      "Pitched roofs",
      "Residential buildings",
      "Warehouses",
      "Commercial buildings"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestseller: true,
    onSale: true,
    rating: 4.8,
    reviewCount: 61,

    seoTitle:
      "Roof Ridge Caps for Sale Kenya",
    seoDescription:
      "Order roof ridge caps from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "roof-valley",
    slug: "roof-valley",
    name: "Roof Valley",
    category: "roofing-accessories",
    categoryName: "Roofing Accessories",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Roof valley flashing designed to direct rainwater away from internal roof intersections.",

    description:
      "Roof Valley flashing helps prevent water penetration where two roof slopes meet and provides controlled drainage toward the gutter system.",

    price: 700,
    oldPrice: 750,
    priceUnit: "per piece",
    priceNote:
      "Custom valley sizes are available on request.",

    gauge: ["30", "28"],
    defaultGauge: "30",

    availableLengths: [2, 2.5, 3],

    effectiveWidth: null,
    totalWidth: null,

    colours: [
      "Brick Red",
      "Charcoal Grey",
      "Chocolate Brown",
      "Forest Green",
      "Maroon"
    ],

    finish: "Colour coated",
    coating: "Pre-painted galvanized steel",

    image: "assets/images/products/roof-valley.jpg",

    gallery: [
      "assets/images/products/roof-valley.jpg",
      "assets/images/products/roof-valley-installed.jpg"
    ],

    features: [
      "Improves roof drainage",
      "Helps prevent water leakage",
      "Weather resistant",
      "Custom sizes available",
      "Matches selected roof colours"
    ],

    applications: [
      "Complex roof designs",
      "Residential buildings",
      "Commercial roofing",
      "Institutional buildings"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestseller: false,
    onSale: false,
    rating: 4.7,
    reviewCount: 36,

    seoTitle:
      "Roof Valley Flashing Kenya",
    seoDescription:
      "Buy roof valley flashing from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "rainwater-gutter",
    slug: "rainwater-gutter",
    name: "Rainwater Gutter",
    category: "roofing-accessories",
    categoryName: "Roofing Accessories",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Durable rainwater gutter for collecting and directing roof water safely away from the building.",

    description:
      "Rainwater Gutters help protect foundations, walls and landscaping by controlling water flow from the roof.",

    price: 850,
    oldPrice: 920,
    priceUnit: "per piece",
    priceNote:
      "Downpipes, brackets and connectors may be ordered separately.",

    gauge: ["30", "28"],
    defaultGauge: "30",

    availableLengths: [2, 2.5, 3],

    effectiveWidth: null,
    totalWidth: null,

    colours: [
      "Charcoal Grey",
      "Chocolate Brown",
      "Brick Red",
      "Forest Green",
      "Galvanized Silver"
    ],

    finish: "Colour coated",
    coating: "Pre-painted galvanized steel",

    image: "assets/images/products/rainwater-gutter.jpg",

    gallery: [
      "assets/images/products/rainwater-gutter.jpg",
      "assets/images/products/gutter-installed.jpg"
    ],

    features: [
      "Controls rainwater flow",
      "Protects walls and foundations",
      "Colour options available",
      "Custom sizes available",
      "Strong weather-resistant material"
    ],

    applications: [
      "Residential homes",
      "Commercial buildings",
      "Schools",
      "Warehouses",
      "Rainwater harvesting systems"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestseller: true,
    onSale: true,
    rating: 4.8,
    reviewCount: 48,

    seoTitle:
      "Rainwater Gutters for Sale Kenya",
    seoDescription:
      "Order roofing gutters and accessories from ROYAL MABATI FACTORY LTD."
  },

  {
    id: "roofing-nails",
    slug: "roofing-nails",
    name: "Roofing Nails with Washers",
    category: "roofing-accessories",
    categoryName: "Roofing Accessories",
    brand: "ROYAL MABATI FACTORY LTD",

    shortDescription:
      "Strong roofing nails fitted with washers for secure and water-resistant mabati installation.",

    description:
      "Roofing Nails with Washers are designed to hold roofing sheets firmly while helping to reduce water entry around fixing points.",

    price: 350,
    oldPrice: 400,
    priceUnit: "per kilogram",
    priceNote:
      "Available in different lengths depending on roofing requirements.",

    gauge: ["N/A"],
    defaultGauge: "N/A",

    availableLengths: [],

    effectiveWidth: null,
    totalWidth: null,

    colours: ["Galvanized Silver"],

    finish: "Galvanized",
    coating: "Zinc-coated steel",

    image: "assets/images/products/roofing-nails.jpg",

    gallery: [
      "assets/images/products/roofing-nails.jpg",
      "assets/images/products/roofing-nails-closeup.jpg"
    ],

    features: [
      "Includes roofing washers",
      "Strong holding performance",
      "Corrosion resistant",
      "Suitable for timber roofing structures",
      "Available in several lengths"
    ],

    applications: [
      "Mabati installation",
      "Timber roof structures",
      "Residential roofing",
      "Commercial roofing"
    ],

    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestseller: true,
    onSale: true,
    rating: 4.7,
    reviewCount: 69,

    seoTitle:
      "Roofing Nails with Washers Kenya",
    seoDescription:
      "Buy roofing nails and washers from ROYAL MABATI FACTORY LTD."
  }
];

/* ==========================================================
   PRODUCT COLLECTIONS
   ========================================================== */

const FEATURED_PRODUCTS = PRODUCTS.filter(
  (product) => product.featured === true
);

const AVAILABLE_PRODUCTS = PRODUCTS.filter(
  (product) =>
    product.availability === true &&
    product.stockStatus !== "Out of Stock"
);

const SALE_PRODUCTS = PRODUCTS.filter(
  (product) =>
    product.onSale === true &&
    Number(product.oldPrice) > Number(product.price)
);

const BESTSELLER_PRODUCTS = PRODUCTS.filter(
  (product) => product.bestseller === true
);

/* ==========================================================
   PRODUCT FUNCTIONS
   ========================================================== */

/**
 * Find a product by its ID.
 * @param {string} productId
 * @returns {object|null}
 */
function getProductById(productId) {
  return (
    PRODUCTS.find(
      (product) => product.id === productId
    ) || null
  );
}

/**
 * Find a product using its URL slug.
 * @param {string} slug
 * @returns {object|null}
 */
function getProductBySlug(slug) {
  return (
    PRODUCTS.find(
      (product) => product.slug === slug
    ) || null
  );
}

/**
 * Return products from a selected category.
 * @param {string} categoryId
 * @returns {object[]}
 */
function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === "all") {
    return [...PRODUCTS];
  }

  return PRODUCTS.filter(
    (product) => product.category === categoryId
  );
}

/**
 * Return products related to the selected product.
 * @param {string} productId
 * @param {number} limit
 * @returns {object[]}
 */
function getRelatedProducts(productId, limit = 4) {
  const selectedProduct = getProductById(productId);

  if (!selectedProduct) {
    return [];
  }

  return PRODUCTS.filter(
    (product) =>
      product.id !== productId &&
      product.category === selectedProduct.category
  ).slice(0, limit);
}

/**
 * Search products by name, category, description,
 * gauge, colour or application.
 * @param {string} searchTerm
 * @returns {object[]}
 */
function searchProducts(searchTerm) {
  const normalizedSearch = String(
    searchTerm || ""
  )
    .trim()
    .toLowerCase();

  if (!normalizedSearch) {
    return [...PRODUCTS];
  }

  return PRODUCTS.filter((product) => {
    const searchableContent = [
      product.name,
      product.category,
      product.categoryName,
      product.brand,
      product.shortDescription,
      product.description,
      product.finish,
      product.coating,
      ...(product.gauge || []),
      ...(product.colours || []),
      ...(product.features || []),
      ...(product.applications || [])
    ]
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(
      normalizedSearch
    );
  });
}

/**
 * Calculate the discount percentage.
 * @param {object} product
 * @returns {number}
 */
function getDiscountPercentage(product) {
  const currentPrice = Number(product?.price);
  const oldPrice = Number(product?.oldPrice);

  if (
    !Number.isFinite(currentPrice) ||
    !Number.isFinite(oldPrice) ||
    oldPrice <= currentPrice ||
    oldPrice <= 0
  ) {
    return 0;
  }

  return Math.round(
    ((oldPrice - currentPrice) / oldPrice) * 100
  );
}

/**
 * Format an amount as Kenyan Shillings.
 * @param {number} amount
 * @returns {string}
 */
function formatKSh(amount) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return "KSh 0";
  }

  return `KSh ${numericAmount.toLocaleString(
    "en-KE",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
  )}`;
}

/**
 * Check whether a product is a roofing sheet.
 * This excludes accessories.
 * @param {object} product
 * @returns {boolean}
 */
function isRoofingSheet(product) {
  return Boolean(
    product &&
    product.category !== "roofing-accessories"
  );
}

/**
 * Check whether a product is an accessory.
 * @param {object} product
 * @returns {boolean}
 */
function isRoofingAccessory(product) {
  return Boolean(
    product &&
    product.category === "roofing-accessories"
  );
}

/**
 * Return all available colours.
 * @returns {string[]}
 */
function getAvailableColours() {
  return [
    ...new Set(
      PRODUCTS.flatMap(
        (product) => product.colours || []
      )
    )
  ].sort();
}

/**
 * Return all available gauges.
 * @returns {string[]}
 */
function getAvailableGauges() {
  return [
    ...new Set(
      PRODUCTS.flatMap(
        (product) => product.gauge || []
      )
    )
  ]
    .filter((gauge) => gauge !== "N/A")
    .sort((firstGauge, secondGauge) =>
      Number(firstGauge) - Number(secondGauge)
    );
}

/**
 * Create a WhatsApp enquiry link for a product.
 * @param {string} productId
 * @returns {string}
 */
function createProductWhatsAppLink(productId) {
  const product = getProductById(productId);

  if (!product) {
    return `https://wa.me/${BUSINESS_DETAILS.whatsapp}`;
  }

  const message = [
    `Hello ${BUSINESS_DETAILS.name},`,
    "",
    `I am interested in ${product.name}.`,
    `Price shown: ${formatKSh(product.price)} ${product.priceUnit}.`,
    "",
    "Please confirm:",
    "- Current price",
    "- Available gauges",
    "- Available colours",
    "- Available lengths",
    "- Delivery details"
  ].join("\n");

  return `https://wa.me/${
    BUSINESS_DETAILS.whatsapp
  }?text=${encodeURIComponent(message)}`;
}

/* ==========================================================
   EXPOSE DATA AND FUNCTIONS GLOBALLY
   ========================================================== */

window.BUSINESS_DETAILS = BUSINESS_DETAILS;

window.PRODUCTS = PRODUCTS;
window.FEATURED_PRODUCTS = FEATURED_PRODUCTS;
window.AVAILABLE_PRODUCTS = AVAILABLE_PRODUCTS;
window.SALE_PRODUCTS = SALE_PRODUCTS;
window.BESTSELLER_PRODUCTS = BESTSELLER_PRODUCTS;
window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;

window.getProductById = getProductById;
window.getProductBySlug = getProductBySlug;
window.getProductsByCategory =
  getProductsByCategory;
window.getRelatedProducts = getRelatedProducts;
window.searchProducts = searchProducts;
window.getDiscountPercentage =
  getDiscountPercentage;
window.formatKSh = formatKSh;
window.isRoofingSheet = isRoofingSheet;
window.isRoofingAccessory =
  isRoofingAccessory;
window.getAvailableColours =
  getAvailableColours;
window.getAvailableGauges =
  getAvailableGauges;
window.createProductWhatsAppLink =
  createProductWhatsAppLink;