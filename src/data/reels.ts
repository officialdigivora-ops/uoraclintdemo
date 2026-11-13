import heroPointer from "@/assets/uora-editorial.jpg.asset.json";
const hero = heroPointer.url;
import model2Pointer from "@/assets/uora-model-earrings.jpg.asset.json";
const model2 = model2Pointer.url;
import model3Pointer from "@/assets/uora-model-wrist.jpg.asset.json";
const model3 = model3Pointer.url;
import necklacesPointer from "@/assets/uora-necklaces.jpg.asset.json";
const necklaces = necklacesPointer.url;
import earringsPointer from "@/assets/uora-earrings.jpg.asset.json";
const earrings = earringsPointer.url;
import kadaPointer from "@/assets/uora-kada.jpg.asset.json";
const kada = kadaPointer.url;
import ringsPointer from "@/assets/uora-rings.jpg.asset.json";
const rings = ringsPointer.url;
import braceletsPointer from "@/assets/uora-bracelets.jpg.asset.json";
const bracelets = braceletsPointer.url;

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
