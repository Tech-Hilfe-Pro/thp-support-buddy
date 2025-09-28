import { Helmet } from "react-helmet-async";

const Leistungen = () => {
  return (
    <>
      <Helmet>
        <title>Leistungen - Tech Hilfe Pro</title>
        <meta 
          name="description" 
          content="Alle IT-Services im Überblick: PC/Mac-Hilfe, WLAN-Setup, Smart-Home, Sicherheits-Check und mehr. Für Privat und Unternehmen." 
        />
      </Helmet>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Unsere Leistungen</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Von der einfachen PC-Hilfe bis zur komplexen IT-Infrastruktur - 
            wir unterstützen Sie bei allen technischen Herausforderungen.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Für Privatkunden</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• PC/Mac-Hilfe und Reparatur</li>
                <li>• WLAN-Optimierung</li>
                <li>• Drucker-Setup</li>
                <li>• Smart-TV und Streaming</li>
                <li>• Smart-Home Installation</li>
                <li>• Schulungen für Senioren</li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Für Unternehmen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• IT-Infrastruktur Management</li>
                <li>• Netzwerk-Setup und Wartung</li>
                <li>• Sicherheits-Audits</li>
                <li>• Backup-Lösungen</li>
                <li>• Remote-Support</li>
                <li>• Mitarbeiter-Schulungen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leistungen;