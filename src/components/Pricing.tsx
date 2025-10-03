import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { KMU_PLANS } from "@/data/pricingData";
import { Link } from "react-router-dom";

export default function Pricing() {
  // Solo mostrar KMU (Service-Level), sin toggle

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Service-Level für KMU
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Wählen Sie den passenden Service-Level für Ihr Unternehmen – planbare IT-Kosten mit klaren SLAs.
          </p>
        </div>

        {/* KMU Service-Level */}
        <>
          {/* KMU Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="outline" className="text-sm">
              –10% bei Vorauszahlung (12 Monate)
            </Badge>
            <Badge variant="outline" className="text-sm">
              –25% Vor-Ort-Rabatt mit aktivem Service-Level
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {KMU_PLANS.map((plan) => {
              const isPopular = plan.id === 'kmu-standard';
              return (
                <Card 
                  key={plan.id} 
                  className={`relative flex flex-col rounded-2xl border transition-all duration-200 ${
                    isPopular 
                      ? 'border-[hsl(var(--thp-primary))] ring-2 ring-[hsl(var(--thp-primary))]' 
                      : 'border-[var(--thp-card-border)]'
                  }`}
                  style={{
                    boxShadow: 'var(--thp-shadow-sm)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isPopular) e.currentTarget.style.boxShadow = 'var(--thp-shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isPopular) e.currentTarget.style.boxShadow = 'var(--thp-shadow-sm)';
                  }}
                >
                  {isPopular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(var(--thp-cta))] text-white">
                      Beliebt
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-xs uppercase tracking-wide text-muted-foreground">
                      {plan.subtitle}
                    </CardDescription>
                    <div className="mt-3">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.pricePerEndpoint.toFixed(2)} €
                      </span>
                      <span className="text-sm text-muted-foreground">/Endpoint/Monat</span>
                    </div>
                    <Badge variant="outline" className="w-fit mt-2 text-xs">
                      Mindestumsatz: {plan.minMonthly} €/Monat
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-2 mb-6 flex-1" style={{ lineHeight: '1.5' }}>
                      {plan.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full mt-auto ${
                        isPopular 
                          ? 'bg-[hsl(var(--thp-cta))] hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[hsl(var(--thp-cta))] focus-visible:ring-offset-2' 
                          : 'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                      }`}
                    >
                      <Link to="/kmu">Mehr erfahren</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Alle Preise ohne ausgewiesene USt. gem. §19 UStG · Monatlich kündbar
        </p>
      </div>
    </section>
  );
}
