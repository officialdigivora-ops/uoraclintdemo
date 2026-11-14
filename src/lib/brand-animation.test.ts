import { describe, expect, it } from "vitest";
import { BRAND_TIMING, nextBrandFrame } from "./brand-animation";

describe("header brand loop", () => {
  it("holds each design for three seconds", () => {
    expect(BRAND_TIMING.holding).toBe(3000);
  });
  it("exits before alternating UORA and the tagline", () => {
    const holding = nextBrandFrame("entering", false);
    expect(holding).toEqual({ phase: "holding", tagline: false });
    expect(nextBrandFrame(holding.phase, holding.tagline)).toEqual({ phase: "exiting", tagline: false });
    expect(nextBrandFrame("exiting", false)).toEqual({ phase: "entering", tagline: true });
    expect(nextBrandFrame("exiting", true)).toEqual({ phase: "entering", tagline: false });
  });
});