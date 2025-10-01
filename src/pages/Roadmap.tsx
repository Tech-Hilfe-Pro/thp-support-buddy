import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText } from "lucide-react";
import { Kanban } from "@/components/Kanban";
import { ROADMAP } from "@/data/roadmap";

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState("kanban");

  // Flatten and sort all cards by due date
  const allCards = ROADMAP.columns.flatMap((col) =>
    col.items.map((card) => ({ ...card, column: col.name }))
  );
  const sortedCards = [...allCards].sort((a, b) => a.due.localeCompare(b.due));

  return (
    <>
      <SEO
        title="Roadmap 90 Tage | Tech Hilfe Pro"
        description="Unser detaillierter 90-Tage-Plan für den Aufbau unseres MSP-Geschäfts in Köln und Umgebung."
        path="/roadmap"
      />

      <div className="min-h-screen bg-background py-8 sm:py-12">
        <div className="container max-w-7xl px-4">
          <header className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Roadmap 90 Tage</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Unser strukturierter Plan für den Aufbau von Tech Hilfe Pro als MSP (Managed Service
              Provider) in Köln, Neuss und Umgebung.
            </p>
          </header>

          <div className="mb-6 flex flex-wrap gap-3">
            <Button variant="outline" asChild className="h-auto min-h-[44px]">
              <Link to="/impressum">
                <FileText className="h-4 w-4 mr-2" />
                Impressum
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto min-h-[44px]">
              <Link to="/datenschutz">
                <FileText className="h-4 w-4 mr-2" />
                Datenschutz
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto min-h-[44px]">
              <Link to="/agb">
                <FileText className="h-4 w-4 mr-2" />
                AGB
              </Link>
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-auto">
              <TabsTrigger value="kanban" className="h-auto min-h-[44px]">
                Kanban
              </TabsTrigger>
              <TabsTrigger value="liste" className="h-auto min-h-[44px]">
                Liste
              </TabsTrigger>
            </TabsList>

            <TabsContent value="kanban" className="mt-6">
              <Kanban />
            </TabsContent>

            <TabsContent value="liste" className="mt-6">
              <div className="space-y-4" role="list">
                {sortedCards.map((card) => (
                  <Card key={card.id} className="transition-colors">
                    <CardHeader>
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <Badge variant="outline">{card.column}</Badge>
                          <time
                            dateTime={card.due}
                            className="text-xs text-muted-foreground"
                          >
                            Fällig: {new Date(card.due).toLocaleDateString("de-DE")}
                          </time>
                        </div>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.owner}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Ziel:</h3>
                          <p className="text-sm text-muted-foreground">{card.goal}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold mb-2">Schritte:</h3>
                          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                            {card.steps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold mb-2">Kriterien:</h3>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            {card.criteria.map((criterion, idx) => (
                              <li key={idx}>{criterion}</li>
                            ))}
                          </ul>
                        </div>

                        {card.monologue && (
                          <div className="p-3 bg-muted rounded-md">
                            <p className="text-sm italic">💭 {card.monologue}</p>
                          </div>
                        )}

                        {card.refs && card.refs.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold mb-2">Referenzen:</h3>
                            <ul className="space-y-2">
                              {card.refs.map((ref, idx) => (
                                <li key={idx}>
                                  <a
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline inline-flex items-center gap-1 min-h-[44px] py-2"
                                  >
                                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                    {ref.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {card.blockers && card.blockers.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold mb-2 text-destructive">
                              Blocker:
                            </h3>
                            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                              {card.blockers.map((blocker, idx) => (
                                <li key={idx}>{blocker}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
