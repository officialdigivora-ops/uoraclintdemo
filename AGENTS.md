<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Imported storefront structure
- Keep shoppable editorial hotspots and offer display settings in a dedicated data module; countdowns require a confirmed fixed deadline and never reset automatically.
- Keep imported ring designs in a dedicated catalogue module with colour variants and two compressed gallery images; cart line keys include colour IDs to prevent merging different selections.
- Keep the UORA storefront's route pages, shared shopping UI, catalog content, and customer-facing configuration separated in their existing `src/routes`, `src/components/site`, `src/data`, and `src/config` areas so merchandising updates stay localized.
- Keep bestseller sale-price calculations in shared product data helpers and render prices through a shared storefront price component so product views, cart, and order totals stay consistent.
- Render the static header logo and slogan from the supplied artwork alpha mask tinted by the primary token, preserving exact shapes while following theme changes.
- Keep the homepage photo carousel in a shared site component with automatic rotation, accessible dot controls, and reduced-motion support so presentation stays separate from catalog logic.
- Use a shared quantity control backed by CartProvider across cards, product pages and the drawer; animate header feedback from a cart revision counter so updates stay synchronized without animating restored carts.
