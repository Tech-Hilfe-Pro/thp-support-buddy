import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function BackFab() {
  const nav = useNavigate();
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  const onBack = () => {
    if (window.history.length > 1) nav(-1);
    else nav("/");
  };

  return (
    <div className="back-fab">
      <button
        ref={btnRef}
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
