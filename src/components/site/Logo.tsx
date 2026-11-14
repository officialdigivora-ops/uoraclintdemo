import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import headerArtwork from "@/assets/uora-gold-logo-high-quality.png";
import { BRAND_TIMING, nextBrandFrame, type BrandPhase } from "@/lib/brand-animation";

// Keep a live-text fallback for the footer while the header uses the supplied brand art.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-semibold tracking-[0.18em] text-gold-gradient leading-none", className)}>
      UORA
    </span>
  );
}

export function Logo({ size = "header" }: { size?: "header" | "footer" }) {
  const [frame, setFrame] = useState<{ phase: BrandPhase; tagline: boolean }>({ phase: "entering", tagline: false });

  useEffect(() => {
    if (size !== "header") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeout = window.setTimeout(() => setFrame(nextBrandFrame(frame.phase, frame.tagline)), BRAND_TIMING[frame.phase]);
    return () => window.clearTimeout(timeout);
  }, [size, frame]);

  return (
    <Link to="/" aria-label="UORA — home" className={cn("flex items-center justify-center", size === "header" ? "header-logo" : "flex-col")}>
      {size === "header" ? (
        <span className="header-brand-stage" aria-hidden="true">
          <span key={String(frame.tagline)} className={cn("header-brand-artwork", `header-brand-${frame.phase}`, frame.tagline && "header-brand-artwork-tagline")}>
            <img src={headerArtwork} alt="" className="header-brand-image" />
          </span>
        </span>
      ) : <Wordmark className="text-5xl" />}
      {size === "footer" && <span className="eyebrow mt-1 text-muted-foreground text-[11px]">
        Own the Rare
      </span>}
    </Link>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-semibold text-gold-gradient", className)}>
      U<svg aria-hidden viewBox="0 0 24 24" className="inline-block h-[0.8em] w-[0.8em] mx-[0.04em] -translate-y-[0.04em] fill-gold"><path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z"/></svg>
    </span>
  );
}
