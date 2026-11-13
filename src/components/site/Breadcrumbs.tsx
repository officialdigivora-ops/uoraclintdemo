import { Link } from "@tanstack/react-router";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-6">
      <Link to="/" className="hover:text-gold">Home</Link>
      <span className="mx-2 text-gold">›</span>
      <span aria-current="page" className="text-foreground">{current}</span>
    </nav>
  );
}
