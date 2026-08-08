"use strict";

/* ROYAL MABATI FACTORY LTD - Updated product database */

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

const PRODUCT_CATEGORIES = [
  {
    "id": "box-profile",
    "name": "Box Profile Mabati",
    "description": "Modern box-profile roofing in 28G and 30G, glossy and matte finishes."
  },
  {
    "id": "dumuzaz",
    "name": "Ordinary Dumuzaz Mabati",
    "description": "Affordable ordinary iron sheets in 28G and 30G."
  },
  {
    "id": "corrugated",
    "name": "Corrugated Mabati",
    "description": "Traditional corrugated roofing sheets in glossy and matte finishes."
  },
  {
    "id": "versatile",
    "name": "Versatile Mabati",
    "description": "Elegant stepped roofing profile for homes and institutions."
  },
  {
    "id": "roman-tile",
    "name": "Roman Tile Mabati",
    "description": "Decorative Roman tile roofing in 28G and 30G."
  },
  {
    "id": "stone-coated",
    "name": "Stone Coated Tiles",
    "description": "Premium stone-coated roofing tiles."
  },
  {
    "id": "roofing-accessories",
    "name": "Roofing Accessories",
    "description": "Ridges, valleys, gutters, downpipes and fittings."
  },
  {
    "id": "nails-fasteners",
    "name": "Nails and Fasteners",
    "description": "Roofing nails and ordinary construction nails."
  }
];

