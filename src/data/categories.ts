import necklaces from "@/assets/uora-necklaces.jpg";
import earrings from "@/assets/uora-earrings.jpg";
import rings from "@/assets/uora-rings.jpg";
import kada from "@/assets/uora-kada.jpg";
import bracelets from "@/assets/uora-bracelets.jpg";
import ringDisplay from "@/assets/showcase-rings-sized.png";
import cuffDisplay from "@/assets/showcase-cuff-sized.png";
import chainDisplay from "@/assets/showcase-chain-sized.png";
import necklaceDisplay from "@/assets/showcase-necklaces-sized.png";
import earringDisplay from "@/assets/showcase-earrings-sized.png";

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
