import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const words = ["Backups","WLAN-Optimierung","PC- & Laptop-Einrichtung","TV & Streaming","Drucker & Scanner","Smart-Home","Datenrettung","Virenschutz","Cloud & E-Mail"];
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState(words[0]);
  const [typing, setTyping] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);

  useEffect(() => {
    if (reduced) { setTxt(words[0]); return; }
    const current = words[i];
    const id = setInterval(() => {
      setTxt(t => {
        if (typing) {
          if (t.length < current.length) return current.slice(0, t.length + 1);
          setTyping(false); return t;
        } else {
          if (t.length > 0) return t.slice(0, -1);
          setTyping(true); setI((i+1) % words.length); return "";
        }
      });
    }, 80);
    return () => clearInterval(id);
  }, [i, typing, reduced]);

  return (
    <section id="hero" className="pt-10 md:pt-14 pb-12 md:pb-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold">Schneller IT-Support für Zuhause & KMU</h1>
        <p className="mt-3 text-slate-600">Wir lösen Ihre Technikprobleme – remote oder vor Ort in Köln, Neuss & Umgebung.</p>
        <p className="mt-4 text-xl font-semibold"><span className="opacity-70">Smart-Home |</span> <span className="tabular-nums">{txt}</span></p>
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