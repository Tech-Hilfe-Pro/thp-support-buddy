import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SEO from "@/components/SEO";
import { track, bucketAmount } from "@/lib/analytics";
import { readQuoteFromStorage, Quote } from "@/lib/quote";
import StripeCheckout from "@/components/StripeCheckout";
import { SEO_PAGES } from "@/data/seo";
import { COPY } from "@/data/copy";

const meta = { title: "Intern – Bitte nicht indexieren", description: "", path: typeof location !== "undefined" ? location.pathname : "/" };

type Mode = "one_time" | "subscription";
type PlanId = "S"|"M"|"L"|"starter"|"grow"|"pro";

const Kasse = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const meta = SEO_PAGES.kasse;
  const [mode, setMode] = useState<Mode | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [planId, setPlanId] = useState<PlanId | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "preconnect"; l.href = "https://js.stripe.com"; l.crossOrigin = "";
    document.head.appendChild(l);
    return () => { if (document.head.contains(l)) document.head.removeChild(l); };
  }, []);

  useEffect(() => {
    // Determine mode
    const stateMode = location.state?.mode;
    const queryMode = searchParams.get("mode");
    const determinedMode = stateMode || queryMode;

    if (!determinedMode || !["one_time", "subscription"].includes(determinedMode)) {
      setError("Ungültiger Kassenmodus. Bitte wählen Sie eine gültige Option.");
      return;
    }

    setMode(determinedMode as Mode);

    if (determinedMode === "one_time") {
      // Load quote from storage
      const storedQuote = readQuoteFromStorage();
      if (!storedQuote) {
        setError("Keine Preisberechnung gefunden. Bitte nutzen Sie zunächst unseren Rechner.");
        return;
      }
      setQuote(storedQuote);
    } else if (determinedMode === "subscription") {
      // Get plan ID
      const statePlanId = location.state?.planId;
      const queryPlanId = searchParams.get("plan");
      const determinedPlanId = statePlanId || queryPlanId;

      if (!determinedPlanId || !["S", "M", "L", "starter", "grow", "pro"].includes(determinedPlanId)) {
        setError("Kein gültiger Plan ausgewählt. Bitte wählen Sie zunächst ein Paket.");
        return;
      }
      
      setPlanId(determinedPlanId as PlanId);
    }

    setError("");

    // Track checkout started based on mode
    if (determinedMode === "one_time") {
      const storedQuote = readQuoteFromStorage();
      if (storedQuote) {
        track("checkout_started", {
          mode: "one_time",
          amountBucket: bucketAmount(storedQuote.total * 100)
        });
      }
    } else if (determinedMode === "subscription") {
      const statePlanId = location.state?.planId;
      const queryPlanId = searchParams.get("plan");
      const planIdForTracking = statePlanId || queryPlanId;
      if (planIdForTracking) {
        track("checkout_started", {
          mode: "subscription",
          planId: planIdForTracking
        });
      }
    }
  }, [location.state, searchParams]);

  if (error) {
    return (
      <>
        <SEO title={meta.title} description={meta.description} path={meta.path} robots="noindex,nofollow" />
        
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">{COPY.checkout.title}</h1>
          
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild className="flex-1">
              <a href="/pakete-preise#rechner">Zum Preis-Rechner</a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a href="/pakete-preise">Zu den Paketen</a>
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (!mode) {
    return (
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Kasse wird geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} robots="noindex,nofollow" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Kasse</h1>
          <p className="text-lg text-muted-foreground mb-12">
            {mode === "one_time" 
              ? "Bezahlen Sie sicher für Ihre IT-Support-Leistung"
              : "Richten Sie Ihr monatliches Abonnement ein"
            }
          </p>

          <StripeCheckout 
            mode={mode}
            quote={quote || undefined}
            planId={planId || undefined}
          />

          {/* Security Notice */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm">
                  <strong>Sichere Zahlung:</strong> Ihre Zahlungsdaten werden verschlüsselt über Stripe verarbeitet. 
                  Wir speichern keine Kreditkartendaten.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Kasse;