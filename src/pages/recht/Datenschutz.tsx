import SEO from "@/components/SEO";
import { COMPANY } from "@/data/company";
import { SEO_PAGES } from "@/data/seo";

const Datenschutz = () => {
  const currentDate = new Date().toLocaleDateString('de-DE');

  return (
    <>
      <SEO 
        title={SEO_PAGES.datenschutz.title}
        description={SEO_PAGES.datenschutz.description}
        path={SEO_PAGES.datenschutz.path}
        robots="index, nofollow"
      />
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">1. Datenschutz auf einen Blick</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Allgemeine Hinweise</h3>
              <p className="leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. 
                Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem 
                Text aufgeführten Datenschutzerklärung.
              </p>
              
              <h3 className="text-lg font-semibold text-foreground">Datenerfassung auf dieser Website</h3>
              <p className="leading-relaxed">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" 
                in dieser Datenschutzerklärung entnehmen.
              </p>
              <p className="leading-relaxed">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei 
                kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Datenschutz</h3>
                <p className="leading-relaxed">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den 
                  gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p className="leading-relaxed mt-2">
                  Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. 
                  Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. 
                  Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir 
                  sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Hinweis zur verantwortlichen Stelle</h3>
                <p className="leading-relaxed">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="bg-muted/50 p-4 rounded-lg mt-2 space-y-1">
                  <p className="font-medium text-foreground">{COMPANY.brand}</p>
                  <p>{COMPANY.owner}</p>
                  <p>{COMPANY.street}</p>
                  <p>{COMPANY.postalCode} {COMPANY.city}, Deutschland</p>
                  <p>Telefon: <a href={`tel:${COMPANY.telE164}`} className="text-primary hover:underline">{COMPANY.telDisplay}</a></p>
                  <p>E-Mail: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
                </div>
                <p className="leading-relaxed mt-4">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder 
                  gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen 
                  Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Speicherdauer</h3>
                <p className="leading-relaxed">
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt 
                  wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die 
                  Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen 
                  oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, 
                  sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer 
                  personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p className="leading-relaxed">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. 
                  Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit 
                  der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">3. Datenerfassung auf dieser Website</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Cookies</h3>
                <p className="leading-relaxed">
                  Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien 
                  und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend 
                  für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (dauerhafte Cookies) auf 
                  Ihrem Endgerät gespeichert.
                </p>
                <p className="leading-relaxed mt-2">
                  Wir verwenden nur technisch notwendige Cookies für die Grundfunktionen der Website. 
                  Weitere Dienste (wie Analytics) werden nur nach Ihrer ausdrücklichen Einwilligung geladen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Server-Log-Dateien</h3>
                <p className="leading-relaxed">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                  Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="leading-relaxed mt-2">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. 
                  Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. 
                  Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien 
                  Darstellung und der Optimierung seiner Website.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Kontaktformular</h3>
                <p className="leading-relaxed">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
                  dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. 
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="leading-relaxed mt-2">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, 
                  sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung 
                  vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die 
                  Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an 
                  uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p className="leading-relaxed mt-2">
                  Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns 
                  zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck 
                  für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). 
                  Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Anfrage per E-Mail, Telefon oder Fax</h3>
                <p className="leading-relaxed">
                  Wenn Sie uns per E-Mail, Telefon oder Fax kontaktieren, wird Ihre Anfrage inklusive 
                  aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der 
                  Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben 
                  wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="leading-relaxed mt-2">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, 
                  sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung 
                  vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die 
                  Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an 
                  uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">4. Plugins und Tools</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Google Fonts (lokale Einbindung)</h3>
                <p className="leading-relaxed">
                  Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, 
                  die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine 
                  Verbindung zu Servern von Google findet dabei nicht statt.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">5. Zahlungsdienstleister</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Stripe</h3>
                <p className="leading-relaxed">
                  Auf dieser Website bieten wir die Bezahlung via Stripe an. Anbieter dieses 
                  Zahlungsdienstes ist die Stripe Inc., 510 Townsend Street, San Francisco, CA 94103, USA 
                  (nachfolgend „Stripe").
                </p>
                <p className="leading-relaxed mt-2">
                  Wenn Sie sich für die Bezahlung via Stripe entscheiden, werden die von Ihnen eingegebenen 
                  Zahlungsdaten an Stripe übermittelt. Die Übermittlung erfolgt auf Grundlage von 
                  Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO 
                  (Verarbeitung zur Erfüllung eines Vertrags). Sie haben die Möglichkeit, Ihre 
                  Einwilligung zur Datenverarbeitung jederzeit zu widerrufen.
                </p>
                <p className="leading-relaxed mt-2">
                  <strong>Datenübermittlung in die USA:</strong><br />
                  Stripe ist unter dem Privacy Shield zertifiziert und bietet hierdurch eine Garantie, 
                  das europäische Datenschutzniveau einzuhalten. Details hierzu finden Sie hier: 
                  <a href="https://stripe.com/de/privacy" className="text-primary hover:underline ml-1">
                    https://stripe.com/de/privacy
                  </a>
                </p>
                <p className="leading-relaxed mt-2">
                  Die Datenverarbeitung erfolgt auf Grundlage eines Auftragsverarbeitungsvertrags, 
                  den wir mit Stripe geschlossen haben. Details zu den von Stripe verarbeiteten Daten 
                  finden Sie in der Datenschutzerklärung von Stripe unter: 
                  <a href="https://stripe.com/de/privacy" className="text-primary hover:underline ml-1">
                    https://stripe.com/de/privacy
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">6. eCommerce und Zahlungsanbieter</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Verarbeitung von Kunden- und Vertragsdaten</h3>
                <p className="leading-relaxed">
                  Wir erheben, verarbeiten und nutzen personenbezogene Kunden- und Vertragsdaten zur 
                  Begründung, inhaltlichen Ausgestaltung oder Änderung unserer Vertragsbeziehungen. 
                  Personenbezogene Daten über die Inanspruchnahme dieser Website (Nutzungsdaten) erheben, 
                  verarbeiten und nutzen wir nur, soweit dies erforderlich ist, um dem Nutzer die 
                  Inanspruchnahme des Dienstes zu ermöglichen oder abzurechnen.
                </p>
                <p className="leading-relaxed mt-2">
                  Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO. Die erhobenen Kundendaten 
                  werden nach Abschluss des Auftrags oder Beendigung der Geschäftsbeziehung gelöscht. 
                  Gesetzliche Aufbewahrungsfristen bleiben unberührt.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">7. Ihre Rechte</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
                Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein 
                Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
                Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
                jederzeit für die Zukunft widerrufen.
              </p>
              <p className="leading-relaxed">
                Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der 
                Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen 
                ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">Kontakt für Datenschutzanfragen</h3>
                <p>{COMPANY.owner}</p>
                <p>E-Mail: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
                <p>Telefon: <a href={`tel:${COMPANY.telE164}`} className="text-primary hover:underline">{COMPANY.telDisplay}</a></p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Auskunft, Berichtigung und Löschung</h3>
                <p className="leading-relaxed">
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf 
                  unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren 
                  Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf 
                  Berichtigung oder Löschung dieser Daten.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Einschränkung der Verarbeitung</h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
                  zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen 
                  Adresse an uns wenden.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Datenportabilität</h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung 
                  eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem 
                  gängigen, maschinenlesbaren Format aushändigen zu lassen.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">8. SSL- bzw. TLS-Verschlüsselung</h2>
            <p className="leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
              Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber 
              senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie 
              daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an 
              dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p className="leading-relaxed mt-2">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns 
              übermitteln, nicht von Dritten mitgelesen werden. Wir weisen darauf hin, dass die 
              Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken 
              aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>
          </section>

          <footer className="text-sm border-t border-border pt-4 mt-8">
            <p>Stand dieser Datenschutzerklärung: {currentDate}</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Datenschutz;