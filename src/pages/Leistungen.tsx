import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import MiniWizard from "@/components/MiniWizard";
import ServiceFinder from "@/components/ServiceFinder";
import type { WizardState } from "@/lib/filters";

export default function Leistungen() {
  const [wizardState, setWizardState] = useState<WizardState | undefined>(undefined);

  const handleWizardComplete = (state: WizardState) => {
    setWizardState(state);
  };

  return (
    <>
      <SEO
        title="IT-Leistungen für Privatkunden | Tech Hilfe Pro"
        description="Umfassende IT-Services: Computer-Reparatur, WLAN-Setup, Smart-Home, Drucker, und mehr. Remote oder vor Ort in Köln & Neuss."
        path="/leistungen"
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Unsere Leistungen</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von Computer-Reparatur bis Smart-Home – finden Sie schnell den passenden Service.
          </p>
        </div>

        {/* Mini-Wizard */}
        <MiniWizard onComplete={handleWizardComplete} />

        {/* Service Finder */}
        <ServiceFinder wizardState={wizardState} />

        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">Bereit anzufangen?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-cta hover:bg-cta/90 text-cta-foreground">
              <Link to="/preise">Preise ansehen</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
