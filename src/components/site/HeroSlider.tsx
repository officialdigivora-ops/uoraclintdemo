import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import bangles from "@/assets/slider-bangles.jpg";
import necklaces from "@/assets/slider-necklaces.jpg";
import earrings from "@/assets/slider-earrings.jpg";
import bracelets from "@/assets/slider-bracelets.jpg";
import rings from "@/assets/uora-rings.jpg.asset.json";

const slides = [
  { image: bangles, alt: "Gold bangle with beaded edges on white stone", title: "Bangles", detail: "Sculpted curves. Delicate beaded edges." },
  { image: necklaces, alt: "Gold star pendant necklace on a white display", title: "Necklaces", detail: "A signature star. A little everyday brilliance." },
  { image: earrings, alt: "Polished gold drop earrings on white stone", title: "Earrings", detail: "Fluid shapes. A light-catching finish." },
  { image: bracelets, alt: "Gold chain bracelet on white stone", title: "Bracelets", detail: "Distinctive links. Beautifully connected." },
  { image: rings.url, alt: "UORA gold ring collection", title: "Rings", detail: "Bold profiles. Details worth a closer look." },
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
    <section className="jewellery-hero jewellery-category-slider relative overflow-hidden bg-elevated" aria-label="UORA jewellery collection" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      {slides.map((slide, index) => <img key={slide.image} src={slide.image} alt={slide.alt} aria-hidden={index !== active} className={cn("absolute inset-0 h-full w-full object-cover md:object-contain transition-opacity duration-700 motion-reduce:transition-none", index === active ? "opacity-100" : "opacity-0")} fetchPriority={index === 0 ? "high" : "auto"} />)}
      <div className="container-lux relative z-10 pt-5 md:pt-24 text-center md:text-left">
        <div className="mx-auto max-w-xs md:mx-0 md:max-w-sm">
          <p className="text-xs font-medium text-primary">UORA · Own the Rare</p>
          <h1 className="h1-lux mt-1 text-primary">{slides[active]?.title}</h1>
          <p className="mt-1 text-sm text-primary">{slides[active]?.detail}</p>
        </div>
      </div>
      <div className="absolute bottom-12 inset-x-0 z-10 flex justify-center gap-1" aria-label="Choose photo">
        {slides.map((slide, index) => <Button key={slide.image} variant="ghost" size="icon" className="size-8 rounded-full" aria-label={`Show photo ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><span className={cn("size-3 rounded-full border-2 border-primary", active === index ? "bg-primary" : "bg-background")} /></Button>)}
      </div>
    </section>
  );
}