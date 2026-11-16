import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct, getProductOriginalPrice, getProductPrice, getCartLineKey, type Product } from "@/data/products";
import type { SelectionLine } from "./selection";

interface Ctx {
  lines: SelectionLine[];
  count: number;
  revision: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (p: Product, qty?: number, variantId?: string) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
}
const CartCtx = createContext<Ctx | null>(null);
const KEY = "uora-selection";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<SelectionLine[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SelectionLine[];
        setLines(saved.filter((line) => getProduct(line.slug)).map((line) => {
          const product = getProduct(line.slug);
          const variant = product?.variants?.find((v) => v.id === line.variantId) ?? product?.variants?.[0];
          return product ? {
            ...line,
            name: product.name,
            price: getProductPrice(product),
            originalPrice: getProductOriginalPrice(product),
            image: variant?.images[0] ?? product.images[0] ?? line.image,
            variantId: variant?.id, variantLabel: variant?.label,
          } : line;
        }));
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, loaded]);

  const add = (p: Product, qty = 1, variantId?: string) => {
    setRevision((value) => value + 1);
    const price = getProductPrice(p);
    const originalPrice = getProductOriginalPrice(p);
    const variant = p.variants?.find((v) => v.id === variantId) ?? p.variants?.[0];
    const key = getCartLineKey(p.slug, variant?.id);
    setLines((ls) => {
      const ex = ls.find((l) => getCartLineKey(l.slug, l.variantId) === key);
      if (ex) return ls.map((l) => (getCartLineKey(l.slug, l.variantId) === key ? { ...l, name: p.name, price, originalPrice, qty: l.qty + qty } : l));
      return [...ls, { slug: p.slug, name: p.name, price, originalPrice, qty, image: variant?.images[0] ?? p.images[0] ?? "", variantId: variant?.id, variantLabel: variant?.label }];
    });
    toast.success(`${p.name} added to your cart`, { action: { label: "View cart", onClick: () => setOpen(true) } });
  };
  const setQty = (slug: string, qty: number) => {
    setRevision((value) => value + 1);
    setLines((ls) => (qty <= 0 ? ls.filter((l) => getCartLineKey(l.slug, l.variantId) !== slug) : ls.map((l) => (getCartLineKey(l.slug, l.variantId) === slug ? { ...l, qty } : l))));
  };
  const remove = (slug: string) => setLines((ls) => ls.filter((l) => getCartLineKey(l.slug, l.variantId) !== slug));
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return <CartCtx.Provider value={{ lines, count, revision, open, setOpen, add, setQty, remove }}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
