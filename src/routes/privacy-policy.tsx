import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { PRIVACY, LEGAL_UPDATED } from "@/data/legal";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | UORA" },
      { name: "description", content: "How UORA collects and uses your information." },
      { property: "og:title", content: "Privacy Policy | UORA" },
      { property: "og:description", content: "How UORA collects and uses your information." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: () => <LegalPage title="Privacy" em="Policy" updated={LEGAL_UPDATED} sections={PRIVACY} />,
});
