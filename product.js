from pathlib import Path

content = r'''/**
 * Kenya Mabati Centre
 * Product catalogue data
 *
 * IMPORTANT:
 * - All prices below are editable sample prices.
 * - Confirm current prices before publishing.
 * - Replace placeholder image paths with your final product photos.
 */

const PRODUCTS = [
  {
    id: "box-profile-30g-gloss",
    name: "Box Profile Mabati 30G",
    category: "Box Profile",
    type: "mabati",
    image: "images/products/box-profile-red.jpg",
    gallery: [
      "images/products/box-profile-red.jpg",
      "images/products/box-profile-grey.jpg",
      "images/products/box-profile-green.jpg"
    ],
    description:
      "A clean, modern box profile roofing sheet suitable for homes, shops, schools, churches, and commercial projects.",
    price: 690,
    oldPrice: 760,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["30"],
    defaultGauge: "30",
    finish: "Gloss",
    colours: ["Brick Red", "Charcoal Grey", "Forest Green", "Coffee Brown", "Blue"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    effectiveWidth: 1,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 9,
    freeDelivery: true,
    specifications: {
      profile: "Box Profile",
      coating: "Pre-painted finish",
      gauge: "30G",
      effectiveWidth: "1.0 metre",
      length: "Custom sizes available",
      use: "Residential and commercial roofing"
    },
    installationUses: [
      "Bungalows",
      "Maisonettes",
      "Schools",
      "Churches",
      "Commercial buildings"
    ],
    keywords: ["box profile", "30 gauge", "coloured mabati", "roofing sheets"]
  },
  {
    id: "box-profile-28g-matte",
    name: "Box Profile Mabati 28G Matte",
    category: "Box Profile",
    type: "mabati",
    image: "images/products/box-profile-matte-black.jpg",
    gallery: [
      "images/products/box-profile-matte-black.jpg",
      "images/products/box-profile-matte-grey.jpg",
      "images/products/box-profile-matte-brown.jpg"
    ],
    description:
      "A heavier-gauge box profile sheet with a refined matte finish for premium residential and commercial roofing.",
    price: 920,
    oldPrice: 1010,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["28"],
    defaultGauge: "28",
    finish: "Matte",
    colours: ["Matte Black", "Charcoal Grey", "Coffee Brown", "Brick Red"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    effectiveWidth: 1,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: true,
    sale: true,
    salePercentage: 9,
    freeDelivery: true,
    specifications: {
      profile: "Box Profile",
      coating: "Matte pre-painted finish",
      gauge: "28G",
      effectiveWidth: "1.0 metre",
      length: "Custom sizes available",
      use: "Premium residential and commercial roofing"
    },
    installationUses: ["Modern homes", "Apartments", "Office blocks", "Retail shops"],
    keywords: ["box profile", "28 gauge", "matte mabati", "premium roofing"]
  },
  {
    id: "corrugated-30g-coloured",
    name: "Corrugated Mabati 30G",
    category: "Corrugated Profile",
    type: "mabati",
    image: "images/products/corrugated-red.jpg",
    gallery: [
      "images/products/corrugated-red.jpg",
      "images/products/corrugated-green.jpg",
      "images/products/corrugated-grey.jpg"
    ],
    description:
      "Traditional corrugated roofing sheets for homes, kiosks, farm structures, warehouses, and budget-conscious projects.",
    price: 620,
    oldPrice: 680,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["30"],
    defaultGauge: "30",
    finish: "Gloss",
    colours: ["Brick Red", "Forest Green", "Charcoal Grey", "Blue"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    effectiveWidth: 0.762,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 9,
    freeDelivery: true,
    specifications: {
      profile: "Corrugated",
      coating: "Pre-painted finish",
      gauge: "30G",
      effectiveWidth: "0.762 metre",
      length: "Custom sizes available",
      use: "General roofing and wall cladding"
    },
    installationUses: ["Homes", "Farm sheds", "Warehouses", "Kiosks", "Workshops"],
    keywords: ["corrugated mabati", "iron sheets", "30 gauge", "affordable roofing"]
  },
  {
    id: "corrugated-32g-galvanized",
    name: "Galvanized Corrugated Sheet 32G",
    category: "Galvanized Sheets",
    type: "mabati",
    image: "images/products/galvanized-corrugated.jpg",
    gallery: [
      "images/products/galvanized-corrugated.jpg",
      "images/products/galvanized-stack.jpg"
    ],
    description:
      "An economical non-coloured galvanized corrugated sheet for temporary structures, farm buildings, and light-duty roofing.",
    price: 480,
    oldPrice: 520,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["32"],
    defaultGauge: "32",
    finish: "Galvanized",
    colours: ["Natural Silver"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4],
    effectiveWidth: 0.762,
    material: "Galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      profile: "Corrugated",
      coating: "Galvanized zinc coating",
      gauge: "32G",
      effectiveWidth: "0.762 metre",
      length: "Standard and selected custom sizes",
      use: "Light-duty roofing"
    },
    installationUses: ["Temporary structures", "Animal shelters", "Stores", "Farm sheds"],
    keywords: ["galvanized sheets", "corrugated iron sheets", "32 gauge", "silver mabati"]
  },
  {
    id: "tile-profile-30g",
    name: "Tile Profile Mabati 30G",
    category: "Tile Profile",
    type: "mabati",
    image: "images/products/tile-profile-red.jpg",
    gallery: [
      "images/products/tile-profile-red.jpg",
      "images/products/tile-profile-grey.jpg",
      "images/products/tile-profile-green.jpg"
    ],
    description:
      "Tile-shaped mabati designed to give homes a refined roof appearance while retaining the practicality of coated steel.",
    price: 760,
    oldPrice: 830,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["30"],
    defaultGauge: "30",
    finish: "Gloss",
    colours: ["Brick Red", "Charcoal Grey", "Forest Green", "Coffee Brown"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    effectiveWidth: 1,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      profile: "Tile Profile",
      coating: "Pre-painted finish",
      gauge: "30G",
      effectiveWidth: "1.0 metre",
      length: "Custom sizes available",
      use: "Residential roofing"
    },
    installationUses: ["Bungalows", "Maisonettes", "Rental homes", "Guest houses"],
    keywords: ["tile profile mabati", "roof tiles", "30 gauge", "house roofing"]
  },
  {
    id: "roman-tile-28g-matte",
    name: "Roman Tile Mabati 28G Matte",
    category: "Roman Tile",
    type: "mabati",
    image: "images/products/roman-tile-grey.jpg",
    gallery: [
      "images/products/roman-tile-grey.jpg",
      "images/products/roman-tile-red.jpg",
      "images/products/roman-tile-black.jpg"
    ],
    description:
      "A premium Roman-style roofing profile with a matte coating for modern homes, villas, and high-end residential projects.",
    price: 980,
    oldPrice: 1080,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["28"],
    defaultGauge: "28",
    finish: "Matte",
    colours: ["Charcoal Grey", "Matte Black", "Brick Red", "Coffee Brown"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    effectiveWidth: 1,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 9,
    freeDelivery: true,
    specifications: {
      profile: "Roman Tile",
      coating: "Matte pre-painted finish",
      gauge: "28G",
      effectiveWidth: "1.0 metre",
      length: "Custom sizes available",
      use: "Premium residential roofing"
    },
    installationUses: ["Villas", "Maisonettes", "Luxury homes", "Hotels"],
    keywords: ["roman tile mabati", "28 gauge", "matte roofing", "premium mabati"]
  },
  {
    id: "versatile-30g",
    name: "Versatile Mabati 30G",
    category: "Versatile",
    type: "mabati",
    image: "images/products/versatile-coffee-brown.jpg",
    gallery: [
      "images/products/versatile-coffee-brown.jpg",
      "images/products/versatile-red.jpg",
      "images/products/versatile-grey.jpg"
    ],
    description:
      "A decorative step-tile roofing profile suited to residential homes, schools, churches, and hospitality projects.",
    price: 790,
    oldPrice: 860,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["30"],
    defaultGauge: "30",
    finish: "Gloss",
    colours: ["Coffee Brown", "Brick Red", "Charcoal Grey", "Forest Green"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    effectiveWidth: 1,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      profile: "Versatile",
      coating: "Pre-painted finish",
      gauge: "30G",
      effectiveWidth: "1.0 metre",
      length: "Custom sizes available",
      use: "Residential and institutional roofing"
    },
    installationUses: ["Homes", "Schools", "Churches", "Restaurants"],
    keywords: ["versatile mabati", "tile mabati", "30 gauge", "decorative roofing"]
  },
  {
    id: "brick-tile-28g",
    name: "Brick Tile Mabati 28G",
    category: "Brick Tile",
    type: "mabati",
    image: "images/products/brick-tile-red.jpg",
    gallery: [
      "images/products/brick-tile-red.jpg",
      "images/products/brick-tile-grey.jpg"
    ],
    description:
      "A strong tile-pattern roofing sheet designed for attractive residential roofs and long-span building projects.",
    price: 940,
    oldPrice: 1020,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["28"],
    defaultGauge: "28",
    finish: "Gloss",
    colours: ["Brick Red", "Charcoal Grey", "Coffee Brown", "Forest Green"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    effectiveWidth: 1,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      profile: "Brick Tile",
      coating: "Pre-painted finish",
      gauge: "28G",
      effectiveWidth: "1.0 metre",
      length: "Custom sizes available",
      use: "Residential roofing"
    },
    installationUses: ["Maisonettes", "Bungalows", "Apartments", "Guest houses"],
    keywords: ["brick tile mabati", "28 gauge", "tile roofing", "coloured sheets"]
  },
  {
    id: "stone-coated-classic",
    name: "Stone-Coated Classic Tile",
    category: "Stone-Coated Tiles",
    type: "mabati",
    image: "images/products/stone-coated-classic.jpg",
    gallery: [
      "images/products/stone-coated-classic.jpg",
      "images/products/stone-coated-red.jpg",
      "images/products/stone-coated-charcoal.jpg"
    ],
    description:
      "A stone-coated steel roofing tile with a textured surface for premium residential and commercial applications.",
    price: 850,
    oldPrice: 930,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["26"],
    defaultGauge: "26",
    finish: "Stone Coated",
    colours: ["Charcoal", "Terracotta", "Coffee Brown", "Forest Green"],
    availableLengths: [1.34],
    effectiveWidth: 0.37,
    material: "Stone-coated steel",
    stockStatus: "Limited Stock",
    availability: true,
    featured: true,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 9,
    freeDelivery: true,
    specifications: {
      profile: "Classic Tile",
      coating: "Stone-coated finish",
      gauge: "26G",
      coverage: "Approx. 0.46 square metres per piece",
      length: "Standard tile panel",
      use: "Premium roofing"
    },
    installationUses: ["Villas", "Hotels", "Commercial properties", "Luxury homes"],
    keywords: ["stone coated tiles", "roof tiles", "premium roofing", "26 gauge"]
  },
  {
    id: "aluzinc-box-profile-30g",
    name: "Aluzinc Box Profile Sheet 30G",
    category: "Aluzinc Sheets",
    type: "mabati",
    image: "images/products/aluzinc-box-profile.jpg",
    gallery: [
      "images/products/aluzinc-box-profile.jpg",
      "images/products/aluzinc-stack.jpg"
    ],
    description:
      "A non-coloured Aluzinc box profile sheet for warehouses, workshops, farm structures, and industrial roofing.",
    price: 610,
    oldPrice: 670,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["30"],
    defaultGauge: "30",
    finish: "Aluzinc",
    colours: ["Natural Silver"],
    availableLengths: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    effectiveWidth: 1,
    material: "Aluminium-zinc coated steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 9,
    freeDelivery: true,
    specifications: {
      profile: "Box Profile",
      coating: "Aluminium-zinc",
      gauge: "30G",
      effectiveWidth: "1.0 metre",
      length: "Custom sizes available",
      use: "Industrial and agricultural roofing"
    },
    installationUses: ["Warehouses", "Workshops", "Farm sheds", "Factories"],
    keywords: ["aluzinc sheets", "box profile", "industrial roofing", "silver mabati"]
  },
  {
    id: "industrial-ibr-28g",
    name: "Industrial IBR Roofing Sheet 28G",
    category: "Industrial Roofing Sheets",
    type: "mabati",
    image: "images/products/industrial-ibr.jpg",
    gallery: [
      "images/products/industrial-ibr.jpg",
      "images/products/industrial-roof-grey.jpg"
    ],
    description:
      "A heavy-duty industrial profile designed for warehouses, factories, workshops, and large-span roofing projects.",
    price: 990,
    oldPrice: 1080,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["28"],
    defaultGauge: "28",
    finish: "Gloss",
    colours: ["Charcoal Grey", "Brick Red", "Forest Green", "Natural Silver"],
    availableLengths: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 7, 8, 9, 10],
    effectiveWidth: 0.686,
    material: "Pre-painted galvanized steel",
    stockStatus: "Made to Order",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      profile: "IBR Industrial Profile",
      coating: "Pre-painted or metallic finish",
      gauge: "28G",
      effectiveWidth: "0.686 metre",
      length: "Long custom sizes available",
      use: "Industrial roofing and cladding"
    },
    installationUses: ["Factories", "Warehouses", "Workshops", "Large stores"],
    keywords: ["industrial roofing sheets", "IBR mabati", "28 gauge", "warehouse roofing"]
  },
  {
    id: "transparent-pvc-sheet",
    name: "Transparent PVC Roofing Sheet",
    category: "Transparent Sheets",
    type: "mabati",
    image: "images/products/transparent-pvc-sheet.jpg",
    gallery: [
      "images/products/transparent-pvc-sheet.jpg",
      "images/products/transparent-roof-installed.jpg"
    ],
    description:
      "A translucent roofing sheet for adding natural light to workshops, farm structures, patios, and covered walkways.",
    price: 720,
    oldPrice: 790,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Transparent",
    colours: ["Clear", "Light Blue", "Smoke"],
    availableLengths: [2, 2.5, 3, 3.5, 4, 5, 6],
    effectiveWidth: 0.762,
    material: "PVC",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 9,
    freeDelivery: true,
    specifications: {
      profile: "Corrugated",
      material: "PVC",
      lightTransmission: "Translucent",
      effectiveWidth: "0.762 metre",
      length: "Selected standard sizes",
      use: "Daylighting"
    },
    installationUses: ["Workshops", "Patios", "Farm sheds", "Covered walkways"],
    keywords: ["transparent roofing sheets", "PVC sheets", "daylight roofing", "clear mabati"]
  },
  {
    id: "reject-mabati-mixed",
    name: "Reject Mabati Mixed Colours",
    category: "Reject Mabati",
    type: "mabati",
    image: "images/products/reject-mabati.jpg",
    gallery: [
      "images/products/reject-mabati.jpg",
      "images/products/reject-mabati-stack.jpg"
    ],
    description:
      "Budget roofing sheets sold in mixed colours and variable finishes. Suitable for temporary, farm, and low-cost structures.",
    price: 390,
    oldPrice: 450,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Availability, colour, and condition vary.",
    gauge: ["30", "32"],
    defaultGauge: "30",
    finish: "Mixed",
    colours: ["Mixed Colours", "Natural Silver"],
    availableLengths: [1.5, 2, 2.5, 3],
    effectiveWidth: 0.762,
    material: "Mixed coated steel",
    stockStatus: "Limited Stock",
    availability: true,
    featured: false,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 13,
    freeDelivery: true,
    specifications: {
      profile: "Mixed profiles",
      coating: "Mixed finish",
      gauge: "30G or 32G",
      effectiveWidth: "Varies",
      length: "Available sizes vary",
      use: "Budget and temporary roofing"
    },
    installationUses: ["Farm sheds", "Temporary stores", "Animal shelters", "Site offices"],
    keywords: ["reject mabati", "cheap mabati", "budget roofing", "mixed colours"]
  },

  /* Roofing accessories */
  {
    id: "ridge-cap-standard",
    name: "Standard Ridge Cap",
    category: "Ridge Caps",
    type: "accessory",
    image: "images/accessories/ridge-cap.jpg",
    gallery: ["images/accessories/ridge-cap.jpg"],
    description:
      "A matching ridge cover used to seal and finish the top meeting point of two roof slopes.",
    price: 850,
    oldPrice: 920,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["28", "30"],
    defaultGauge: "30",
    finish: "Gloss",
    colours: ["Brick Red", "Charcoal Grey", "Forest Green", "Coffee Brown"],
    availableLengths: [2, 2.5, 3],
    effectiveWidth: null,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      accessoryType: "Ridge cap",
      material: "Pre-painted galvanized steel",
      gauges: "28G and 30G",
      length: "2 to 3 metres",
      use: "Roof ridge finishing"
    },
    installationUses: ["Roof ridge sealing", "Roof finishing"],
    keywords: ["ridge cap", "roof ridge", "roofing accessories"]
  },
  {
    id: "valley-gutter",
    name: "Roof Valley Gutter",
    category: "Valley Gutters",
    type: "accessory",
    image: "images/accessories/valley-gutter.jpg",
    gallery: ["images/accessories/valley-gutter.jpg"],
    description:
      "A formed metal channel for directing rainwater where two roof slopes meet internally.",
    price: 980,
    oldPrice: 1050,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["28", "30"],
    defaultGauge: "28",
    finish: "Gloss",
    colours: ["Charcoal Grey", "Brick Red", "Coffee Brown", "Natural Silver"],
    availableLengths: [2, 2.5, 3],
    effectiveWidth: null,
    material: "Galvanized or pre-painted steel",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 7,
    freeDelivery: true,
    specifications: {
      accessoryType: "Valley gutter",
      material: "Galvanized or pre-painted steel",
      gauges: "28G and 30G",
      length: "2 to 3 metres",
      use: "Internal roof valley drainage"
    },
    installationUses: ["Roof valleys", "Rainwater direction"],
    keywords: ["valley gutter", "roof valley", "roof drainage"]
  },
  {
    id: "roof-flashing",
    name: "Roof Flashing",
    category: "Flashing",
    type: "accessory",
    image: "images/accessories/flashing.jpg",
    gallery: ["images/accessories/flashing.jpg"],
    description:
      "Formed metal flashing for sealing roof edges, walls, chimneys, and other roof junctions.",
    price: 760,
    oldPrice: 820,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["28", "30"],
    defaultGauge: "30",
    finish: "Gloss",
    colours: ["Brick Red", "Charcoal Grey", "Coffee Brown", "Natural Silver"],
    availableLengths: [2, 2.5, 3],
    effectiveWidth: null,
    material: "Galvanized or pre-painted steel",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 7,
    freeDelivery: true,
    specifications: {
      accessoryType: "Flashing",
      material: "Galvanized or pre-painted steel",
      length: "2 to 3 metres",
      use: "Sealing roof junctions"
    },
    installationUses: ["Wall junctions", "Chimneys", "Roof edges"],
    keywords: ["roof flashing", "roof sealing", "roof accessories"]
  },
  {
    id: "barge-board",
    name: "Metal Barge Board",
    category: "Barge Boards",
    type: "accessory",
    image: "images/accessories/barge-board.jpg",
    gallery: ["images/accessories/barge-board.jpg"],
    description:
      "A formed metal trim used to finish and protect the exposed gable edge of a roof.",
    price: 820,
    oldPrice: 890,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm before publishing.",
    gauge: ["28", "30"],
    defaultGauge: "30",
    finish: "Gloss",
    colours: ["Brick Red", "Charcoal Grey", "Forest Green", "Coffee Brown"],
    availableLengths: [2, 2.5, 3],
    effectiveWidth: null,
    material: "Pre-painted galvanized steel",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      accessoryType: "Barge board",
      material: "Pre-painted galvanized steel",
      length: "2 to 3 metres",
      use: "Gable edge finishing"
    },
    installationUses: ["Gable ends", "Roof edge protection"],
    keywords: ["barge board", "gable trim", "roof edge"]
  },
  {
    id: "roofing-nails-100",
    name: "Roofing Nails with Washers",
    category: "Roofing Nails",
    type: "accessory",
    image: "images/accessories/roofing-nails.jpg",
    gallery: ["images/accessories/roofing-nails.jpg"],
    description:
      "Roofing nails supplied with sealing washers for fixing mabati sheets to timber roof structures.",
    price: 650,
    oldPrice: 700,
    priceUnit: "per pack",
    priceNote: "Editable sample price. Confirm pack size before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Galvanized",
    colours: ["Natural Silver"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Galvanized steel and rubber",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 7,
    freeDelivery: true,
    specifications: {
      accessoryType: "Roofing nails",
      material: "Galvanized steel",
      washer: "Rubber sealing washer",
      use: "Fixing roofing sheets to timber"
    },
    installationUses: ["Timber roof fixing", "Mabati installation"],
    keywords: ["roofing nails", "roof washers", "mabati nails"]
  },
  {
    id: "self-drilling-screws",
    name: "Self-Drilling Roofing Screws",
    category: "Self-Drilling Screws",
    type: "accessory",
    image: "images/accessories/self-drilling-screws.jpg",
    gallery: ["images/accessories/self-drilling-screws.jpg"],
    description:
      "Hex-head self-drilling roofing screws with bonded washers for fixing roofing sheets to steel or timber frames.",
    price: 980,
    oldPrice: 1050,
    priceUnit: "per pack",
    priceNote: "Editable sample price. Confirm pack size before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Coated",
    colours: ["Natural Silver", "Colour Matched"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Coated steel and EPDM washer",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 7,
    freeDelivery: true,
    specifications: {
      accessoryType: "Roofing screws",
      head: "Hex head",
      washer: "Bonded sealing washer",
      use: "Fixing sheets to steel or timber"
    },
    installationUses: ["Steel trusses", "Timber trusses", "Roof cladding"],
    keywords: ["roofing screws", "self drilling screws", "mabati fasteners"]
  },
  {
    id: "rubber-washers",
    name: "Roofing Rubber Washers",
    category: "Rubber Washers",
    type: "accessory",
    image: "images/accessories/rubber-washers.jpg",
    gallery: ["images/accessories/rubber-washers.jpg"],
    description:
      "Sealing washers used with roofing fasteners to reduce water entry around fixing points.",
    price: 280,
    oldPrice: 320,
    priceUnit: "per pack",
    priceNote: "Editable sample price. Confirm pack size before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Rubber",
    colours: ["Black"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Rubber",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 13,
    freeDelivery: true,
    specifications: {
      accessoryType: "Rubber washer",
      material: "Rubber",
      use: "Sealing roofing fasteners"
    },
    installationUses: ["Roof fixing points", "Leak prevention"],
    keywords: ["rubber washers", "roofing washers", "roof seals"]
  },
  {
    id: "foam-fillers",
    name: "Roof Profile Foam Fillers",
    category: "Foam Fillers",
    type: "accessory",
    image: "images/accessories/foam-fillers.jpg",
    gallery: ["images/accessories/foam-fillers.jpg"],
    description:
      "Profile-shaped foam strips for closing gaps at roof ridges and eaves.",
    price: 320,
    oldPrice: 360,
    priceUnit: "per pair",
    priceNote: "Editable sample price. Confirm profile before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Foam",
    colours: ["Black", "Grey"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Closed-cell foam",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 11,
    freeDelivery: true,
    specifications: {
      accessoryType: "Foam filler",
      material: "Closed-cell foam",
      use: "Closing roof profile gaps"
    },
    installationUses: ["Ridges", "Eaves", "Profile gap sealing"],
    keywords: ["foam fillers", "roof profile fillers", "roof gap seal"]
  },
  {
    id: "butyl-tape",
    name: "Butyl Roofing Tape",
    category: "Butyl Tape",
    type: "accessory",
    image: "images/accessories/butyl-tape.jpg",
    gallery: ["images/accessories/butyl-tape.jpg"],
    description:
      "Flexible sealing tape for roof laps, flashings, gutters, and joints requiring water resistance.",
    price: 780,
    oldPrice: 850,
    priceUnit: "per roll",
    priceNote: "Editable sample price. Confirm roll dimensions before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Adhesive",
    colours: ["Black", "Grey"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Butyl rubber",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      accessoryType: "Butyl tape",
      material: "Butyl rubber",
      use: "Sealing laps and joints"
    },
    installationUses: ["Roof laps", "Flashing joints", "Gutter joints"],
    keywords: ["butyl tape", "roof sealant tape", "roof joint tape"]
  },
  {
    id: "pvc-gutter",
    name: "PVC Rain Gutter",
    category: "Gutters",
    type: "accessory",
    image: "images/accessories/pvc-gutter.jpg",
    gallery: ["images/accessories/pvc-gutter.jpg"],
    description:
      "A lightweight rain gutter channel for collecting and directing roof runoff.",
    price: 1450,
    oldPrice: 1550,
    priceUnit: "per length",
    priceNote: "Editable sample price. Confirm size and length before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "PVC",
    colours: ["White", "Brown", "Black"],
    availableLengths: [3, 4],
    effectiveWidth: null,
    material: "PVC",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 6,
    freeDelivery: true,
    specifications: {
      accessoryType: "Rain gutter",
      material: "PVC",
      length: "3 or 4 metres",
      use: "Rainwater collection"
    },
    installationUses: ["Homes", "Schools", "Churches", "Rainwater harvesting"],
    keywords: ["gutters", "PVC gutter", "rainwater harvesting"]
  },
  {
    id: "pvc-downpipe",
    name: "PVC Downpipe",
    category: "Downpipes",
    type: "accessory",
    image: "images/accessories/pvc-downpipe.jpg",
    gallery: ["images/accessories/pvc-downpipe.jpg"],
    description:
      "A vertical pipe for carrying rainwater from the gutter to a drain or storage tank.",
    price: 1200,
    oldPrice: 1280,
    priceUnit: "per length",
    priceNote: "Editable sample price. Confirm size and length before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "PVC",
    colours: ["White", "Brown", "Black"],
    availableLengths: [3, 4],
    effectiveWidth: null,
    material: "PVC",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 6,
    freeDelivery: true,
    specifications: {
      accessoryType: "Downpipe",
      material: "PVC",
      length: "3 or 4 metres",
      use: "Rainwater discharge"
    },
    installationUses: ["Gutter drainage", "Rainwater tanks", "Stormwater systems"],
    keywords: ["downpipes", "PVC downpipe", "rainwater drainage"]
  },
  {
    id: "gutter-bracket",
    name: "Gutter Bracket",
    category: "Gutter Brackets",
    type: "accessory",
    image: "images/accessories/gutter-bracket.jpg",
    gallery: ["images/accessories/gutter-bracket.jpg"],
    description:
      "A supporting bracket used to hold rain gutters securely along the roof edge.",
    price: 180,
    oldPrice: 210,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm size before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "PVC",
    colours: ["White", "Brown", "Black"],
    availableLengths: [],
    effectiveWidth: null,
    material: "PVC or coated metal",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 14,
    freeDelivery: true,
    specifications: {
      accessoryType: "Gutter bracket",
      material: "PVC or coated metal",
      use: "Supporting gutters"
    },
    installationUses: ["Gutter mounting", "Roof drainage systems"],
    keywords: ["gutter bracket", "gutter support", "rain gutter accessories"]
  },
  {
    id: "gutter-outlet",
    name: "Gutter Outlet",
    category: "Gutter Outlets",
    type: "accessory",
    image: "images/accessories/gutter-outlet.jpg",
    gallery: ["images/accessories/gutter-outlet.jpg"],
    description:
      "A connector fitting that directs water from the gutter into a downpipe.",
    price: 420,
    oldPrice: 470,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm size before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "PVC",
    colours: ["White", "Brown", "Black"],
    availableLengths: [],
    effectiveWidth: null,
    material: "PVC",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 11,
    freeDelivery: true,
    specifications: {
      accessoryType: "Gutter outlet",
      material: "PVC",
      use: "Connecting gutter to downpipe"
    },
    installationUses: ["Rain gutter systems", "Rainwater collection"],
    keywords: ["gutter outlet", "downpipe connector", "gutter fitting"]
  },
  {
    id: "roof-louvre",
    name: "Roof Louvre",
    category: "Louvres",
    type: "accessory",
    image: "images/accessories/roof-louvre.jpg",
    gallery: ["images/accessories/roof-louvre.jpg"],
    description:
      "A ventilation louvre for improving airflow in roof spaces, workshops, and agricultural buildings.",
    price: 1850,
    oldPrice: 1980,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm size before publishing.",
    gauge: ["28", "30"],
    defaultGauge: "30",
    finish: "Gloss",
    colours: ["Charcoal Grey", "Brick Red", "Natural Silver"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Coated steel",
    stockStatus: "Made to Order",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 7,
    freeDelivery: true,
    specifications: {
      accessoryType: "Roof louvre",
      material: "Coated steel",
      use: "Roof and wall ventilation"
    },
    installationUses: ["Warehouses", "Workshops", "Farm buildings"],
    keywords: ["roof louvre", "roof ventilation", "building airflow"]
  },
  {
    id: "roof-ventilator",
    name: "Roof Ventilator",
    category: "Roofing Ventilators",
    type: "accessory",
    image: "images/accessories/roof-ventilator.jpg",
    gallery: ["images/accessories/roof-ventilator.jpg"],
    description:
      "A passive roof ventilator for reducing trapped heat and improving airflow in large buildings.",
    price: 12500,
    oldPrice: 13800,
    priceUnit: "per unit",
    priceNote: "Editable sample price. Confirm size and model before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Metallic",
    colours: ["Natural Silver"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Aluminium or stainless steel",
    stockStatus: "Made to Order",
    availability: true,
    featured: true,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 9,
    freeDelivery: true,
    specifications: {
      accessoryType: "Roof ventilator",
      material: "Aluminium or stainless steel",
      use: "Passive roof ventilation"
    },
    installationUses: ["Factories", "Warehouses", "Workshops", "Large kitchens"],
    keywords: ["roof ventilator", "turbine ventilator", "warehouse ventilation"]
  },
  {
    id: "polycarbonate-sheet",
    name: "Polycarbonate Roofing Sheet",
    category: "Polycarbonate Sheets",
    type: "accessory",
    image: "images/accessories/polycarbonate-sheet.jpg",
    gallery: [
      "images/accessories/polycarbonate-sheet.jpg",
      "images/accessories/polycarbonate-installed.jpg"
    ],
    description:
      "A strong translucent sheet used for canopies, verandas, walkways, and daylight roofing sections.",
    price: 1650,
    oldPrice: 1780,
    priceUnit: "per metre",
    priceNote: "Editable sample price. Confirm thickness and profile before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Translucent",
    colours: ["Clear", "Bronze", "Blue", "Opal"],
    availableLengths: [2, 2.5, 3, 4, 5, 6],
    effectiveWidth: 1.05,
    material: "Polycarbonate",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 7,
    freeDelivery: true,
    specifications: {
      accessoryType: "Polycarbonate sheet",
      material: "Polycarbonate",
      finish: "Translucent",
      use: "Canopies and daylight roofing"
    },
    installationUses: ["Verandas", "Canopies", "Walkways", "Carports"],
    keywords: ["polycarbonate sheets", "transparent roofing", "canopy roofing"]
  },
  {
    id: "solar-panel-clamp",
    name: "Solar Panel Roof Clamp",
    category: "Solar Panel Clamps",
    type: "accessory",
    image: "images/accessories/solar-panel-clamp.jpg",
    gallery: ["images/accessories/solar-panel-clamp.jpg"],
    description:
      "A roof mounting clamp for securing solar panel rails to compatible metal roofing profiles.",
    price: 550,
    oldPrice: 620,
    priceUnit: "per piece",
    priceNote: "Editable sample price. Confirm roof profile compatibility.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Metallic",
    colours: ["Natural Silver"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Aluminium and stainless steel",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 11,
    freeDelivery: true,
    specifications: {
      accessoryType: "Solar roof clamp",
      material: "Aluminium and stainless steel",
      use: "Solar rail mounting"
    },
    installationUses: ["Solar installations", "Metal roofs"],
    keywords: ["solar panel clamp", "solar roof mount", "mabati solar fitting"]
  },
  {
    id: "roofing-insulation",
    name: "Roofing Insulation Foil",
    category: "Roofing Insulation",
    type: "accessory",
    image: "images/accessories/roofing-insulation.jpg",
    gallery: ["images/accessories/roofing-insulation.jpg"],
    description:
      "Reflective insulation foil for reducing radiant heat and supporting moisture control beneath metal roofing.",
    price: 4800,
    oldPrice: 5200,
    priceUnit: "per roll",
    priceNote: "Editable sample price. Confirm roll size and thickness.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Foil",
    colours: ["Silver"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Reflective foil and foam",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      accessoryType: "Roof insulation",
      material: "Reflective foil and foam",
      use: "Heat and moisture control"
    },
    installationUses: ["Homes", "Warehouses", "Offices", "Schools"],
    keywords: ["roofing insulation", "heat insulation", "roof foil"]
  },
  {
    id: "binding-wire",
    name: "Binding Wire",
    category: "Binding Wire",
    type: "accessory",
    image: "images/accessories/binding-wire.jpg",
    gallery: ["images/accessories/binding-wire.jpg"],
    description:
      "General-purpose binding wire for construction and roofing support tasks.",
    price: 2600,
    oldPrice: 2800,
    priceUnit: "per roll",
    priceNote: "Editable sample price. Confirm roll weight before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Black",
    colours: ["Black"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Steel wire",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 7,
    freeDelivery: true,
    specifications: {
      accessoryType: "Binding wire",
      material: "Steel",
      use: "Construction tying and fixing"
    },
    installationUses: ["Roof structures", "Construction work"],
    keywords: ["binding wire", "construction wire", "roofing wire"]
  },
  {
    id: "roof-sealant",
    name: "Roofing Sealant",
    category: "Sealants",
    type: "accessory",
    image: "images/accessories/roof-sealant.jpg",
    gallery: ["images/accessories/roof-sealant.jpg"],
    description:
      "A flexible sealant for flashing joints, fastener points, gutter joints, and small roof repairs.",
    price: 650,
    oldPrice: 720,
    priceUnit: "per tube",
    priceNote: "Editable sample price. Confirm product type before publishing.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Sealant",
    colours: ["Clear", "Grey", "Black", "White"],
    availableLengths: [],
    effectiveWidth: null,
    material: "Polyurethane or silicone compound",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: true,
    newest: false,
    sale: true,
    salePercentage: 10,
    freeDelivery: true,
    specifications: {
      accessoryType: "Roof sealant",
      material: "Flexible sealant compound",
      use: "Roof joint sealing and repairs"
    },
    installationUses: ["Flashing joints", "Gutters", "Roof repairs"],
    keywords: ["roof sealant", "roof repair", "waterproof sealant"]
  },
  {
    id: "fascia-board",
    name: "Fascia Board",
    category: "Fascia Boards",
    type: "accessory",
    image: "images/accessories/fascia-board.jpg",
    gallery: ["images/accessories/fascia-board.jpg"],
    description:
      "A finishing board installed along the roof edge to support gutters and improve the roofline appearance.",
    price: 1450,
    oldPrice: 1580,
    priceUnit: "per length",
    priceNote: "Editable sample price. Confirm material and dimensions.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "Painted",
    colours: ["White", "Brown", "Charcoal Grey"],
    availableLengths: [3, 4],
    effectiveWidth: null,
    material: "PVC, fibre cement, or coated metal",
    stockStatus: "In Stock",
    availability: true,
    featured: false,
    bestSelling: false,
    newest: false,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      accessoryType: "Fascia board",
      material: "PVC, fibre cement, or coated metal",
      use: "Roof edge finishing and gutter support"
    },
    installationUses: ["Roof edges", "Gutter support", "Eaves finishing"],
    keywords: ["fascia board", "roof edge board", "gutter support"]
  },
  {
    id: "rainwater-tank-connector-kit",
    name: "Rainwater Harvesting Connector Kit",
    category: "Rainwater Harvesting Accessories",
    type: "accessory",
    image: "images/accessories/rainwater-kit.jpg",
    gallery: ["images/accessories/rainwater-kit.jpg"],
    description:
      "A basic connector set for directing roof runoff from a downpipe into a rainwater storage tank.",
    price: 1800,
    oldPrice: 1950,
    priceUnit: "per kit",
    priceNote: "Editable sample price. Confirm included fittings.",
    gauge: ["N/A"],
    defaultGauge: "N/A",
    finish: "PVC",
    colours: ["Black", "White"],
    availableLengths: [],
    effectiveWidth: null,
    material: "PVC",
    stockStatus: "In Stock",
    availability: true,
    featured: true,
    bestSelling: false,
    newest: true,
    sale: true,
    salePercentage: 8,
    freeDelivery: true,
    specifications: {
      accessoryType: "Rainwater harvesting kit",
      material: "PVC",
      use: "Connecting downpipes to water tanks"
    },
    installationUses: ["Homes", "Schools", "Farms", "Commercial buildings"],
    keywords: ["rainwater harvesting", "tank connector", "gutter accessories"]
  }
];

/**
 * Useful derived collections.
 * These help filters, dropdowns, and category menus.
 */
const PRODUCT_CATEGORIES = [...new Set(PRODUCTS.map((product) => product.category))];

const MABATI_PRODUCTS = PRODUCTS.filter((product) => product.type === "mabati");
const ACCESSORY_PRODUCTS = PRODUCTS.filter((product) => product.type === "accessory");
const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);
const SALE_PRODUCTS = PRODUCTS.filter((product) => product.sale);
const AVAILABLE_PRODUCTS = PRODUCTS.filter((product) => product.availability);

/**
 * Find one product by its unique ID.
 * @param {string} productId
 * @returns {object|null}
 */
function getProductById(productId) {
  return PRODUCTS.find((product) => product.id === productId) || null;
}

/**
 * Return related products from the same category.
 * @param {string} productId
 * @param {number} limit
 * @returns {object[]}
 */
function getRelatedProducts(productId, limit = 4) {
  const currentProduct = getProductById(productId);

  if (!currentProduct) {
    return [];
  }

  return PRODUCTS.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.type === currentProduct.type &&
      product.category === currentProduct.category
  ).slice(0, limit);
}

/**
 * Format a number as Kenyan Shillings.
 * @param {number} amount
 * @returns {string}
 */
function formatKSh(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  })
    .format(amount)
    .replace("KES", "KSh");
}

/**
 * Calculate the percentage discount.
 * Uses the stored salePercentage when available.
 * @param {object} product
 * @returns {number}
 */
function getDiscountPercentage(product) {
  if (Number.isFinite(product.salePercentage)) {
    return product.salePercentage;
  }

  if (!product.oldPrice || product.oldPrice <= product.price) {
    return 0;
  }

  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

/**
 * Make data available to all browser scripts.
 */
window.PRODUCTS = PRODUCTS;
window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.MABATI_PRODUCTS = MABATI_PRODUCTS;
window.ACCESSORY_PRODUCTS = ACCESSORY_PRODUCTS;
window.FEATURED_PRODUCTS = FEATURED_PRODUCTS;
window.SALE_PRODUCTS = SALE_PRODUCTS;
window.AVAILABLE_PRODUCTS = AVAILABLE_PRODUCTS;
window.getProductById = getProductById;
window.getRelatedProducts = getRelatedProducts;
window.formatKSh = formatKSh;
window.getDiscountPercentage = getDiscountPercentage;
'''

path = Path("/mnt/data/products.js")
path.write_text(content, encoding="utf-8")
print(f"Created {path} with {len(content.splitlines())} lines")
