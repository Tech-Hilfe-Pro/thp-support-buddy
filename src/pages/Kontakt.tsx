import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Kontakt = () => {
  return (
    <>
      <Helmet>
        <title>Kontakt - Tech Hilfe Pro</title>
        <meta 
          name="description" 
          content="Kontaktieren Sie Tech Hilfe Pro für IT-Support in Köln, Neuss & Umgebung. Telefon, E-Mail oder persönlich vor Ort." 
        />
      </Helmet>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Kontakt</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Haben Sie Fragen oder benötigen Sie sofortige Hilfe? 
            Wir sind für Sie da - per Telefon, E-Mail oder persönlich vor Ort.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-foreground">Kontaktdaten</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Adresse</h3>
                    <p className="text-muted-foreground">
                      Tech Hilfe Pro<br />
                      Musterstraße 123<br />
                      50667 Köln
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Servicegebiet: Köln, Neuss & Umgebung
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Telefon</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+492211234567" className="hover:text-primary transition-colors">
                        +49 221 123 45 67
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">E-Mail</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@techhilfe-pro.de" className="hover:text-primary transition-colors">
                        info@techhilfe-pro.de
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Öffnungszeiten</h3>
                    <div className="text-muted-foreground">
                      <p>Montag - Freitag: 9:00 - 18:00 Uhr</p>
                      <p>Samstag: 10:00 - 16:00 Uhr</p>
                      <p>Sonntag: Nach Vereinbarung</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Schnellkontakt</h2>
              <div className="bg-card p-6 rounded-lg border">
                <p className="text-muted-foreground mb-4">
                  Hier wird das Kontaktformular implementiert mit folgenden Feldern:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Name und E-Mail</li>
                  <li>• Telefonnummer (optional)</li>
                  <li>• Betreff/Art der Anfrage</li>
                  <li>• Nachrichtentext</li>
                  <li>• PLZ für Servicegebiet-Check</li>
                  <li>• Datenschutz-Checkbox</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kontakt;