import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  isPopular?: boolean;
  features: string[];
  description: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Plan Básico",
    price: 89,
    description: "Perfekt für kleine Haushalte und Einzelpersonen",
    features: [
      "Bis 3 Geräte abgedeckt",
      "Remote-Support (2h/Monat)",
      "E-Mail-Support",
      "Grundlegende Systemwartung",
      "Kostenloser Erstcheck",
      "Monatlich kündbar"
    ]
  },
  {
    id: "standard",
    name: "Plan Estándar",
    price: 150,
    isPopular: true,
    description: "Ideal für Familien und kleine Büros",
    features: [
      "Bis 5 Geräte abgedeckt",
      "Remote-Support unbegrenzt",
      "Vor-Ort-Service (1x/Monat)",
      "24/7 Telefon-Hotline",
      "Proaktive Systemüberwachung",
      "Backup-Einrichtung inklusive"
    ]
  },
  {
    id: "premium",
    name: "Plan Premium",
    price: 250,
    description: "Vollumfassender IT-Service für anspruchsvolle Nutzer",
    features: [
      "Unbegrenzte Geräte",
      "Premium-Support rund um die Uhr",
      "Vor-Ort-Service (2x/Monat)",
      "Persönlicher IT-Betreuer",
      "Cybersecurity-Paket",
      "Hardware-Rabatte exklusiv"
    ]
  }
];

interface PricingCardsProps {
  onPlanSelect?: (planId: string) => void;
}

export default function PricingCards({ onPlanSelect }: PricingCardsProps) {
  const handlePlanSelect = (planId: string) => {
    if (onPlanSelect) {
      onPlanSelect(planId);
    } else {
      // Por defecto, navegar a la página de checkout/contacto
      window.location.href = "/termin";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Wählen Sie Ihren Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transparente Preise für professionellen IT-Support. Alle Pläne sind monatlich kündbar 
            und ohne versteckte Kosten.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12 mb-8">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative flex flex-col p-8 h-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                plan.isPopular 
                  ? 'border-2 shadow-lg' 
                  : 'border hover:border-border'
              }`}
              style={plan.isPopular ? { 
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.02)'
              } : {}}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md"
                  style={{ backgroundColor: '#f97316' }}
                >
                  Am beliebtesten
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">
                    {plan.price} €
                  </span>
                  <span className="text-muted-foreground ml-2">/Monat</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  *Kündbar monatlich, keine MwSt gem. §19 UStG
                </p>
              </div>

              {/* Features List */}
              <div className="flex-grow mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check 
                        className="h-5 w-5 text-green-600 shrink-0 mt-0.5" 
                        aria-hidden="true"
                      />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-3 font-semibold transition-all duration-200 ${
                  plan.isPopular
                    ? 'text-white shadow-lg hover:shadow-xl'
                    : 'bg-background border-2 text-foreground hover:text-white'
                }`}
                style={plan.isPopular 
                  ? { backgroundColor: '#f97316' }
                  : { borderColor: '#f97316' }
                }
                onMouseEnter={(e) => {
                  if (!plan.isPopular) {
                    e.currentTarget.style.backgroundColor = '#f97316';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.isPopular) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                Plan auswählen
              </Button>
            </Card>
          ))}
        </div>

        {/* Legal Notice */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            *Alle Preise sind Endpreise (nach §19 UStG).
          </p>
          <p className="text-xs text-muted-foreground">
            Vertragsdetails und AGB finden Sie in unseren{" "}
            <a 
              href="/recht/agb" 
              className="underline hover:no-underline"
              style={{ color: '#f97316' }}
            >
              Allgemeinen Geschäftsbedingungen
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}