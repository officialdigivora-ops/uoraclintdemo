import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag } from "lucide-react";
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header className={cn("sticky top-0 z-40 overflow-hidden border-b border-line transition-all duration-300",
        scrolled ? "bg-background" : "bg-background/80 backdrop-blur-md")}>
        <div className={cn("container-lux grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300",
          scrolled ? "h-[56px] lg:h-[64px]" : "h-[60px] lg:h-[72px]")}>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden -ml-2 flex h-11 w-11 items-center justify-center text-foreground" aria-label="Open menu" onClick={() => setMenu(true)}>
              <Menu className="size-6" strokeWidth={1.25} />
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
              <Search className="size-5" strokeWidth={1.25} />
            </Button>
            <Button variant="ghost" size="icon" className="relative flex h-11 w-11 items-center justify-center hover:text-gold -mr-2" aria-label={`Your selection, ${count} items`} onClick={() => setOpen(true)}>
              <ShoppingBag className="size-5" strokeWidth={1.25} />
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-gradient px-1 text-[10px] font-medium text-primary-foreground">{count}</span>
              )}
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
              {NAV.map((n) => (
                <Link key={n.hash} to="/" hash={n.hash} onClick={() => setMenu(false)} className="font-display text-3xl py-2.5 hover:text-gold">
                  {n.label}
                </Link>
              ))}
              <Link to="/care-guide" onClick={() => setMenu(false)} className="font-display text-3xl py-2.5 hover:text-gold">Care Guide</Link>
            </nav>
            <p className="eyebrow mt-8 mb-3">Shop by Category</p>
            <ul className="border-t border-line">
              {CATEGORIES.map((c) => (
                <li key={c.slug} className="border-b border-line">
                  <Link to="/product-category/$slug" params={{ slug: c.slug }} onClick={() => setMenu(false)} className="flex h-12 items-center justify-between text-sm uppercase tracking-[0.14em] hover:text-gold">
                    {c.label} <span className="text-gold">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3 border-t border-line px-6 py-5">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold"><WhatsAppIcon /></a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold"><InstagramIcon className="size-5" strokeWidth={1.25} /></a>
          </div>
        </SheetContent>
      </Sheet>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
