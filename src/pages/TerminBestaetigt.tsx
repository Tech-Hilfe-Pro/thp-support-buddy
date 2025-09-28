import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Calendar } from "lucide-react";
import SEO from "@/components/SEO";
import { track } from "@/lib/analytics";
import { SEO_PAGES } from "@/data/seo";

const TerminBestaetigt = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const terminId = `THP-${Date.now().toString().slice(-6)}`;
  const meta = SEO_PAGES.terminOk;

  useEffect(() => {
    // Track booking confirmed
    track("booking_confirmed");
    
    // Check if this is a return from Stripe
    const paymentIntent = searchParams.get("payment_intent");
    const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");
    const subscription = searchParams.get("subscription");

    if (paymentIntent && redirectStatus === "succeeded") {
      setPaymentStatus("payment_succeeded");
      track("payment_succeeded", { mode: "one_time" });
    } else if (subscription === "created") {
      setPaymentStatus("subscription_created");
      track("subscription_created");
    }
  }, [searchParams]);

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} />
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          {paymentStatus === "payment_succeeded" ? (
            <>
              <CreditCard className="mx-auto h-16 w-16 text-green-600 mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">Zahlung erfolgreich!</h1>
              <p className="text-lg text-muted-foreground">
                Vielen Dank! Ihre Zahlung wurde erfolgreich verarbeitet und Ihr Termin ist bestätigt.
              </p>
            </>
          ) : paymentStatus === "subscription_created" ? (
            <>
              <Calendar className="mx-auto h-16 w-16 text-green-600 mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">Abonnement aktiviert!</h1>
              <p className="text-lg text-muted-foreground">
                Ihr monatliches Abonnement wurde erfolgreich eingerichtet. Willkommen bei Tech Hilfe Pro!
              </p>
            </>
          ) : (
            <>
              <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">Termin bestätigt!</h1>
              <p className="text-lg text-muted-foreground">
                Vielen Dank für Ihr Vertrauen. Wir haben Ihren Termin erfolgreich registriert.
              </p>
            </>
          )}
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Ihre Termin-ID</CardTitle>
            <CardDescription>
              Bitte notieren Sie sich diese Nummer für Rückfragen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-2xl font-mono font-bold bg-muted px-4 py-2 rounded">
                {terminId}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Wie geht es weiter?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {paymentStatus === "payment_succeeded" ? (
                  <>
                    <li>• Ihre Zahlung wurde bestätigt (Sandbox-Modus)</li>
                    <li>• Sie erhalten in Kürze eine Rechnung per E-Mail</li>
                    <li>• Wir melden uns 1 Tag vor dem Termin telefonisch bei Ihnen</li>
                    <li>• Bei Vor-Ort-Terminen: Unsere Techniker sind pünktlich vor Ort</li>
                  </>
                ) : paymentStatus === "subscription_created" ? (
                  <>
                    <li>• Ihr Abonnement ist sofort aktiv</li>
                    <li>• Die erste Rechnung erhalten Sie in den nächsten Tagen</li>
                    <li>• Sie können jederzeit Remote-Support über unsere Hotline anfordern</li>
                    <li>• Vor-Ort-Termine erhalten den vereinbarten Abo-Rabatt</li>
                  </>
                ) : (
                  <>
                    <li>• Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details</li>
                    <li>• Wir melden uns 1 Tag vor dem Termin telefonisch bei Ihnen</li>
                    <li>• Bei Vor-Ort-Terminen: Unsere Techniker sind pünktlich vor Ort</li>
                    <li>• Bei Remote-Terminen: Sie erhalten die Einwahldetails per E-Mail</li>
                  </>
                )}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Erreichbarkeit</h3>
              <div className="text-sm space-y-1">
                <p><strong>Telefon:</strong> +49 221 123 456 7</p>
                <p><strong>E-Mail:</strong> info@techhilfe-pro.de</p>
                <p><strong>Notfall-Hotline:</strong> +49 221 987 654 3</p>
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button asChild className="w-full" size="lg">
                <a href="/">Zur Startseite</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Bei Fragen oder Änderungen kontaktieren Sie uns gerne unter{" "}
            <a href="tel:+492211234567" className="text-primary hover:underline">
              +49 221 123 456 7
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default TerminBestaetigt;