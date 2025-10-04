import { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

export default function BackFab() {
  const nav = useNavigate();
  const loc = useLocation();
  const navType = useNavigationType();
  const [canGoBack, setCanGoBack] = useState(false);
  const KEY = "thp_has_nav";

  const compute = () => {
    const hasHist = typeof window !== "undefined" && window.history.length > 1; // MDN History.length
    const hasRef = typeof document !== "undefined" && !!document.referrer;      // MDN document.referrer
    const hasSpa = typeof sessionStorage !== "undefined" && sessionStorage.getItem(KEY) === "1";
    return hasHist || hasRef || hasSpa;
  };

  useEffect(() => {
    // Marca navegación interna cuando no sea un POP (React Router)
    if (navType !== "POP") sessionStorage.setItem(KEY, "1");
    setCanGoBack(compute());
  }, [loc.key, navType]);

  useEffect(() => {
    const onPop = () => setCanGoBack(compute());
    window.addEventListener("popstate", onPop);    // MDN popstate
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (!canGoBack) return null;

  const onBack = () => { if (window.history.length > 1) nav(-1); else nav("/"); };

  return (
    <div className="back-fab">
      <button className="back-fab-btn" onClick={onBack} aria-label="Zurück">← Zurück</button>
    </div>
  );
}
