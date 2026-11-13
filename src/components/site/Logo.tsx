import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

// Live typography keeps the wordmark crisp at every screen size.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-semibold tracking-[0.18em] text-gold-gradient leading-none", className)}>
      UORA
    </span>
  );
}

export function Logo({ size = "header" }: { size?: "header" | "footer" }) {
  return (
    <Link to="/" aria-label="UORA — home" className={cn("flex flex-col items-center", size === "header" && "header-logo")}>
      <Wordmark className={size === "footer" ? "text-5xl" : "logo-metal text-[34px] lg:text-[42px]"} />
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
