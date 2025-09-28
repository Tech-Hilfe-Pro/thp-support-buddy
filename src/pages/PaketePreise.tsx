import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceTimeCalculator from "@/components/PriceTimeCalculator";
import MembershipCards from "@/components/MembershipCards";
import SEO from "@/components/SEO";
import { Chip } from "@/components/Chip";
import { COPY } from "@/data/copy";

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

        <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="EINMALIG">Einmalig</TabsTrigger>
            <TabsTrigger value="ABO">Mitgliedschaft</TabsTrigger>
          </TabsList>

          <TabsContent value="EINMALIG" className="space-y-10">
            <section id="rechner">
              <h2 className="text-2xl font-semibold mb-2">Preis- & Zeit-Rechner</h2>
              <PriceTimeCalculator />
              <p className="mt-2 text-sm text-slate-600">
                Hinweis: Mitglieder erhalten <strong>20 % Rabatt</strong> auf die <em>Arbeitszeit</em> vor Ort. Anfahrt bleibt unverändert.
                Kein Ausweis der USt. gem. § 19 UStG.
              </p>
            </section>

            <section id="kmu">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Für KMU 
                <Chip kind="KMU" />
                <Chip kind="MSP" />
                <Chip kind="SLA" />
              </h2>
              <p className="text-slate-600 text-sm">
                Planbar mit Abo & SLA. Vertraglich gesicherte Reaktionszeiten je nach Paket.
              </p>
              <div className="mt-4 p-4 border rounded-xl bg-slate-50">
                <p className="text-sm text-slate-700">
                  Individuelle Pakete für Unternehmen verfügbar. Kontaktieren Sie uns für ein maßgeschneidertes Angebot.
                </p>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="ABO" className="space-y-8">
            <section id="vorteile">
              <h2 className="text-2xl font-semibold">Mitgliedschaft – Vorteile</h2>
              <ul className="list-disc list-inside text-slate-700 mt-2 space-y-1">
                <li>Priorisierte Hilfe (Remote zuerst), Vor-Ort bei Bedarf</li>
                <li><strong>20 % Rabatt</strong> auf Arbeitszeit vor Ort</li>
                <li>Planbare Reaktionszeiten mit <strong>SLA</strong> je nach Paket</li>
                <li>Inkludierte Remote-Minuten pro Monat</li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">Kein Ausweis der USt. gem. § 19 UStG.</p>
            </section>
            
            <MembershipCards />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}