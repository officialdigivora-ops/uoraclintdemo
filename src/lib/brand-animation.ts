export const BRAND_TIMING = { entering: 200, holding: 3000, exiting: 200 } as const;
export type BrandPhase = keyof typeof BRAND_TIMING;
export function nextBrandFrame(phase: BrandPhase, tagline: boolean) {
  if (phase === "entering") return { phase: "holding" as const, tagline };
  if (phase === "holding") return { phase: "exiting" as const, tagline };
  return { phase: "entering" as const, tagline: !tagline };
}