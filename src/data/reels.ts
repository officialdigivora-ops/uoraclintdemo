import hero from "@/assets/uora-editorial.jpg";
import model2 from "@/assets/uora-model-earrings.jpg";
import model3 from "@/assets/uora-model-wrist.jpg";
import necklaces from "@/assets/uora-necklaces.jpg";
import earrings from "@/assets/uora-earrings.jpg";
import kada from "@/assets/uora-kada.jpg";
import rings from "@/assets/uora-rings.jpg";
import bracelets from "@/assets/uora-bracelets.jpg";

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
