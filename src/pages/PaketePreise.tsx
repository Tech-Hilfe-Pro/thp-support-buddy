import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PriceTimeCalculator from "@/components/PriceTimeCalculator";
import PricingCards from "@/components/PricingCards";
import BillingPortal from "@/components/BillingPortal";
import SEO from "@/components/SEO";
import VatNotice from "@/components/VatNotice";
import { Chip } from "@/components/Chip";
import { COPY, BENEFITS_PRIVAT, BENEFITS_KMU } from "@/data/copy";
import { PRIVAT_ABOS, KMU_TIERS } from "@/data/pricing";

export default function PaketePreisePage() {
  const [tab, setTab] = useState<"EINMALIG" | "ABO">("EINMALIG");

  return (
    <>
      <SEO 
        title="Pakete & Preise | Tech Hilfe Pro"
        description="Faire IT-Pakete für Privat & KMU. Mit Abo 20 % Rabatt auf Arbeitszeit bei Vor-Ort-Terminen."
        path="/pakete-preise" 
        ogImage={`/og?title=${encodeURIComponent("Pakete & Preise")}&subtitle=${encodeURIComponent("Transparent. Planbar. Fair.")}`}
      />
      
      <main id="main" className="mx-auto max-w-7xl px-3 lg:px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Pakete & Preise</h1>

        <div className="space-y-10">
          <section className="prose max-w-none">
            <p className="text-lg text-muted-foreground">
              Transparente Preise für IT-Hilfe. Remote-first für schnelle Lösungen, 
              Vor-Ort nur wenn nötig. Mit Mitgliedschaft sparen Sie dauerhaft.
            </p>
          </section>

          <section id="rechner">
            <h2 className="text-2xl font-semibold mb-4">Preis- & Zeit-Rechner</h2>
            <PriceTimeCalculator />
            <VatNotice />
          </section>

          {/* Nueva sección de tarjetas de precios comparativas */}
          <section id="planes">
            <PricingCards />
          </section>
          
          {/* Abo-Verwaltung */}
          <section className="py-16 bg-accent/20">
            <div className="container">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Bereits Kunde?</h2>
                <p className="text-muted-foreground">
                  Verwalten Sie Ihr bestehendes Abonnement
                </p>
              </div>
              <BillingPortal />
            </div>
          </section>

          <section id="vergleich" className="space-y-6">
            <h2 className="text-2xl font-semibold">Preisvergleich auf einen Blick</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  Privatkunden
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Für Privatpersonen</span>
                </h3>
                <ul className="space-y-2">
                  {BENEFITS_PRIVAT.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {PRIVAT_ABOS.map((abo) => (
                    <div key={abo.id} className="p-3 border rounded-lg text-center">
                      <div className="font-medium">{abo.name}</div>
                      <div className="text-lg font-bold text-primary">{abo.preis.toFixed(2)} €</div>
                      <div className="text-xs text-muted-foreground">pro Monat</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  KMU 
                  <Chip kind="KMU" />
                  <Chip kind="MSP" />
                  <Chip kind="SLA" />
                </h3>
                <ul className="space-y-2">
                  {BENEFITS_KMU.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {KMU_TIERS.map((tier) => (
                    <div key={tier.id} className="p-3 border rounded-lg text-center">
                      <div className="font-medium">{tier.name}</div>
                      <div className="text-lg font-bold text-primary">{tier.preisProGeraet} €</div>
                      <div className="text-xs text-muted-foreground">pro Gerät/Monat</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <VatNotice />
          </section>

          <section className="text-center space-y-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <h2 className="text-xl font-semibold">Mitglied werden und sparen</h2>
            <p className="text-muted-foreground">
              Wählen Sie Ihr passendes Paket und profitieren Sie von Inklusiv-Minuten 
              und 20 % Rabatt auf Vor-Ort-Arbeitszeit.
            </p>
            <Button asChild size="lg">
              <Link to="/abo">Jetzt Mitglied werden</Link>
            </Button>
          </section>
        </div>
      </main>
    </>
  );
}