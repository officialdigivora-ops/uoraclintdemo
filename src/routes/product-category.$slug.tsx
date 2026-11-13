import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ProductCollection } from "@/components/site/ProductCollection";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/product-category/$slug")({
  loader: ({ params }) => {
    const c = getCategory(params.slug);
    if (!c) throw notFound();
    return { slug: c.slug, label: c.label, heading: c.heading, intro: c.intro };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.label} – Gold Plated ${loaderData.label} | UORA` : "Collection | UORA" },
      { name: "description", content: loaderData ? `${loaderData.intro} Anti-tarnish, skin friendly, free shipping over ₹1299.` : "UORA collection" },
      { property: "og:title", content: loaderData ? `${loaderData.label} | UORA` : "UORA" },
      { property: "og:description", content: loaderData?.intro ?? "UORA collection" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `/product-category/${params.slug}` }],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-lux section-y text-center"><h1 className="h2-lux">Collection not <em>found</em></h1><Button asChild className="mt-8"><Link to="/">Back home</Link></Button></div>
  ),
  errorComponent: () => <div className="container-lux section-y text-center">Something went wrong.</div>,
});

function CategoryPage() {
  const c = Route.useLoaderData();
  return (
    <div className="container-lux section-y">
      <Breadcrumbs current={c.label} />
      <h1 className="h1-lux">{c.heading[0]} <em>{c.heading[1]}</em></h1>
      <p className="text-muted-foreground mt-4 mb-10 max-w-lg">{c.intro}</p>
      <ProductCollection key={c.slug} lockCategory={c.slug} />
    </div>
  );
}
