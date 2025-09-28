type Step = { t: string; d: string; n: number };

export default function Steps({ items }: { items: Step[] }) {
  return (
    <section className="py-10">
      <div className="container max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            So arbeiten wir
          </h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {items.map((s) => (
            <li key={s.n} className="card p-5 flex gap-4">
              <div className="h-8 w-8 shrink-0 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center font-semibold text-sm">{s.n}</div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900">{s.t}</h3>
                <p className="mt-1 text-sm text-neutral-600">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}