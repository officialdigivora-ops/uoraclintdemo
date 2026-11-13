import { describe, expect, it } from "vitest";
import { POPULAR_BESTSELLERS } from "./home";
import { CATEGORIES } from "./categories";

describe("Homepage merchandising", () => {
  it("selects exactly four popular products", () => {
    expect(POPULAR_BESTSELLERS).toHaveLength(4);
  });
  it("only selects best sellers", () => {
    expect(POPULAR_BESTSELLERS.every((product) => product.bestSeller === true)).toBe(true);
  });
  it("offers only the five categories UORA sells", () => {
    expect(CATEGORIES.map((category) => category.label)).toEqual(["Rings", "Bracelet", "Chain Bracelet", "Necklaces", "Earrings"]);
  });
});