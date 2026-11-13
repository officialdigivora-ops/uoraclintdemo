import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { SHIPPING, LEGAL_UPDATED } from "@/data/legal";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy | UORA" },
      { name: "description", content: "Processing, delivery times and free shipping over ₹1299 across India." },
      { property: "og:title", content: "Shipping Policy | UORA" },
      { property: "og:description", content: "Processing, delivery times and free shipping over ₹1299 across India." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/shipping-policy" }],
  }),
  component: () => <LegalPage title="Shipping" em="Policy" updated={LEGAL_UPDATED} sections={SHIPPING} />,
});
