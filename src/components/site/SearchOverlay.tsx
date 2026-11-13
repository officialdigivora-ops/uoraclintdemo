import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { PRODUCTS, formatINR } from "@/data/products";
import { getCategory } from "@/data/categories";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!open) return;
    setTimeout(() => ref.current?.focus(), 50);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, onClose]);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS.slice(0, 6);
    return PRODUCTS.filter((p) => `${p.name} ${getCategory(p.category)?.label}`.toLowerCase().includes(s));
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 bg-background/97 backdrop-blur-md overflow-y-auto" role="dialog" aria-modal aria-label="Search"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <div className="container-lux py-6">
            <div className="flex items-center gap-3 border-b border-gold pb-3">
              <Search className="size-5 text-gold" strokeWidth={1.25} />
              <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search necklaces, hoops, rings…"
                className="flex-1 bg-transparent font-display text-2xl lg:text-4xl outline-none placeholder:text-muted-foreground min-w-0" aria-label="Search products" />
              <button onClick={onClose} aria-label="Close search" className="flex h-11 w-11 items-center justify-center hover:text-gold"><X className="size-6" strokeWidth={1.25} /></button>
            </div>
            <p className="eyebrow mt-6 mb-4">{q ? `${results.length} results` : "Popular right now"}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
              {results.map((p) => (
                <li key={p.slug} className="bg-background">
                  <Link to="/product/$slug" params={{ slug: p.slug }} onClick={onClose} className="flex items-center gap-4 p-3 hover:bg-soft">
                    <img src={p.images[0]} alt={p.name} className="h-16 w-14 object-cover" loading="lazy" />
                    <div className="min-w-0">
                      <p className="font-display text-lg truncate">{p.name}</p>
                      <p className="text-sm text-gold">{formatINR(p.price)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length === 0 && <p className="text-muted-foreground mt-4">Nothing matches “{q}”. Try “hoops” or “kada”.</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
