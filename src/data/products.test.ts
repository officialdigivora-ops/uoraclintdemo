import { describe, expect, it } from "vitest";
import { getProduct, getProductOriginalPrice, getProductPrice, PRODUCTS } from "./products";

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
    const bestsellers = PRODUCTS.filter((product) => product.bestSeller);
    expect(bestsellers.length).toBeGreaterThan(0);
    for (const product of bestsellers) {
      expect(getProductPrice(product)).toBe(Math.round(product.price * 0.8));
    }
  });

  it("keeps regular products at their original price", () => {
    const product = getProduct("sol-studs");
    expect(product).toBeDefined();
    if (!product) return;
    expect(getProductPrice(product)).toBe(399);
    expect(getProductOriginalPrice(product)).toBeUndefined();
  });
});

describe("imported rings", () => {
  it("charges ₹299 for every ring", () => {
    const rings = PRODUCTS.filter((p) => p.category === "rings");
    expect(rings.length).toBe(30);
    rings.forEach((p) => expect(getProductPrice(p)).toBe(299));
  });
  it("uses ₹699 as every ring's regular price", () => {
    const rings = PRODUCTS.filter((p) => p.category === "rings");
    expect(rings.length).toBeGreaterThan(0);
    rings.forEach((p) => expect(getProductOriginalPrice(p)).toBe(699));
  });
  it("groups the three frame colours under one product", () => {
    const ring = getProduct("emerald-frame-ring");
    expect(ring?.variants?.map((v) => v.id)).toEqual(["green", "pink", "clear"]);
    expect(getProduct("rose-frame-ring")).toBeUndefined();
    expect(getProduct("crystal-frame-ring")).toBeUndefined();
  });
});