import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import bangles from "@/assets/luxury-bangles.jpg";
import necklaces from "@/assets/luxury-necklaces.jpg";
import earrings from "@/assets/luxury-earrings.jpg";
import bracelets from "@/assets/luxury-bracelets.jpg";
import rings from "@/assets/luxury-rings.jpg";

const slides = [
  { image: earrings, alt: "Model wearing sculptural gold earrings with EARRINGS lettering behind her" },
  { image: rings, alt: "Model wearing a gold statement ring with RINGS lettering behind her" },
  { image: necklaces, alt: "Model wearing a gold pendant necklace with NECKLACES lettering behind her" },
  { image: bracelets, alt: "Model wearing a gold link bracelet with BRACELETS lettering behind her" },
  { image: bangles, alt: "Model wearing polished gold bangles with BANGLES lettering behind her" },
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
    <section className="jewellery-hero jewellery-category-slider relative overflow-hidden bg-primary" aria-label="UORA jewellery collection" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <h1 className="sr-only">UORA jewellery collections</h1>
      {slides.map((slide, index) => <img key={slide.image} src={slide.image} alt={slide.alt} aria-hidden={index !== active} width={1440} height={1440} className={cn("absolute inset-0 h-full w-full object-contain transition-opacity duration-700 motion-reduce:transition-none", index === active ? "opacity-100" : "opacity-0")} fetchPriority={index === 0 ? "high" : "auto"} />)}
      <div className="absolute bottom-14 inset-x-0 z-10 flex justify-center gap-1" aria-label="Choose photo">
        {slides.map((slide, index) => <Button key={slide.image} variant="ghost" size="icon" className="size-8 rounded-full hover:bg-primary-foreground/10" aria-label={`Show photo ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><span className={cn("size-2 rounded-full border border-primary-foreground", active === index ? "bg-primary-foreground" : "bg-transparent")} /></Button>)}
      </div>
    </section>
  );
}