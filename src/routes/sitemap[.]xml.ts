import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const o = new URL(request.url).origin;
        const paths = ["/", "/care-guide", "/shipping-policy", "/refund-returns", "/privacy-policy", "/terms-and-conditions",
          ...CATEGORIES.map((c) => `/product-category/${c.slug}`), ...PRODUCTS.map((p) => `/product/${p.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${o}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
