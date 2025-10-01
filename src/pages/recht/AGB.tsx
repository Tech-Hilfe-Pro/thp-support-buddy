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
            <p className="text-muted-foreground">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen der 
              Tech Hilfe Pro (Inhaber: Jose Carlos Marin Lache, Schirmerstraße 7, 50823 Köln) 
              gegenüber Verbrauchern (§ 13 BGB) und Unternehmern (§ 14 BGB).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 2 Leistungen</h2>
            <p className="text-muted-foreground">
              IT-Support und Managed-Services (Remote & vor Ort). Dienstvertrag; bei 
              Reparaturen/Projekten mit Erfolgsschuld ggf. Werkvertrag.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 3 Angebote/Vertragsschluss</h2>
            <p className="text-muted-foreground">
              Online-Preisangaben freibleibend; Vertrag mit Bestätigung oder Leistungsbeginn.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 4 Abonnements/Preise</h2>
            <div className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Privat</h3>
                <p>9,90 € / 19,90 € monatlich</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">KMU (pro Endpoint/Monat)</h3>
                <p>14,90 € / 24,90 € / 39,90 €</p>
                <p>Mindestmonatsentgelte: 99 € / 179 € / 299 €</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Rabatte</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>10 % bei Jahresvorauszahlung</li>
                  <li>25 % auf Vor-Ort-Einsätze mit aktiver Subscription</li>
                </ul>
              </div>

              <p className="font-semibold">
                Endpreise gemäß § 19 UStG (keine Umsatzsteuer).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 5 Laufzeit/Kündigung</h2>
            <p className="text-muted-foreground">
              Monatlich, Verlängerung um 1 Monat. Kündigung: 14 Tage zum Monatsende (Textform genügt).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 6 Vor-Ort/Termine</h2>
            <p className="text-muted-foreground">
              Verschiebung bis 24 h vorher kostenfrei; kurzfristige Absage kann Aufwandsersatz 
              (z. B. Anfahrt) auslösen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 7 Mitwirkungspflichten</h2>
            <p className="text-muted-foreground">
              Erforderliche Angaben/Zugänge/Testdaten bereitstellen, geeignete Umgebung, 
              <strong> Backups aktuell halten</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 8 Remote-Zugriff</h2>
            <p className="text-muted-foreground">
              Nur mit Einwilligung und nachvollziehbarer Autorisierung; jederzeit beendbar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 9 Zahlung/Stripe/PSD2</h2>
            <p className="text-muted-foreground">
              Zahlung über <strong>Stripe Checkout</strong>; keine Kartendaten-Speicherung durch uns; 
              <strong>SCA</strong> kann erforderlich sein; Fälligkeit sofort; Verzug nach Gesetz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 10 Gewährleistung/Servicelevel</h2>
            <p className="text-muted-foreground">
              Dienstleistung = fachgerechtes Bemühen; Werkleistung = gesetzliche Gewährleistung. 
              Servicelevel nur, wenn ausdrücklich vereinbart.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 11 Haftung</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Unbeschränkt bei Vorsatz/grober Fahrlässigkeit, Leben/Körper/Gesundheit, ProdHaftG.
              </p>
              <p>
                Bei leichter Fahrlässigkeit nur Kardinalpflichten, begrenzt auf typischen, 
                vorhersehbaren Schaden.
              </p>
              <p>
                <strong>Datenverlust:</strong> Haftung auf Wiederherstellungsaufwand bei 
                ordnungsgemäßen, aktuellen Backups.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 12 Datenschutz</h2>
            <p className="text-muted-foreground">
              Es gilt unsere <Link to="/recht/datenschutz" className="text-primary underline">Datenschutzerklärung</Link>. 
              Auftragsverarbeitung und Übermittlungen an Zahlungs-/Infrastrukturdienstleister auf 
              geeigneter Rechtsgrundlage.
            </p>
          </section>

          <section id="widerruf">
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 13 Widerruf (Verbraucher)</h2>
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
              
              <h3 className="font-semibold text-foreground">Erlöschen des Widerrufsrechts</h3>
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
                <strong>Hinweis:</strong> Muster-Widerrufsformular via E-Mail ausreichend. Weitere Details in unserer{" "}
                <Link to="/recht/widerruf" className="text-primary underline">Widerrufsbelehrung</Link>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">§ 14 Schlussbestimmungen</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Deutsches Recht; Gerichtsstand für Kaufleute/Unternehmer: Köln; 
                Vertragssprache: Deutsch; Änderungen in Textform; Salvatorische Klausel.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AGB;