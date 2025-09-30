import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Shield, Clock, Headphones } from "lucide-react";
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
          <>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {PRIVAT_PLANS.map((plan) => (
                <Card key={plan.id} className="relative flex flex-col">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {plan.badges.map((badge, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {plan.claim}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.preis.toFixed(2).replace('.', ',')} €
                      </span>
                      <span className="text-muted-foreground ml-2">/Monat</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-auto">
                      <Link to="/kontakt">Abo wählen</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Savings Examples */}
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-3 text-center">Spürbare Ersparnis bei jedem Vor-Ort-Termin</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Beispiel Haus-IT Start:</p>
                  <p className="font-medium">Köln Kern 79 €/h → mit –15% nur <span className="text-primary font-bold">67,15 €/h</span></p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Beispiel Haus-IT Plus:</p>
                  <p className="font-medium">Vor-Ort 95 €/h → mit –25% nur <span className="text-primary font-bold">71,25 €/h</span></p>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-3">
                Abo amortisiert sich oft bereits beim ersten Einsatz. Kein Risiko: monatlich kündbar, volle Transparenz.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="max-w-4xl mx-auto mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Monatlich kündbar</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Keine versteckten Kosten</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Support vor Ort & remote</p>
              </div>
            </div>

            {/* Micro-FAQ */}
            <div className="max-w-4xl mx-auto mt-8">
              <h3 className="font-semibold mb-4 text-center">Häufige Fragen zu den Abos</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="devices">
                  <AccordionTrigger className="text-left">Welche Geräte sind abgedeckt?</AccordionTrigger>
                  <AccordionContent>
                    Alle Privatgeräte im Haushalt (PC, Laptop, Smartphone, Drucker, Smart-TV, etc.). 
                    Haushalt = alle Privatgeräte unter einer Adresse. Fair-Use, Support-Leistungen werden 
                    regulär nach Aufwand abgerechnet; Rabatte gelten nur Vor-Ort. Remote-Hilfe nach Aufwand (0,5-h-Takt).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="included">
                  <AccordionTrigger className="text-left">Sind Vor-Ort-Leistungen inklusive?</AccordionTrigger>
                  <AccordionContent>
                    Leistungen werden nach Aufwand berechnet; Abo reduziert den Preis vor Ort um 15% bzw. 25%. 
                    Ziel-Reaktionszeiten sind Best-Effort und können je nach Auslastung variieren.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="contract">
                  <AccordionTrigger className="text-left">Gibt es eine Mindestlaufzeit?</AccordionTrigger>
                  <AccordionContent>
                    Nein, monatlich kündbar ohne Mindestlaufzeit.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </>
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
          {mode === 'privat' 
            ? 'Endpreise gem. § 19 UStG (Kleinunternehmer). Monatlich kündbar.'
            : 'Alle Preise ohne ausgewiesene USt. gem. §19 UStG · Monatlich kündbar'
          }
        </p>
      </div>
    </section>
  );
}
