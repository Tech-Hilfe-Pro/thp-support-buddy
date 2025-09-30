import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PriceCalculatorNew from "@/components/PriceCalculatorNew";
import SEO from "@/components/SEO";
import Pricing from "@/components/Pricing";

export default function PaketePreisePage() {
  return (
    <>
      <SEO 
        title="Preise | Tech Hilfe Pro"
        description="Transparente IT-Preise für Privat & KMU. Monatliche Pakete oder On-Demand."
        path="/preise" 
      />
      
      <main id="main" className="mx-auto max-w-7xl px-3 lg:px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Preise & Pakete</h1>

        <Pricing />

        <section id="rechner" className="mt-16 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-center">Preis-Rechner</h2>
          <PriceCalculatorNew />
        </section>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/kontakt">Jetzt Kontakt aufnehmen</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
