import { useMemo, useState } from "react";
import { MEMBERSHIP_PLANS, MembershipPlan } from "@/data/memberships";
import PlanBadge from "./PlanBadge";
import { ChipsInfo } from "./ChipsInfo";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MembershipCard({ p }: { p: MembershipPlan }) {
  const nav = useNavigate();
  
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{p.name}</CardTitle>
          <PlanBadge text={p.badge} />
        </div>
        <div className="mt-2 text-3xl font-bold tracking-tight">
          {p.priceMonthly > 0 ? `${p.priceMonthly.toFixed(2)} €` : "—"} 
          <span className="text-base font-normal text-muted-foreground">/ Monat</span>
        </div>
        {p.laborDiscount && (
          <p className="mt-1 text-sm text-primary">
            Mitglieder sparen {(p.laborDiscount * 100).toFixed(0)} % auf Arbeitszeit vor Ort
          </p>
        )}
        <ChipsInfo 
          items={[
            p.audience === "KMU" ? "kmu" : undefined, 
            p.msp ? "msp" : undefined, 
            p.sla ? "sla" : undefined
          ].filter(Boolean) as any} 
        />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside flex-1">
          {p.includes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="mt-6 space-y-2">
          <Button
            className="w-full"
            onClick={() => nav(`/abo?plan=${p.id}`)}
            disabled={!p.priceMonthly}
          >
            Mitglied werden
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Kein Ausweis der USt. gem. § 19 UStG.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MembershipCards() {
  const [audience, setAudience] = useState<"PRIVAT" | "KMU">("PRIVAT");
  const data = useMemo(() => MEMBERSHIP_PLANS.filter(p => p.audience === audience), [audience]);
  
  return (
    <section id="mitgliedschaft" className="py-16">
      <div className="mx-auto max-w-7xl px-3 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Mitgliedschaft</h2>
            <p className="text-muted-foreground mt-2">
              Planbare IT-Unterstützung. Remote zuerst, Vor-Ort bei Bedarf.
            </p>
          </div>
          <div className="inline-flex rounded-lg border p-1 bg-muted/30">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                audience === "PRIVAT" 
                  ? "bg-background shadow-sm text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`} 
              onClick={() => setAudience("PRIVAT")}
            >
              Privat
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                audience === "KMU" 
                  ? "bg-background shadow-sm text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`} 
              onClick={() => setAudience("KMU")}
            >
              KMU
            </button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map(p => <MembershipCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}