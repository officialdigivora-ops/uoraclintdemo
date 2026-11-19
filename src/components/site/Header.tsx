import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Logo, Monogram } from "./Logo";
import { NAV } from "./nav";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/lib/cart";
import { SearchOverlay } from "./SearchOverlay";
import { WhatsAppIcon, InstagramIcon } from "./icons";
import { INSTAGRAM_URL, whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedCartIcon } from "./AnimatedCartIcon";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const { count, revision, setOpen } = useCart();
  const contactLink = whatsappLink();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header className={cn("sticky top-0 z-40 overflow-hidden rounded-t-[24px] border-b border-line transition-all duration-300 bg-background")}>
        <div className={cn("container-lux grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300",
          scrolled ? "h-[64px] lg:h-[72px]" : "h-[76px] lg:h-[84px]")}>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden -ml-2 flex h-11 w-11 items-center justify-center text-foreground" aria-label="Open menu" onClick={() => setMenu(true)}>
              <Menu className="size-7!" strokeWidth={1.6} />
            </Button>
            <nav className="hidden lg:flex gap-7" aria-label="Main">
              {NAV.map((n) => (
                <Link key={n.hash} to="/" hash={n.hash} className="text-[12px] uppercase tracking-[0.18em] text-foreground/90 hover:text-gold transition-colors">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <Logo />
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon" className="flex h-11 w-11 items-center justify-center hover:text-gold" aria-label="Search" onClick={() => setSearch(true)}>
              <Search className="size-7!" strokeWidth={1.6} />
            </Button>
            <Button variant="ghost" size="icon" className="relative flex h-11 w-11 items-center justify-center hover:text-gold -mr-2" aria-label={`Shopping cart, ${count} items`} onClick={() => setOpen(true)}>
              <AnimatedCartIcon count={count} revision={revision} />
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="w-full sm:max-w-sm bg-elevated border-line flex flex-col p-0">
          <div className="flex items-center gap-3 border-b border-line px-6 h-[60px]">
            <Monogram className="text-3xl" />
            <SheetTitle className="sr-only">Menu</SheetTitle>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV.map((n, i) => (
                <Link key={n.hash} to="/" hash={n.hash} onClick={() => setMenu(false)} className="group flex items-baseline gap-3 border-b border-line/60 py-3">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-gold">0{i + 1}</span>
                  <span className="font-display text-3xl transition-colors group-hover:text-gold">{n.label}</span>
                  <span className="ml-auto text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                </Link>
              ))}
              <Link to="/care-guide" onClick={() => setMenu(false)} className="group flex items-baseline gap-3 border-b border-line/60 py-3">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-gold">0{NAV.length + 1}</span>
                <span className="font-display text-3xl transition-colors group-hover:text-gold">Care Guide</span>
                <span className="ml-auto text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </Link>
            </nav>
            <p className="eyebrow mt-8 mb-3">Shop by Category</p>
            <ul className="space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to="/product-category/$slug" params={{ slug: c.slug }} onClick={() => setMenu(false)} className="group flex items-center gap-3 rounded-xl border border-line bg-background p-2.5 transition-colors hover:border-gold/60">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-soft">
                      <img src={c.displayImage} alt="" width={112} height={112} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold uppercase tracking-[0.12em]">{c.label}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">{c.intro}</span>
                    </span>
                    <span className="pr-1 text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-primary px-5 py-4 text-primary-foreground">
              <p className="font-display text-xl italic">Where rarity meets eternity</p>
              <p className="mt-1 text-xs opacity-80">2,000+ pieces find new homes every day.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-line px-6 py-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Follow us</p>
            <span className="h-px flex-1 bg-line" />
            {contactLink && <a href={contactLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-background"><WhatsAppIcon /></a>}
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-background"><InstagramIcon className="size-5" strokeWidth={1.25} /></a>
          </div>
        </SheetContent>
      </Sheet>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