const PRODUCTS = [
  {
    "id": "box-profile-30g-glossy",
    "slug": "box-profile-30g-glossy",
    "name": "Box Profile Iron Sheet 30G",
    "category": "box-profile",
    "categoryName": "Box Profile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Affordable glossy box profile roofing sheet for homes, shops, schools and commercial buildings.",
    "description": "Glossy Box Profile 30G roofing sheet with a modern profile, colour-coated steel finish and custom lengths.",
    "price": 350,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Glossy finish. Confirm colour, length and current stock before ordering.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Forest Green",
      "Coffee Brown",
      "Maroon",
      "Blue"
    ],
    "finish": "Glossy",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Modern box profile",
      "Custom lengths",
      "Glossy colour finish",
      "Affordable 30G option"
    ],
    "applications": [
      "Homes",
      "Schools",
      "Shops",
      "Warehouses"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.8,
    "reviewCount": 86,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "box-profile-28g-glossy",
    "slug": "box-profile-28g-glossy",
    "name": "Box Profile Iron Sheet 28G",
    "category": "box-profile",
    "categoryName": "Box Profile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Stronger glossy box profile roofing sheet for durable long-term roofing.",
    "description": "Box Profile 28G is thicker and stronger than 30G, making it suitable for demanding residential and commercial projects.",
    "price": 400,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Glossy finish. Gauge 28 offers greater strength and durability.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Forest Green",
      "Coffee Brown",
      "Maroon",
      "Blue"
    ],
    "finish": "Glossy",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Thicker 28G steel",
      "Modern profile",
      "Custom lengths",
      "Long-term roofing"
    ],
    "applications": [
      "Homes",
      "Schools",
      "Warehouses",
      "Commercial buildings"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 74,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "dumuzaz-30g-glossy",
    "slug": "dumuzaz-30g-glossy",
    "name": "Ordinary Dumuzaz Iron Sheet 30G",
    "category": "dumuzaz",
    "categoryName": "Ordinary Dumuzaz Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Economical ordinary Dumuzaz roofing sheet for budget-conscious roofing projects.",
    "description": "Ordinary Dumuzaz 30G is an affordable roofing option for homes, sheds, shops, farm buildings and temporary structures.",
    "price": 250,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Available in silver only.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 0.85,
    "totalWidth": 0.9,
    "colours": [
      "Silver"
    ],
    "finish": "Silver",
    "coating": "Galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Lowest-cost roofing option",
      "Custom lengths",
      "Easy installation",
      "Available in silver only"
    ],
    "applications": [
      "Budget homes",
      "Farm structures",
      "Shops",
      "Sheds"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.6,
    "reviewCount": 64,
    "warranty": "Confirm warranty availability for the selected coating and finish."
  },
  {
    "id": "dumuzaz-28g-glossy",
    "slug": "dumuzaz-28g-glossy",
    "name": "Ordinary Dumuzaz Iron Sheet 28G",
    "category": "dumuzaz",
    "categoryName": "Ordinary Dumuzaz Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "A thicker ordinary Dumuzaz sheet offering improved durability at an affordable price.",
    "description": "Ordinary Dumuzaz 28G provides better strength than 30G while maintaining an economical price.",
    "price": 300,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Gauge 28 is thicker than Gauge 30. Available in silver only.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 0.85,
    "totalWidth": 0.9,
    "colours": [
      "Silver"
    ],
    "finish": "Silver",
    "coating": "Galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Stronger 28G sheet",
      "Affordable",
      "Custom lengths",
      "Easy installation",
      "Available in silver only"
    ],
    "applications": [
      "Homes",
      "Farm structures",
      "Shops",
      "Schools"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 55,
    "warranty": "Confirm warranty availability for the selected coating and finish."
  },
  {
    "id": "corrugated-30g-glossy",
    "slug": "corrugated-30g-glossy",
    "name": "Corrugated Iron Sheet 30G",
    "category": "corrugated",
    "categoryName": "Corrugated Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Affordable corrugated roofing sheet for homes, farms, workshops and general construction.",
    "description": "Corrugated 30G combines a traditional wave profile with affordable pricing and custom lengths.",
    "price": 300,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Glossy finish. Confirm available colours and lengths.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 0.85,
    "totalWidth": 0.9,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Forest Green",
      "Coffee Brown",
      "Blue",
      "Natural Silver"
    ],
    "finish": "Glossy",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Traditional corrugated profile",
      "Affordable",
      "Custom lengths",
      "Good water drainage"
    ],
    "applications": [
      "Homes",
      "Farm buildings",
      "Workshops",
      "Shops"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 91,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "corrugated-28g-glossy",
    "slug": "corrugated-28g-glossy",
    "name": "Corrugated Iron Sheet 28G",
    "category": "corrugated",
    "categoryName": "Corrugated Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Strong corrugated 28G roofing sheet for durable residential and commercial roofing.",
    "description": "Corrugated 28G offers greater thickness and durability for long-term roofing applications.",
    "price": 350,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Gauge 28 is stronger and more durable than Gauge 30.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 0.85,
    "totalWidth": 0.9,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Forest Green",
      "Coffee Brown",
      "Blue",
      "Natural Silver"
    ],
    "finish": "Glossy",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Thicker 28G steel",
      "Traditional profile",
      "Custom lengths",
      "Durable roofing"
    ],
    "applications": [
      "Homes",
      "Schools",
      "Warehouses",
      "Commercial buildings"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.8,
    "reviewCount": 52,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "versatile-30g-glossy",
    "slug": "versatile-30g-glossy",
    "name": "Versatile Iron Sheet 30G",
    "category": "versatile",
    "categoryName": "Versatile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Stylish stepped roofing profile for attractive homes and institutional projects.",
    "description": "Versatile 30G provides an elegant tiled appearance with the affordability and convenience of steel roofing.",
    "price": 580,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Glossy finish. Custom lengths and popular colours available.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Forest Green",
      "Coffee Brown",
      "Maroon"
    ],
    "finish": "Glossy",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Elegant stepped profile",
      "Custom lengths",
      "Glossy finish",
      "Residential appeal"
    ],
    "applications": [
      "Homes",
      "Hotels",
      "Schools",
      "Churches"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 72,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "versatile-28g-glossy",
    "slug": "versatile-28g-glossy",
    "name": "Versatile Iron Sheet 28G",
    "category": "versatile",
    "categoryName": "Versatile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Premium thicker versatile roofing sheet for strong, elegant long-term roofing.",
    "description": "Versatile 28G combines a premium stepped appearance with improved strength and durability.",
    "price": 600,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Glossy finish. Gauge 28 provides improved strength.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Forest Green",
      "Coffee Brown",
      "Maroon"
    ],
    "finish": "Glossy",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Thicker 28G steel",
      "Elegant stepped profile",
      "Custom lengths",
      "Long-term roofing"
    ],
    "applications": [
      "Homes",
      "Hotels",
      "Schools",
      "Commercial projects"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 49,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "roman-tile-30g-glossy",
    "slug": "roman-tile-30g-glossy",
    "name": "Roman Tiles Iron Sheet 30G",
    "category": "roman-tile",
    "categoryName": "Roman Tile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Decorative Roman tile profile with an attractive glossy finish.",
    "description": "Roman Tile 30G gives homes and commercial projects a classic tiled appearance at an affordable price.",
    "price": 500,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Glossy finish. Confirm step length and roof measurements before ordering.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Forest Green",
      "Coffee Brown",
      "Maroon"
    ],
    "finish": "Glossy",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Roman tile appearance",
      "Glossy finish",
      "Custom lengths",
      "Affordable elegance"
    ],
    "applications": [
      "Homes",
      "Villas",
      "Hotels",
      "Churches"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 102,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "roman-tile-28g-glossy",
    "slug": "roman-tile-28g-glossy",
    "name": "Roman Tiles Iron Sheet 28G",
    "category": "roman-tile",
    "categoryName": "Roman Tile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Stronger 28G Roman tile sheet for premium and durable roofing.",
    "description": "Roman Tile 28G combines a tiled look with greater thickness and improved long-term performance.",
    "price": 550,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Glossy finish. Gauge 28 is the stronger option.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Forest Green",
      "Coffee Brown",
      "Maroon"
    ],
    "finish": "Glossy",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Thicker 28G steel",
      "Roman tile appearance",
      "Custom lengths",
      "Premium durability"
    ],
    "applications": [
      "Homes",
      "Villas",
      "Hotels",
      "Commercial buildings"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 61,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "box-profile-30g-matte",
    "slug": "box-profile-30g-matte",
    "name": "Matte Box Profile Iron Sheet 30G",
    "category": "box-profile",
    "categoryName": "Box Profile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Modern non-shiny box profile roofing with improved scratch resistance and long-lasting colour.",
    "description": "Matte Box Profile 30G has a premium dull finish that reduces glare and gives modern buildings an elegant appearance.",
    "price": 450,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Matte finish. Ideal for customers prioritising elegance and long-term colour.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],
    "finish": "Matte",
    "coating": "Premium matte-coated galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Non-shiny premium finish",
      "Reduced glare",
      "Scratch resistant",
      "Long-lasting colour"
    ],
    "applications": [
      "Modern homes",
      "Apartments",
      "Hotels",
      "Offices"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 73,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "box-profile-28g-matte",
    "slug": "box-profile-28g-matte",
    "name": "Matte Box Profile Iron Sheet 28G",
    "category": "box-profile",
    "categoryName": "Box Profile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Premium thick matte box profile sheet for elegant and durable long-term roofing.",
    "description": "Matte Box Profile 28G combines the stronger gauge with a premium non-reflective, scratch-resistant finish.",
    "price": 530,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Premium matte finish and stronger Gauge 28 steel.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],
    "finish": "Matte",
    "coating": "Premium matte-coated galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Thicker 28G steel",
      "Premium matte finish",
      "Scratch resistant",
      "Reduced glare"
    ],
    "applications": [
      "Luxury homes",
      "Hotels",
      "Apartments",
      "Commercial buildings"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 5.0,
    "reviewCount": 58,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "corrugated-30g-matte",
    "slug": "corrugated-30g-matte",
    "name": "Matte Corrugated Iron Sheet 30G",
    "category": "corrugated",
    "categoryName": "Corrugated Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Traditional corrugated profile with a modern, non-shiny matte finish.",
    "description": "Matte Corrugated 30G offers a classic profile with reduced glare and improved scratch resistance.",
    "price": 400,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Matte finish. Custom lengths available.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 0.85,
    "totalWidth": 0.9,
    "colours": [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],
    "finish": "Matte",
    "coating": "Premium matte-coated galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Matte colour finish",
      "Traditional profile",
      "Reduced glare",
      "Custom lengths"
    ],
    "applications": [
      "Homes",
      "Schools",
      "Farm buildings",
      "Commercial projects"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.8,
    "reviewCount": 43,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "corrugated-28g-matte",
    "slug": "corrugated-28g-matte",
    "name": "Matte Corrugated Iron Sheet 28G",
    "category": "corrugated",
    "categoryName": "Corrugated Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Strong Gauge 28 corrugated roofing with a premium matte finish.",
    "description": "Matte Corrugated 28G provides superior thickness, reduced glare and excellent durability.",
    "price": 480,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Premium matte finish and stronger Gauge 28 steel.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 0.85,
    "totalWidth": 0.9,
    "colours": [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],
    "finish": "Matte",
    "coating": "Premium matte-coated galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Stronger 28G steel",
      "Matte finish",
      "Reduced glare",
      "Scratch resistant"
    ],
    "applications": [
      "Homes",
      "Schools",
      "Warehouses",
      "Commercial projects"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 39,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "versatile-30g-matte",
    "slug": "versatile-30g-matte",
    "name": "Matte Versatile Iron Sheet 30G",
    "category": "versatile",
    "categoryName": "Versatile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Elegant versatile profile with a modern matte finish.",
    "description": "Matte Versatile 30G combines a premium stepped profile with a non-reflective, scratch-resistant finish.",
    "price": 750,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Premium matte finish. Confirm available colours.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],
    "finish": "Matte",
    "coating": "Premium matte-coated galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Premium matte look",
      "Elegant stepped profile",
      "Reduced glare",
      "Long-lasting colour"
    ],
    "applications": [
      "Modern homes",
      "Hotels",
      "Churches",
      "Offices"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 46,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "versatile-28g-matte",
    "slug": "versatile-28g-matte",
    "name": "Matte Versatile Iron Sheet 28G",
    "category": "versatile",
    "categoryName": "Versatile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Premium Gauge 28 versatile roofing with exceptional strength and a matte finish.",
    "description": "Matte Versatile 28G is a premium choice combining thickness, elegant styling and reduced glare.",
    "price": 850,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Premium matte finish with stronger Gauge 28 steel.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],
    "finish": "Matte",
    "coating": "Premium matte-coated galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Strong Gauge 28",
      "Premium matte look",
      "Scratch resistant",
      "Long-term colour"
    ],
    "applications": [
      "Luxury homes",
      "Hotels",
      "Commercial projects",
      "Institutions"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 5.0,
    "reviewCount": 34,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "roman-tile-30g-matte",
    "slug": "roman-tile-30g-matte",
    "name": "Matte Roman Tiles Iron Sheet 30G",
    "category": "roman-tile",
    "categoryName": "Roman Tile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Classic Roman tile appearance with a premium non-shiny finish.",
    "description": "Matte Roman Tile 30G offers elegant roofing with reduced glare and improved colour retention.",
    "price": 600,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Matte finish. Confirm roof step and sheet length requirements.",
    "gauge": [
      "30"
    ],
    "defaultGauge": "30",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],
    "finish": "Matte",
    "coating": "Premium matte-coated galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Roman tile profile",
      "Premium matte finish",
      "Reduced glare",
      "Long-lasting colour"
    ],
    "applications": [
      "Homes",
      "Villas",
      "Hotels",
      "Churches"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 53,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "roman-tile-28g-matte",
    "slug": "roman-tile-28g-matte",
    "name": "Matte Roman Tiles Iron Sheet 28G",
    "category": "roman-tile",
    "categoryName": "Roman Tile Mabati",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Premium Roman tile roofing in stronger Gauge 28 with a matte finish.",
    "description": "Matte Roman Tile 28G combines premium styling, better thickness and long-lasting colour.",
    "price": 700,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "Premium matte finish and stronger Gauge 28 steel.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [
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
    "effectiveWidth": 1,
    "totalWidth": 1.05,
    "colours": [
      "Matte Charcoal",
      "Matte Black",
      "Matte Brown",
      "Matte Green",
      "Matte Red"
    ],
    "finish": "Matte",
    "coating": "Premium matte-coated galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Strong Gauge 28",
      "Roman tile profile",
      "Premium matte finish",
      "Scratch resistant"
    ],
    "applications": [
      "Luxury homes",
      "Hotels",
      "Commercial buildings",
      "Institutions"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 5.0,
    "reviewCount": 31,
    "warranty": "Confirm product-specific warranty terms before purchase."
  },
  {
    "id": "stone-coated-tiles",
    "slug": "stone-coated-tiles",
    "name": "Stone Coated Roofing Tiles",
    "category": "stone-coated",
    "categoryName": "Stone Coated Roofing",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Premium stone-coated steel roofing tiles with a textured finish.",
    "description": "Stone-coated tiles provide a premium appearance, weather resistance and reduced rain noise.",
    "price": 550,
    "oldPrice": null,
    "priceUnit": "per piece",
    "priceNote": "Accessories and installation materials are priced separately.",
    "gauge": [
      "28"
    ],
    "defaultGauge": "28",
    "availableLengths": [],
    "effectiveWidth": 1.26,
    "totalWidth": 1.34,
    "colours": [
      "Charcoal",
      "Coffee Brown",
      "Brick Red",
      "Forest Green",
      "Mixed Brown"
    ],
    "finish": "Stone coated",
    "coating": "Stone granules over coated steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Premium textured finish",
      "Weather resistant",
      "Reduced rain noise",
      "Elegant appearance"
    ],
    "applications": [
      "Luxury homes",
      "Hotels",
      "Villas",
      "Apartments"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.9,
    "reviewCount": 38,
    "warranty": "Confirm manufacturer warranty and installation conditions."
  },
  {
    "id": "ridge-cap",
    "slug": "ridge-cap",
    "name": "Roof Ridge Cap",
    "category": "roofing-accessories",
    "categoryName": "Roofing Accessories",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Colour-matched ridge cap for sealing the top of a pitched roof.",
    "description": "Ridge caps provide a neat, weather-resistant finish at the roof ridge.",
    "price": 200,
    "oldPrice": null,
    "priceUnit": "per piece",
    "priceNote": "Confirm standard length, colour and custom size.",
    "gauge": [
      "30",
      "28"
    ],
    "defaultGauge": "30",
    "availableLengths": [
      2,
      2.5,
      3
    ],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Coffee Brown",
      "Forest Green",
      "Maroon"
    ],
    "finish": "Glossy or matte",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Roof ridge protection",
      "Colour matching",
      "Custom sizes"
    ],
    "applications": [
      "Pitched roofs"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.8,
    "reviewCount": 61,
    "warranty": "Workmanship and coating terms depend on the selected material."
  },
  {
    "id": "roof-valley",
    "slug": "roof-valley",
    "name": "Roof Valley",
    "category": "roofing-accessories",
    "categoryName": "Roofing Accessories",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Valley flashing for directing rainwater at internal roof intersections.",
    "description": "Roof valleys help prevent water penetration where two roof slopes meet.",
    "price": 200,
    "oldPrice": null,
    "priceUnit": "per piece",
    "priceNote": "Confirm length, gauge, colour and custom dimensions.",
    "gauge": [
      "30",
      "28"
    ],
    "defaultGauge": "30",
    "availableLengths": [
      2,
      2.5,
      3
    ],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Brick Red",
      "Charcoal Grey",
      "Coffee Brown",
      "Forest Green",
      "Maroon"
    ],
    "finish": "Glossy or matte",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Improves drainage",
      "Helps prevent leaks",
      "Custom sizes"
    ],
    "applications": [
      "Complex roof designs"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 36,
    "warranty": "Workmanship and coating terms depend on the selected material."
  },
  {
    "id": "rainwater-gutter-metre",
    "slug": "rainwater-gutter-metre",
    "name": "Rainwater Gutter",
    "category": "roofing-accessories",
    "categoryName": "Roofing Accessories",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Durable gutter for collecting roof water and protecting walls and foundations.",
    "description": "Rainwater gutters direct water safely to downpipes and harvesting systems.",
    "price": 650,
    "oldPrice": null,
    "priceUnit": "per metre",
    "priceNote": "A 10-metre gutter run is available at KSh 3,500. Confirm profile and colour.",
    "gauge": [
      "30",
      "28"
    ],
    "defaultGauge": "30",
    "availableLengths": [
      1,
      2,
      3,
      5,
      10
    ],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Charcoal Grey",
      "Coffee Brown",
      "Brick Red",
      "Forest Green",
      "Galvanized Silver"
    ],
    "finish": "Glossy or matte",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Controls rainwater",
      "Protects foundations",
      "Custom runs"
    ],
    "applications": [
      "Homes",
      "Schools",
      "Warehouses",
      "Rainwater harvesting"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.8,
    "reviewCount": 48,
    "warranty": "Confirm coating and installation terms."
  },
  {
    "id": "gutter-10m-run",
    "slug": "gutter-10m-run",
    "name": "Rainwater Gutter 10-Metre Run",
    "category": "roofing-accessories",
    "categoryName": "Roofing Accessories",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Wholesale-value 10-metre gutter run for complete rainwater systems.",
    "description": "A 10-metre gutter run supplied for longer roof edges and commercial installations.",
    "price": 3500,
    "oldPrice": null,
    "priceUnit": "per 10-metre run",
    "priceNote": "Support brackets, outlets, bends and downpipes are sold separately.",
    "gauge": [
      "30",
      "28"
    ],
    "defaultGauge": "30",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Charcoal Grey",
      "Coffee Brown",
      "Brick Red",
      "Forest Green",
      "Galvanized Silver"
    ],
    "finish": "Glossy or matte",
    "coating": "Pre-painted galvanized steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "10-metre value run",
      "Rainwater control",
      "Colour options"
    ],
    "applications": [
      "Homes",
      "Warehouses",
      "Schools"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.8,
    "reviewCount": 22,
    "warranty": "Confirm coating and installation terms."
  },
  {
    "id": "gutter-support-bracket",
    "slug": "gutter-support-bracket",
    "name": "Gutter Support Bracket / Clip",
    "category": "roofing-accessories",
    "categoryName": "Roofing Accessories",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Support bracket or clip for securely mounting rainwater gutters.",
    "description": "Gutter brackets support and align gutters along the fascia or roof edge.",
    "price": 60,
    "oldPrice": null,
    "priceUnit": "per piece",
    "priceNote": "Confirm size and gutter compatibility.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Black",
      "Galvanized Silver",
      "Colour matched"
    ],
    "finish": "Standard",
    "coating": "Protected metal",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Secure gutter support",
      "Easy installation"
    ],
    "applications": [
      "Gutter systems"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 17,
    "warranty": "Confirm compatibility before installation."
  },
  {
    "id": "downpipe",
    "slug": "downpipe",
    "name": "Rainwater Downpipe",
    "category": "roofing-accessories",
    "categoryName": "Roofing Accessories",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Downpipe for directing gutter water safely to drains or storage tanks.",
    "description": "Rainwater downpipes carry water from roof gutters to drainage or harvesting systems.",
    "price": 500,
    "oldPrice": null,
    "priceUnit": "per piece",
    "priceNote": "Confirm length, diameter, colour and fittings.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Charcoal Grey",
      "Coffee Brown",
      "Brick Red",
      "Forest Green",
      "Galvanized Silver"
    ],
    "finish": "Standard",
    "coating": "Colour-coated or galvanized",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Directs rainwater",
      "Compatible fittings available"
    ],
    "applications": [
      "Gutter systems",
      "Rainwater harvesting"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 19,
    "warranty": "Confirm compatibility before installation."
  },
  {
    "id": "gutter-bend-elbow-end-cap",
    "slug": "gutter-bend-elbow-end-cap",
    "name": "Gutter Bend, Elbow or End Cap",
    "category": "roofing-accessories",
    "categoryName": "Roofing Accessories",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Essential gutter and downpipe fittings for corners, direction changes and closures.",
    "description": "Choose bends, elbows or end caps to complete a rainwater drainage system.",
    "price": 200,
    "oldPrice": null,
    "priceUnit": "per piece",
    "priceNote": "State the exact fitting required when ordering.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Charcoal Grey",
      "Coffee Brown",
      "Brick Red",
      "Forest Green",
      "Galvanized Silver"
    ],
    "finish": "Standard",
    "coating": "Colour-coated or galvanized",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Multiple fitting types",
      "Completes gutter systems"
    ],
    "applications": [
      "Gutters",
      "Downpipes"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 14,
    "warranty": "Confirm compatibility before installation."
  },
  {
    "id": "gutter-outlet-dropper",
    "slug": "gutter-outlet-dropper",
    "name": "Gutter Outlet / Dropper",
    "category": "roofing-accessories",
    "categoryName": "Roofing Accessories",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Outlet or dropper connecting a gutter to a downpipe.",
    "description": "Gutter outlets and droppers provide a controlled connection between the gutter and downpipe.",
    "price": 300,
    "oldPrice": null,
    "priceUnit": "per piece",
    "priceNote": "Confirm gutter profile and downpipe size.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Charcoal Grey",
      "Coffee Brown",
      "Brick Red",
      "Forest Green",
      "Galvanized Silver"
    ],
    "finish": "Standard",
    "coating": "Colour-coated or galvanized",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Connects gutter to downpipe",
      "Supports rainwater drainage"
    ],
    "applications": [
      "Gutter systems"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 12,
    "warranty": "Confirm compatibility before installation."
  },
  {
    "id": "roofing-nails-kg",
    "slug": "roofing-nails-kg",
    "name": "Roofing Nails with Washers",
    "category": "nails-fasteners",
    "categoryName": "Nails and Fasteners",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Roofing nails with washers for secure, water-resistant mabati installation.",
    "description": "Galvanized roofing nails supplied per kilogram for timber roof structures.",
    "price": 170,
    "oldPrice": null,
    "priceUnit": "per kilogram",
    "priceNote": "Wholesale 50kg bag: KSh 8,000.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Galvanized Silver"
    ],
    "finish": "Galvanized",
    "coating": "Zinc-coated steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Washer included",
      "Corrosion resistant",
      "Strong fixing"
    ],
    "applications": [
      "Mabati installation",
      "Timber roofs"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": true,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.8,
    "reviewCount": 69,
    "warranty": "Use the correct nail length and installation method."
  },
  {
    "id": "roofing-nails-50kg",
    "slug": "roofing-nails-50kg",
    "name": "Roofing Nails Wholesale 50kg Bag",
    "category": "nails-fasteners",
    "categoryName": "Nails and Fasteners",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Wholesale 50kg bag of roofing nails with washers.",
    "description": "Bulk roofing nails for contractors, hardware stores and large roofing projects.",
    "price": 8000,
    "oldPrice": null,
    "priceUnit": "per 50kg bag",
    "priceNote": "Wholesale bag price.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Galvanized Silver"
    ],
    "finish": "Galvanized",
    "coating": "Zinc-coated steel",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Wholesale 50kg bag",
      "Washer included",
      "Contractor value"
    ],
    "applications": [
      "Large projects",
      "Hardware resale"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.8,
    "reviewCount": 26,
    "warranty": "Use the correct nail length and installation method."
  },
  {
    "id": "ordinary-nails-kg",
    "slug": "ordinary-nails-kg",
    "name": "Ordinary Nails 1–6 Inch",
    "category": "nails-fasteners",
    "categoryName": "Nails and Fasteners",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "General construction nails available from 1 inch to 6 inches.",
    "description": "Ordinary nails for timber, formwork, carpentry and general construction.",
    "price": 160,
    "oldPrice": null,
    "priceUnit": "per kilogram",
    "priceNote": "Available in 1, 2, 3, 4, 5 and 6-inch sizes.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Steel"
    ],
    "finish": "Standard steel",
    "coating": "Standard",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "1–6 inch sizes",
      "General construction use",
      "Sold per kg"
    ],
    "applications": [
      "Carpentry",
      "Formwork",
      "Timber construction"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": true,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 44,
    "warranty": "Select the correct nail size for the intended use."
  },
  {
    "id": "ordinary-nails-1-2inch-50kg",
    "slug": "ordinary-nails-1-2inch-50kg",
    "name": "Ordinary Nails 1–2 Inch Wholesale Bag",
    "category": "nails-fasteners",
    "categoryName": "Nails and Fasteners",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Wholesale 50kg bag of 1-inch or 2-inch ordinary nails.",
    "description": "Bulk ordinary nails for contractors, carpenters and hardware shops.",
    "price": 2500,
    "oldPrice": null,
    "priceUnit": "per 50kg bag",
    "priceNote": "Choose either 1-inch or 2-inch size.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Steel"
    ],
    "finish": "Standard steel",
    "coating": "Standard",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Wholesale 50kg bag",
      "1 or 2-inch sizes"
    ],
    "applications": [
      "Carpentry",
      "Hardware resale"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 18,
    "warranty": "Choose the required nail size when ordering."
  },
  {
    "id": "ordinary-nails-3inch-50kg",
    "slug": "ordinary-nails-3inch-50kg",
    "name": "Ordinary Nails 3 Inch Wholesale Bag",
    "category": "nails-fasteners",
    "categoryName": "Nails and Fasteners",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Wholesale 50kg bag of 3-inch ordinary nails.",
    "description": "Bulk 3-inch nails for general building and carpentry.",
    "price": 3200,
    "oldPrice": null,
    "priceUnit": "per 50kg bag",
    "priceNote": "Wholesale bag price.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Steel"
    ],
    "finish": "Standard steel",
    "coating": "Standard",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Wholesale 50kg bag",
      "3-inch nails"
    ],
    "applications": [
      "Construction",
      "Carpentry"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 16,
    "warranty": "Confirm size before ordering."
  },
  {
    "id": "ordinary-nails-4inch-50kg",
    "slug": "ordinary-nails-4inch-50kg",
    "name": "Ordinary Nails 4 Inch Wholesale Bag",
    "category": "nails-fasteners",
    "categoryName": "Nails and Fasteners",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Wholesale 50kg bag of 4-inch ordinary nails.",
    "description": "Bulk 4-inch nails for heavy carpentry and construction.",
    "price": 4000,
    "oldPrice": null,
    "priceUnit": "per 50kg bag",
    "priceNote": "Wholesale bag price.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Steel"
    ],
    "finish": "Standard steel",
    "coating": "Standard",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Wholesale 50kg bag",
      "4-inch nails"
    ],
    "applications": [
      "Construction",
      "Heavy carpentry"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 15,
    "warranty": "Confirm size before ordering."
  },
  {
    "id": "ordinary-nails-5-6inch-50kg",
    "slug": "ordinary-nails-5-6inch-50kg",
    "name": "Ordinary Nails 5–6 Inch Wholesale Bag",
    "category": "nails-fasteners",
    "categoryName": "Nails and Fasteners",
    "brand": "ROYAL MABATI FACTORY LTD",
    "shortDescription": "Wholesale 50kg bag of 5-inch or 6-inch ordinary nails.",
    "description": "Bulk long nails for heavy timber work and construction.",
    "price": 5000,
    "oldPrice": null,
    "priceUnit": "per 50kg bag",
    "priceNote": "Choose either 5-inch or 6-inch size.",
    "gauge": [
      "N/A"
    ],
    "defaultGauge": "N/A",
    "availableLengths": [],
    "effectiveWidth": null,
    "totalWidth": null,
    "colours": [
      "Steel"
    ],
    "finish": "Standard steel",
    "coating": "Standard",
    "image": "images/roofing-placeholder.jpg",
    "gallery": [
      "images/roofing-placeholder.jpg"
    ],
    "features": [
      "Wholesale 50kg bag",
      "5 or 6-inch sizes"
    ],
    "applications": [
      "Heavy timber work",
      "Construction"
    ],
    "stockStatus": "In Stock",
    "availability": true,
    "featured": false,
    "bestseller": false,
    "onSale": false,
    "freeDelivery": true,
    "rating": 4.7,
    "reviewCount": 13,
    "warranty": "Choose the required nail size when ordering."
  }
];

