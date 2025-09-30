import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COPY } from "@/data/copy";

export default function FAQ() {
  const [search, setSearch] = useState("");

  const allFaqs = [
    ...COPY.faq.home,
    ...COPY.faq.preise,
    ...COPY.faq.termin
  ];

  const filtered = allFaqs.filter(f => {
    if (!search.trim()) return true;
    const lwr = search.toLowerCase();
    return f.q.toLowerCase().includes(lwr) || f.a.toLowerCase().includes(lwr);
  });

  return (
    <>
      <SEO
        title="Häufig gestellte Fragen | Tech Hilfe Pro"
        description="Antworten auf die wichtigsten Fragen zu IT-Service, Preisen, Terminen und Ablauf."
        path="/faq"
      />

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Häufig gestellte Fragen</h1>
        
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Frage suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length > 0 ? (
          <Accordion type="multiple" className="mb-12">
            {filtered.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Keine Ergebnisse gefunden.</p>
            <Button variant="outline" onClick={() => setSearch("")}>
              Filter zurücksetzen
            </Button>
          </div>
        )}

        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">Weitere Fragen?</h2>
          <Button asChild size="lg">
            <Link to="/kontakt">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
