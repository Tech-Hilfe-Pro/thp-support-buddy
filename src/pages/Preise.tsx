import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PriceCalculatorNew from "@/components/PriceCalculatorNew";
import SEO from "@/components/SEO";
import Pricing from "@/components/Pricing";
import { PRIVAT_PLANS } from "@/data/pricingData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PreisePage() {
  return (
    <>
      <SEO 
        title="Preise & Service-Level | Tech Hilfe Pro"
        description="Transparente IT-Preise mit klaren Service-Level für KMU. On-Demand-Support oder planbare monatliche Betreuung. Preis in 60 Sekunden berechnen."
        path="/preise"
        ogImage="/og/IT-Support-Preise_Tech-Hilfe-Pro.jpg"
        imageAlt="Transparente IT-Support Preise und Service-Level für KMU – On-Demand und monatliche Betreuung"
      />
      
      <main id="main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <header className="text-center mb-12">
          <h1 className="h1-balance text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-[22ch] mx-auto text-center">
            Preise & Service-Level
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
            Transparente Leistungen und Preise. Berechnen Sie Ihren Preis in 60 Sekunden.
          </p>
          <div className="mt-4 flex gap-3 justify-center flex-wrap text-sm">
            <Link to="/preise#kmu" className="link-anchor text-primary hover:underline">Zu Service-Level</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/preise#rechner" className="link-anchor text-primary hover:underline">Zum Rechner</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/preise#privat-abo" className="link-anchor text-muted-foreground hover:text-primary hover:underline">Privat Abo</Link>
          </div>
        </header>

        {/* Service-Level Component (nur KMU) */}
        <section id="kmu" className="scroll-mt-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Service-Level für KMU</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wählen Sie den passenden Service-Level für Ihr Unternehmen mit klaren SLAs.
            </p>
          </div>
          <Pricing showHeading={false} />
        </section>

        {/* Privat Abo (optional) */}
        <section id="privat-abo" className="mt-16 scroll-mt-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Privat Abo (optional)</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Remote & Vor-Ort-Service. Monatlich kündbar. Keine Mindestlaufzeit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
            {PRIVAT_PLANS.map((plan) => (
              <Card key={plan.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-foreground">
                    {plan.monthly.toFixed(2).replace('.', ',')} € / Monat
                  </CardDescription>
                  <CardDescription className="text-sm mt-2">
                    {plan.claim}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto mb-6">
            Für Haushalte/Home-Office – kein Konkurrenzangebot zu Elektronikketten; Fokus auf Prävention & Remote-First.
          </p>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/termin">Termin anfragen</Link>
            </Button>
          </div>
        </section>


        {/* Preis-Rechner */}
        <section id="rechner" className="mt-16 scroll-mt-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Preis-Rechner</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Berechnen Sie Ihren individuellen Preis in 60 Sekunden – basierend auf PLZ, Service und Vor-Ort/Remote.
            </p>
          </div>
          <PriceCalculatorNew />
        </section>

        {/* FAQ kurz */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Häufige Fragen zu Preisen</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="why-abo">
              <AccordionTrigger>Warum lohnt sich ein Abo?</AccordionTrigger>
              <AccordionContent>
                Mit einem Abo erhalten Sie bis zu 25% Rabatt auf alle Vor-Ort-Einsätze, priorisierte Terminvergabe 
                und regelmäßige Gesundheitschecks. Bei einem einzigen Vor-Ort-Termin amortisiert sich das Abo oft bereits.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ondemand">
              <AccordionTrigger>Kann ich auch ohne Abo buchen?</AccordionTrigger>
              <AccordionContent>
                Ja, Sie können jederzeit On-Demand-Support buchen. Remote-Support wird in 15-Minuten-Blöcken abgerechnet, 
                Vor-Ort nach Stundensatz plus PLZ-Zone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="kmu-benefits">
              <AccordionTrigger>Was beinhalten die KMU-Service-Level?</AccordionTrigger>
              <AccordionContent>
                Alle KMU-Service-Level beinhalten Remote Monitoring & Management (RMM), automatisches Patch-Management und Remote-Support. 
                Je nach Service-Level kommen Backup, erweiterte SLAs und Vor-Ort-Priorität hinzu. Detailvergleich auf <Link to="/kmu" className="text-primary underline">unserer KMU-Seite</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="more-faq">
              <AccordionTrigger>Wo finde ich weitere Antworten?</AccordionTrigger>
              <AccordionContent>
                Weitere häufige Fragen und Antworten finden Sie auf unserer <Link to="/faq" className="text-primary underline">FAQ-Seite</Link>. 
                Bei weiteren Fragen: <Link to="/kontakt" className="text-primary underline">Kontaktieren Sie uns</Link>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-[hsl(var(--thp-cta))] hover:opacity-90">
            <Link to="/kontakt">Jetzt Kontakt aufnehmen</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
