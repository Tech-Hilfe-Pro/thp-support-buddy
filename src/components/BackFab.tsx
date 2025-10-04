import { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

export default function BackFab() {
  const nav = useNavigate();
  const loc = useLocation();
  const navType = useNavigationType();
  const [visible, setVisible] = useState(false);
  const KEY = "thp_has_nav";

  // Detectar navegación "nueva" para limpiar marcas previas de la sesión
  useEffect(() => {
    const navEntry = performance?.getEntriesByType?.("navigation")?.[0] as PerformanceNavigationTiming | undefined;
    const navMode = navEntry?.type ?? "navigate";
    const isFresh = (window.history.length <= 1) && document.referrer === "" && (navMode === "navigate" || navMode === "reload");
    if (isFresh) sessionStorage.removeItem(KEY);
  }, []);

  const compute = () => {
    const hasHist = window.history.length > 1;
    const ref = document.referrer;
    let sameOriginRef = false;
    try {
      sameOriginRef = !!ref && new URL(ref).origin === location.origin;
    } catch {}
    const hasSpa = sessionStorage.getItem(KEY) === "1";
    return hasHist || sameOriginRef || hasSpa;
  };

  useEffect(() => {
    if (navType !== "POP") sessionStorage.setItem(KEY, "1"); // marca navegación interna
    setVisible(compute());
  }, [loc.key, navType]);

  useEffect(() => {
    const onPop = () => setVisible(compute());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (!visible) return null;

  return (
    <div className="back-fab">
      <button className="back-fab-btn" onClick={() => window.history.length > 1 ? nav(-1) : nav("/")} aria-label="Zurück">← Zurück</button>
    </div>
  );
}
