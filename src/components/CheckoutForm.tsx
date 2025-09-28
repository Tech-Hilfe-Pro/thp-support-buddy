import { useEffect, useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // TODO: reemplazar por payload real del carrito/cita calculado en servidor
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amountCents: 8800, 
        description: "Vor-Ort-Service Köln (Beispiel)" 
      })
    })
      .then(r => r.json())
      .then(d => setClientSecret(d.clientSecret))
      .catch(() => setMessage("Fehler beim Initialisieren der Zahlung."));
  }, []);

  useEffect(() => {
    if (!stripe || !clientSecret || !elements) return;
    // Elements will automatically update when clientSecret changes
  }, [clientSecret, stripe, elements]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${location.origin}/kasse/erfolg`
      }
    });

    if (error) {
      setMessage(error.message || "Zahlung fehlgeschlagen.");
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      {clientSecret ? (
        <>
          <PaymentElement />
          <p className="text-xs text-muted-foreground">
            Mit der Bestätigung erteilen Sie uns ein SEPA-Lastschriftmandat (falls ausgewählt).
            Die Belastung kann mehrere Bankarbeitstage dauern. Sie erhalten eine Bestätigung per E-Mail.
          </p>
          <Button 
            className="w-full" 
            disabled={submitting || !stripe || !elements}
            onClick={onSubmit}
          >
            {submitting ? "Wird verarbeitet…" : "Jetzt bezahlen"}
          </Button>
          {message && (
            <p className="text-sm text-destructive">{message}</p>
          )}
        </>
      ) : (
        <p className="text-center py-4">Wird geladen…</p>
      )}
    </Card>
  );
}