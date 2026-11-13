import necklacesPointer from "@/assets/uora-necklaces.jpg.asset.json";
import earringsPointer from "@/assets/uora-earrings.jpg.asset.json";
import ringsPointer from "@/assets/uora-rings.jpg.asset.json";
import kadaPointer from "@/assets/uora-kada.jpg.asset.json";
import braceletsPointer from "@/assets/uora-bracelets.jpg.asset.json";
import ringDisplayPointer from "@/assets/showcase-rings-sized.png.asset.json";
import cuffDisplayPointer from "@/assets/category-jar-cuff.png.asset.json";
import chainDisplayPointer from "@/assets/category-jar-chain-bracelet.png.asset.json";
import necklaceDisplayPointer from "@/assets/category-jar-necklaces.png.asset.json";
import earringDisplayPointer from "@/assets/category-jar-earrings.png.asset.json";
const necklaces = (necklacesPointer as unknown as { url: string }).url;
const earrings = (earringsPointer as unknown as { url: string }).url;
const rings = (ringsPointer as unknown as { url: string }).url;
const kada = (kadaPointer as unknown as { url: string }).url;
const bracelets = (braceletsPointer as unknown as { url: string }).url;
const ringDisplay = (ringDisplayPointer as unknown as { url: string }).url;
const cuffDisplay = (cuffDisplayPointer as unknown as { url: string }).url;
const chainDisplay = (chainDisplayPointer as unknown as { url: string }).url;
const necklaceDisplay = (necklaceDisplayPointer as unknown as { url: string }).url;
const earringDisplay = (earringDisplayPointer as unknown as { url: string }).url;

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
