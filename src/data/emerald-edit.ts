export const EMERALD_EDIT = {
  originalPrice: 4999,
  price: 2999,
  // Display-only offer; one fixed 72-hour window shared by every visitor.
  startsAt: "2026-11-19T00:19:00Z",
  endsAt: "2026-11-22T00:19:00Z",
  hotspots: [
    { slug: "aurelia-drops", name: "Aurelia Drops", position: "earrings" },
    { slug: "royal-rosette-ring", name: "Royal Rosette Ring", position: "ring" },
    { slug: "north-star-pendant", name: "North Star Pendant", position: "necklace" },
    { slug: "mariner-chain-bracelet", name: "Mariner Chain Bracelet", position: "bracelet" },
  ],
};

export function getEditCountdown(endsAt: string | null, now: number) {
  if (!endsAt) return null;
  const end = Date.parse(endsAt);
  if (!Number.isFinite(end)) return null;
  const seconds = Math.max(0, Math.floor((end - now) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}