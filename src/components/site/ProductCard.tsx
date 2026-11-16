import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { getProductOriginalPrice, getProductPrice, getCartLineKey } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ProductPrice } from "./ProductPrice";
import { QuantityControl } from "./QuantityControl";

export function ProductCard({ product }: { product: Product }) {
  const { add, lines, setQty } = useCart();
  const variantId = product.variants?.[0]?.id;
  const lineKey = getCartLineKey(product.slug, variantId);
  const quantity = lines.find((line) => getCartLineKey(line.slug, line.variantId) === lineKey)?.qty ?? 0;
  return (
    <article className="group min-w-0 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-soft border border-line group-hover:glow-gold transition-shadow">
        <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img src={product.images[0]} alt={product.name} loading="lazy" width={768} height={960}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 lg:group-hover:opacity-0" />
          <img src={product.images[1]} alt="" aria-hidden loading="lazy" width={768} height={960}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 lg:group-hover:opacity-100 lg:group-hover:scale-105" />
        </Link>
      </div>
      <div className="pt-2 pb-2 text-center min-w-0 flex-1">
        <Link to="/product/$slug" params={{ slug: product.slug }} title={product.name} className="block font-sans font-medium text-sm md:text-base leading-6 truncate hover:text-gold">{product.name}</Link>
        <ProductPrice className="mt-1" price={getProductPrice(product)} originalPrice={getProductOriginalPrice(product)} showDiscount={product.category === "rings"} />
      </div>
      <div className="h-11">
        {quantity > 0 ? <QuantityControl value={quantity} label={product.name} onChange={(value) => setQty(lineKey, value)} className="w-full" /> : <Button onClick={() => add(product)} aria-label={`Add ${product.name} to cart`} className="quantity-control w-full min-h-11 px-1 text-xs sm:text-sm tracking-normal">Add to Cart</Button>}
      </div>
    </article>
  );
}
