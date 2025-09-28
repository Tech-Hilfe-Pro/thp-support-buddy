type Testimonial = { quote: string; author: string; meta?: string };

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container max-w-7xl">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Stimmen aus der Region</h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <li key={i} className="card p-5">
              <p className="text-neutral-900">"{t.quote}"</p>
              <p className="mt-3 text-sm text-neutral-600">— {t.author}{t.meta ? `, ${t.meta}` : ""}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}