const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured === true);
const AVAILABLE_PRODUCTS = PRODUCTS.filter(
  (product) => product.availability === true && product.stockStatus !== "Out of Stock"
);
const SALE_PRODUCTS = PRODUCTS.filter(
  (product) => product.onSale === true && Number(product.oldPrice) > Number(product.price)
);
const BESTSELLER_PRODUCTS = PRODUCTS.filter((product) => product.bestseller === true);

function getProductById(productId) {
  return PRODUCTS.find((product) => product.id === productId) || null;
}

function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug) || null;
}

function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return [...PRODUCTS];
  return PRODUCTS.filter((product) => product.category === categoryId);
}

function getRelatedProducts(productId, limit = 4) {
  const selectedProduct = getProductById(productId);
  if (!selectedProduct) return [];
  return PRODUCTS.filter(
    (product) => product.id !== productId && product.category === selectedProduct.category
  ).slice(0, limit);
}

function searchProducts(searchTerm) {
  const normalizedSearch = String(searchTerm || "").trim().toLowerCase();
  if (!normalizedSearch) return [...PRODUCTS];

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
      product.stockStatus,
      product.priceUnit,
      ...(product.gauge || []),
      ...(product.colours || []),
      ...(product.features || []),
      ...(product.applications || [])
    ].join(" ").toLowerCase();

    return searchableContent.includes(normalizedSearch);
  });
}

