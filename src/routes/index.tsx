import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Leaf, Truck, Sparkles, Star } from "lucide-react";
import heroPointer from "@/assets/uora-editorial.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductCollection } from "@/components/site/ProductCollection";
import { CategoryShowcase } from "@/components/site/CategoryShowcase";
import { CrossMarquee } from "@/components/site/CrossMarquee";
import { Reels } from "@/components/site/Reels";
import { Faq } from "@/components/site/Faq";
import { ContactForm } from "@/components/site/ContactForm";
import { WhatsAppIcon, InstagramIcon } from "@/components/site/icons";
import { POPULAR_BESTSELLERS } from "@/data/home";
import { TESTIMONIALS } from "@/data/testimonials";
import { TRUST_BADGES } from "@/data/content";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

const hero = (heroPointer as unknown as { url: string }).url;

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

const ICONS = { droplets: Droplets, leaf: Leaf, truck: Truck, sparkles: Sparkles };

function Index() {
  const contactLink = whatsappLink("Hi UORA! I need help choosing a piece.");
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="jewellery-hero relative flex items-end md:items-center overflow-hidden bg-elevated">
          <img src={hero} alt="Gold jewellery styled with a crisp white shirt" width={1920} height={1024} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          <div className="container-lux relative z-10 pb-9 pt-12 md:py-16">
            <Reveal className="max-w-md">
              <p className="eyebrow mb-3">Everyday, Extraordinary</p>
              <h1 className="h1-lux">UORA</h1>
              <p className="font-display text-3xl mt-2">Own the <em className="text-gold">Rare</em></p>
              <p className="mt-4 text-muted-foreground max-w-sm">18K gold plated, anti-tarnish jewellery crafted for everyday brilliance — and the compliments that follow.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link to="/" hash="shop">Shop Now</Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/" hash="shopByReel">Watch Reels</Link></Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CrossMarquee />

      {/* 2. Categories */}
      <section className="container-lux py-12 md:py-16">
        <SectionHeading eyebrow="Explore" lead="What Are You" em="Looking For?" />
        <CategoryShowcase />
      </section>

      {/* 3. Popular best sellers */}
      <section id="bestsellers" className="container-lux py-12 md:py-16 border-t border-line">
        <SectionHeading eyebrow="Popular Products" lead="Best" em="Sellers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6">
          {POPULAR_BESTSELLERS.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      {/* 4. Trust */}
      <section className="border-y border-line">
        <div className="container-lux grid grid-cols-2 lg:grid-cols-4">
          {TRUST_BADGES.map((b, i) => {
            const I = ICONS[b.icon];
            return (
              <div key={b.title} className={cn("py-8 px-3 text-center border-line", i % 2 === 0 && "border-r", i < 2 && "border-b lg:border-b-0", i === 1 && "lg:border-r", i === 2 && "lg:border-r")}>
                <I className="mx-auto size-7 text-gold mb-3" strokeWidth={1} />
                <p className="font-display text-lg leading-tight">{b.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Collection */}
      <section id="shop" className="section-y container-lux border-t border-line">
        <SectionHeading eyebrow="Available Pieces" lead="Shop The" em="Collection" />
        <ProductCollection />
      </section>

      {/* 7. Reels */}
      <section id="shopByReel" className="section-y border-t border-line">
        <div className="container-lux">
          <SectionHeading eyebrow="Watch & Shop" lead="Shop The" em="Reel" />
          <Reels />
        </div>
      </section>

      {/* 8. Testimonials */}
      <section id="testimonials" className="section-y border-t border-line bg-elevated">
        <div className="container-lux">
          <SectionHeading eyebrow="Customer Love" lead="What Our Clients" em="Say" className="mb-6 lg:mb-6" />
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="font-display text-2xl">5 / 5</span>
            <span className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</span>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
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
      <section className="section-y container-lux">
        <SectionHeading eyebrow="Good to Know" lead="Frequently Asked" em="Questions" />
        <Faq />
      </section>

      {/* 10. Contact */}
      <section id="contact" className="section-y border-t border-line">
        <div className="container-lux grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-3">Get in Touch</p>
            <h2 className="h2-lux">Need Help Choosing? We're Here for <em>You</em></h2>
            <p className="text-muted-foreground mt-5 max-w-md">Not sure which hoop size suits you, or looking for a gift? Message us and we'll help you find a piece that feels unmistakably yours.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {contactLink && <Button asChild><a href={contactLink} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp Us</a></Button>}
              <Button asChild variant="outline"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramIcon /> @{INSTAGRAM_HANDLE}</a></Button>
            </div>
          </Reveal>
          <Reveal delay={0.08}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
