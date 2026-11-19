import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, SocialWhatsAppIcon } from "./icons";
import { BRAND } from "@/data/content";
import { SOCIAL_PROFILES } from "@/config/site";

const SOCIALS = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, className: "social-badge-instagram" },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, className: "social-badge-facebook" },
  { key: "email", label: "Email", Icon: Mail, className: "social-badge-email" },
  { key: "whatsapp", label: "WhatsApp", Icon: SocialWhatsAppIcon, className: "social-badge-whatsapp" },
] as const;

const SUPPORT = [
  { label: "Contact Us", href: "#connect" },
  { label: "Care Guide", to: "/care-guide" },
  { label: "Shipping Policy", to: "/shipping-policy" },
] as const;

const supportRow = "group flex items-center justify-between border-b border-line py-3.5 font-display text-xl text-foreground transition-colors hover:text-gold";

export function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!z.string().email().safeParse(email).success) { toast.error("Please enter a valid email"); return; }
    toast.error("Newsletter sign-up isn't connected yet.");
  };
  return (
    <footer className="border-t border-line bg-elevated">
      <div id="connect" className="container-lux pt-12 pb-8 lg:pt-16 flex flex-col items-center text-center gap-5 scroll-mt-24">
        <Logo size="footer" />
        <p className="text-sm text-muted-foreground max-w-md">{BRAND.blurb}</p>
        <ul className="flex items-center gap-3.5" aria-label="UORA on social media">
          {SOCIALS.map(({ key, label, Icon, className }) => {
            const url = SOCIAL_PROFILES[key];
            const badge = `social-badge ${className}`;
            return (
              <li key={key}>
                {url ? (
                  <a href={key === "email" ? `mailto:${url}` : url} target={key === "email" ? undefined : "_blank"} rel="noreferrer" aria-label={label} className={badge}><Icon className="size-5" /></a>
                ) : (
                  <span role="img" aria-label={label} title={label} className={badge}><Icon className="size-5" /></span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="container-lux pb-12 lg:pb-16 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
        <nav aria-label="Support" className="rounded-[20px] border border-line bg-background px-6 py-6">
          <p className="eyebrow mb-2">Support</p>
          <ul>
            {SUPPORT.map((item) => (
              <li key={item.label} className="[&:last-child>*]:border-b-0">
                {"to" in item ? (
                  <Link to={item.to} className={supportRow}>{item.label}<ArrowUpRight className="size-4 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
                ) : (
                  <a href={item.href} className={supportRow}>{item.label}<ArrowUpRight className="size-4 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="aura-card relative overflow-hidden rounded-[20px] bg-primary text-primary-foreground px-6 py-8 sm:px-9">
          <Sparkles aria-hidden className="aura-card-sparkle absolute right-6 top-6 size-7" />
          <p className="text-[11px] uppercase tracking-[0.28em] opacity-80">Members' Circle</p>
          <h3 className="font-display text-4xl font-medium mt-2 leading-tight">Stay in the <em className="italic">Aura</em></h3>
          <p className="text-sm opacity-85 mt-2 max-w-sm">New drops, styling notes and members-only offers.</p>
          <form onSubmit={subscribe} className="mt-6 flex items-center gap-2 rounded-full border border-primary-foreground/35 bg-primary-foreground/10 p-1.5 focus-within:border-primary-foreground">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email"
              className="h-11 flex-1 min-w-0 bg-transparent px-4 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/60" />
            <button type="submit" className="h-11 shrink-0 rounded-full bg-background px-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-transform hover:scale-[1.03]">Subscribe</button>
          </form>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] opacity-80">
            <li>✦ New drops</li><li>✦ Styling notes</li><li>✦ Members-only offers</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-lux py-6 flex flex-col lg:flex-row gap-4 items-center justify-between text-xs text-muted-foreground text-center">
          <p>© 2026 UORA. All rights reserved. <span className="text-gold italic font-display text-sm ml-2">Own the Rare</span></p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Legal">
            <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-gold">Terms & Conditions</Link>
            <Link to="/shipping-policy" className="hover:text-gold">Shipping Policy</Link>
            <Link to="/refund-returns" className="hover:text-gold">Return Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
