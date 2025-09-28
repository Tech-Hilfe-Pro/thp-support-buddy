import SEO from "@/components/SEO";
import { SEO_PAGES, fullUrl } from "@/data/seo";
import { breadcrumb } from "@/lib/structured";

const UeberUns = () => {
  const meta = SEO_PAGES.ueber;
  const ld = [
    breadcrumb([
      { name: "Start", url: fullUrl("/") },
      { name: "Über uns", url: fullUrl(meta.path) }
    ])
  ];

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} jsonLd={ld} />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Über uns</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Seit über 10 Jahren sind wir Ihr vertrauensvoller Partner für 
            IT-Support in Köln, Neuss und der ganzen Region.
          </p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Unsere Mission</h2>
            <p className="text-muted-foreground mb-8">
              Wir glauben, dass Technik das Leben einfacher machen sollte, nicht komplizierter. 
              Unser Ziel ist es, Ihnen bei allen technischen Herausforderungen zur Seite zu stehen - 
              verständlich, geduldig und kompetent.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground mb-4">Unser Team</h2>
            <p className="text-muted-foreground mb-8">
              Unser erfahrenes Team besteht aus zertifizierten IT-Experten, 
              die sich auf die Betreuung von Privatkunden und kleinen bis mittelständischen 
              Unternehmen spezialisiert haben. Besonders stolz sind wir auf unsere 
              seniorenfreundliche Herangehensweise.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground mb-4">Warum Tech Hilfe Pro?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Über 10 Jahre Erfahrung in der Region</li>
              <li>• Zertifizierte und geschulte Techniker</li>
              <li>• Transparente Preise ohne versteckte Kosten</li>
              <li>• Flexible Lösungen für jedes Budget</li>
              <li>• Persönlicher Service vor Ort und remote</li>
              <li>• Spezialisierung auf Senioren und KMU</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UeberUns;