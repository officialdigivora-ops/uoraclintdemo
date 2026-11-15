import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuantityControl({ value, onChange, label, className }: { value: number; onChange: (value: number) => void; label: string; className?: string }) {
  return (
    <div className={cn("quantity-control flex h-11 items-center justify-between border border-primary bg-background text-primary", className)}>
      <Button type="button" variant="ghost" size="icon" className="h-11 w-11 shrink-0" aria-label={`Decrease ${label}`} onClick={() => onChange(value - 1)}><Minus /></Button>
      <span className="min-w-8 text-center text-sm font-medium tabular-nums" aria-live="polite" aria-label={`${label} quantity`}><span key={value} className="quantity-value inline-block">{value}</span></span>
      <Button type="button" variant="ghost" size="icon" className="h-11 w-11 shrink-0" aria-label={`Increase ${label}`} onClick={() => onChange(value + 1)}><Plus /></Button>
    </div>
  );
}