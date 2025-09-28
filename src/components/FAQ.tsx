import { useState } from "react";

type QA = { q: string; a: string };

export default function FAQ({ items, title }: { items: QA[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl py-10">
      {title && <h2 className="text-2xl font-semibold mb-6 text-foreground">{title}</h2>}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="border border-border rounded-xl bg-card">
            <button
              className="w-full text-left p-4 font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl flex justify-between items-center hover:bg-muted/50 transition-colors"
              aria-expanded={open === index}
              onClick={() => setOpen(open === index ? null : index)}
            >
              <span>{item.q}</span>
              <span aria-hidden="true" className="text-xl font-bold text-muted-foreground">
                {open === index ? "−" : "+"}
              </span>
            </button>
            <div 
              className={`px-4 pb-4 ${open === index ? "block" : "hidden"}`} 
              role="region" 
              aria-label={item.q}
            >
              <p className="text-sm leading-6 text-muted-foreground">{item.a}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}