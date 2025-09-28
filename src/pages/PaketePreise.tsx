import { Helmet } from "react-helmet-async";

const PaketePreise = () => {
  return (
    <>
      <Helmet>
        <title>Pakete & Preise - Tech Hilfe Pro</title>
        <meta 
          name="description" 
          content="Transparente Preise für IT-Support. Flexible Pakete für Privat und Unternehmen. Berechnen Sie Ihren Preis in 60 Sekunden." 
        />
      </Helmet>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Pakete & Preise</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Faire und transparente Preise für alle IT-Services. 
            Keine versteckten Kosten, keine Überraschungen.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Starter</h2>
              <div className="text-3xl font-bold text-primary mb-4">
                ab 49€<span className="text-lg font-normal text-muted-foreground">/Monat</span>
              </div>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• 2h Remote-Support</li>
                <li>• E-Mail-Support</li>
                <li>• Basis-Wartung</li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-primary">
              <h2 className="text-xl font-semibold mb-4">Professional</h2>
              <div className="text-3xl font-bold text-primary mb-4">
                ab 99€<span className="text-lg font-normal text-muted-foreground">/Monat</span>
              </div>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• 5h Remote-Support</li>
                <li>• 1x Vor-Ort Besuch</li>
                <li>• Telefon-Support</li>
                <li>• Proaktive Wartung</li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Enterprise</h2>
              <div className="text-3xl font-bold text-primary mb-4">
                ab 199€<span className="text-lg font-normal text-muted-foreground">/Monat</span>
              </div>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• Unlimited Remote-Support</li>
                <li>• 2x Vor-Ort Besuche</li>
                <li>• Priority Support</li>
                <li>• Backup-Service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaketePreise;