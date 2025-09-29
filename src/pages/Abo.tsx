import SEO from "@/components/SEO";
import MembershipCards from "@/components/MembershipCards";
import VatNotice from "@/components/VatNotice";
import { useSearchParams } from "react-router-dom";
import { BENEFITS_PRIVAT } from "@/data/copy";
import { Button } from "@/components/ui/button";
import { PRIVAT_ABOS, KMU_TIERS } from "@/data/pricing";
import BuyButton from "@/components/BuyButton";


export default function AboPage() {
  const [searchParams] = useSearchParams();
  const selectedPlanId = searchParams.get('plan');
  const allPlans = [...PRIVAT_ABOS, ...KMU_TIERS];
  const selectedPlan = selectedPlanId ? allPlans.find(p => p.id === selectedPlanId) : null;
  
  return (
    <>
      <SEO 
        title="Mitgliedschaft | Tech Hilfe Pro" 
        description="Planbare IT-Unterstützung für Zuhause & KMU. Mitglieder sparen 20 % Vor-Ort." 
        path="/abo" 
      />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">IT-Mitgliedschaft</h1>
            <p className="text-lg text-muted-foreground">
              Planbare IT-Unterstützung – ohne hohe Fixkosten. Remote zuerst, Vor-Ort bei Bedarf.
            </p>
          </header>

          {selectedPlan ? (
            <section id="checkout" className="max-w-2xl mx-auto mb-16">
              <div className="bg-muted/30 p-6 rounded-lg mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Gewählter Plan: {selectedPlan.name}</h2>
                <p className="text-2xl font-bold text-primary mb-4">
                  {((selectedPlan as any).preis || (selectedPlan as any).preisProGeraet).toFixed(2)} € / Monat
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {(selectedPlan as any).rabattVorOrt && `Mitglieder sparen ${((selectedPlan as any).rabattVorOrt * 100).toFixed(0)} % auf Arbeitszeit vor Ort`}
                </p>
                
                <BuyButton 
                  kind={PRIVAT_ABOS.some(p => p.id === selectedPlan.id) ? "privat" : "kmu"}
                  plan={selectedPlan.id}
                  className="w-full max-w-md"
                >
                  Jetzt Mitgliedschaft starten
                </BuyButton>
                
                <VatNotice />
              </div>
            </section>
          ) : null}

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Ihre Vorteile als Mitglied</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {BENEFITS_PRIVAT.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <span className="text-green-600 mt-0.5 font-bold">✓</span>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Membership Cards */}
          <section id="vorteile" className="scroll-mt-24">
            <MembershipCards />
          </section>

          {/* Cross-link to pricing */}
          <section className="mt-16 text-center">
            <div className="bg-muted/30 p-8 rounded-lg max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Einzeltermine gewünscht?</h2>
              <p className="text-muted-foreground mb-6">
                Für gelegentliche IT-Hilfe bieten wir auch Einzeltermine an.
              </p>
              <Button asChild variant="outline" size="lg">
                <a href="/pakete-preise">Zu den Einzelpreisen</a>
              </Button>
            </div>
            <VatNotice />
          </section>
        </div>
      </div>
    </>
  );
}