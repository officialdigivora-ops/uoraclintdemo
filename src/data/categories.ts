import necklacesPointer from "@/assets/uora-necklaces.jpg.asset.json";
const necklaces = necklacesPointer.url;
import earringsPointer from "@/assets/uora-earrings.jpg.asset.json";
const earrings = earringsPointer.url;
import ringsPointer from "@/assets/uora-rings.jpg.asset.json";
const rings = ringsPointer.url;
import kadaPointer from "@/assets/uora-kada.jpg.asset.json";
const kada = kadaPointer.url;
import braceletsPointer from "@/assets/uora-bracelets.jpg.asset.json";
const bracelets = braceletsPointer.url;
import ringDisplayPointer from "@/assets/showcase-rings-sized.png.asset.json";
const ringDisplay = ringDisplayPointer.url;
import cuffDisplayPointer from "@/assets/showcase-cuff-sized.png.asset.json";
const cuffDisplay = cuffDisplayPointer.url;
import chainDisplayPointer from "@/assets/showcase-chain-sized.png.asset.json";
const chainDisplay = chainDisplayPointer.url;
import necklaceDisplayPointer from "@/assets/showcase-necklaces-sized.png.asset.json";
const necklaceDisplay = necklaceDisplayPointer.url;
import earringDisplayPointer from "@/assets/showcase-earrings-sized.png.asset.json";
const earringDisplay = earringDisplayPointer.url;

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
