import { Helmet } from "react-helmet-async";

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
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Datenschutz auf einen Blick</h2>
            <div className="text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <div className="text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der 
                gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              
              <h3 className="font-semibold text-foreground">Hinweis zur verantwortlichen Stelle</h3>
              <div className="space-y-2">
                <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <p>Tech Hilfe Pro<br />
                Max Mustermann<br />
                Musterstraße 123<br />
                50667 Köln<br />
                Telefon: +49 221 123 45 67<br />
                E-Mail: info@techhilfe-pro.de</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Datenerfassung auf dieser Website</h2>
            <div className="text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben 
                aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
                zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              
              <h3 className="font-semibold text-foreground">Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in 
                so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. 
                Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, 
                Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies & Einwilligung</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Wir verwenden nur technisch notwendige Cookies für die Grundfunktionen der Website. 
                Weitere Dienste (wie anonymisierte Analyse) laden wir erst nach Ihrer Einwilligung 
                gemäß TTDSG/DSGVO. Keine personenbezogenen Cookies; sessionStorage für 
                Sitzungskennung (nicht personenbezogen).
              </p>
              <p>Analytics werden nur nach Ihrer Einwilligung geladen. Es werden keine Cookies gesetzt; wir verwenden eine nicht-personenbezogene Sitzungskennung im sessionStorage.</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Externe Dienste</h2>
            <div className="text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">Cloudflare</h3>
              <p>
                Diese Website nutzt Dienste der Cloudflare Inc. zur Optimierung und Sicherung 
                unserer Website. Weitere Informationen finden Sie in der Datenschutzerklärung 
                von Cloudflare: https://www.cloudflare.com/privacy/
              </p>
              
              <h3 className="font-semibold text-foreground">Stripe (bei Zahlungen)</h3>
              <p>
                Für die Zahlungsabwicklung nutzen wir Stripe. Weitere Informationen zum 
                Datenschutz bei Stripe finden Sie unter: https://stripe.com/privacy
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Ihre Rechte</h2>
            <div className="text-muted-foreground space-y-4">
              <p>Sie haben jederzeit das Recht:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>Berichtigung unrichtiger Daten zu verlangen</li>
                <li>Löschung Ihrer bei uns gespeicherten Daten zu fordern</li>
                <li>Einschränkung der Datenverarbeitung zu verlangen</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen</li>
                <li>Datenübertragbarkeit zu fordern</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Datenschutz;