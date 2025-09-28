import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Erfolg() {
  return (
    <>
      <SEO 
        title="Zahlung eingegangen | Tech Hilfe Pro" 
        description="Danke! Wir bestätigen Ihre Zahlung." 
        path="/kasse/erfolg" 
        robots="noindex,nofollow" 
      />
      <section className="section">
        <div className="container max-w-xl">
          <Card className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-4">Danke für Ihre Zahlung!</h1>
            <p className="text-muted-foreground mb-6">
              Ihre Zahlung wird verarbeitet. Bei SEPA-Lastschrift kann es einige Bankarbeitstage dauern.
              Sie erhalten eine Bestätigung per E-Mail.
            </p>
            <Button asChild>
              <Link to="/">Zur Startseite</Link>
            </Button>
          </Card>
        </div>
      </section>
    </>
  );
}