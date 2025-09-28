import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import BusinessGlossary from "@/components/BusinessGlossary";
import Benefits from "@/components/Benefits";
import Steps from "@/components/Steps";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
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
      
      <FinalCTA />

      {/* FAQ Section */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FAQ title="Häufige Fragen" items={COPY.faq.home} />
      </div>
    </>
  );
};

export default Home;