function getDiscountPercentage(product) {
  const currentPrice = Number(product?.price);
  const oldPrice = Number(product?.oldPrice);
  if (!Number.isFinite(currentPrice) || !Number.isFinite(oldPrice) || oldPrice <= currentPrice || oldPrice <= 0) return 0;
  return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
}

function formatKSh(amount) {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount)) return "KSh 0";
  return `KSh ${numericAmount.toLocaleString("en-KE", { maximumFractionDigits: 2 })}`;
}

function isRoofingSheet(product) {
  return Boolean(product && !["roofing-accessories", "nails-fasteners"].includes(product.category));
}

function isRoofingAccessory(product) {
  return Boolean(product && ["roofing-accessories", "nails-fasteners"].includes(product.category));
}

function getAvailableColours() {
  return [...new Set(PRODUCTS.flatMap((product) => product.colours || []))].sort();
}

function getAvailableGauges() {
  return [...new Set(PRODUCTS.flatMap((product) => product.gauge || []))]
    .filter((gauge) => ["28", "30"].includes(String(gauge)))
    .sort((a, b) => Number(a) - Number(b));
}

function createProductWhatsAppLink(productId) {
  const product = getProductById(productId);
  if (!product) return `https://wa.me/${BUSINESS_DETAILS.whatsapp}`;

  const message = [
    `Hello ${BUSINESS_DETAILS.name},`,
    "",
    `I am interested in ${product.name}.`,
    `Price shown: ${formatKSh(product.price)} ${product.priceUnit}.`,
    "",
    "Please confirm current stock, colour, size, delivery and payment details."
  ].join("\n");

  return `https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`;
}

window.BUSINESS_DETAILS = BUSINESS_DETAILS;
window.PRODUCTS = PRODUCTS;
window.FEATURED_PRODUCTS = FEATURED_PRODUCTS;
window.AVAILABLE_PRODUCTS = AVAILABLE_PRODUCTS;
window.SALE_PRODUCTS = SALE_PRODUCTS;
window.BESTSELLER_PRODUCTS = BESTSELLER_PRODUCTS;
window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.getProductById = getProductById;
window.getProductBySlug = getProductBySlug;
window.getProductsByCategory = getProductsByCategory;
window.getRelatedProducts = getRelatedProducts;
window.searchProducts = searchProducts;
window.getDiscountPercentage = getDiscountPercentage;
window.formatKSh = formatKSh;
window.isRoofingSheet = isRoofingSheet;
window.isRoofingAccessory = isRoofingAccessory;
window.getAvailableColours = getAvailableColours;
window.getAvailableGauges = getAvailableGauges;
window.createProductWhatsAppLink = createProductWhatsAppLink;
