import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripeClient";
import SEO from "@/components/SEO";
import MembershipCards from "@/components/MembershipCards";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRIVAT_ABOS, KMU_TIERS, STRIPE_PLAN_TO_ENV } from "@/data/pricing";

function AboForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const selectedPlanId = searchParams.get('plan');
  const allPlans = [...PRIVAT_ABOS, ...KMU_TIERS];
  const selectedPlan = selectedPlanId ? allPlans.find(p => p.id === selectedPlanId) : null;

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      const r = await fetch("/api/stripe/create-subscription", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          email,
          priceId: selectedPlan ? STRIPE_PLAN_TO_ENV[selectedPlan.id] : "PRICE_PRIVAT_S" 
        })
      });
      
      const d = await r.json();
      
      if (d.error) {
        setMessage(d.error);
      } else {
        setClientSecret(d.clientSecret);
        // Elements will automatically update when clientSecret changes
      }
    } catch (error) {
      setMessage("Fehler beim Erstellen der Mitgliedschaft.");
    }
    
    setLoading(false);
  };

  const confirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    setLoading(true);
    
    const { error } = await stripe.confirmPayment({ 
      elements, 
      confirmParams: { 
        return_url: `${location.origin}/kasse/erfolg` 
      } 
    });
    
    if (error) {
      setMessage(error.message || "Zahlung fehlgeschlagen.");
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      {!clientSecret ? (
        <form onSubmit={start} className="space-y-4">
          <div>
            <Label htmlFor="email">E-Mail-Adresse</Label>
            <Input 
              id="email"
              type="email"
              placeholder="ihre@email.de" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <Button className="w-full" disabled={loading || !email}>
            {loading ? "Wird erstellt…" : "Mitgliedschaft starten"}
          </Button>
        </form>
      ) : (
        <form onSubmit={confirm} className="space-y-4">
          <PaymentElement />
          <p className="text-xs text-muted-foreground">
            Die erste Zahlung wird sofort fällig. Danach monatliche Abbuchung.
          </p>
          <Button className="w-full" disabled={loading || !stripe || !elements}>
            {loading ? "Wird verarbeitet…" : "Zahlung bestätigen"}
          </Button>
        </form>
      )}
      
      {message && (
        <p className="text-sm text-destructive">{message}</p>
      )}
    </Card>
  );
}

export default function AboPage() {
  const [searchParams] = useSearchParams();
  const selectedPlanId = searchParams.get('plan');
  const allPlans = [...PRIVAT_ABOS, ...KMU_TIERS];
  const selectedPlan = selectedPlanId ? allPlans.find(p => p.id === selectedPlanId) : null;
  
  return (
    <>
      <SEO 
        title="Mitgliedschaft | Tech Hilfe Pro" 
        description="Planbare IT-Unterstützung für Zuhause & KMU. Mitglieder sparen 20 % Vor-Ort." 
        path="/abo" 
      />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">IT-Mitgliedschaft</h1>
            <p className="text-lg text-muted-foreground">
              Planbare IT-Unterstützung – ohne hohe Fixkosten. Remote zuerst, Vor-Ort bei Bedarf.
            </p>
          </header>

          {selectedPlan ? (
            <section id="checkout" className="max-w-2xl mx-auto mb-16">
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-2">Gewählter Plan: {selectedPlan.name}</h2>
                <p className="text-2xl font-bold text-primary">
                  {((selectedPlan as any).preis || (selectedPlan as any).preisProGeraet).toFixed(2)} € / Monat
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {(selectedPlan as any).rabattVorOrt && `Mitglieder sparen ${((selectedPlan as any).rabattVorOrt * 100).toFixed(0)} % auf Arbeitszeit vor Ort`}
                </p>
              </div>
              
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  appearance: { 
                    theme: "stripe",
                    variables: { 
                      colorPrimary: "hsl(217 91% 60%)" 
                    } 
                  }, 
                  currency: "eur", 
                  mode: "subscription", 
                  amount: 0 
                }}
              >
                <AboForm />
              </Elements>
            </section>
          ) : null}

          {/* Membership Cards */}
          <section id="vorteile" className="scroll-mt-24">
            <MembershipCards />
          </section>

          {/* Cross-link to pricing */}
          <section className="mt-16 text-center">
            <div className="bg-muted/30 p-8 rounded-lg max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Einzeltermine gewünscht?</h2>
              <p className="text-muted-foreground mb-6">
                Für gelegentliche IT-Hilfe bieten wir auch Einzeltermine an.
              </p>
              <Button asChild variant="outline" size="lg">
                <a href="/pakete-preise">Zu den Einzelpreisen</a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}