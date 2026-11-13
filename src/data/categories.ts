import necklacesAsset from "@/assets/uora-necklaces.jpg.asset.json";
import earringsAsset from "@/assets/uora-earrings.jpg.asset.json";
import ringsAsset from "@/assets/uora-rings.jpg.asset.json";
import kadaAsset from "@/assets/uora-kada.jpg.asset.json";
import braceletsAsset from "@/assets/uora-bracelets.jpg.asset.json";
import ringDisplayAsset from "@/assets/showcase-rings-sized.png.asset.json";
import cuffDisplayAsset from "@/assets/showcase-cuff-sized.png.asset.json";
import chainDisplayAsset from "@/assets/showcase-chain-sized.png.asset.json";
import necklaceDisplayAsset from "@/assets/showcase-necklaces-sized.png.asset.json";
import earringDisplayAsset from "@/assets/showcase-earrings-sized.png.asset.json";
const necklaces = necklacesAsset.url;
const earrings = earringsAsset.url;
const rings = ringsAsset.url;
const kada = kadaAsset.url;
const bracelets = braceletsAsset.url;
const ringDisplay = ringDisplayAsset.url;
const cuffDisplay = cuffDisplayAsset.url;
const chainDisplay = chainDisplayAsset.url;
const necklaceDisplay = necklaceDisplayAsset.url;
const earringDisplay = earringDisplayAsset.url;
export type CategorySlug = "necklaces" | "earrings" | "rings" | "kada" | "bracelets";

export interface Category {
  slug: CategorySlug;
  label: string;
  heading: [string, string]; // upright, italic
  intro: string;
  image: string;
  displayImage: string;
}

export const CATEGORIES: Category[] = [
  { slug: "rings", label: "Rings", heading: ["Signature", "Rings"], intro: "Bold domes and delicate stackers for every finger.", image: rings, displayImage: ringDisplay },
  { slug: "kada", label: "Bracelet", heading: ["Golden", "Bracelets"], intro: "Sculpted kadas and cuffs with quiet presence.", image: kada, displayImage: cuffDisplay },
  { slug: "bracelets", label: "Chain Bracelet", heading: ["Chain", "Bracelets"], intro: "Fine links and paperclips to layer on the wrist.", image: bracelets, displayImage: chainDisplay },
  { slug: "necklaces", label: "Necklaces", heading: ["Statement", "Necklaces"], intro: "Pendants, layers and chokers that frame every neckline.", image: necklaces, displayImage: necklaceDisplay },
  { slug: "earrings", label: "Earrings", heading: ["Everyday", "Earrings"], intro: "Hoops, drops and studs made to catch the light.", image: earrings, displayImage: earringDisplay },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
