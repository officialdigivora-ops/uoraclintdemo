import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { TERMS, LEGAL_UPDATED } from "@/data/legal";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | UORA" },
      { name: "description", content: "Terms of use for the UORA website and WhatsApp orders." },
      { property: "og:title", content: "Terms & Conditions | UORA" },
      { property: "og:description", content: "Terms of use for the UORA website and WhatsApp orders." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: () => <LegalPage title="Terms &" em="Conditions" updated={LEGAL_UPDATED} sections={TERMS} />,
});
