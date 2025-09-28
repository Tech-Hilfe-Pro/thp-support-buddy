import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoaderCircle } from "lucide-react";
import { loadStripeClient } from "@/lib/stripeClient";
import { Quote } from "@/lib/quote";
import { PRIVAT_ABOS, KMU_TIERS, STRIPE_PLAN_TO_ENV } from "@/data/pricing";
import { formatEUR } from "@/lib/format";

type Mode = "one_time" | "subscription";
type CheckoutProps = { 
  mode: Mode; 
  quote?: Quote; 
  planId?: "S"|"M"|"L"|"starter"|"grow"|"pro";
};

const StripeCheckout = ({ mode, quote, planId }: CheckoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [sepaAccepted, setSepaAccepted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const elementRef = useRef<HTMLDivElement>(null);
  const stripeRef = useRef<any>(null);
  const elementsRef = useRef<any>(null);

  useEffect(() => {
    initializeStripe();
  }, [mode, quote, planId]);

  const initializeStripe = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (mode === "one_time" && !quote) {
        throw new Error("Quote ist erforderlich für Einmalzahlung");
      }

      if (mode === "subscription" && !planId) {
        throw new Error("Plan-ID ist erforderlich für Abonnement");
      }

      const stripe = await loadStripeClient();
      if (!stripe) {
        throw new Error("Stripe konnte nicht geladen werden");
      }
      stripeRef.current = stripe;

      // Create PaymentIntent or SetupIntent
      let secret: string;
      let custId = "";

      if (mode === "one_time") {
        const response = await fetch("/api/stripe/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amountCents: Math.round((quote!.total) * 100),
            description: `IT-Support: ${quote!.serviceTitle}`,
            customerEmail: ""
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "PaymentIntent konnte nicht erstellt werden");
        }

        const data = await response.json();
        secret = data.client_secret;
      } else {
        const response = await fetch("/api/stripe/create-setup-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail: ""
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "SetupIntent konnte nicht erstellt werden");
        }

        const data = await response.json();
        secret = data.client_secret;
        custId = data.customerId || "";
      }

      setClientSecret(secret);
      setCustomerId(custId);

      // Create elements
      const elements = stripe.elements({
        clientSecret: secret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "hsl(var(--primary))",
            colorBackground: "hsl(var(--background))",
            colorText: "hsl(var(--foreground))",
            borderRadius: "6px"
          }
        }
      });
      elementsRef.current = elements;

      const paymentElement = elements.create("payment", {
        layout: "tabs"
      });

      if (elementRef.current) {
        paymentElement.mount(elementRef.current);
      }

      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!stripeRef.current || !elementsRef.current || !sepaAccepted) {
      return;
    }

    try {
      setIsProcessing(true);
      setError("");

      const returnUrl = `${window.location.origin}/termin/bestaetigt`;

      if (mode === "one_time") {
        const { error } = await stripeRef.current.confirmPayment({
          elements: elementsRef.current,
          confirmParams: {
            return_url: returnUrl
          }
        });

        if (error) {
          throw new Error(error.message || "Zahlung fehlgeschlagen");
        }
      } else {
        const { error, setupIntent } = await stripeRef.current.confirmSetup({
          elements: elementsRef.current,
          confirmParams: {
            return_url: returnUrl
          }
        });

        if (error) {
          throw new Error(error.message || "Zahlungsmittel konnte nicht gespeichert werden");
        }

        if (setupIntent?.status === "succeeded" && setupIntent.payment_method) {
          // Create subscription
          const envKey = STRIPE_PLAN_TO_ENV[planId!];
          const response = await fetch("/api/stripe/create-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: customerId,
              customerEmail: "",
              payment_method: setupIntent.payment_method,
              priceId: envKey
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Abonnement konnte nicht erstellt werden");
          }

          window.location.href = returnUrl + "?subscription=created";
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
      setIsProcessing(false);
    }
  };

  // Get plan details for display
  const getPlanDetails = () => {
    if (!planId) return null;

    if (["S", "M", "L"].includes(planId)) {
      return PRIVAT_ABOS.find(p => p.id === planId);
    } else {
      return KMU_TIERS.find(p => p.id === planId);
    }
  };

  const planDetails = getPlanDetails();

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Payment Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === "one_time" ? "Zahlung" : "Abonnement"}
            </CardTitle>
            <CardDescription>
              {mode === "one_time" 
                ? "Bezahlen Sie sicher per SEPA-Lastschrift, Karte oder Apple Pay"
                : "Richten Sie Ihr monatliches Abonnement ein"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" role="alert" aria-live="polite">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Stripe Payment Element */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <LoaderCircle className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Zahlungsformular wird geladen...</span>
                </div>
              ) : (
                <div 
                  ref={elementRef} 
                  id="payment-element"
                  className="min-h-[200px]"
                />
              )}
            </div>

            {/* SEPA Mandate Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sepa-mandate"
                checked={sepaAccepted}
                onCheckedChange={(checked) => setSepaAccepted(checked === true)}
                disabled={isLoading || isProcessing}
              />
              <Label 
                htmlFor="sepa-mandate" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ich akzeptiere das SEPA-Lastschriftmandat und die Allgemeinen Geschäftsbedingungen *
              </Label>
            </div>

            {mode === "subscription" && (
              <div className="text-sm text-muted-foreground">
                Monatlich kündbar, sofern nicht anders vermerkt.
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading || isProcessing || !sepaAccepted}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                  Verarbeitung...
                </>
              ) : mode === "one_time" ? (
                "Zahlung ausführen"
              ) : (
                "Zahlungsmittel speichern & Abo starten"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Zusammenfassung</CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "one_time" && quote ? (
              <div className="space-y-3">
                <div>
                  <strong>Service:</strong> {quote.serviceTitle}
                </div>
                <div>
                  <strong>PLZ:</strong> {quote.plz}
                </div>
                <hr />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Arbeitszeit {quote.urgency !== "normal" && `(${quote.urgency === "heute" ? "+15%" : "+30%"})`}</span>
                    <span>{formatEUR(quote.breakdown.arbeitszeitBrutto)}</span>
                  </div>
                  {quote.subscription && (
                    <div className="flex justify-between text-green-600">
                      <span>Abo-Rabatt (20%)</span>
                      <span>–{formatEUR(quote.breakdown.rabattAbo)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Anfahrt</span>
                    <span>{formatEUR(quote.breakdown.anfahrt)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Gesamt</span>
                    <span>{formatEUR(quote.total)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Einmalige Zahlung für IT-Support-Leistung
                </p>
              </div>
            ) : mode === "subscription" && planDetails ? (
              <div className="space-y-3">
                <div>
                  <strong>Plan:</strong> {planDetails.name}
                </div>
                <div>
                  <strong>Preis:</strong> {
                    "preis" in planDetails 
                      ? `${formatEUR(planDetails.preis)}/Monat`
                      : `${formatEUR(planDetails.preisProGeraet)}/Gerät/Monat`
                  }
                </div>
                <hr />
                <div>
                  <strong>Leistungen:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    {planDetails.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground">
                  Monatliche Abrechnung, jederzeit kündbar
                </p>
              </div>
            ) : (
              <div className="text-muted-foreground">
                Keine Details verfügbar
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StripeCheckout;