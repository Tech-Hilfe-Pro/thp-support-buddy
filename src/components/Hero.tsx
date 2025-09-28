import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const words = [
    "Backups",
    "WLAN-Optimierung", 
    "PC- & Laptop-Einrichtung",
    "TV-Sender einrichten",
    "Drucker & Scanner",
    "Smart-Home",
    "Datenrettung",
    "Virenschutz",
    "Cloud & E-Mail"
  ];
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
      ? (txt.length < current.length ? setTimeout(()=>setTxt(current.slice(0, txt.length+1)), 80) : setTimeout(()=>setTyping(false), 2500))
      : (txt.length ? setTimeout(()=>setTxt(txt.slice(0,-1)), 40) : (setTimeout(() => { setI(p=>(p+1)%words.length); setTyping(true); }, 600), undefined));
    return () => t && clearTimeout(t);
  }, [i, txt, typing, reduced]);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-hero-soft" aria-hidden />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
          Schneller IT-Support für Zuhause & KMU
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground">
          Wir lösen Ihre Technikprobleme – remote oder vor Ort in Köln, Neuss & Umgebung.
        </p>
        <div className="mt-4 h-8 sm:h-10 flex items-center justify-center">
          <span className="text-[clamp(1.125rem,3.5vw,1.5rem)] font-semibold text-primary">{txt}</span>
          {!reduced && <span className="ml-1 inline-block w-[1ch] align-baseline animate-pulse text-primary">▌</span>}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pakete-preise" className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-8 py-3 text-base font-medium hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] shadow-lg">
            Preis in 60 Sekunden
          </Link>
          <Link to="/termin" className="inline-flex items-center justify-center rounded-xl border border-border bg-background text-foreground px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px]">
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