"use strict";

/* ==========================================================
   ROYAL MABATI FACTORY LTD
   Main Website JavaScript
   File: js/app.js
   ========================================================== */

(() => {

  /* ----------------------------------------------------------
     1. BUSINESS SETTINGS
  ---------------------------------------------------------- */

  const BUSINESS = {
    name: "ROYAL MABATI FACTORY LTD",
    phone: "0752523422",
    internationalPhone: "254752523422",
    currency: "KSh",
    website: "https://royalmabatifactory.co.ke",
    email: "sales@royalmabatifactory.co.ke",
    whatsapp: "https://wa.me/254752523422",
    delivery: "Free Delivery Across Kenya"
  };

  /* ----------------------------------------------------------
     LOCAL STORAGE KEYS
  ---------------------------------------------------------- */

  const STORAGE_KEYS = {
    cart: "royalMabatiCart",
    wishlist: "royalMabatiWishlist",
    newsletter: "royalMabatiNewsletter",
    recentlyViewed: "royalMabatiRecentlyViewed",
    calculator: "royalMabatiCalculator"
  };

  /* ----------------------------------------------------------
     HERO SLIDES
  ---------------------------------------------------------- */

  const HERO_SLIDES = [
    {
      image: "images/banners/hero1.jpg",
      title: "Premium Roofing Sheets at Factory Prices",
      description:
        "Buy Box Profile, Corrugated, Roman Long Tile, Versatile, and all roofing accessories directly from ROYAL MABATI FACTORY LTD.",
      badge: "Free Delivery Across Kenya"
    },

    {
      image: "images/banners/hero2.jpg",
      title: "Complete Roofing Solutions",
      description:
        "We supply roofing sheets, ridges, valleys, gutters, flashing, roofing nails, self-drilling screws, insulation, and every roofing accessory.",
      badge: "All Roofing Accessories"
    },

    {
      image: "images/banners/hero3.jpg",
      title: "Serving All 47 Counties",
      description:
        "Fast delivery for homes, schools, churches, commercial buildings, warehouses, industries, and construction projects across Kenya.",
      badge: "Countrywide Delivery"
    }
  ];

  let currentHeroSlide = 0;
  let heroSliderTimer = null;
  let currentTestimonial = 0;
  let testimonialTimer = null;
  let lastFocusedElement = null;
