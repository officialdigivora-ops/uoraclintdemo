import type { LegalSection } from "@/components/site/LegalPage";
// Placeholder policy text — review with your own terms before launch.
export const LEGAL_UPDATED = "1 November 2026";

export const SHIPPING: LegalSection[] = [
  { id: "processing", title: "Order Processing", body: ["Orders are confirmed over WhatsApp. Once availability and payment are confirmed, we dispatch within 1–3 business days."] },
  { id: "delivery", title: "Delivery Time", body: ["Metro cities usually receive orders in 3–5 business days; other locations in 5–8 business days."] },
  { id: "charges", title: "Shipping Charges", body: ["Shipping is free on orders of ₹1299 and above across India. A flat fee, shared at confirmation, applies to smaller orders."] },
  { id: "tracking", title: "Order Tracking", body: ["You'll receive a tracking link on WhatsApp once your parcel ships."] },
  { id: "delays", title: "Delays", body: ["Courier delays due to weather, festivals or regional restrictions are outside our control, but we'll help you follow up with the courier."] },
];
export const RETURNS: LegalSection[] = [
  { id: "policy", title: "Our Policy", body: ["As our jewellery is worn on the skin, we do not offer refunds or returns for change of mind."] },
  { id: "exchanges", title: "Eligible Exchanges", body: ["We happily exchange items that arrive damaged, defective or incorrect.", "Report the issue within 48 hours of delivery on WhatsApp with a clear, uncut unboxing video."] },
  { id: "process", title: "Exchange Process", body: ["Once verified, we arrange a reverse pickup or ask you to ship the item back. A replacement is dispatched after inspection."] },
  { id: "not-eligible", title: "Not Eligible", body: ["Items worn, altered or damaged through misuse, and claims without an unboxing video, are not eligible."] },
];
export const PRIVACY: LegalSection[] = [
  { id: "collect", title: "Information We Collect", body: ["We collect your name, email, phone number and address when you contact us, subscribe or place an order on WhatsApp."] },
  { id: "use", title: "How We Use It", body: ["Your information is used only to process orders, reply to enquiries and — if you opt in — share updates."] },
  { id: "storage", title: "Your Selection", body: ["Items in Your Selection are stored in your own browser and are not sent to us until you choose to check out on WhatsApp."] },
  { id: "sharing", title: "Sharing", body: ["We share delivery details only with courier partners. We never sell your data."] },
  { id: "rights", title: "Your Rights", body: ["Email hello@uora.in to request access to or deletion of your data."] },
];
export const TERMS: LegalSection[] = [
  { id: "use", title: "Use of This Site", body: ["By using this website you agree to these terms. Content and images belong to UORA and may not be reused without permission."] },
  { id: "orders", title: "Orders & Pricing", body: ["No payment is collected on this website. Orders are confirmed on WhatsApp; prices may change without notice until confirmed."] },
  { id: "products", title: "Product Information", body: ["Colours may vary slightly due to lighting and screens. Gold plating wears gradually with use and is not solid gold."] },
  { id: "liability", title: "Limitation of Liability", body: ["UORA is not liable for indirect losses arising from the use of our products or this website."] },
  { id: "law", title: "Governing Law", body: ["These terms are governed by the laws of India."] },
];
