import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PRIVAT_ABOS, KMU_TIERS } from "@/data/pricing";
import { formatEUR } from "@/lib/format";

interface PlanTableProps {
  type: "privat" | "kmu";
}

const PlanTable = ({ type }: PlanTableProps) => {
  const plans = type === "privat" ? PRIVAT_ABOS : KMU_TIERS;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {plans.map((plan, index) => (
        <Card
          key={plan.id}
          className={`relative ${
            index === 1 ? "ring-2 ring-primary/20" : ""
          }`}
        >
          {index === 1 && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              Beliebt
            </Badge>
          )}
          
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription>
              {type === "privat" 
                ? "Monatliches Abo" 
                : "Pro Gerät/Monat"
              }
            </CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold tabular-nums">
                {formatEUR(type === "privat" ? (plan as any).preis : (plan as any).preisProGeraet)}
              </span>
              <span className="text-muted-foreground">
                {type === "privat" ? "/Monat" : "/Gerät"}
              </span>
            </div>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button className="w-full" size="lg">
              Jetzt buchen
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Monatlich kündbar. Transparent. Keine versteckten Kosten.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlanTable;