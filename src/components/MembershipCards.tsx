import { useMemo, useState } from "react";
import { MEMBERSHIP_PLANS, type MembershipPlan } from "@/data/memberships";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChipsInfo } from "./ChipsInfo";

function MembershipCard({ p }: { p: MembershipPlan }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">{p.name}</CardTitle>
          {p.badge && <span className="rounded-full bg-blue-100 text-blue-800 text-xs px-2 py-0.5">{p.badge}</span>}
        </div>
        <div className="mt-2 text-2xl font-semibold">{p.priceMonthly.toFixed(2)} €<span className="text-sm font-normal">/Monat</span></div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {p.laborDiscount && <p className="text-xs text-green-600">- {Math.round(p.laborDiscount * 100)}% auf Arbeitszeit Vor-Ort</p>}
        <ul className="text-sm text-muted-foreground space-y-1">
          {p.includes.map((x, i) => <li key={i}>• {x}</li>)}
        </ul>
        <div className="mt-auto">
          <Button asChild className="w-full"><a href="/mitgliedschaft">Mitglied werden</a></Button>
          <p className="text-xs text-muted-foreground text-center mt-2">Kein Ausweis der USt. gem. § 19 UStG.</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MembershipCards() {
  const [audience, setAudience] = useState<"PRIVAT" | "KMU">("PRIVAT");
  const plans = useMemo(() => MEMBERSHIP_PLANS.filter(p => p.audience === audience), [audience]);
  const single = plans.length === 1;

  return (
    <section id="mitgliedschaft" className="py-12">
      <div className="mx-auto max-w-7xl px-3 lg:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Mitgliedschaft</h2>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
            <button className={`px-3 py-1 text-sm rounded-lg ${audience==="PRIVAT"?"bg-white shadow":"opacity-70"}`} onClick={()=>setAudience("PRIVAT")}>Privat</button>
            <button className={`px-3 py-1 text-sm rounded-lg ${audience==="KMU"?"bg-white shadow":"opacity-70"}`} onClick={()=>setAudience("KMU")}>KMU</button>
          </div>
        </div>

        <div className={single ? "mx-auto max-w-2xl" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
          {plans.map(p => <MembershipCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}