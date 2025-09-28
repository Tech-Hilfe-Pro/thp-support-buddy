import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const words = [
    "PC-Soforthilfe",
    "Office & Programme", 
    "Scan & Druck Service",
    "Datenrettung NRW",
    "WLAN Turbo Check",
    "Gaming & VR Setup",
    "SmartHome Assistent",
    "Fitness & Wearables",
    "Handy Soforthilfe",
    "Audio & Musik Setup",
    "TV Startklar machen",
    "Streaming Support",
    "Receiver Einrichtung",
    "Windows Update Fix",
    "Tablet & E-Reader"
  ];
  const [shuffledWords] = useState(() => [...words].sort(() => Math.random() - 0.5));
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState(shuffledWords[0]);
  const [phase, setPhase] = useState<"type"|"pause"|"erase">("type");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);

  useEffect(() => {
    if (reduced) { setTxt(shuffledWords[i]); return; }
    const current = shuffledWords[i];
    const t = setTimeout(() => {
      if (phase === "type") {
        const next = current.slice(0, txt.length + 1);
        setTxt(next);
        if (next === current) setPhase("pause");
      } else if (phase === "pause") {
        setPhase("erase");
      } else {
        const next = txt.slice(0, -1);
        setTxt(next);
        if (!next) { setI((i + 1) % shuffledWords.length); setPhase("type"); }
      }
    }, phase === "type" ? 60 : phase === "pause" ? 1000 : 40);
    return () => clearTimeout(t);
  }, [txt, phase, i, reduced, shuffledWords]);

  return (
    <section id="hero" className="pt-10 md:pt-14 pb-12 md:pb-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold">Schneller IT-Support für Zuhause & Unternehmen</h1>
        <div className="text-3xl md:text-5xl font-extrabold mt-2" style={{ color: '#3BA9FF' }}>
          <span className="inline-block min-h-[1.2em]">{txt}</span>
        </div>
        <p className="mt-4 text-slate-600">Wir lösen Ihre Technikprobleme – remote oder vor Ort in Köln, Neuss & Umgebung.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/pakete-preise#rechner" className="rounded-xl bg-blue-600 px-5 py-3 text-white font-medium">Preis in 60 Sekunden</Link>
          <Link to="/termin" className="rounded-xl border px-5 py-3 font-medium">Jetzt Termin buchen</Link>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
          <span>✓ Vor-Ort & Remote</span><span>✓ Faire Preise</span><span>✓ Seniorenfreundlich</span><span>✓ Schnelle Hilfe</span>
        </div>
      </div>
    </section>
  );
}