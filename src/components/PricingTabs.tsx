import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PRIVAT_ABOS, PRIVAT_ON_DEMAND, KMU_TIERS } from "@/data/pricing";

const PricingTabs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"privat" | "kmu">("privat");

  const handleSelectPlan = (planId: string) => {
    navigate("/kasse", { 
      state: { 
        mode: "subscription", 
        planId 
      } 
    });
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("privat")}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            activeTab === "privat"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Privat
        </button>
        <button
          onClick={() => setActiveTab("kmu")}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            activeTab === "kmu"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          KMU
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "privat" && (
        <div className="space-y-8">
          {/* Abo-Pakete */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-center">Senioren-Abos</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <caption className="sr-only">Senioren-Abo Pakete im Vergleich</caption>
                <thead>
                  <tr className="bg-muted/50">
                    <th scope="col" className="p-4 text-left border-b border-border font-semibold">Paket</th>
                    <th scope="col" className="p-4 text-center border-b border-border font-semibold">Preis/Monat</th>
                    <th scope="col" className="p-4 text-center border-b border-border font-semibold">Remote-Zeit</th>
                    <th scope="col" className="p-4 text-center border-b border-border font-semibold">Vor-Ort Rabatt</th>
                    <th scope="col" className="p-4 text-left border-b border-border font-semibold">Inklusive</th>
                    <th scope="col" className="p-4 text-center border-b border-border font-semibold">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {PRIVAT_ABOS.map((abo, index) => (
                    <tr key={abo.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/25"}>
                      <th scope="row" className="p-4 font-medium border-b border-border">{abo.name}</th>
                      <td className="p-4 text-center border-b border-border font-bold text-primary">
                        {abo.preis.toFixed(2)}€
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        {abo.minuten} Min
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        {(abo.rabattVorOrt * 100).toFixed(0)}%
                      </td>
                      <td className="p-4 border-b border-border">
                        <ul className="text-sm space-y-1">
                          {abo.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Button 
                          onClick={() => handleSelectPlan(abo.id)}
                          size="sm"
                          className="min-w-[100px]"
                        >
                          Abo wählen
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* On-Demand */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-center">On-Demand</h3>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Flexible Abrechnung</CardTitle>
                <CardDescription>Bezahlen Sie nur für die Zeit, die Sie wirklich brauchen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{PRIVAT_ON_DEMAND.erstdiagnose.preis}€</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {PRIVAT_ON_DEMAND.erstdiagnose.text}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{PRIVAT_ON_DEMAND.folgeblock.preis}€</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      je {PRIVAT_ON_DEMAND.folgeblock.blockMin}-Min-Block
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {PRIVAT_ON_DEMAND.vorOrtHinweis}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link to="/termin">Zum Termin</Link>
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Preis in 60 Sekunden
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center mt-6">
            Alle Preise inkl. Fahrtzone je nach PLZ. Ohne ausgewiesene USt. gem. §19 UStG, falls zutreffend.
          </div>
        </div>
      )}

      {activeTab === "kmu" && (
        <div className="space-y-8">
          {/* KMU Tiers */}
          <section>
            <h3 className="text-2xl font-semibold mb-6 text-center">Managed IT-Services</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <caption className="sr-only">KMU IT-Service Pakete im Vergleich</caption>
                <thead>
                  <tr className="bg-muted/50">
                    <th scope="col" className="p-4 text-left border-b border-border font-semibold">Tier</th>
                    <th scope="col" className="p-4 text-center border-b border-border font-semibold">Preis ab</th>
                    <th scope="col" className="p-4 text-left border-b border-border font-semibold">Leistungen</th>
                    <th scope="col" className="p-4 text-center border-b border-border font-semibold">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {KMU_TIERS.map((tier, index) => (
                    <tr key={tier.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/25"}>
                      <th scope="row" className="p-4 font-medium border-b border-border">{tier.name}</th>
                      <td className="p-4 text-center border-b border-border font-bold text-primary">
                        {tier.preisProGeraet}€<br />
                        <span className="text-xs text-muted-foreground font-normal">/Gerät/Monat</span>
                      </td>
                      <td className="p-4 border-b border-border">
                        <ul className="text-sm space-y-1">
                          {tier.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Button 
                          onClick={() => handleSelectPlan(tier.id)}
                          size="sm"
                          className="min-w-[100px]"
                        >
                          Plan wählen
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Add-ons */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-center">Verfügbare Add-ons</h3>
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>M365 Administration</span>
                    <span className="font-medium">ab 9€/Monat</span>
                  </li>
                  <li className="flex justify-between">
                    <span>EDR/AV gemanagt</span>
                    <span className="font-medium">ab 7€/Gerät/Monat</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Endpoint-Backup</span>
                    <span className="font-medium">ab 6€/Gerät/Monat</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="min-w-[250px]">
              <Link to="/termin">Unverbindliche Anfrage</Link>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center mt-6">
            Alle Preise inkl. Fahrtzone je nach PLZ. Ohne ausgewiesene USt. gem. §19 UStG, falls zutreffend.
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingTabs;