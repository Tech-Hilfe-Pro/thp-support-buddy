type Benefit = { icon: JSX.Element; title: string; text: string };

export default function Benefits({ items }: { items: Benefit[] }) {
  return (
    <section className="py-10">
      <div className="container max-w-7xl">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((b, i) => (
            <li key={i} className="card p-5">
              <div className="mb-3 text-brand-600">{b.icon}</div>
              <h3 className="text-base font-semibold text-neutral-900">{b.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}