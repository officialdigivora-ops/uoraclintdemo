import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { formatINR } from "@/data/products";
import { getCategory } from "@/data/categories";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group min-w-0 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-soft border border-line group-hover:glow-gold transition-shadow">
        <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img src={product.images[0]} alt={product.name} loading="lazy" width={768} height={960}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 lg:group-hover:opacity-0" />
          <img src={product.images[1]} alt="" aria-hidden loading="lazy" width={768} height={960}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 lg:group-hover:opacity-100 lg:group-hover:scale-105" />
        </Link>
        {product.bestSeller && (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-3 py-1.5 text-[10px] md:text-xs font-medium text-primary-foreground">Best Seller</span>
        )}
      </div>
      <div className="pt-3 pb-3 text-center min-w-0 flex-1">
        <Link to="/product/$slug" params={{ slug: product.slug }} title={product.name} className="block font-sans font-medium text-sm md:text-base leading-6 truncate hover:text-gold">{product.name}</Link>
        <p className="text-[10px] text-muted-foreground mt-0.5">{getCategory(product.category)?.label}</p>
        <p className="text-primary font-semibold text-base md:text-lg mt-1">{formatINR(product.price)}</p>
      </div>
      <Button onClick={() => add(product)} aria-label={`Add ${product.name} to selection`} className="w-full min-h-11 px-1 text-[10px] sm:text-xs tracking-normal">Add to Selection</Button>
    </article>
  );
}
