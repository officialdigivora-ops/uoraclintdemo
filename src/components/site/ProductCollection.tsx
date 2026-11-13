import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PRODUCTS, type Product } from "@/data/products";
import { CATEGORIES, getCategory, type CategorySlug } from "@/data/categories";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type Price = "all" | "lt500" | "500-699" | "700+";
type Sort = "featured" | "asc" | "desc" | "name";
interface Filters { category: CategorySlug | "all"; price: Price; sort: Sort }
const PRICES: { v: Price; l: string }[] = [{ v: "all", l: "All" }, { v: "lt500", l: "Under ₹500" }, { v: "500-699", l: "₹500–₹699" }, { v: "700+", l: "₹700+" }];
const SORTS: { v: Sort; l: string }[] = [{ v: "featured", l: "Featured" }, { v: "asc", l: "Price: Low → High" }, { v: "desc", l: "Price: High → Low" }, { v: "name", l: "Name: A → Z" }];
const DEFAULT: Filters = { category: "all", price: "all", sort: "featured" };

export function applyFilters(list: Product[], f: Filters) {
  let r = list.filter((p) => (f.category === "all" || p.category === f.category) &&
    (f.price === "all" || (f.price === "lt500" ? p.price < 500 : f.price === "500-699" ? p.price >= 500 && p.price <= 699 : p.price >= 700)));
  if (f.sort === "asc") r = [...r].sort((a, b) => a.price - b.price);
  if (f.sort === "desc") r = [...r].sort((a, b) => b.price - a.price);
  if (f.sort === "name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
  return r;
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("h-11 rounded-full border px-4 text-xs uppercase tracking-[0.14em] transition-colors",
      active ? "border-gold bg-gold text-primary-foreground" : "border-line hover:border-gold")}>{children}</button>
  );
}

export function ProductCollection({ lockCategory }: { lockCategory?: CategorySlug }) {
  const base = lockCategory ? { ...DEFAULT, category: lockCategory } : DEFAULT;
  const [applied, setApplied] = useState<Filters>(base);
  const [draft, setDraft] = useState<Filters>(base);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(12);
  const mobile = useIsMobile();
  const results = useMemo(() => applyFilters(PRODUCTS, applied), [applied]);

  const chips = [
    !lockCategory && applied.category !== "all" && { k: "category" as const, l: getCategory(applied.category)?.label },
    applied.price !== "all" && { k: "price" as const, l: PRICES.find((p) => p.v === applied.price)?.l },
    applied.sort !== "featured" && { k: "sort" as const, l: SORTS.find((s) => s.v === applied.sort)?.l },
  ].filter(Boolean) as { k: keyof Filters; l: string }[];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border-y border-line py-3 mb-8">
        <Button variant="outline" size="sm" onClick={() => { setDraft(applied); setOpen(true); }}><SlidersHorizontal /> Filter & Sort</Button>
        {chips.map((c) => (
          <button key={c.k} onClick={() => setApplied({ ...applied, [c.k]: base[c.k] })}
            className="h-9 inline-flex items-center gap-1.5 rounded-full border border-gold px-3 text-xs text-gold hover:bg-soft">
            {c.l} <X className="size-3" /><span className="sr-only">Remove filter</span>
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{results.length} pieces</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6">
        {results.slice(0, limit).map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
      {results.length === 0 && <p className="text-center text-muted-foreground py-10">No pieces match these filters.</p>}
      {results.length > limit && (
        <div className="mt-12 text-center"><Button variant="outline" onClick={() => setLimit((l) => l + 12)}>Load more</Button></div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={mobile ? "bottom" : "right"} className={cn("bg-elevated border-line p-0 flex flex-col gap-0", mobile ? "max-h-[88vh]" : "w-full sm:max-w-[420px]")}>
          <div className="px-6 pt-6 pb-4 border-b border-line">
            <SheetTitle className="font-display text-3xl font-medium">Filter & <em className="italic text-gold-gradient">Sort</em></SheetTitle>
            <SheetDescription className="sr-only">Refine the collection</SheetDescription>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {!lockCategory && (
              <fieldset><legend className="eyebrow mb-3">Category</legend>
                <div className="flex flex-wrap gap-2">
                  <Chip active={draft.category === "all"} onClick={() => setDraft({ ...draft, category: "all" })}>All</Chip>
                  {CATEGORIES.map((c) => <Chip key={c.slug} active={draft.category === c.slug} onClick={() => setDraft({ ...draft, category: c.slug })}>{c.label}</Chip>)}
                </div>
              </fieldset>
            )}
            <fieldset><legend className="eyebrow mb-3">Price</legend>
              <div className="flex flex-wrap gap-2">{PRICES.map((p) => <Chip key={p.v} active={draft.price === p.v} onClick={() => setDraft({ ...draft, price: p.v })}>{p.l}</Chip>)}</div>
            </fieldset>
            <fieldset><legend className="eyebrow mb-3">Sort by</legend>
              <div className="flex flex-wrap gap-2">{SORTS.map((s) => <Chip key={s.v} active={draft.sort === s.v} onClick={() => setDraft({ ...draft, sort: s.v })}>{s.l}</Chip>)}</div>
            </fieldset>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-line px-6 py-5">
            <Button variant="outline" onClick={() => { setApplied(base); setDraft(base); setOpen(false); }}>Remove all</Button>
            <Button onClick={() => { setApplied(draft); setLimit(12); setOpen(false); }}>Apply</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
