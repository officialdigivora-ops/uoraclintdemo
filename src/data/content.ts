// All brand claims live here — edit freely.
export const BRAND = {
  name: "UORA",
  tagline: "Own the Rare",
  blurb:
    "Handcrafted, gold-plated, water-resistant jewellery designed to be worn, cherished, and passed down. Every piece tells a story.",
  claims: {
    plating: "18K Gold Plated",
    tarnish: "Tarnish-Free",
    skin: "Skin Friendly",
    water: "Water Resistant",
    hypo: "Hypoallergenic",
  },
};

export const ANNOUNCEMENTS = [
  // Preview-only promotions; not applied to selection totals or shipping rules.
  "50% off ₹2,999+ · UORA50",
  "First-order free shipping",
  "2,000 pieces sold daily",
  "Free shipping on orders ₹1,299+",
];

export const TRUST_BADGES = [
  { icon: "droplets", title: BRAND.claims.water, text: "Wear it everywhere" },
  { icon: "leaf", title: BRAND.claims.skin, text: BRAND.claims.hypo },
  { icon: "truck", title: "Free Shipping", text: "On orders ₹1299+" },
  { icon: "sparkles", title: "Guaranteed Compliments", text: "Wear & turn heads" },
] as const;

export const MATERIALS = [BRAND.claims.plating, "Surgical Steel Base", BRAND.claims.water, BRAND.claims.tarnish];
