import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, X, Gem, Shield, Droplets, Sparkles, Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WhatsAppIcon, InstagramIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { EMAIL, INSTAGRAM_URL, whatsappLink } from "@/config/site";
import { SHIPPING } from "@/data/legal";
import { Fragment } from "react";

export const Route = createFileRoute("/care-guide")({
  head: () => ({
    meta: [
      { title: "The UORA Care Guide – Jewellery Care & Quality" },
      { name: "description", content: "How to care for your gold plated UORA jewellery: quality promises, do's and don'ts, daily care ritual and shipping info." },
      { property: "og:title", content: "The UORA Care Guide" },
      { property: "og:description", content: "Keep your gold plated jewellery shining for longer." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/care-guide" }],
  }),
  component: CareGuide,
});

const PROMISES = [
  { i: Gem, t: "Gold Plating", d: "A rich gold-plated finish applied in layers for lasting colour." },
  { i: Shield, t: "Surgical Steel", d: "A durable, skin-friendly steel base that holds its shape." },
  { i: Droplets, t: "Waterproof", d: "Made to handle handwashing, sweat and everyday splashes." },
  { i: Sparkles, t: "Tarnish Resistant", d: "A protective layer helps keep the shine for longer." },
];
const DOS = ["Wipe with a soft cloth after wearing", "Store each piece separately in its pouch", "Put jewellery on after perfume and lotion", "Dry thoroughly if it gets wet"];
const DONTS = ["Spray perfume directly on jewellery", "Use harsh cleaners or abrasive cloths", "Wear while swimming in chlorine or the sea for long", "Store in humid bathrooms"];
const STEPS = [["01", "Wear", "Put your piece on last, after skincare and perfume."], ["02", "Rinse", "Rinse gently with water and pat dry with a soft cloth."], ["03", "Store", "Keep it in the UORA pouch, away from air and moisture."]];

function CareGuide() {
  return (
    <>
      <div className="container-lux pt-16 lg:pt-24">
        <Breadcrumbs current="Care Guide" />
        <p className="eyebrow mb-3">Jewellery Care & Quality</p>
        <h1 className="h1-lux">The UORA <em>Care Guide</em></h1>
      </div>
      <section className="section-y container-lux">
        <SectionHeading lead="Quality" em="Promises" align="left" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {PROMISES.map(({ i: I, t, d }) => (
            <div key={t} className="bg-background p-7"><I className="size-7 text-gold mb-4" strokeWidth={1} /><h3 className="font-display text-2xl">{t}</h3><p className="text-sm text-muted-foreground mt-2">{d}</p></div>
          ))}
        </div>
      </section>
      <section className="section-y container-lux border-t border-line">
        <SectionHeading lead="Do's &" em="Don'ts" align="left" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gold p-7"><p className="eyebrow mb-4">Do</p><ul className="space-y-3">{DOS.map((d) => <li key={d} className="flex gap-3"><Check className="size-5 text-gold shrink-0" />{d}</li>)}</ul></div>
          <div className="border border-line p-7"><p className="eyebrow mb-4 text-muted-foreground">Don't</p><ul className="space-y-3 text-muted-foreground">{DONTS.map((d) => <li key={d} className="flex gap-3"><X className="size-5 shrink-0" />{d}</li>)}</ul></div>
        </div>
      </section>
      <section className="section-y container-lux border-t border-line">
        <SectionHeading lead="Your Daily Care" em="Ritual" align="left" />
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {STEPS.map(([n, t, d], i) => (
            <Fragment key={n}>
              <div className="flex-1 border border-line p-7"><span className="font-display text-5xl text-gold-gradient italic">{n}</span><h3 className="font-display text-2xl mt-2">{t}</h3><p className="text-sm text-muted-foreground mt-2">{d}</p></div>
              {i < 2 && <ArrowRight className="hidden lg:block size-6 text-gold shrink-0" strokeWidth={1} />}
            </Fragment>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-8 max-w-2xl">Note: Gold plating naturally softens over time with wear. Following this care routine helps your pieces stay beautiful for longer.</p>
      </section>
      <section id="shipping" className="section-y container-lux border-t border-line">
        <SectionHeading eyebrow="Additional Information" lead="Shipping &" em="Returns" align="left" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...SHIPPING, { id: "exchanges", title: "Exchanges", body: ["Exchanges are available for damaged, defective or wrong items reported within 48 hours with an unboxing video."] }].map((s) => (
            <div key={s.id} className="border-t border-gold pt-5"><h3 className="font-display text-xl">{s.title}</h3><p className="text-sm text-muted-foreground mt-2">{s.body.join(" ")}</p></div>
          ))}
        </div>
      </section>
      <section className="section-y border-t border-line bg-elevated text-center">
        <div className="container-lux">
          <h2 className="h2-lux">Still Have <em>Questions?</em></h2>
          <p className="text-muted-foreground mt-4 mb-8">We're happy to help — reach us on any channel.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild><a href={whatsappLink()} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a></Button>
            <Button asChild variant="outline"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramIcon /> Instagram</a></Button>
            <Button asChild variant="outline"><a href={`mailto:${EMAIL}`}><Mail /> Email</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
