import necklacesPointerPointer from "@/assets/uora-necklaces.jpg.asset.json";
const necklacesPointer = necklacesPointerPointer.url;
const necklaces = necklacesPointer.url;
import earringsPointerPointer from "@/assets/uora-earrings.jpg.asset.json";
const earringsPointer = earringsPointerPointer.url;
const earrings = earringsPointer.url;
import ringsPointerPointer from "@/assets/uora-rings.jpg.asset.json";
const ringsPointer = ringsPointerPointer.url;
const rings = ringsPointer.url;
import kadaPointerPointer from "@/assets/uora-kada.jpg.asset.json";
const kadaPointer = kadaPointerPointer.url;
const kada = kadaPointer.url;
import braceletsPointerPointer from "@/assets/uora-bracelets.jpg.asset.json";
const braceletsPointer = braceletsPointerPointer.url;
const bracelets = braceletsPointer.url;
import ringDisplayPointerPointer from "@/assets/showcase-rings-sized.png.asset.json";
const ringDisplayPointer = ringDisplayPointerPointer.url;
const ringDisplay = ringDisplayPointer.url;
import cuffDisplayPointerPointer from "@/assets/showcase-cuff-sized.png.asset.json";
const cuffDisplayPointer = cuffDisplayPointerPointer.url;
const cuffDisplay = cuffDisplayPointer.url;
import chainDisplayPointerPointer from "@/assets/showcase-chain-sized.png.asset.json";
const chainDisplayPointer = chainDisplayPointerPointer.url;
const chainDisplay = chainDisplayPointer.url;
import necklaceDisplayPointerPointer from "@/assets/showcase-necklaces-sized.png.asset.json";
const necklaceDisplayPointer = necklaceDisplayPointerPointer.url;
const necklaceDisplay = necklaceDisplayPointer.url;
import earringDisplayPointerPointer from "@/assets/showcase-earrings-sized.png.asset.json";
const earringDisplayPointer = earringDisplayPointerPointer.url;
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
