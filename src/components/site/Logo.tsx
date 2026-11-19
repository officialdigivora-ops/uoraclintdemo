import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import headerArtwork from "@/assets/uora-logo-slogan.png.asset.json";

// Keep a live-text fallback for the footer while the header uses the supplied brand art.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-semibold tracking-[0.18em] text-gold-gradient leading-none", className)}>
      UORA
    </span>
  );
}

export function Logo({ size = "header" }: { size?: "header" | "footer" }) {
  return (
    <Link to="/" aria-label="UORA — home" className={cn("flex items-center justify-center", size === "header" && "header-logo")}>
      <span className={cn("header-brand-static", size === "footer" && "footer-brand-static")} aria-hidden="true" style={{ maskImage: `url(${headerArtwork.url})`, WebkitMaskImage: `url(${headerArtwork.url})` }} />
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
