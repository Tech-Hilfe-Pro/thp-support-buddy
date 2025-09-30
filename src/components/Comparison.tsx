import { Check, X, Minus } from "lucide-react";

interface ComparisonRow {
  feature: string;
  thp: {
    value: string;
    status: "positive" | "neutral" | "negative";
    tooltip?: string;
  };
  anbieterA: {
    value: string;
    status: "positive" | "neutral" | "negative";
  };
  anbieterB: {
    value: string;
    status: "positive" | "neutral" | "negative";
  };
}

const StatusIcon = ({ status }: { status: "positive" | "neutral" | "negative" }) => {
  switch (status) {
    case "positive":
      return <Check className="h-4 w-4 text-green-600" aria-label="Verfügbar" />;
    case "negative":
      return <X className="h-4 w-4 text-red-600" aria-label="Nicht verfügbar" />;
    case "neutral":
      return <Minus className="h-4 w-4 text-gray-400" aria-label="Teilweise" />;
  }
};

const StatusText = ({ status }: { status: "positive" | "neutral" | "negative" }) => {
  switch (status) {
    case "positive":
      return <span className="text-green-600 font-medium">✓ Ja</span>;
    case "negative":
      return <span className="text-red-600 font-medium">✗ Nein</span>;
    case "neutral":
      return <span className="text-gray-600 font-medium">~ Teilweise</span>;
  }
};

const comparisonData: ComparisonRow[] = [
  {
    feature: "Preis-Modell",
    thp: {
      value: "Transparent & Fair",
      status: "positive",
      tooltip: "Feste Preise pro 15-Min-Block, keine versteckten Kosten"
    },
    anbieterA: {
      value: "Stundenabrechnung",
      status: "neutral"
    },
    anbieterB: {
      value: "Pauschale + Extras",
      status: "negative"
    }
  },
  {
    feature: "Minutenfalle",
    thp: {
      value: "Keine Überraschungen",
      status: "positive",
      tooltip: "Abrechnung in fairen 15-Min-Blöcken, transparent kommuniziert"
    },
    anbieterA: {
      value: "Volle Stunden",
      status: "negative"
    },
    anbieterB: {
      value: "Mindestlaufzeit",
      status: "negative"
    }
  },
  {
    feature: "Mobile Device Management",
    thp: {
      value: "KMU-Pakete",
      status: "positive"
    },
    anbieterA: {
      value: "Enterprise only",
      status: "neutral"
    },
    anbieterB: {
      value: "Nicht verfügbar",
      status: "negative"
    }
  },
  {
    feature: "Microsoft 365 Backup",
    thp: {
      value: "Inklusive (Pro)",
      status: "positive"
    },
    anbieterA: {
      value: "Gegen Aufpreis",
      status: "neutral"
    },
    anbieterB: {
      value: "Externe Lösung",
      status: "negative"
    }
  },
  {
    feature: "SLA Reaktionszeit",
    thp: {
      value: "4h (Pro-Paket)",
      status: "positive"
    },
    anbieterA: {
      value: "24h Standard",
      status: "neutral"
    },
    anbieterB: {
      value: "Nur Werktage",
      status: "negative"
    }
  }
];

const Comparison = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Vergleich mit anderen Anbietern
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent, fair und ohne versteckte Kosten – das unterscheidet uns von anderen IT-Dienstleistern.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-border rounded-lg bg-card">
            <caption className="sr-only">
              Vergleich der Leistungen zwischen Tech Hilfe Pro und anderen Anbietern
            </caption>
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground"
                >
                  Leistungsmerkmal
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-center text-sm font-semibold text-primary"
                >
                  Tech Hilfe Pro
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground"
                >
                  Anbieter A
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground"
                >
                  Anbieter B
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-border last:border-b-0 hover:bg-muted/20">
                  <td className="px-4 py-4 text-sm font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <StatusIcon status={row.thp.status} />
                        <StatusText status={row.thp.status} />
                      </div>
                      <span className="text-xs text-primary font-medium">
                        {row.thp.value}
                      </span>
                      {row.thp.tooltip && (
                        <span className="text-xs text-muted-foreground text-center">
                          {row.thp.tooltip}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <StatusIcon status={row.anbieterA.status} />
                        <StatusText status={row.anbieterA.status} />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {row.anbieterA.value}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <StatusIcon status={row.anbieterB.status} />
                        <StatusText status={row.anbieterB.status} />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {row.anbieterB.value}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            * Angaben basieren auf öffentlich verfügbaren Informationen der jeweiligen Anbieter
          </p>
        </div>
      </div>
    </section>
  );
};

export default Comparison;