import { Helmet } from "react-helmet-async";

const Termin = () => {
  return (
    <>
      <Helmet>
        <title>Termin buchen - Tech Hilfe Pro</title>
        <meta 
          name="description" 
          content="Buchen Sie schnell und einfach einen Termin für IT-Support. Online-Terminbuchung für Vor-Ort und Remote-Service." 
        />
      </Helmet>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Termin buchen</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Buchen Sie schnell und unkompliziert einen Termin für Ihren IT-Support. 
            Wählen Sie zwischen Vor-Ort-Service oder Remote-Unterstützung.
          </p>
          
          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-xl font-semibold mb-6">Terminbuchung</h2>
            <p className="text-muted-foreground mb-4">
              Das Buchungsformular wird hier implementiert. Features:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• PLZ-Validierung für Servicegebiet</li>
              <li>• Wahl zwischen Remote und Vor-Ort</li>
              <li>• Zeitfenster-Auswahl</li>
              <li>• Problembeschreibung</li>
              <li>• Preisberechnung in Echtzeit</li>
              <li>• E-Mail-Bestätigung mit Kalendereintrag</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Termin;