import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PricingTabs from "@/components/PricingTabs";
import PriceTimeCalculator from "@/components/PriceTimeCalculator";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import { COPY } from "@/data/copy";
import { COMPANY } from "@/data/company";

const PaketePreise = () => {
  return (
    <>
      <SEO 
        title="Pakete & Preise | Tech Hilfe Pro"
        description="Faire IT-Pakete für Privat & KMU. Mit Abo 20 % Rabatt auf Arbeitszeit bei Vor-Ort-Terminen."
        path="/pakete-preise" 
        ogImage={`/og?title=${encodeURIComponent("Pakete & Preise")}&subtitle=${encodeURIComponent("Transparent. Planbar. Fair.")}`}
      />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">{COPY.pricing.title}</h1>
            <p className="text-lg text-muted-foreground">
              {COPY.pricing.intro}
            </p>
          </header>

          {/* Pricing Tabs */}
          <section className="mb-16">
            <PricingTabs />
          </section>

          {/* Price Calculator */}
          <section id="rechner" className="scroll-mt-24">
            <div className="max-w-2xl mx-auto">
              <PriceTimeCalculator />
            </div>
          </section>

          {/* Value Proposition */}
          <section className="mt-16">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Transparente Preise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Keine versteckten Kosten oder Überraschungen. 
                    Sie wissen vorher genau, was Sie bezahlen.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Flexible Abrechnung</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Von monatlichen Abos bis hin zur minutengenauen 
                    On-Demand-Abrechnung - Sie haben die Wahl.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Faire Konditionen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Attraktive Rabatte für Stammkunden und 
                    planbare Kosten für Unternehmen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="mt-16 text-center">
            <div className="bg-muted/30 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Haben Sie Fragen zu unseren Preisen?</h2>
              <p className="text-muted-foreground mb-6">
                Gerne beraten wir Sie persönlich und finden das passende Paket für Ihre Bedürfnisse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href={`tel:${COMPANY.telE164}`}>
                    Jetzt anrufen
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`mailto:${COMPANY.email}`}>
                    E-Mail senden
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <FAQ title="Preise & Abrechnung – FAQ" items={COPY.faq.preise} />

          {/* Fine Print */}
          <div className="mx-auto max-w-3xl text-xs text-muted-foreground space-y-1 pb-10 text-center">
            <p>{COPY.fineprint.onsiteMinimum}</p>
            <p>{COPY.fineprint.subscriberDiscount}</p>
            <p>{COPY.fineprint.travelZone}</p>
            <p>{COPY.fineprint.taxNote}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaketePreise;