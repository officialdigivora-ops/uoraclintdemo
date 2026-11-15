import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import editorial from "@/assets/uora-editorial.jpg.asset.json";
import earrings from "@/assets/uora-model-earrings.jpg.asset.json";
import wrist from "@/assets/uora-model-wrist.jpg.asset.json";

const slides = [
  { image: editorial.url, alt: "Gold necklaces styled with a white shirt" },
  { image: earrings.url, alt: "UORA gold earrings worn by a model" },
  { image: wrist.url, alt: "UORA gold bracelets styled on the wrist" },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 4500);
    return () => window.clearInterval(timer);
  }, [paused]);
  return (
    <section className="jewellery-hero relative overflow-hidden bg-elevated" aria-label="UORA jewellery collection" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      {slides.map((slide, index) => <img key={slide.image} src={slide.image} alt={slide.alt} aria-hidden={index !== active} className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none", index === active ? "opacity-100" : "opacity-0")} fetchPriority={index === 0 ? "high" : "auto"} />)}
      <div className="container-lux relative z-10 pt-5 md:pt-8 text-center">
        <p className="text-xs font-medium uppercase text-primary sm:text-sm">18K gold plated · Anti-tarnish</p>
        <h1 className="h1-lux mt-1 text-primary">UORA</h1>
        <p className="font-display text-3xl text-primary">Own the <em>Rare</em></p>
      </div>
      <div className="absolute bottom-12 inset-x-0 z-10 flex justify-center gap-1" aria-label="Choose photo">
        {slides.map((slide, index) => <Button key={slide.image} variant="ghost" size="icon" className="size-8 rounded-full" aria-label={`Show photo ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><span className={cn("size-3 rounded-full border-2 border-primary", active === index ? "bg-primary" : "bg-background")} /></Button>)}
      </div>
    </section>
  );
}