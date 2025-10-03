import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function BackFab() {
  const nav = useNavigate();
  const loc = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [open, setOpen] = useState(false);

  const computeCanGoBack = () => {
    try {
      const hasHist = window.history.length > 1; // MDN History.length
      const ref = document.referrer;             // MDN Document.referrer
      // Si vienes de otra página (interna o externa) o ya has navegado dentro de la SPA, mostramos
      return hasHist || !!ref;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setCanGoBack(computeCanGoBack());
  }, [loc.key]); // se recalcula en cada cambio de ruta (React Router useLocation)

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    const onPop = () => setCanGoBack(computeCanGoBack());
    window.addEventListener("popstate", onPop); // History API popstate
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
