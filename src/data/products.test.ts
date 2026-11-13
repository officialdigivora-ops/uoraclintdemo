import { describe, expect, it } from "vitest";
import { getProduct, getProductOriginalPrice, getProductPrice } from "./products";

describe("Bestseller sale prices", () => {
  it("takes 20% off the North Star Pendant and rounds to whole rupees", () => {
    const product = getProduct("north-star-pendant");
    expect(product).toBeDefined();
    if (!product) return;
    expect(product.price).toBe(699);
    expect(getProductPrice(product)).toBe(559);
    expect(getProductOriginalPrice(product)).toBe(699);
  });

  it("applies the 20% sale price to every Bestseller", () => {
    const bestsellers = ["north-star-pendant", "aurelia-drops", "dome-signet-ring", "heritage-kada", "mariner-chain-bracelet", "celeste-hoops", "layered-muse-necklace", "paperclip-bracelet"];
    for (const slug of bestsellers) {
      const product = getProduct(slug);
      expect(product?.bestSeller).toBe(true);
      if (product) expect(getProductPrice(product)).toBe(Math.round(product.price * 0.8));
    }
  });

  it("keeps regular products at their original price", () => {
    const product = getProduct("twist-stacker-ring");
    expect(product).toBeDefined();
    if (!product) return;
    expect(getProductPrice(product)).toBe(349);
    expect(getProductOriginalPrice(product)).toBeUndefined();
  });
});