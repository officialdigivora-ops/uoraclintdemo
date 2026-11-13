import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Logo } from "./Logo";
import { WhatsAppIcon, InstagramIcon } from "./icons";
import { BRAND } from "@/data/content";
import { INSTAGRAM_URL, whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/button";

const linkCls = "text-sm text-muted-foreground hover:text-gold transition-colors py-1.5 inline-block";

export function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!z.string().email().safeParse(email).success) { toast.error("Please enter a valid email"); return; }
    toast.success("Welcome to the Aura ✦", { description: "You'll hear about new drops first." });
    setEmail("");
  };
  return (
    <footer className="border-t border-line bg-elevated">
      <div className="container-lux py-14 lg:py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div className="flex flex-col items-start gap-5">
          <Logo size="footer" />
          <p className="text-sm text-muted-foreground max-w-xs">{BRAND.blurb}</p>
          <div className="flex gap-3">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-colors"><InstagramIcon className="size-5" strokeWidth={1.25} /></a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-colors"><WhatsAppIcon /></a>
          </div>
        </div>
        <div className="border-t border-line pt-6 md:border-0 md:pt-0">
          <p className="eyebrow mb-4">Shop</p>
          <ul>
            <li><Link to="/" hash="shop" className={linkCls}>All Pieces</Link></li>
            <li><Link to="/" hash="bestsellers" className={linkCls}>Best Sellers</Link></li>
            <li><Link to="/" hash="shopByReel" className={linkCls}>Reels</Link></li>
          </ul>
        </div>
        <div className="border-t border-line pt-6 md:border-0 md:pt-0">
          <p className="eyebrow mb-4">Support</p>
          <ul>
            <li><Link to="/" hash="contact" className={linkCls}>Contact Us</Link></li>
            <li><Link to="/care-guide" className={linkCls}>Care Guide</Link></li>
            <li><Link to="/shipping-policy" className={linkCls}>Shipping Policy</Link></li>
          </ul>
        </div>
        <div className="border-t border-line pt-6 md:border-0 md:pt-0">
          <p className="eyebrow mb-4">Stay in the Aura</p>
          <p className="text-sm text-muted-foreground mb-4">New drops, styling notes and members-only offers.</p>
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email"
              className="h-12 flex-1 min-w-0 bg-soft border border-line px-4 text-sm outline-none focus:border-gold placeholder:text-muted-foreground" />
            <Button type="submit">Subscribe</Button>
          </form>
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
