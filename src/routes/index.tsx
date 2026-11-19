import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Star } from "lucide-react";
import { EmeraldEdit } from "@/components/site/EmeraldEdit";
import { HeroSlider } from "@/components/site/HeroSlider";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductCollection } from "@/components/site/ProductCollection";
import { CategoryShowcase } from "@/components/site/CategoryShowcase";
import { CrossMarquee } from "@/components/site/CrossMarquee";
import { Reels } from "@/components/site/Reels";
import { Faq } from "@/components/site/Faq";
import { POPULAR_BESTSELLERS } from "@/data/home";
import { TESTIMONIALS } from "@/data/testimonials";
import { useScrollLinkedTrack } from "@/hooks/use-scroll-linked-track";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UORA – Own the Rare | Gold Plated Jewellery Online India" },
      { name: "description", content: "Shop anti-tarnish, skin-safe gold plated earrings, necklaces, rings and bracelets by UORA. Free shipping over ₹1299 across India." },
      { property: "og:title", content: "UORA – Own the Rare" },
      { property: "og:description", content: "Anti-tarnish, skin-safe gold plated jewellery. Free shipping over ₹1299 across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const reviewsTrack = useRef<HTMLDivElement>(null);
  useScrollLinkedTrack(reviewsTrack);
  return (
    <>
      {/* 1. Hero */}
      <HeroSlider />

      <div className="relative z-20 -mt-11 md:-mt-14">
        <CrossMarquee />
      </div>

      {/* 2. Categories */}
      <section className="container-lux py-8 md:py-12">
        <SectionHeading eyebrow="Explore" lead="What Are You" em="Looking For?" className="mb-4 lg:mb-6" />
        <CategoryShowcase />
      </section>

      {/* 3. Popular best sellers */}
      <section id="bestsellers" className="container-lux py-8 md:py-12 border-t border-line">
        <SectionHeading eyebrow="Popular Products" lead="Best" em="Sellers" className="mb-4 lg:mb-6" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6">
          {POPULAR_BESTSELLERS.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      <EmeraldEdit />

      {/* 6. Collection */}
      <section id="shop" className="py-8 md:py-12 container-lux border-t border-line">
        <SectionHeading eyebrow="Available Pieces" lead="Shop The" em="Collection" className="mb-4 lg:mb-6" />
        <ProductCollection />
      </section>

      {/* 7. Reels */}
      <section id="shopByReel" className="py-8 md:py-12 border-t border-line">
        <div className="container-lux">
          <SectionHeading eyebrow="Watch & Shop" lead="Shop The" em="Reel" className="mb-4 lg:mb-6" />
          <Reels />
        </div>
      </section>

      {/* 8. Testimonials */}
      <section id="testimonials" className="py-8 md:py-12 border-t border-line bg-elevated">
        <div className="container-lux">
          <SectionHeading eyebrow="Customer Love" lead="What Our Clients" em="Say" className="mb-4 lg:mb-5" />
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="font-display text-2xl">5 / 5</span>
            <span className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</span>
          </div>
          <div ref={reviewsTrack} className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pl-3 pr-1 scroll-pl-3 md:pl-0 md:pr-0 md:scroll-pl-0">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="snap-start shrink-0 w-[82%] md:w-[calc((100%-2rem)/3)] border border-line bg-background p-6 lg:p-8 flex flex-col">
                <span className="flex text-gold mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</span>
                <blockquote className="font-display text-xl leading-snug flex-1">“{t.quote}”</blockquote>
                <figcaption className="flex items-center gap-3 mt-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground font-display text-lg">{t.name[0]}</span>
                  <span><span className="block text-sm">{t.name}</span><span className="text-xs text-muted-foreground">Bought {t.category}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-8 md:py-12 container-lux">
        <SectionHeading eyebrow="Good to Know" lead="Frequently Asked" em="Questions" className="mb-4 lg:mb-6" />
        <Faq />
      </section>

    </>
  );
}
