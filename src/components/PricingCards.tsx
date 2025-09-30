import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  planKey: string; // Mapping zu Backend
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Plan Básico",
    price: 89,
    description: "Perfekt für kleine Unternehmen",
    planKey: "privat_s",
    features: [
      "Bis 3 Geräte abgedeckt",
      "Remote-Support 4h/Monat",
      "Telefon-Support werktags",
      "Software-Updates basic",
      "E-Mail-Support"
    ]
  },
  {
    id: "standard", 
    name: "Plan Estándar",
    price: 149,
    description: "Ideal für wachsende Teams",
    planKey: "privat_m",
    isPopular: true,
    features: [
      "Bis 8 Geräte abgedeckt", 
      "Remote-Support unbegrenzt",
      "Prioritätssupport 24/7",
      "Erweiterte Sicherheitsupdates",
      "Monatliche Wartung vor Ort",
      "Datensicherung inklusive"
    ]
  },
  {
    id: "premium",
    name: "Plan Premium", 
    price: 229,
    description: "Vollumfängliche IT-Betreuung",
    planKey: "privat_l",
    features: [
      "Unbegrenzte Geräte",
      "Dedicated Account Manager",
      "SLA 2h Reaktionszeit",
      "Proaktive Systemüberwachung",
      "Wöchentliche Vor-Ort-Termine",
      "Notfall-Support außerhalb der Geschäftszeiten"
    ]
  }
];

interface PricingCardsProps {
  onPlanSelect?: (planId: string) => void;
}

export default function PricingCards({ onPlanSelect }: PricingCardsProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [dsgvoAccepted, setDsgvoAccepted] = useState(false);

  const handlePlanSelect = async (plan: PricingPlan) => {
    if (!dsgvoAccepted) {
      toast.error("Bitte akzeptieren Sie die Datenschutzbestimmungen");
      return;
    }

    if (onPlanSelect) {
      onPlanSelect(plan.id);
      return;
    }

    setLoading(plan.id);

    try {
      // Create checkout session
      const response = await fetch('/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan.planKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Erstellen der Checkout-Session');
      }

      // Load Stripe and redirect
      const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) {
        throw new Error('Stripe Publishable Key nicht konfiguriert');
      }

      const stripe = await loadStripe(publishableKey);
      if (!stripe) {
        throw new Error('Stripe konnte nicht geladen werden');
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Unsere Preispakete</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Wählen Sie den Plan, der am besten zu Ihren IT-Anforderungen passt. 
            Transparent, fair und ohne versteckte Kosten.
          </p>
        </div>

        {/* DSGVO Hinweis */}
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-accent/50 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={dsgvoAccepted}
              onChange={(e) => setDsgvoAccepted(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm">
              Ich habe die{" "}
              <a 
                href="/recht/datenschutz" 
                className="text-primary underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzerklärung
              </a>{" "}
              gelesen und stimme der Verarbeitung meiner Daten durch Stripe zu.
            </span>
          </label>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative p-6 hover:shadow-lg transition-shadow ${
                plan.isPopular 
                  ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/50' 
                  : ''
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white">
                  Am beliebtesten
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold">{plan.price} €</span>
                  <span className="text-muted-foreground">/Monat</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  *Kündbar monatlich, keine MwSt gem. §19 UStG
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handlePlanSelect(plan)}
                disabled={loading === plan.id || !dsgvoAccepted}
                className={`w-full ${
                  plan.isPopular 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : ''
                }`}
              >
                {loading === plan.id ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Wird geladen...
                  </div>
                ) : (
                  'Plan auswählen'
                )}
              </Button>
            </Card>
          ))}
        </div>

        {/* Legal disclaimers */}
        <div className="text-center mt-12 space-y-2 text-sm text-muted-foreground">
          <p>*Alle Preise sind Endpreise (nach §19 UStG).</p>
          <p>
            Weitere Informationen finden Sie in unseren{" "}
            <a href="/recht/agb" className="text-primary underline hover:no-underline">
              AGB
            </a>{" "}
            und der{" "}
            <a href="/recht/datenschutz" className="text-primary underline hover:no-underline">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}