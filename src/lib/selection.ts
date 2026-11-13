import { FREE_SHIPPING_THRESHOLD, whatsappLink } from "@/config/site";

export interface SelectionLine { slug: string; name: string; price: number; originalPrice?: number; qty: number; image: string }

export const subtotal = (lines: SelectionLine[]) => lines.reduce((s, l) => s + l.price * l.qty, 0);
export const remainingForFreeShipping = (total: number) => Math.max(0, FREE_SHIPPING_THRESHOLD - total);

export function buildWhatsAppMessage(lines: SelectionLine[]) {
  const total = subtotal(lines);
  const body = lines.map((l, i) => `${i + 1}. ${l.name} × ${l.qty} — ₹${(l.price * l.qty).toLocaleString("en-IN")}`).join("\n");
  return `Hi UORA! I'd like to order:\n\n${body}\n\nTotal: ₹${total.toLocaleString("en-IN")}\n\nPlease confirm availability.`;
}

export const checkoutUrl = (lines: SelectionLine[]) => whatsappLink(buildWhatsAppMessage(lines));
