import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { checkoutUrl, remainingForFreeShipping, subtotal } from "@/lib/selection";
import { FREE_SHIPPING_THRESHOLD } from "@/config/site";
import { formatINR, getProduct } from "@/data/products";
import { WhatsAppIcon } from "./icons";
import { ProductPrice } from "./ProductPrice";
import { QuantityControl } from "./QuantityControl";

export const QtyStepper = QuantityControl;

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove } = useCart();
  const total = subtotal(lines);
  const left = remainingForFreeShipping(total);
  const pct = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const orderUrl = checkoutUrl(lines);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[calc(100vw-1rem)] sm:max-w-[460px] bg-elevated border-line p-0 flex flex-col gap-0">
        <div className="px-6 pt-6 pb-4 border-b border-line">
          <SheetTitle className="font-display text-3xl font-medium">Your <em className="not-italic text-gold-gradient italic">Cart</em></SheetTitle>
          <SheetDescription className="sr-only">Items in your cart</SheetDescription>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">
              {left > 0 ? <>Add <span className="text-gold">{formatINR(left)}</span> more for free shipping</> : <span className="text-gold">You've unlocked free shipping ✦</span>}
            </p>
            <div className="h-[3px] bg-soft"><div className="h-full bg-gold-gradient transition-all duration-500" style={{ width: `${pct}%` }} /></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2 mb-6">Pick a piece that feels like you.</p>
              <Button variant="outline" asChild onClick={() => setOpen(false)}><Link to="/" hash="shop">Browse pieces</Link></Button>
            </div>
          ) : (
            <ul className="space-y-3 py-4">
              {lines.map((l) => (
                <li key={l.slug} className="relative grid grid-cols-[96px_minmax(0,1fr)] gap-3 rounded-lg border border-line bg-background p-3 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-4">
                  <Link to="/product/$slug" params={{ slug: l.slug }} onClick={() => setOpen(false)} className="self-center overflow-hidden rounded-md bg-soft">
                    <img src={l.image} alt={l.name} width={224} height={280} className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105" />
                  </Link>
                  <div className="flex min-w-0 flex-col justify-center">
                    <div className="pr-6">
                      <Link to="/product/$slug" params={{ slug: l.slug }} onClick={() => setOpen(false)} className="block font-sans text-sm font-semibold leading-5 hover:text-primary">{l.name}</Link>
                      <Button variant="ghost" size="icon" onClick={() => remove(l.slug)} aria-label={`Remove ${l.name}`} className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-gold"><X className="size-3.5!" /></Button>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground sm:text-xs">{getProduct(l.slug)?.description}</p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <ProductPrice className="justify-start" size="compact" price={l.price} originalPrice={l.originalPrice} />
                      <QtyStepper value={l.qty} onChange={(n) => setQty(l.slug, n)} label={l.name} className="cart-item-quantity ml-auto" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 py-5 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="eyebrow">Subtotal</span>
              <span className="font-display text-2xl text-gold">{formatINR(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Availability confirmed via WhatsApp. No payment is collected on this site.</p>
            {orderUrl ? (
              <Button asChild className="w-full">
                <a href={orderUrl} target="_blank" rel="noreferrer"><WhatsAppIcon /> Checkout on WhatsApp</a>
              </Button>
            ) : (
              <Button type="button" className="w-full" disabled>WhatsApp orders unavailable</Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
