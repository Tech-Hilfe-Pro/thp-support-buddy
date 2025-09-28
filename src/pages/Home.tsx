import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Tech Hilfe Pro - IT-Support für Privat & KMU in Köln, Neuss</title>
        <meta 
          name="description" 
          content="Professioneller IT-Support für Senioren und Unternehmen in Köln, Neuss & Umgebung. PC-Hilfe, WLAN-Setup, Smart-Home und mehr. Vor Ort & Remote." 
        />
        <meta name="keywords" content="IT-Support Köln, PC Hilfe Neuss, Computerhilfe Senioren, WLAN Techniker, Smart-Home Setup" />
        <meta property="og:title" content="Tech Hilfe Pro - IT-Support für Privat & KMU" />
        <meta property="og:description" content="Wir richten es ein. Wir halten es am Laufen. Professioneller IT-Support in Köln, Neuss & Umgebung." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>
      
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