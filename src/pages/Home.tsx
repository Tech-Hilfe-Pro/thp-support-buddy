import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import ServiceCards from "@/components/ServiceCards";
import BusinessGlossary from "@/components/BusinessGlossary";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import WhatsAppFab from "@/components/WhatsAppFab";
import { buildOrganizationJsonLd } from "@/lib/structuredData";
import { COPY } from "@/data/copy";
import { Zap, ShieldCheck, MapPin } from "lucide-react";

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
      
      <Pricing />
      
      <ServiceCards />
      
      {/* Why Tech Hilfe Pro */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {COPY.home.bulletsTitle}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-thp-primary/10 mb-4">
                <Zap className="w-8 h-8 text-thp-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {COPY.home.bullets[0]}
              </h3>
              <p className="text-sm text-muted-foreground">
                Wir reagieren schnell – remote sofort, vor Ort innerhalb von 24h.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-thp-primary/10 mb-4">
                <ShieldCheck className="w-8 h-8 text-thp-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {COPY.home.bullets[1]}
              </h3>
              <p className="text-sm text-muted-foreground">
                Sie wissen vorher, was es kostet – keine versteckten Gebühren.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-thp-primary/10 mb-4">
                <MapPin className="w-8 h-8 text-thp-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {COPY.home.bullets[2]}
              </h3>
              <p className="text-sm text-muted-foreground">
                Lokaler Service für Privatpersonen und kleine Unternehmen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {COPY.home.stepsTitle}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {COPY.home.steps.map((step, index) => (
              <div key={index} className="relative p-6 bg-card border border-border rounded-xl">
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-thp-primary text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2 pt-2">{step.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppFab />

      <FinalCTA />
    </>
  );
};

export default Home;