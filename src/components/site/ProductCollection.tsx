import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/products";
import type { CategorySlug } from "@/data/categories";
import { ProductCard } from "./ProductCard";

export function ProductCollection({ lockCategory }: { lockCategory?: CategorySlug }) {
  const [limit, setLimit] = useState(12);
  const results = useMemo(() => (lockCategory ? PRODUCTS.filter((p) => p.category === lockCategory) : PRODUCTS), [lockCategory]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6">
        {results.slice(0, limit).map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
      {results.length === 0 && <p className="text-center text-muted-foreground py-10">New pieces are arriving soon.</p>}
      {results.length > limit && (
        <div className="mt-12 text-center"><Button variant="outline" onClick={() => setLimit((l) => l + 12)}>Load more</Button></div>
      )}
    </div>
  );
}
