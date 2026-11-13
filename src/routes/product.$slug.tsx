import { useState, useRef } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProduct, PRODUCTS, formatINR } from "@/data/products";
import { getCategory } from "@/data/categories";
import { MATERIALS } from "@/data/content";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ProductCard } from "@/components/site/ProductCard";
import { QtyStepper } from "@/components/site/CartDrawer";
import { WhatsAppIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCart } from "@/lib/cart";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, name: p.name, price: p.price, description: p.description };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} – ${formatINR(loaderData.price)} | UORA` : "Product | UORA" },
      { name: "description", content: loaderData?.description ?? "UORA jewellery" },
      { property: "og:title", content: loaderData ? `${loaderData.name} | UORA` : "UORA" },
      { property: "og:description", content: loaderData?.description ?? "UORA jewellery" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: `/product/${params.slug}` }],
    scripts: loaderData ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: loaderData.name, description: loaderData.description, brand: { "@type": "Brand", name: "UORA" }, offers: { "@type": "Offer", priceCurrency: "INR", price: loaderData.price, availability: "https://schema.org/InStock" } }) }] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-lux section-y text-center"><h1 className="h2-lux">Piece not <em>found</em></h1><Button asChild className="mt-8"><Link to="/">Back home</Link></Button></div>
  ),
  errorComponent: () => <div className="container-lux section-y text-center">Something went wrong.</div>,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const cat = getCategory(p.category)!;
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const startX = useRef(0);
  const { add } = useCart();
  const related = PRODUCTS.filter((x) => x.slug !== p.slug && x.category === p.category).concat(PRODUCTS.filter((x) => x.category !== p.category)).slice(0, 4);
  const buy = whatsappLink(`Hi UORA! I'd like to buy:\n\n${p.name} × ${qty} — ${formatINR(p.price * qty)}\n\nPlease confirm availability.`);

  return (
    <div className="container-lux section-y">
      <Breadcrumbs current={p.name} />
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="flex gap-4">
          <div className="hidden lg:flex flex-col gap-3 w-20 shrink-0">
            {p.images.map((s, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className={cn("aspect-[4/5] border overflow-hidden", i === img ? "border-gold" : "border-line opacity-60")}>
                <img src={s} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1">
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-soft cursor-zoom-in"
              onClick={(e) => { if (zoom) return setZoom(null); const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
              onTouchStart={(e) => (startX.current = e.touches[0]!.clientX)}
              onTouchEnd={(e) => { const d = e.changedTouches[0]!.clientX - startX.current; if (Math.abs(d) > 50) { setZoom(null); setImg((i) => (i + (d < 0 ? 1 : -1) + p.images.length) % p.images.length); } }}>
              <img src={p.images[img] ?? p.images[0]} alt={p.name} width={768} height={960} className="h-full w-full object-cover transition-transform duration-300"
                style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
            </div>
            <div className="flex lg:hidden justify-center gap-2 mt-4">
              {p.images.map((_, i) => <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className="h-6 w-6 flex items-center justify-center"><span className={cn("h-1.5 rounded-full transition-all", i === img ? "w-5 bg-gold" : "w-1.5 bg-line")} /></button>)}
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3">{cat.label}</p>
          <h1 className="font-display text-4xl lg:text-5xl">{p.name}</h1>
          <p className="text-gold text-2xl font-display mt-3">{formatINR(p.price)}</p>
          <p className="text-muted-foreground mt-5">{p.description}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {MATERIALS.map((m) => <span key={m} className="rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.14em]">{m}</span>)}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} label="quantity" />
            <Button className="flex-1" onClick={() => add(p, qty)}>Add to Selection</Button>
          </div>
          <Button asChild variant="outline" className="w-full mt-3"><a href={buy} target="_blank" rel="noreferrer"><WhatsAppIcon /> Buy on WhatsApp</a></Button>
          <Accordion type="single" collapsible className="mt-10 border-t border-line">
            {([
              ["Details", `${p.description} 18K gold plated over a surgical-steel base. Lightweight and comfortable for all-day wear.`],
              ["Care", "Wipe with a soft dry cloth after wearing, avoid perfume and harsh chemicals, and store in the UORA pouch."],
              ["Shipping", "Dispatched in 1–3 business days. Free shipping across India on orders of ₹1299+."],
            ] as const).map(([t, b]) => (
              <AccordionItem key={t} value={t} className="border-line">
                <AccordionTrigger className="font-display text-xl hover:no-underline hover:text-gold">{t}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{b} {t === "Care" && <Link to="/care-guide" className="text-gold">Read the care guide →</Link>}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <section className="mt-20 lg:mt-28">
        <h2 className="h2-lux text-center mb-10">You May Also <em>Like</em></h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-6">
          {related.map((r) => <ProductCard key={r.slug} product={r} />)}
        </div>
      </section>
    </div>
  );
}
