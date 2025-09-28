import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripeClient";
import SEO from "@/components/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AboForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      const r = await fetch("/api/stripe/create-subscription", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ email })
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
  return (
    <>
      <SEO 
        title="Mitgliedschaft | Tech Hilfe Pro" 
        description="Monatliche IT-Unterstützung für Privat & KMU." 
        path="/abo" 
      />
      <section className="section">
        <div className="container max-w-2xl">
          <h1 className="text-2xl font-semibold mb-6">IT-Mitgliedschaft</h1>
          <p className="text-muted-foreground mb-6">
            Erhalten Sie kontinuierliche IT-Unterstützung mit unserer monatlichen Mitgliedschaft.
          </p>
          
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
        </div>
      </section>
    </>
  );
}