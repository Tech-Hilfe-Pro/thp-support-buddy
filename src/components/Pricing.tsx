import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PRIVAT_PLANS, KMU_PLANS } from "@/data/pricingData";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [mode, setMode] = useState<'privat' | 'kmu'>('privat');

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparente Preise ohne Überraschungen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Wählen Sie das passende Paket für Ihre Bedürfnisse
          </p>
          
          <div className="inline-flex gap-2 p-1 bg-background rounded-lg border">
            <button
              onClick={() => setMode('privat')}
              className={`px-6 py-2 rounded-md transition-colors ${
                mode === 'privat'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              Privat
            </button>
            <button
              onClick={() => setMode('kmu')}
              className={`px-6 py-2 rounded-md transition-colors ${
                mode === 'kmu'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              KMU
            </button>
          </div>
        </div>

        {mode === 'privat' ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRIVAT_PLANS.map((plan) => (
              <Card key={plan.id} className="relative">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">
                      {plan.preis.toFixed(2)} €
                    </span>
                    <span className="text-muted-foreground">/Monat</span>
                  </CardDescription>
                  <Badge variant="secondary" className="w-fit mt-2">
                    –{Math.round(plan.rabattVorOrt * 100)}% auf Vor-Ort-Einsätze
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/kontakt">Jetzt wählen</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {KMU_PLANS.map((plan) => (
              <Card key={plan.id} className={plan.id === 'standard' ? 'border-primary shadow-lg' : ''}>
                {plan.id === 'standard' && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    Empfohlen
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">
                      {plan.preisProEndpoint.toFixed(2)} €
                    </span>
                    <span className="text-muted-foreground">/Endpoint/Monat</span>
                  </CardDescription>
                  <Badge variant="outline" className="w-fit mt-2">
                    Mindestumsatz: {plan.mindestumsatz} €/Monat
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" variant={plan.id === 'standard' ? 'default' : 'outline'}>
                    <Link to="/kmu">Mehr erfahren</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-8">
          Alle Preise ohne ausgewiesene USt. gem. §19 UStG · Monatlich kündbar
        </p>
      </div>
    </section>
  );
}
