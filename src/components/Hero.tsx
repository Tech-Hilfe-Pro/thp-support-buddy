import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const words = ["PC/Mac-Hilfe","WLAN-Optimierung","Drucker-Setup","Smart-TV","Smart-Home","Sicherheits-Check","Backups","E-Mail & Cloud"];
  const [i,setI] = useState(0);
  const [txt,setTxt] = useState("");
  const [typing,setTyping] = useState(true);
  const [reduced,setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e:MediaQueryListEvent)=> setReduced(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);

  useEffect(() => {
    if (reduced) { setTxt(words[0]); return; }
    const current = words[i];
    const t = typing
      ? (txt.length < current.length ? setTimeout(()=>setTxt(current.slice(0, txt.length+1)), 70) : setTimeout(()=>setTyping(false), 1200))
      : (txt.length ? setTimeout(()=>setTxt(txt.slice(0,-1)), 35) : (setI(p=>(p+1)%words.length), setTyping(true), undefined));
    return () => t && clearTimeout(t);
  }, [i, txt, typing, reduced]);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-hero-soft" aria-hidden />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900">
          Schneller IT-Support für Zuhause & KMU
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-neutral-600">
          Wir lösen Ihre Technikprobleme – remote oder vor Ort in Köln, Neuss & Umgebung.
        </p>
        <div className="mt-6 h-7 sm:h-8">
          <span className="inline-block text-indigo-600 font-medium">{txt}</span>
          {!reduced && <span className="ml-1 inline-block w-[1ch] align-baseline animate-pulse">▌</span>}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/pakete-preise" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-6 py-3 text-base font-medium hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2">
            Preis in 60 Sekunden
          </Link>
          <Link to="/termin" className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white text-neutral-900 px-6 py-3 text-base font-medium hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2">
            Jetzt Termin buchen
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-neutral-600">
          <span>✓ Vor-Ort & Remote</span>
          <span>✓ Faire Preise</span>
          <span>✓ Seniorenfreundlich</span>
          <span>✓ Schnelle Hilfe</span>
        </div>
      </div>
    </section>
  );
}