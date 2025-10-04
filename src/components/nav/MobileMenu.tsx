import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onScroll = () => setOpen(false);
    document.addEventListener("click", onDoc, true);
    document.addEventListener("touchstart", onDoc, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onDoc, true);
      document.removeEventListener("touchstart", onDoc, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={ref} className="md:hidden relative">
      <button
        className="hamb-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="mnav"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menü öffnen"
      >
        ☰
      </button>
      <div id="mnav" role="menu" className={`hamb-menu ${open ? "is-open" : ""}`}>
          <Link role="menuitem" to="/nis2" className="hamb-item">
            NIS2
          </Link>
          <Link role="menuitem" to="/preise" className="hamb-item">
            Preise
          </Link>
          <Link role="menuitem" to="/leistungen" className="hamb-item">
            Leistungen
          </Link>
          <Link role="menuitem" to="/blog" className="hamb-item">
            Blog
          </Link>
          <div className="hamb-sep" />
          <Link role="menuitem" to="/faq" className="hamb-item">
            FAQ
          </Link>
          <Link role="menuitem" to="/recht/agb" className="hamb-item">
            AGB
          </Link>
          <Link role="menuitem" to="/recht/impressum" className="hamb-item">
            Impressum
          </Link>
          <Link role="menuitem" to="/recht/datenschutz" className="hamb-item">
            Datenschutz
          </Link>
        </div>
    </div>
  );
}
