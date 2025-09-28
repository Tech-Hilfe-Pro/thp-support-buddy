import Hero from "@/components/Hero";
import BusinessGlossary from "@/components/BusinessGlossary";
import Benefits from "@/components/Benefits";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import { SEO_PAGES } from "@/data/seo";
import { localBusiness, webSite } from "@/lib/structured";
import { COPY } from "@/data/copy";

const Home = () => {
  console.log("Home.tsx: Home component rendering");
  
  const meta = SEO_PAGES.home;
  const ld = [
    localBusiness({ /* TODO: echte Adresse/Telefon eintragen */ }),
    webSite()
  ];

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} jsonLd={ld} />
      
      <Hero />
      
      <BusinessGlossary items={[
        { key:"kmu", ...COPY.businessGlossary.kmu },
        { key:"msp", ...COPY.businessGlossary.msp },
        { key:"sla", ...COPY.businessGlossary.sla },
      ]}/>
      
      <Benefits items={[
        { 
          icon: <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, 
          title: "Schnelle Hilfe", 
          text: "Remote zuerst, Vor-Ort bei Bedarf." 
        },
        { 
          icon: <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, 
          title: "Faire Preise", 
          text: "Transparent, ohne Kleingedrucktes." 
        },
        { 
          icon: <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, 
          title: "Seniorenfreundlich", 
          text: "Gut lesbar, geduldig erklärt." 
        },
        { 
          icon: <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>, 
          title: "Für KMU", 
          text: "Planbar mit Abo & SLA." 
        }
      ]}/>

      <Steps items={[
        { n: 1, t: COPY.home.steps[0].t, d: COPY.home.steps[0].d },
        { n: 2, t: COPY.home.steps[1].t, d: COPY.home.steps[1].d },
        { n: 3, t: COPY.home.steps[2].t, d: COPY.home.steps[2].d },
        { n: 4, t: COPY.home.steps[3].t, d: COPY.home.steps[3].d },
      ]}/>

      <Testimonials items={[
        { quote: "Schnell und freundlich. Drucker läuft wieder.", author: "K. Wagner", meta: "Köln-Ehrenfeld" },
        { quote: "WLAN endlich stabil im Büro.", author: "Autohaus M.", meta: "Neuss" },
        { quote: "Hat mir alles ruhig erklärt – top.", author: "H. Schneider", meta: "Senior" }
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