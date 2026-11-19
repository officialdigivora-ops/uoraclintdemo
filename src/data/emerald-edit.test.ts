import { describe, expect, it } from "vitest";
import { EMERALD_EDIT, getEditCountdown } from "./emerald-edit";
import { getProduct } from "./products";

describe("Emerald Edit", () => {
  it("displays the requested ₹4999 original price", () => expect(EMERALD_EDIT.originalPrice).toBe(4999));
  it("displays the requested ₹2999 offer price", () => expect(EMERALD_EDIT.price).toBe(2999));
  it("keeps countdown inactive without a confirmed deadline", () => expect(getEditCountdown(null, 0)).toBeNull());
  it("gives all visitors the same 72-hour window", () => {
    expect(Date.parse(EMERALD_EDIT.endsAt) - Date.parse(EMERALD_EDIT.startsAt)).toBe(72 * 60 * 60 * 1000);
    expect(getEditCountdown(EMERALD_EDIT.endsAt, Date.parse(EMERALD_EDIT.startsAt))).toEqual([3, 0, 0, 0]);
  });
  it("never restarts an expired countdown", () => expect(getEditCountdown("2026-11-19T00:00:00Z", Date.parse("2026-11-20T00:00:00Z"))).toEqual([0, 0, 0, 0]));
  it("links each jewellery hotspot to an existing product", () => {
    for (const hotspot of EMERALD_EDIT.hotspots) expect(getProduct(hotspot.slug)?.slug).toBe(hotspot.slug);
  });
});