import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KassePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to contact page - checkout is handled externally
    setTimeout(() => navigate("/kontakt"), 2000);
  }, [navigate]);

  return (
    <>
      <SEO 
        title="Checkout | Tech Hilfe Pro"
        description="Checkout-Seite"
        path="/kasse"
      />
      
      <main className="mx-auto max-w-2xl px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Weiterleitung...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Sie werden zur Kontaktseite weitergeleitet.</p>
            <Button onClick={() => navigate("/kontakt")}>
              Jetzt zur Kontaktseite
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
