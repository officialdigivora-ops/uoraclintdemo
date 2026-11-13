import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/data/categories";

export function CategoryShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const bounds = element.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      let closest = 0;
      let distance = Infinity;
      Array.from(element.children).forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const delta = Math.abs(rect.left + rect.width / 2 - center);
        if (delta < distance) { closest = index; distance = delta; }
      });
      setActive(closest);
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);
  return (
      <div ref={track} className="category-showcase-track" aria-label="Jewellery categories">
        {CATEGORIES.map((category, index) => (
          <Link key={category.slug} to="/product-category/$slug" params={{ slug: category.slug }} data-active={active === index} className="category-showcase-item group block text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <div className="category-jar aspect-[3/4]">
              <img src={category.displayImage} alt={`${category.label} displayed in a glass jar`} width={768} height={1024} loading="lazy" className="h-full w-full object-contain" />
            </div>
            <p className="font-display text-xl md:text-3xl text-primary mt-2 leading-tight min-h-12">{category.label}</p>
          </Link>
        ))}
      </div>
  );
}