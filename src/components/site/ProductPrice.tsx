import { formatINR } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductPrice({ price, originalPrice, className, size = "regular" }: {
  price: number;
  originalPrice?: number | undefined;
  className?: string;
  size?: "compact" | "regular" | "large";
}) {
  const isDiscounted = originalPrice !== undefined && originalPrice > price;
  const saleSize = size === "large" ? "text-2xl" : size === "compact" ? "text-sm" : "text-base md:text-lg";

  return (
    <div className={cn("flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1", className)} aria-label={isDiscounted ? `${formatINR(price)}, reduced from ${formatINR(originalPrice)}, 20% off` : formatINR(price)}>
      <span className={cn("font-semibold text-primary", saleSize)}>{formatINR(price)}</span>
      {isDiscounted && (
        <>
          <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/80">{formatINR(originalPrice)}</span>
          <span className="rounded-sm bg-soft px-1.5 py-0.5 text-[10px] font-semibold text-gold">20% OFF</span>
        </>
      )}
    </div>
  );
}