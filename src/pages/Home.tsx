import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import { SEO_PAGES } from "@/data/seo";
import { localBusiness, webSite } from "@/lib/structured";

const Home = () => {
  const meta = SEO_PAGES.home;
  const ld = [
    localBusiness({ /* TODO: echte Adresse/Telefon eintragen */ }),
    webSite()
  ];

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} jsonLd={ld} />
      
      <Hero />
      
      {/* Additional home page content sections would go here */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Warum Tech Hilfe Pro?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wir verstehen, dass Technik manchmal kompliziert sein kann. 
              Deshalb sind wir da, um Ihnen zu helfen - verständlich, geduldig und zuverlässig.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;