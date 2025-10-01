import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AGB = () => {
  return (
    <>
      <Helmet>
        <title>AGB - Tech Hilfe Pro</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen von Tech Hilfe Pro für IT-Support-Dienstleistungen." />
        <meta name="robots" content="index, nofollow" />
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
              </p>
              <p>
                <strong>§ 19 UStG (Kleinunternehmerregelung):</strong> Der Anbieter ist 
                Kleinunternehmer im Sinne von § 19 Abs. 1 UStG. Daher wird keine 
                Umsatzsteuer berechnet und ausgewiesen.
              </p>
              <p>
                Die Abrechnung erfolgt in 15-Minuten-Blöcken. Angefangene Blöcke werden 
                voll berechnet. Bei Vor-Ort-Terminen wird zusätzlich eine Anfahrtspauschale 
                je nach PLZ-Zone (Entfernung) berechnet.
              </p>
              <p>
                <strong>Zahlungsabwicklung:</strong> Zahlungen erfolgen sicher über Stripe. 
                Akzeptiert werden Kreditkarte, Debitkarte, SEPA-Lastschrift und weitere 
                Zahlungsmethoden je nach Verfügbarkeit.
              </p>
              <p>
                Rechnungen sind binnen 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig.
                Bei Abonnements erfolgt die Abbuchung monatlich im Voraus.
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
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 6 Abonnements und Kündigung</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Abonnements (Haus-IT Start, Haus-IT Plus, KMU-Pakete) haben keine Mindestlaufzeit 
                und können monatlich zum Monatsende gekündigt werden. Die Kündigung muss 
                schriftlich (E-Mail genügt) erfolgen.
              </p>
              <p>
                Rabatte aus Abonnements gelten nur bei aktivem Abo. Nach Kündigung entfallen 
                alle Vergünstigungen ab dem nächsten Abrechnungszeitraum.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 7 Datenschutz und Datenverarbeitung</h2>
            <div className="text-muted-foreground">
              <p>
                Bei Remote-Support-Sitzungen verarbeiten wir personenbezogene Daten 
                (Name, E-Mail, Telefon, IP-Adresse) gemäß unserer Datenschutzerklärung. 
                Details siehe: <Link to="/recht/datenschutz" className="text-primary underline">Datenschutzerklärung</Link>
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 8 Kleinunternehmerregelung</h2>
            <div className="text-muted-foreground">
              <p>
                Der Anbieter ist Kleinunternehmer im Sinne von § 19 UStG und 
                weist daher keine Umsatzsteuer aus.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 9 Schlussbestimmungen</h2>
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
          
          <section id="widerruf">
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 10 Widerrufsbelehrung für Verbraucher</h2>
            <div className="text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">Widerrufsrecht</h3>
              <p>
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. 
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
              </p>
              <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Tech Hilfe Pro, E-Mail: info@techhilfepro.de, 
                Telefon: +49 15565029989) mittels einer eindeutigen Erklärung (z.B. E-Mail oder Brief) über Ihren 
                Entschluss, diesen Vertrag zu widerrufen, informieren.
              </p>
              
              <h3 className="font-semibold text-foreground">Widerrufsfolgen</h3>
              <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, 
                unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung 
                über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
              </p>
              
              <h3 className="font-semibold text-foreground">Vorzeitige Leistungserbringung</h3>
              <p>
                Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben 
                Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns 
                von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten 
                Dienstleistungen entspricht.
              </p>
              
              <h3 className="font-semibold text-foreground">Ausschluss & Erlöschen des Widerrufsrechts</h3>
              <p>
                Das Widerrufsrecht erlischt bei Verträgen zur Erbringung von Dienstleistungen, wenn der Unternehmer 
                die Dienstleistung vollständig erbracht hat und mit der Ausführung erst begonnen hat, nachdem Sie 
                dazu Ihre ausdrückliche Zustimmung gegeben und gleichzeitig Ihre Kenntnis davon bestätigt haben, 
                dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung verlieren.
              </p>
              <p>
                Bei Notfällen und ausdrücklich gewünschten Eilleistungen, bei denen die Dienstleistung sofort 
                erbracht wird, entfällt das Widerrufsrecht für die bereits erbrachten Leistungen nach Ihrer 
                ausdrücklichen Zustimmung.
              </p>
              
              <p className="mt-4">
                <strong>Hinweis:</strong> Weitere Details finden Sie in unserer separaten{" "}
                <Link to="/recht/widerruf" className="text-primary underline">Widerrufsbelehrung</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AGB;