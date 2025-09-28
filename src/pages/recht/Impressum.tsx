import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/company";

const Impressum = () => {
  return (
    <>
      <Helmet>
        <title>Impressum - Tech Hilfe Pro</title>
        <meta name="description" content="Impressum und Anbieterkennzeichnung von Tech Hilfe Pro, IT-Support Köln." />
        <meta name="robots" content="index, nofollow" />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Angaben gemäß § 5 DDG</h2>
            <div className="text-muted-foreground space-y-2">
              <p>{COMPANY.brand}</p>
              <p>{COMPANY.owner}</p>
              <p>{COMPANY.street}</p>
              <p>{COMPANY.postalCode} {COMPANY.city}</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Kontakt</h2>
            <div className="text-muted-foreground space-y-2">
              <p>Telefon: <a href={`tel:${COMPANY.telE164}`} className="hover:text-primary transition-colors">{COMPANY.telDisplay}</a></p>
              <p>E-Mail: <a href={`mailto:${COMPANY.email}`} className="hover:text-primary transition-colors">{COMPANY.email}</a></p>
            </div>
          </section>
          
          {COMPANY.ustId && (
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Umsatzsteuer-ID</h2>
              <p className="text-muted-foreground">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: {COMPANY.ustId}
              </p>
            </section>
          )}
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Kleinunternehmerregelung</h2>
            <p className="text-muted-foreground">
              Als Kleinunternehmer im Sinne von § 19 Abs. 1 Umsatzsteuergesetz wird 
              keine Umsatzsteuer berechnet.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
            <div className="text-muted-foreground space-y-2">
              <p>{COMPANY.owner}</p>
              <p>{COMPANY.street}</p>
              <p>{COMPANY.postalCode} {COMPANY.city}</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Haftungsausschluss</h2>
            <div className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf 
                  diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG 
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