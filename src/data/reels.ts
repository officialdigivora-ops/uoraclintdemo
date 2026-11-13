import heroPointer from "@/assets/uora-editorial.jpg.asset.json";
import model2Pointer from "@/assets/uora-model-earrings.jpg.asset.json";
import model3Pointer from "@/assets/uora-model-wrist.jpg.asset.json";
import necklacesPointer from "@/assets/uora-necklaces.jpg.asset.json";
import earringsPointer from "@/assets/uora-earrings.jpg.asset.json";
import kadaPointer from "@/assets/uora-kada.jpg.asset.json";
import ringsPointer from "@/assets/uora-rings.jpg.asset.json";
import braceletsPointer from "@/assets/uora-bracelets.jpg.asset.json";
const hero = (heroPointer as unknown as { url: string }).url;
const model2 = (model2Pointer as unknown as { url: string }).url;
const model3 = (model3Pointer as unknown as { url: string }).url;
const necklaces = (necklacesPointer as unknown as { url: string }).url;
const earrings = (earringsPointer as unknown as { url: string }).url;
const kada = (kadaPointer as unknown as { url: string }).url;
const rings = (ringsPointer as unknown as { url: string }).url;
const bracelets = (braceletsPointer as unknown as { url: string }).url;

export interface Reel {
  id: string;
  poster: string;
  video?: string; // add an .mp4 URL to play a real video
  productSlug: string;
  caption: string;
}

export const REELS: Reel[] = [
  { id: "r1", poster: hero, productSlug: "layered-muse-necklace", caption: "Festive layers" },
  { id: "r2", poster: model2, productSlug: "celeste-hoops", caption: "Everyday hoops" },
  { id: "r3", poster: model3, productSlug: "paperclip-bracelet", caption: "Stack the wrist" },
  { id: "r4", poster: necklaces, productSlug: "north-star-pendant", caption: "North Star" },
  { id: "r5", poster: earrings, productSlug: "aurelia-drops", caption: "Golden drops" },
  { id: "r6", poster: kada, productSlug: "heritage-kada", caption: "Heritage kada" },
  { id: "r7", poster: rings, productSlug: "dome-signet-ring", caption: "Ring stack" },
  { id: "r8", poster: bracelets, productSlug: "mariner-chain-bracelet", caption: "Fine chains" },
  { id: "r9", poster: model2, productSlug: "rope-chain-necklace", caption: "Rope chain" },
];
