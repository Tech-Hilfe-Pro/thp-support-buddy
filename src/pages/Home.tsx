import Hero from "@/components/Hero";
import ValueGrid from "@/components/ValueGrid";
import Steps3 from "@/components/Steps3";
import ServicesGridLimited from "@/components/ServicesGridLimited";
import MembershipTeaser from "@/components/MembershipTeaser";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
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
      
      <main>
        <ValueGrid />
        <Steps3 />
        <ServicesGridLimited />
        <MembershipTeaser />
        
        {/* FAQ Section */}
        <div className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-3 lg:px-6">
            <FAQ title="Häufige Fragen" items={COPY.faq.home} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;