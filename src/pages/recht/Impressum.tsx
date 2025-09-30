import SEO from "@/components/SEO";
import { COMPANY } from "@/data/company";
import { SEO_PAGES } from "@/data/seo";

const Impressum = () => {
  return (
    <>
      <SEO 
        title={SEO_PAGES.impressum.title}
        description={SEO_PAGES.impressum.description}
        path={SEO_PAGES.impressum.path}
        robots="index, nofollow"
      />
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-2">
              <p className="font-medium text-foreground">{COMPANY.brand}</p>
              <p>{COMPANY.owner}</p>
              <p>{COMPANY.street}</p>
              <p>{COMPANY.postalCode} {COMPANY.city}, Deutschland</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">Kontakt</h2>
            <div className="space-y-2">
              <p>Telefon: <a href={`tel:${COMPANY.telE164}`} className="text-primary hover:underline">{COMPANY.telDisplay}</a></p>
              <p>E-Mail: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
              <p>Internet: <a href="https://techhilfepro.de" className="text-primary hover:underline">https://techhilfepro.de</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">Umsatzsteuer</h2>
            <p>
              Umsatzsteuerbefreit nach § 19 UStG (Kleinunternehmerregelung). 
              Es wird keine Umsatzsteuer ausgewiesen.
            </p>
          </section>

          {COMPANY.ustId && (
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">Steuerliche Angaben</h2>
              <p>Steuernummer: {COMPANY.ustId}</p>
            </section>
          )}
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <div className="space-y-2">
              <p>{COMPANY.owner}</p>
              <p>{COMPANY.street}</p>
              <p>{COMPANY.postalCode} {COMPANY.city}, Deutschland</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">Haftungsausschluss</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Haftung für Inhalte</h3>
                <p className="leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                  Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte 
                  fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
                  rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="leading-relaxed mt-2">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                  allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                  erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Haftung für Links</h3>
                <p className="leading-relaxed">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir 
                  keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
                <p className="leading-relaxed mt-2">
                  Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße 
                  überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. 
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
                  Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">Urheberrecht</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
              <p className="leading-relaxed">
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch 
                gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden 
                die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche 
                gekennzeichnet.
              </p>
              <p className="leading-relaxed">
                Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um 
                einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir 
                derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </section>

          <section className="text-sm">
            <h2 className="text-lg font-semibold text-foreground mb-2">Streitbeilegung</h2>
            <p className="leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" className="text-primary hover:underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="leading-relaxed mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Impressum;