import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const words = [
    "WLAN-Optimierung",
    "PC- & Laptop-Einrichtung",
    "TV & Streaming",
    "Drucker & Scanner",
    "Smart-Home",
    "Datenrettung",
    "Virenschutz",
    "Cloud & E-Mail"
  ];
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState(words[0]);
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
    if (reduced) { setTxt(words[i]); return; }
    const current = words[i];
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
        if (!next) { setI((i + 1) % words.length); setPhase("type"); }
      }
    }, phase === "type" ? 60 : phase === "pause" ? 900 : 40);
    return () => clearTimeout(t);
  }, [txt, phase, i, reduced]);

  return (
    <section id="hero" className="pt-10 md:pt-14 pb-12 md:pb-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold">Schneller IT-Support für Zuhause & KMU</h1>
        <p className="mt-3 text-slate-600">Wir lösen Ihre Technikprobleme – remote oder vor Ort in Köln, Neuss & Umgebung.</p>
        <p className="mt-4 text-xl font-semibold">
          <span className="opacity-70">Smart-Home |</span>
          <span className="inline-block align-baseline min-w-[22ch] text-center tabular-nums">{txt}</span>
        </p>
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