import { Breadcrumbs } from "./Breadcrumbs";

export interface LegalSection { id: string; title: string; body: string[] }

export function LegalPage({ title, em, updated, sections }: { title: string; em: string; updated: string; sections: LegalSection[] }) {
  return (
    <div className="container-lux section-y">
      <Breadcrumbs current={`${title} ${em}`} />
      <h1 className="h1-lux mb-3">{title} <em>{em}</em></h1>
      <p className="text-sm text-muted-foreground mb-12">Last updated: {updated}</p>
      <div className="grid lg:grid-cols-[240px_1fr] gap-12">
        <nav aria-label="Contents" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+24px)] border-l border-line pl-5 space-y-3">
            <p className="eyebrow">Contents</p>
            {sections.map((s) => <a key={s.id} href={`#${s.id}`} className="block text-sm text-muted-foreground hover:text-gold">{s.title}</a>)}
          </div>
        </nav>
        <div className="max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id}>
              <h2 className="font-display text-2xl lg:text-3xl mb-3"><span className="text-gold mr-2">{String(i + 1).padStart(2, "0")}</span>{s.title}</h2>
              {s.body.map((b) => <p key={b} className="text-muted-foreground mb-3">{b}</p>)}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
