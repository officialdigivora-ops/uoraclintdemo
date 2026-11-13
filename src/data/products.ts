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
import heroPointer from "@/assets/uora-editorial.jpg.asset.json";
const hero = heroPointer.url;
import model2Pointer from "@/assets/uora-model-earrings.jpg.asset.json";
const model2 = model2Pointer.url;
import model3Pointer from "@/assets/uora-model-wrist.jpg.asset.json";
const model3 = model3Pointer.url;
import type { CategorySlug } from "./categories";

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  images: string[];
  description: string;
  bestSeller?: boolean;
}

const base = { necklaces, earrings, rings, kada, bracelets };
const alt = { necklaces: hero, earrings: model2, rings: model3, kada: model3, bracelets: model3 };

const p = (slug: string, name: string, category: CategorySlug, price: number, description: string, bestSeller = false): Product => ({
  slug, name, category, price, description, bestSeller,
  images: [base[category], alt[category], category === "necklaces" ? model2 : hero],
});

// Replace images with your own product photos.
export const PRODUCTS: Product[] = [
  p("north-star-pendant", "North Star Pendant", "necklaces", 699, "A cushion pendant engraved with a four-point star on a fine cable chain.", true),
  p("aurelia-drops", "Aurelia Drops", "earrings", 549, "Sculpted teardrop earrings with a mirror-polished finish.", true),
  p("dome-signet-ring", "Dome Signet Ring", "rings", 449, "A hammered dome ring with a soft moonstone-tone inlay.", true),
  p("heritage-kada", "Heritage Kada", "kada", 899, "A brushed open cuff edged with fine milgrain detail.", true),
  p("mariner-chain-bracelet", "Mariner Chain Bracelet", "bracelets", 499, "Delicate cable chain dotted with mariner links.", true),
  p("celeste-hoops", "Celeste Hoops", "earrings", 599, "Chunky everyday hoops, light enough for all-day wear.", true),
  p("layered-muse-necklace", "Layered Muse Necklace", "necklaces", 849, "Three graduated strands that layer themselves.", true),
  p("paperclip-bracelet", "Paperclip Bracelet", "bracelets", 649, "Bold elongated links with a secure lobster clasp.", true),
  p("twist-stacker-ring", "Twist Stacker Ring", "rings", 349, "A slim rope-twist band made for stacking."),
  p("sol-studs", "Sol Studs", "earrings", 399, "Tiny sunburst studs for a quiet glint."),
  p("rope-chain-necklace", "Rope Chain Necklace", "necklaces", 749, "A classic rope chain that sits just on the collarbone."),
  p("minimal-cuff", "Minimal Cuff", "kada", 699, "A clean, high-polish open cuff."),
  p("tennis-line-bracelet", "Tennis Line Bracelet", "bracelets", 799, "A row of crystal-set links on a flexible line."),
  p("double-band-ring", "Double Band Ring", "rings", 499, "Two fused bands for a stacked look in one."),
  p("jhumka-luxe", "Jhumka Luxe", "earrings", 879, "A modern jhumka with beaded fringe and filigree cap."),
  p("twisted-kada", "Twisted Kada", "kada", 599, "A rope-twist kada with a subtle sheen."),
];

export const getProduct = (slug: string) => PRODUCTS.find((x) => x.slug === slug);
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
