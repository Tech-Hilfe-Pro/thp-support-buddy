type Chip = "kmu" | "msp" | "sla";

export function ChipsInfo({ items }: { items: Chip[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.includes("kmu") && (
        <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">
          KMU
        </span>
      )}
      {items.includes("msp") && (
        <span className="px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs">
          MSP
        </span>
      )}
      {items.includes("sla") && (
        <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs">
          SLA
        </span>
      )}
    </div>
  );
}