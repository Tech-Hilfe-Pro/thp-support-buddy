import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Fehler() {
  return (
    <>
      <SEO 
        title="Zahlung fehlgeschlagen | Tech Hilfe Pro" 
        description="Es gab ein Problem mit Ihrer Zahlung." 
        path="/kasse/fehler" 
        robots="noindex,nofollow" 
      />
      <section className="section">
        <div className="container max-w-xl">
          <Card className="p-8 text-center">
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-4">Zahlung fehlgeschlagen</h1>
            <p className="text-muted-foreground mb-6">
              Leider konnte Ihre Zahlung nicht verarbeitet werden. 
              Bitte versuchen Sie es erneut oder kontaktieren Sie uns.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/kontakt">Kontakt</Link>
              </Button>
              <Button asChild>
                <Link to="/kasse">Erneut versuchen</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}