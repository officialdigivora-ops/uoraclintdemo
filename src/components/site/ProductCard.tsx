import { Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import type { Product } from "@/data/products";
import { getProductOriginalPrice, getProductPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ProductPrice } from "./ProductPrice";

export function ProductCard({ product, showBestSeller = false }: { product: Product; showBestSeller?: boolean }) {
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
        {showBestSeller && product.bestSeller && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full border border-gold/70 bg-primary px-2.5 py-1.5 text-[10px] font-semibold text-primary-foreground shadow-sm md:left-3 md:top-3 md:px-3 md:text-xs">
            <BadgeCheck className="size-3.5 text-gold" strokeWidth={1.75} /> BEST SELLER
          </span>
        )}
      </div>
      <div className="pt-2 pb-2 text-center min-w-0 flex-1">
        <Link to="/product/$slug" params={{ slug: product.slug }} title={product.name} className="block font-sans font-medium text-sm md:text-base leading-6 truncate hover:text-gold">{product.name}</Link>
        <ProductPrice className="mt-1" price={getProductPrice(product)} originalPrice={getProductOriginalPrice(product)} />
      </div>
      <Button onClick={() => add(product)} aria-label={`Add ${product.name} to cart`} className="w-full min-h-11 px-1 text-xs sm:text-sm tracking-normal">Add to Cart</Button>
    </article>
  );
}
