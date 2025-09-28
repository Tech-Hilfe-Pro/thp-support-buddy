import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PricingTabs from "@/components/PricingTabs";

const PaketePreise = () => {
  return (
    <>
      <Helmet>
        <title>Pakete & Preise - Tech Hilfe Pro</title>
        <meta 
          name="description" 
          content="Transparente Preise für IT-Support. Flexible Pakete für Privat und Unternehmen. Berechnen Sie Ihren Preis in 60 Sekunden." 
        />
        <meta name="keywords" content="IT-Support Preise, Senioren Abo, KMU IT-Pakete, Remote Support Kosten" />
      </Helmet>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Pakete & Preise</h1>
            <p className="text-lg text-muted-foreground">
              Wählen Sie das Modell, das zu Ihnen passt - faire und transparente Preise ohne versteckte Kosten
            </p>
          </header>

          {/* Pricing Tabs */}
          <section className="mb-16">
            <PricingTabs />
          </section>

          {/* Rechner Placeholder */}
          <section id="rechner" className="scroll-mt-24">
            <Card className="max-w-2xl mx-auto text-center">
              <CardHeader>
                <CardTitle>Preis- & Zeit-Rechner</CardTitle>
                <CardDescription>
                  Berechnen Sie in 60 Sekunden Ihren individuellen Preis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Der interaktive Rechner folgt im nächsten Entwicklungsschritt.
                  Hier können Sie dann Ihre PLZ eingeben, Service auswählen und 
                  sofort den genauen Preis und Zeitfenster erhalten.
                </p>
                <Button disabled size="lg" className="min-w-[200px]">
                  Rechner starten (folgt)
                </Button>
                <div className="text-xs text-muted-foreground mt-4">
                  Features: PLZ-Validierung • Serviceauswahl • Zeitfenster • Preis-Vorschau
                </div>
              </CardContent>
            </Card>
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
                  <a href="tel:+492211234567">
                    Jetzt anrufen
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:info@techhilfe-pro.de">
                    E-Mail senden
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PaketePreise;