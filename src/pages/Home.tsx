import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import BusinessGlossary from "@/components/BusinessGlossary";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import Comparison from "@/components/Comparison";
import MembershipCards from "@/components/MembershipCards";
import { COPY } from "@/data/copy";
import { generateLocalBusinessSchema, generateFAQSchema, generateWebSiteSchema, generateOrganizationSchema } from "@/lib/localSEO";
import { SEO_PAGES } from "@/data/seo";
import { HOME_FAQ_LOCAL } from "@/data/localFAQ";

const Home = () => {
  console.log("Home.tsx: Home component rendering");
  
  // Generate structured data
  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema(HOME_FAQ_LOCAL);
  
  const structuredData = [localBusinessSchema, organizationSchema, websiteSchema, faqSchema];

  return (
    <>
      <SEO 
        title={SEO_PAGES.home.title}
        description={SEO_PAGES.home.description}
        path={SEO_PAGES.home.path}
        keywords="IT-Service Köln, PC-Hilfe Neuss, Computer-Reparatur, WLAN-Setup, Smart-Home Installation, IT-Support vor Ort"
        ogType="website"
        structuredData={structuredData}
        ogImage="/og/default.jpg"
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
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

      {/* FAQ Section - Local SEO optimized */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FAQ title="Häufige Fragen zu IT-Service in Köln & Neuss" items={HOME_FAQ_LOCAL} />
      </div>
    </>
  );
};

export default Home;