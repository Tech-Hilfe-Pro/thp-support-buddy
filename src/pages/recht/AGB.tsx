import { Helmet } from "react-helmet-async";

const AGB = () => {
  return (
    <>
      <Helmet>
        <title>AGB - Tech Hilfe Pro</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen von Tech Hilfe Pro für IT-Support-Dienstleistungen." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 1 Geltungsbereich</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen 
                Tech Hilfe Pro (nachfolgend "Anbieter") und seinen Kunden über die Erbringung 
                von IT-Support-Dienstleistungen.
              </p>
              <p>
                Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, 
                der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 2 Leistungsumfang</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Der Anbieter erbringt IT-Support-Dienstleistungen sowohl vor Ort beim Kunden 
                als auch per Remote-Zugriff. Der konkrete Leistungsumfang ergibt sich aus 
                der jeweiligen Auftragsbestätigung oder dem gewählten Service-Paket.
              </p>
              <p>
                Die Leistungen umfassen insbesondere:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Installation und Konfiguration von Hard- und Software</li>
                <li>Fehlerbehebung und Reparaturen</li>
                <li>Wartung und Updates</li>
                <li>Beratung und Schulungen</li>
                <li>Netzwerk-Setup und -optimierung</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 3 Preise und Zahlungsbedingungen</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Es gelten die zum Zeitpunkt der Bestellung aktuellen Preise. 
                Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer, 
                sofern diese anfällt.
              </p>
              <p>
                Die Abrechnung erfolgt in 15-Minuten-Blöcken. Angefangene Blöcke werden 
                voll berechnet. Bei Vor-Ort-Terminen wird zusätzlich eine Anfahrtspauschale 
                je nach Entfernung berechnet.
              </p>
              <p>
                Rechnungen sind binnen 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 4 Termine und Stornierung</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Vereinbarte Termine sind für beide Parteien verbindlich. 
                Stornierungen oder Verschiebungen müssen mindestens 24 Stunden 
                vor dem vereinbarten Termin erfolgen.
              </p>
              <p>
                Bei kurzfristigeren Absagen oder No-Show des Kunden behält sich 
                der Anbieter vor, eine Ausfallpauschale in Höhe von 50% des 
                vereinbarten Honorars zu berechnen.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 5 Haftung</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Der Anbieter haftet nur für Schäden, die auf vorsätzlichem oder 
                grob fahrlässigem Verhalten beruhen. Die Haftung für leichte 
                Fahrlässigkeit ist ausgeschlossen, soweit nicht Leben, Körper, 
                Gesundheit oder wesentliche Vertragspflichten betroffen sind.
              </p>
              <p>
                Der Kunde ist verpflichtet, vor Beginn der Arbeiten eine 
                Datensicherung durchzuführen oder durchführen zu lassen.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 6 Kleinunternehmerregelung</h2>
            <div className="text-muted-foreground">
              <p>
                Der Anbieter ist Kleinunternehmer im Sinne von § 19 UStG und 
                weist daher keine Umsatzsteuer aus.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 7 Schlussbestimmungen</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. 
                Gerichtsstand ist Köln, sofern der Kunde Kaufmann ist.
              </p>
              <p>
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein, 
                bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AGB;