import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/company";

const Datenschutz = () => {
  return (
    <>
      <Helmet>
        <title>Datenschutz - Tech Hilfe Pro</title>
        <meta name="description" content="Datenschutzerklärung von Tech Hilfe Pro. Informationen zur Verarbeitung personenbezogener Daten." />
        <meta name="robots" content="index, nofollow" />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Verantwortlicher</h2>
            <div className="text-muted-foreground space-y-2">
              <p className="font-semibold">{COMPANY.brand}</p>
              <p>Inhaber: {COMPANY.owner}</p>
              <p>Anschrift: Schirmerstraße 7, 50823 Köln</p>
              <p>Telefon: <a href={`tel:${COMPANY.telE164}`} className="hover:text-primary transition-colors">{COMPANY.telDisplay}</a></p>
              <p>E-Mail: <a href={`mailto:${COMPANY.email}`} className="hover:text-primary transition-colors">{COMPANY.email}</a></p>
              <p>Web: <a href="https://techhilfepro.de" className="hover:text-primary transition-colors">https://techhilfepro.de</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Zwecke, Rechtsgrundlagen, Datenkategorien</h2>
            <div className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">a) Bereitstellung/Server-Logs</h3>
                <p>
                  IP-Adresse, Datum/Uhrzeit, User-Agent, Referrer zur Sicherstellung von Betrieb, 
                  Sicherheit und Fehleranalyse. <strong>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">b) Kontakt (E-Mail/Telefon/WhatsApp-Link)</h3>
                <p>
                  Bearbeitung vorvertraglicher und vertraglicher Anfragen. <strong>Rechtsgrundlage: 
                  Art. 6 Abs. 1 lit. b</strong>; freiwillige Zusatzdaten <strong>lit. a</strong>.
                </p>
                <p className="text-sm italic">
                  Hinweis: Bei WhatsApp gelten deren Bedingungen/Datenschutzregeln; keine sensiblen Inhalte senden.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">c) Vertragsdurchführung/Support (Remote & vor Ort)</h3>
                <p>
                  Stammdaten, Vertrags-/Abrechnungsdaten, Termin- und Einsatzdokumentation. 
                  <strong>Rechtsgrundlage: Art. 6 Abs. 1 lit. b</strong>, gesetzliche Pflichten <strong>lit. c</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">d) Zahlungen über Stripe</h3>
                <p>
                  Zahlungsabwicklung, Betrugsprävention, SCA/PSD2. Rollenverteilung je Vorgang 
                  (Verantwortlicher/Auftragsverarbeiter). <strong>Rechtsgrundlage: Art. 6 Abs. 1 lit. b, lit. c, lit. f</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">e) Endgerätezugriff/Cookies</h3>
                <p>
                  Wir setzen ausschließlich <strong>technisch notwendige</strong> Cookies/Storage ein. 
                  Für nicht notwendige Zwecke holen wir vorab eine Einwilligung ein 
                  (<strong>§ 25 TDDDG</strong> i.V.m. <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Empfänger / Auftragsverarbeiter</h2>
            <div className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Cloudflare, Inc.</h3>
                <p>
                  CDN/Security/Hosting für techhilfepro.de. Datenverarbeitung auf Basis DPA/SCC/DPF.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Stripe Payments Europe Ltd. / Stripe, Inc.</h3>
                <p>
                  Zahlungsabwicklung/Prävention/SCA. DPA verfügbar; Rollen je Vorgang. 
                  Weitere Informationen: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://stripe.com/privacy</a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">NinjaOne, LLC</h3>
                <p>
                  RMM/Remote-Management (Inventarisierung, Patch-Management, Remote-Support). 
                  DPA verfügbar; Unterauftragsverarbeiter veröffentlicht.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">HeiGIT gGmbH / OpenRouteService</h3>
                <p>
                  Geodienste für Routen/Entfernungen; Verarbeitung von Koordinaten/Anfragen-Metadaten. 
                  Eigene Datenschutzhinweise beachten.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Drittlandtransfers</h2>
            <p className="text-muted-foreground">
              Übermittlung an Empfänger in Drittländern auf Basis geeigneter Garantien 
              (z. B. <strong>SCC</strong>) bzw. <strong>EU-US DPF</strong>-Zertifizierungen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Speicherdauer</h2>
            <p className="text-muted-foreground">
              Speicherung nur solange erforderlich bzw. gesetzliche Aufbewahrung (u. a. HGB/UStG).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Betroffenenrechte</h2>
            <div className="text-muted-foreground">
              <p className="mb-2">Art. 15–21 DSGVO:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung Ihrer bei uns gespeicherten Daten</li>
                <li>Einschränkung der Datenverarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerspruch gegen die Verarbeitung</li>
                <li>Widerruf von Einwilligungen</li>
              </ul>
              <p className="mt-4">
                Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde (NRW).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Erforderlichkeit der Bereitstellung</h2>
            <p className="text-muted-foreground">
              Für die Vertragsdurchführung erforderliche Angaben sind entsprechend gekennzeichnet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Webanalyse</h2>
            <div className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Variante A – ohne Einwilligung</h3>
                <p>
                  Einsatz einer <strong>cookielosen, IP-gekürzten</strong> Reichweitenmessung ohne 
                  gerätebezogenen Zugriff, ohne Identifier und ohne Profilbildung. 
                  <strong>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO</strong>; kein § 25 TDDDG-Zugriff.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Variante B – mit Einwilligung</h3>
                <p>
                  Bei Cookies, Fingerprinting oder Drittlandtracking erfolgt Einsatz <strong>erst nach Einwilligung</strong>. 
                  <strong>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO</strong> i. V. m. <strong>§ 25 TDDDG</strong>.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Datenschutz;