import { useMemo, useState } from "react";
import { PRIVAT_ABOS, KMU_TIERS } from "@/data/pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEUR } from "@/lib/format";
import BuyButton from "@/components/BuyButton";
import VatNotice from "@/components/VatNotice";

type PlanData = (typeof PRIVAT_ABOS)[0] | (typeof KMU_TIERS)[0];

function MembershipCard({ p, type }: { p: PlanData; type: "privat" | "kmu" }) {
  const isPrivat = type === "privat";
  const plan = p as any;
  
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          {plan.id === "M" && <span className="rounded-full bg-blue-100 text-blue-800 text-xs px-2 py-0.5">Beliebt</span>}
        </div>
        <div className="mt-2 text-2xl font-semibold">
          {formatEUR(isPrivat ? plan.preis : plan.preisProGeraet)}
          <span className="text-sm font-normal">
            {isPrivat ? "/Monat" : "/Gerät"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {isPrivat && plan.rabattVorOrt && (
          <p className="text-xs text-green-600">
            - {Math.round(plan.rabattVorOrt * 100)}% auf Arbeitszeit Vor-Ort
          </p>
        )}
        <ul className="text-sm text-muted-foreground space-y-1">
          {plan.features.map((feature: string, i: number) => (
            <li key={i}>• {feature}</li>
          ))}
        </ul>
        <div className="mt-auto">
          <BuyButton 
            kind={type} 
            plan={plan.id} 
            className="w-full"
          >
            Abo wählen
          </BuyButton>
          <VatNotice />
        </div>
      </CardContent>
    </Card>
  );
}

export default function MembershipCards() {
  const [audience, setAudience] = useState<"PRIVAT" | "KMU">("PRIVAT");
  const plans = useMemo(() => 
    audience === "PRIVAT" ? PRIVAT_ABOS : KMU_TIERS, 
    [audience]
  );
  const single = plans.length === 1;
  const empty = plans.length === 0;

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

        {empty ? (
          <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-6 text-slate-700">
            <h3 className="text-lg font-semibold">KMU-Pakete auf Anfrage</h3>
            <p className="mt-1 text-sm">Planbare Betreuung mit MSP & SLA. Wir erstellen ein Angebot, das zu Ihrem Bedarf passt.</p>
            <div className="mt-4 flex gap-2">
              <a href="/kontakt" className="rounded-xl border px-4 py-2">Kontakt</a>
              <a href="/termin" className="rounded-xl bg-indigo-600 px-4 py-2 text-white">Beratung buchen</a>
            </div>
            <VatNotice />
          </div>
        ) : (
          <div className={single ? "mx-auto max-w-3xl" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
            {plans.map(p => (
              <MembershipCard 
                key={p.id} 
                p={p} 
                type={audience === "PRIVAT" ? "privat" : "kmu"} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}