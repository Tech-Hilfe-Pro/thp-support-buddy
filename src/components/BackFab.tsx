import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useNavigationType } from "react-router-dom";

export default function BackFab() {
  const nav = useNavigate();
  const loc = useLocation();
  const navType = useNavigationType();
  const [canGoBack, setCanGoBack] = useState(false);
  const [open, setOpen] = useState(false);
  const KEY = "thp_has_nav";

  const compute = () => {
    const hasHist = window.history.length > 1;         // History API
    const ref = document.referrer || "";
    const hasRef = ref.length > 0;
    const hasNav = sessionStorage.getItem(KEY) === "1";
    return hasHist || hasRef || hasNav;
  };

  useEffect(() => {
    // Marca navegación interna cuando no es 'POP'
    if (navType !== "POP") sessionStorage.setItem(KEY, "1");
    setCanGoBack(compute());
  }, [loc.key, navType]);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    const onPop = () => setCanGoBack(compute());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const onBack = () => {
    if (window.history.length > 1) nav(-1);
    else nav("/"); // respaldo, aunque si no hay historial no se renderiza
  };

  if (!canGoBack) return null;

  return (
    <div className="back-fab">
      <button
        className="back-fab-btn"
        onClick={onBack}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Zurück"
        onContextMenu={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        onDoubleClick={() => setOpen((v) => !v)}
      >
        ← Zurück
      </button>
      {open && (
        <div
          className="back-fab-menu"
          role="menu"
          aria-label="Weitere Optionen"
          onMouseLeave={() => setOpen(false)}
        >
          <Link role="menuitem" to="/" className="back-fab-item">
            Startseite
          </Link>
          <Link role="menuitem" to="/kontakt" className="back-fab-item">
            Kontakt
          </Link>
          <Link role="menuitem" to="/preise" className="back-fab-item">
            Preise
          </Link>
        </div>
      )}
    </div>
  );
}
