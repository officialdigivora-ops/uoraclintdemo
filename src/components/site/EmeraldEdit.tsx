import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import model from "@/assets/emerald-edit-model.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { EMERALD_EDIT, getEditCountdown } from "@/data/emerald-edit";
import { formatINR } from "@/data/products";

export function EmeraldEdit() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!EMERALD_EDIT.endsAt) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const countdown = now === null ? null : getEditCountdown(EMERALD_EDIT.endsAt, now);

  return (
    <section id="emerald-edit" className="border-y border-line py-8 md:py-12">
      <div className="container-lux">
        <SectionHeading eyebrow="UORA Curated" lead="The Emerald" em="Edit" />
        <div className="emerald-edit-layout">
          <div className="emerald-edit-photo relative">
            <img src={model} alt="Arab model in emerald green wearing UORA gold earrings, a pendant necklace, a ring and a chain bracelet" width={1024} height={1280} loading="lazy" className="block h-full w-full object-cover" />
            {EMERALD_EDIT.hotspots.map((hotspot) => (
              <Button key={hotspot.slug} asChild variant="ghost" size="icon" className={`emerald-hotspot emerald-hotspot-${hotspot.position}`}>
                <Link to="/product/$slug" params={{ slug: hotspot.slug }} aria-label={`Shop ${hotspot.name}`} title={hotspot.name}>
                  <span className="emerald-hotspot-dot" aria-hidden="true" />
                  <span className="emerald-hotspot-label" aria-hidden="true">{hotspot.name}</span>
                </Link>
              </Button>
            ))}
          </div>
          <div className="emerald-edit-offer">
            <div className="hidden lg:block pb-8">
              <p className="eyebrow mb-4">The art of adornment</p>
              <h3 className="font-display text-4xl text-primary">Golden details.<br /><em>Emerald elegance.</em></h3>
            </div>
            <div className="bg-primary text-background px-4 py-5 md:p-6">
              <p className="text-center text-xs mb-3">{countdown ? "The edit ends in" : "Offer countdown"}</p>
              <div className="grid grid-cols-4 gap-2 text-center" role="timer" aria-label={countdown ? "Time remaining" : "Offer date awaiting confirmation"}>
                {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
                  <div key={label}>
                    <span className="block font-display text-3xl md:text-4xl tabular-nums leading-none">{countdown ? String(countdown[i]).padStart(2, "0") : "—"}</span>
                    <span className="block text-[10px] mt-2">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 py-5 border-b border-line">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="emerald-original-price font-display text-xl text-muted-foreground md:text-2xl" aria-label={`Original price ${formatINR(EMERALD_EDIT.originalPrice)}`}>{formatINR(EMERALD_EDIT.originalPrice)}</span>
                <span className="font-display text-3xl text-primary md:text-4xl">{formatINR(EMERALD_EDIT.price)}</span>
              </div>
              <Button asChild variant="ghost" className="emerald-shop-link p-0 h-11 shrink-0 gap-2 text-primary text-xs md:text-sm">
                <Link to="/" hash="shop">Shop Now <ArrowRight className="emerald-shop-arrow size-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}