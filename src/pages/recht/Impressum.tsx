import { Helmet } from "react-helmet-async";

const Impressum = () => {
  return (
    <>
      <Helmet>
        <title>Impressum - Tech Hilfe Pro</title>
        <meta name="description" content="Impressum und Anbieterkennzeichnung von Tech Hilfe Pro, IT-Support Köln." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="text-muted-foreground space-y-2">
              <p>Tech Hilfe Pro</p>
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>50667 Köln</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Kontakt</h2>
            <div className="text-muted-foreground space-y-2">
              <p>Telefon: +49 221 123 45 67</p>
              <p>E-Mail: info@techhilfe-pro.de</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Umsatzsteuer-ID</h2>
            <p className="text-muted-foreground">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: 
              [Platzhalter - falls vorhanden]
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Kleinunternehmerregelung</h2>
            <p className="text-muted-foreground">
              Als Kleinunternehmer im Sinne von § 19 Abs. 1 Umsatzsteuergesetz wird 
              keine Umsatzsteuer berechnet.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="text-muted-foreground space-y-2">
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>50667 Köln</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Haftungsausschluss</h2>
            <div className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf 
                  diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG 
                  sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte 
                  oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu 
                  forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte 
                  wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch 
                  keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der 
                  jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Impressum;