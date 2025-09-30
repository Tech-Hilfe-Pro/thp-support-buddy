import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { XCircle, ArrowLeft, Phone } from "lucide-react";

export default function Abbruch() {
  return (
    <>
      <SEO 
        title="Zahlung abgebrochen | Tech Hilfe Pro" 
        description="Die Zahlung wurde abgebrochen. Versuchen Sie es erneut oder kontaktieren Sie uns." 
        path="/kasse/abbruch" 
        robots="noindex,nofollow" 
      />
      <section className="section min-h-[60vh] flex items-center">
        <div className="container max-w-xl">
          <Card className="p-8 text-center">
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-4">Zahlung abgebrochen</h1>
            <p className="text-muted-foreground mb-6">
              Keine Sorge - es wurden keine Kosten berechnet. Sie können den Vorgang 
              jederzeit wiederholen oder uns direkt kontaktieren.
            </p>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/pakete-preise">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück zu den Preisen
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/kontakt">
                  <Phone className="w-4 h-4 mr-2" />
                  Persönlich beraten lassen
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
              <p>Haben Sie Fragen? Rufen Sie uns an:</p>
              <a href="tel:+4922175089234" className="font-semibold text-primary hover:underline">
                +49 221 75089234
              </a>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}