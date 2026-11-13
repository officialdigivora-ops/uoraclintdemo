import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { RETURNS, LEGAL_UPDATED } from "@/data/legal";

export const Route = createFileRoute("/refund-returns")({
  head: () => ({
    meta: [
      { title: "Return & Exchange | UORA" },
      { name: "description", content: "UORA exchange policy for damaged, defective or wrong items." },
      { property: "og:title", content: "Return & Exchange | UORA" },
      { property: "og:description", content: "UORA exchange policy for damaged, defective or wrong items." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/refund-returns" }],
  }),
  component: () => <LegalPage title="Return &" em="Exchange" updated={LEGAL_UPDATED} sections={RETURNS} />,
});
