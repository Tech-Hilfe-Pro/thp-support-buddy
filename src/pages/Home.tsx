import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import BusinessGlossary from "@/components/BusinessGlossary";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import Comparison from "@/components/Comparison";
import MembershipCards from "@/components/MembershipCards";
import { buildOrganizationJsonLd } from "@/lib/structuredData";
import { COPY } from "@/data/copy";

const Home = () => {
  console.log("Home.tsx: Home component rendering");
  
  const orgLd = buildOrganizationJsonLd();

  return (
    <>
      <SEO 
        title="IT-Support in Köln & Neuss | Tech Hilfe Pro"
        description="Schnelle PC/Mac-Hilfe für Zuhause & KMU. Remote zuerst, Vor-Ort bei Bedarf. Preis in 60 Sekunden."
        path="/" 
        ogType="website"
        ogImage={`/og?title=${encodeURIComponent("Tech Hilfe Pro")}&subtitle=${encodeURIComponent("Schneller IT-Support für Zuhause & KMU")}`}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} 
      />
      
      <Hero />
      
      {/* Membership Section */}
      <MembershipCards />
      
      <ServiceCards />
      
      <BusinessGlossary items={[
        { key:"kmu", ...COPY.businessGlossary.kmu },
        { key:"msp", ...COPY.businessGlossary.msp },
        { key:"sla", ...COPY.businessGlossary.sla },
      ]}/>

      <FinalCTA />
      
      {/* Why Tech Hilfe Pro */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {COPY.home.bulletsTitle}
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {COPY.home.bullets.map((bullet, index) => (
              <li key={index} className="p-6 bg-card border border-border rounded-xl text-center">
                <p className="text-sm font-medium text-foreground">{bullet}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison Section */}
      <Comparison />

      {/* How we work */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {COPY.home.stepsTitle}
            </h2>
          </div>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COPY.home.steps.map((step, index) => (
              <li key={index} className="p-6 bg-card border border-border rounded-xl">
                <h3 className="font-semibold text-foreground mb-2">{step.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FAQ title="Häufige Fragen" items={COPY.faq.home} />
      </div>
    </>
  );
};

export default Home;