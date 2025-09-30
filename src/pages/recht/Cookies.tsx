import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/company";

const Cookies = () => {
  return (
    <>
      <Helmet>
        <title>Cookie-Richtlinie - Tech Hilfe Pro</title>
        <meta name="description" content="Informationen zu Cookies und deren Verwendung auf Tech Hilfe Pro." />
        <meta name="robots" content="index, nofollow" />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Cookie-Richtlinie</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Was sind Cookies?</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät 
                gespeichert werden. Sie ermöglichen es, bestimmte Informationen zu speichern und 
                später wieder abzurufen.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Welche Cookies verwenden wir?</h2>
            <div className="text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">Technisch notwendige Cookies</h3>
              <p>
                Diese Website verwendet ausschließlich technisch notwendige Cookies für die 
                Grundfunktionen der Website. Diese sind erforderlich, damit die Website 
                ordnungsgemäß funktioniert und dienen unter anderem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Speicherung Ihrer Cookie-Einwilligungspräferenz</li>
                <li>Session-Management für sichere Sitzungen</li>
                <li>Schutz vor Cross-Site-Request-Forgery (CSRF)</li>
              </ul>
              
              <h3 className="font-semibold text-foreground mt-6">Optionale Cookies (nur mit Einwilligung)</h3>
              <p>
                Folgende Cookies werden nur mit Ihrer ausdrücklichen Einwilligung gemäß 
                TTDSG (Telekommunikation-Telemedien-Datenschutz-Gesetz) gesetzt:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Analytics-Cookies:</strong> Zur anonymisierten Analyse des 
                  Nutzungsverhaltens (keine personenbezogenen Daten)
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Externe Dienste</h2>
            <div className="text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">Cloudflare</h3>
              <p>
                Unsere Website nutzt Cloudflare für Sicherheit und Performance-Optimierung. 
                Cloudflare setzt technisch notwendige Cookies ein. 
                Weitere Informationen: 
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  Cloudflare Datenschutzerklärung
                </a>
              </p>
              
              <h3 className="font-semibold text-foreground">Stripe (bei Zahlungen)</h3>
              <p>
                Für die sichere Zahlungsabwicklung nutzen wir Stripe. Stripe setzt eigene 
                Cookies für die Transaktionssicherheit. Diese werden nur beim Checkout-Prozess geladen.
                Weitere Informationen: 
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  Stripe Datenschutzerklärung
                </a>
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Ihre Rechte und Einstellungen</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie Ihre 
                Browser-Einstellungen anpassen oder unseren Cookie-Banner beim nächsten 
                Besuch erneut aufrufen.
              </p>
              <p>
                <strong>Browser-Einstellungen:</strong> Sie können in Ihrem Browser 
                einstellen, dass Cookies blockiert oder Sie vor der Speicherung gewarnt werden. 
                Beachten Sie jedoch, dass die Website ohne technisch notwendige Cookies 
                möglicherweise nicht vollständig funktioniert.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Kontakt</h2>
            <div className="text-muted-foreground">
              <p>
                Bei Fragen zu unserer Cookie-Richtlinie können Sie uns jederzeit kontaktieren:
              </p>
              <p className="mt-2">
                {COMPANY.brand}<br />
                E-Mail: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a><br />
                Telefon: <a href={`tel:${COMPANY.telE164}`} className="text-primary hover:underline">{COMPANY.telDisplay}</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Cookies;
