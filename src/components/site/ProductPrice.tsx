import { formatINR } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductPrice({ price, originalPrice, className, size = "regular", showDiscount = false }: {
  price: number;
  originalPrice?: number | undefined;
  className?: string;
  size?: "compact" | "regular" | "large";
  showDiscount?: boolean;
}) {
  const isDiscounted = originalPrice !== undefined && originalPrice > price;
  const discount = isDiscounted ? Math.round((1 - price / originalPrice) * 100) : 0;
  const saleSize = size === "large" ? "text-2xl" : size === "compact" ? "text-sm" : "text-base md:text-lg";

  return (
    <div className={cn("flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1", className)} aria-label={isDiscounted ? `${formatINR(price)}, reduced from ${formatINR(originalPrice)}, ${discount}% off` : formatINR(price)}>
      {isDiscounted && <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/80">{formatINR(originalPrice)}</span>}
      <span className={cn("font-semibold text-primary", saleSize)}>{formatINR(price)}</span>
      {isDiscounted && showDiscount && <span className="rounded-sm bg-soft px-1.5 py-0.5 text-[10px] font-semibold text-gold">{discount}% OFF</span>}
    </div>
  );
}