import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, remainingForFreeShipping, subtotal, checkoutUrl } from "./selection";

const lines = [
  { slug: "a", name: "Celeste Hoops", price: 599, qty: 2, image: "" },
  { slug: "b", name: "Sol Studs", price: 399, qty: 1, image: "" },
];

describe("selection", () => {
  it("sums price × qty", () => expect(subtotal(lines)).toBe(1597));
  it("free shipping starts at ₹1299", () => {
    expect(remainingForFreeShipping(1299)).toBe(0);
    expect(remainingForFreeShipping(1000)).toBe(299);
  });
  it("lists items, quantities and total", () => {
    const m = buildWhatsAppMessage(lines);
    expect(m).toContain("Celeste Hoops × 2 — ₹1,198");
    expect(m).toContain("Total: ₹1,597");
  });
  it("uses the discounted Bestseller price for cart and order totals", () => {
    const discountedLine = [{ slug: "north-star-pendant", name: "North Star Pendant", price: 559, originalPrice: 699, qty: 2, image: "" }];
    expect(subtotal(discountedLine)).toBe(1118);
    expect(buildWhatsAppMessage(discountedLine)).toContain("North Star Pendant × 2 — ₹1,118");
    expect(buildWhatsAppMessage(discountedLine)).toContain("Total: ₹1,118");
  });
  it("does not create an order link with the source placeholder number", () => {
    expect(checkoutUrl(lines)).toBeNull();
  });
});
