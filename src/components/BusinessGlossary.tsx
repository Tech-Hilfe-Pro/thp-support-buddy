type Item = { key:"kmu"|"msp"|"sla"; abbr:string; title:string; desc:string; };

export default function BusinessGlossary({ items }: { items: Item[] }) {
  return (
    <section className="py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-stretch justify-center gap-4">
          {items.map(it => (
            <article key={it.key} className="w-full sm:w-auto min-w-[260px] max-w-sm flex-1 rounded-2xl border border-neutral-200 bg-white shadow-sm p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-thp-hover text-thp-primary text-xs font-semibold px-3 py-1">{it.abbr}</span>
                <h3 className="text-sm font-semibold text-neutral-900">{it.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}