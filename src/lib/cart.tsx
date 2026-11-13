import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct, getProductOriginalPrice, getProductPrice, type Product } from "@/data/products";
import type { SelectionLine } from "./selection";

interface Ctx {
  lines: SelectionLine[];
  count: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (p: Product, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
}
const CartCtx = createContext<Ctx | null>(null);
const KEY = "uora-selection";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<SelectionLine[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SelectionLine[];
        setLines(saved.map((line) => {
          const product = getProduct(line.slug);
          return product ? {
            ...line,
            name: product.name,
            price: getProductPrice(product),
            originalPrice: getProductOriginalPrice(product),
            image: product.images[0] ?? line.image,
          } : line;
        }));
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, loaded]);

  const add = (p: Product, qty = 1) => {
    const price = getProductPrice(p);
    const originalPrice = getProductOriginalPrice(p);
    setLines((ls) => {
      const ex = ls.find((l) => l.slug === p.slug);
      if (ex) return ls.map((l) => (l.slug === p.slug ? { ...l, name: p.name, price, originalPrice, qty: l.qty + qty } : l));
      return [...ls, { slug: p.slug, name: p.name, price, originalPrice, qty, image: p.images[0] ?? "" }];
    });
    toast.success(`${p.name} added to your cart`, { action: { label: "View cart", onClick: () => setOpen(true) } });
  };
  const setQty = (slug: string, qty: number) =>
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.slug !== slug) : ls.map((l) => (l.slug === slug ? { ...l, qty } : l))));
  const remove = (slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug));
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return <CartCtx.Provider value={{ lines, count, open, setOpen, add, setQty, remove }}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
