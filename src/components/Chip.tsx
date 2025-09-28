type Kind = "KMU" | "MSP" | "SLA";

const MAP: Record<Kind, {label: string; desc: string; bg: string; color: string}> = {
  KMU: { 
    label: "KMU", 
    desc: "Klein- und Mittelunternehmen (1–249 Mitarbeitende). Flexible IT-Betreuung ohne hohe Fixkosten.", 
    bg: "bg-slate-100", 
    color: "text-slate-700" 
  },
  MSP: { 
    label: "MSP", 
    desc: "Managed Service Provider: laufende IT-Betreuung inkl. Monitoring, Updates & Support – statt reiner Ad-hoc-Hilfe.", 
    bg: "bg-violet-100", 
    color: "text-violet-800" 
  },
  SLA: { 
    label: "SLA", 
    desc: "Service Level Agreement: vertraglich gesicherte Reaktions-/Lösungszeiten je nach Paket.", 
    bg: "bg-amber-100", 
    color: "text-amber-900" 
  }
};

export function Chip({ kind }: { kind: Kind }) {
  const k = MAP[kind];
  const id = `chip-tip-${kind}-${Math.random().toString(36).slice(2)}`;
  
  return (
    <span className="relative inline-flex group">
      <button
        type="button"
        aria-describedby={id}
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${k.bg} ${k.color} hover:underline focus-visible:underline`}
      >
        {k.label}
      </button>
      <span
        role="tooltip"
        id={id}
        className="invisible absolute top-full left-0 mt-2 max-w-xs rounded-xl border bg-white p-3 text-xs text-slate-700 shadow-md group-focus-within:visible group-hover:visible z-10"
      >
        {k.desc}
      </span>
    </span>
  );
}