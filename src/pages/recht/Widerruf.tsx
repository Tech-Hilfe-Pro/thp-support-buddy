import { Helmet } from "react-helmet-async";

const Widerruf = () => {
  return (
    <>
      <Helmet>
        <title>Widerruf - Tech Hilfe Pro</title>
        <meta name="description" content="Widerrufsbelehrung für Verbraucher bei IT-Support-Dienstleistungen von Tech Hilfe Pro." />
        <meta name="robots" content="index, nofollow" />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Widerrufsbelehrung</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Widerrufsrecht</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen 
                diesen Vertrag zu widerrufen.
              </p>
              <p>
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
              </p>
              <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Tech Hilfe Pro, 
                E-Mail: <a href="mailto:info@techhilfepro.de" className="underline hover:no-underline">info@techhilfepro.de</a>, Telefon: <a href="tel:+4915565029989" className="underline hover:no-underline">+49 15565029989</a>) 
                mittels einer eindeutigen Erklärung (z.B. E-Mail oder Brief) 
                über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Widerrufsfolgen</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, 
                die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen 
                vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über 
                Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
              </p>
              <p>
                Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie 
                bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, 
                mit Ihnen wurde ausdrücklich etwas anderes vereinbart.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Besondere Hinweise</h2>
            <div className="text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">Vorzeitige Leistungserbringung</h3>
              <p>
                Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist 
                beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, 
                der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung 
                des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits 
                erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag 
                vorgesehenen Dienstleistungen entspricht.
              </p>
              
              <h3 className="font-semibold text-foreground">Ausschluss des Widerrufsrechts</h3>
              <p>
                Das Widerrufsrecht besteht nicht bei Verträgen zur Erbringung von 
                Dienstleistungen, wenn der Unternehmer die Dienstleistung vollständig 
                erbracht hat und mit der Ausführung der Dienstleistung erst begonnen hat, 
                nachdem Sie Ihre ausdrückliche Zustimmung dazu gegeben haben und gleichzeitig 
                Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei 
                vollständiger Vertragserfüllung durch uns verlieren.
              </p>
              
              <h3 className="font-semibold text-foreground">Eilleistungen</h3>
              <p>
                Bei Notfällen und ausdrücklich gewünschten Eilleistungen, bei denen 
                die Dienstleistung sofort erbracht wird, entfällt das Widerrufsrecht 
                für die bereits erbrachten Leistungen.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Muster-Widerrufsformular</h2>
            <div className="bg-muted p-6 rounded-lg text-muted-foreground space-y-4">
              <p className="font-semibold text-foreground">
                (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses 
                Formular aus und senden Sie es zurück.)
              </p>
              <div className="space-y-2">
                <p>An: Tech Hilfe Pro, E-Mail: <a href="mailto:info@techhilfepro.de" className="underline hover:no-underline">info@techhilfepro.de</a></p>
                <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*)</p>
                <p>Bestellt am (*)/erhalten am (*)</p>
                <p>Name des/der Verbraucher(s)</p>
                <p>Anschrift des/der Verbraucher(s)</p>
                <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
                <p>Datum</p>
                <p className="text-sm">(*) Unzutreffendes streichen.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Widerruf;