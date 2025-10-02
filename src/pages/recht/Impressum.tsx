import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/company";
import { CONTACT } from "@/lib/constants";

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
              <p className="font-semibold">{COMPANY.brand}</p>
              <p>Inhaber: {COMPANY.owner}</p>
              {/* TODO-LEGAL: Vor Veröffentlichung vollständige postalische Anschrift einfügen (Schirmerstraße 7, 50823 Köln). Pflicht nach §5 DDG. */}
              <p>Anschrift: Schirmerstraße 7, 50823 Köln</p>
              <p>Telefon: <a href={CONTACT.PHONE_TEL} className="hover:text-primary transition-colors">{CONTACT.PHONE_DISPLAY}</a></p>
              <p>E-Mail: <a href={CONTACT.EMAIL} className="hover:text-primary transition-colors">{CONTACT.EMAIL_DISPLAY}</a></p>
              <p>Web: <a href={CONTACT.DOMAIN} className="hover:text-primary transition-colors">{CONTACT.DOMAIN}</a></p>
              <p>WhatsApp: <a href={CONTACT.WHATSAPP_URL} className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Per WhatsApp kontaktieren – Tech Hilfe Pro">{CONTACT.WHATSAPP_LABEL}</a></p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Anbieterkennzeichnung</h2>
            <p className="text-muted-foreground">
              Wir erbringen geschäftsmäßig digitale Dienste im Bereich IT-Support (Remote & vor Ort). 
              Sitz und ladungsfähige Anschrift siehe oben.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Umsatzsteuerstatus</h2>
            <p className="text-muted-foreground">
              Umsatzsteuerbefreit nach § 19 UStG (Kleinunternehmerregelung), keine Ausweisung der MwSt.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Verantwortlich für Inhalte i.S.d. § 18 Abs. 2 MStV</h2>
            <div className="text-muted-foreground space-y-2">
              <p>{COMPANY.owner}</p>
              {/* TODO-LEGAL: Vor Veröffentlichung vollständige postalische Anschrift einfügen. Pflicht nach §18 Abs. 2 MStV. */}
              <p>Schirmerstraße 7, 50823 Köln</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Haftungsausschluss</h2>
            <div className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Haftung für Inhalte</h3>
                <p>
                  Inhalte mit Sorgfalt erstellt; keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground">Haftung für Links</h3>
                <p>
                  Externe Inhalte liegen in der Verantwortung der jeweiligen Anbieter.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Verbraucherstreitbeilegung</h2>
            <p className="text-muted-foreground">
              Gemäß § 36 VSBG: Keine Verpflichtung und keine Bereitschaft zur Teilnahme an 
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle.
            </p>
            <p className="text-muted-foreground mt-2">
              <em>Hinweis:</em> Die EU-ODR-Plattform wurde eingestellt; kein Link vorhanden.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Impressum;