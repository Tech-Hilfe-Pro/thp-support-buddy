export default function Steps3() {
  const steps = [
    { 
      n: 1, 
      title: "Anfrage", 
      desc: "Kurz beschreiben, was klemmt. PLZ angeben." 
    },
    { 
      n: 2, 
      title: "Diagnose", 
      desc: "Remote prüfen wir zuerst. Zeit & Preis klar." 
    },
    { 
      n: 3, 
      title: "Lösung & Nachsorge", 
      desc: "Vor-Ort wenn nötig. Tipps für die Zukunft." 
    }
  ];

  return (
    <section id="ablauf" aria-labelledby="steps-title" className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-3 lg:px-6">
        <h2 id="steps-title" className="text-2xl font-bold text-center text-foreground mb-8">
          So arbeiten wir
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(step => (
            <div key={step.n} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {step.n}
                </span>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}